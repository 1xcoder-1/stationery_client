"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export interface OrderItem {
  _key: string;
  product: {
    _ref: string;
    _type: "reference";
  };
  quantity: number;
}

export interface Address {
  state: string;
  zip: string;
  city: string;
  address: string;
  name: string;
}

export interface Metadata {
  orderNumber: string;
  customerName: string;
  clerkUserId: string;
  email: string;
  phone: string;
  address: Address;
  paymentMethod: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  stripeCheckoutSessionId?: string;
}

// Zod schema for runtime validation
const createOrderSchema = z.object({
  orderItems: z.array(z.object({
    _key: z.string(),
    product: z.object({
      _ref: z.string(),
      _type: z.literal("reference"),
    }),
    quantity: z.number().int().positive(),
  })),
  metadata: z.object({
    orderNumber: z.string(),
    customerName: z.string(),
    clerkUserId: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.object({
      state: z.string(),
      zip: z.string(),
      city: z.string(),
      address: z.string(),
      name: z.string(),
    }),
    paymentMethod: z.string(),
    stripePaymentIntentId: z.string().optional(),
    stripeCustomerId: z.string().optional(),
    stripeCheckoutSessionId: z.string().optional(),
  }),
});


export async function createOrder(
  orderItems: OrderItem[],
  clientProvidedTotalPrice: number, // renamed to indicate it shouldn't be trusted
  currency: string,
  metadata: Metadata,
  amountDiscount: number
) {
  try {
    // 1. Authentication Check
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized: User must be logged in to create an order.");
    }

    if (metadata.clerkUserId !== userId) {
      throw new Error("Unauthorized: potentially malicious user ID mismatch.");
    }

    // 2. Input Validation
    const validationResult = createOrderSchema.safeParse({
      orderItems,
      metadata
    });

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      throw new Error("Invalid order data");
    }

    // 3. Server-side Price Calculation
    // Pre-process refs to find potential base product IDs
    // We assume the ref might be "realID-variantName".
    // Since we don't know where the split is, we just fetch IDs that exactly match
    // OR we rely on fetching based on the string being a superset?
    // Safer approach: Try to find the real ID.
    // For every item, if it's not a standard valid ID (or just always), try to query by ID.
    // Let's gather all unique _refs.
    const rawRefs = Array.from(new Set(orderItems.map(item => item.product._ref)));

    // Fetch products. Since we don't know the exact base ID, let's try to fetch all products
    // whose IDs might be the prefix of our refs.
    // Note: Fetching *all* products is inefficient. 
    // Optimization: We assume the last segment after '-' might be the variant.
    // We can collect candidates: original ref, and ref with last segment removed.
    const candidateIds = new Set<string>();
    rawRefs.forEach(ref => {
      candidateIds.add(ref);
      const lastDash = ref.lastIndexOf('-');
      if (lastDash > 0) {
        candidateIds.add(ref.substring(0, lastDash));
      }
    });

    const products = await backendClient.fetch(
      `*[_type == "product" && _id in $ids] {
            _id,
            price,
            discount,
            options,
            name
        }`,
      { ids: Array.from(candidateIds) }
    );

    // Calculate total
    let calculatedSubTotal = 0;
    const processedOrderItems = []; // Items with corrected _refs for Saving

    for (const item of orderItems) {
      let product = products.find((p: any) => p._id === item.product._ref);
      let variantName = null;

      // If strict match failed, try to find by prefix
      if (!product) {
        // Look for a product whose ID is a prefix of the item ref
        product = products.find((p: any) => item.product._ref.startsWith(`${p._id}-`));
        if (product) {
          // Extract variant name: ref is "ID-VariantName"
          variantName = item.product._ref.substring(product._id.length + 1);
        }
      }

      if (!product) {
        throw new Error(`Product not found: ${item.product._ref}`);
      }

      // Determine Price and Discount
      let price = product.price || 0;
      let discount = product.discount || 0;

      if (variantName && product.options) {
        const option = product.options.find((opt: any) => opt.name === variantName);
        if (option) {
          // Variant Logic: Use specific price, default discount to 0 unless specified
          price = option.price || price; // Fallback to base price if option has no price? Schema says option price is "Original price".
          // Actually, the user wants "option prices not add any discount".
          // My ProductInfo implementation: const currentDiscount = selectedOption ? (selectedOption.discount || 0) : (product?.discount || 0);
          // Wait, the previous turn instructions were: "Change currentDiscount logic... If selectedOption is active, use selectedOption.discount || 0... Only if NOT active, fall back to product.discount"
          discount = option.discount || 0;
        }
      }

      // Calculate effective price
      const effectivePrice = discount > 0 ? price - (price * discount) / 100 : price;

      calculatedSubTotal += effectivePrice * item.quantity;

      // Prepare item for saving: MUST use real product ID
      processedOrderItems.push({
        ...item,
        product: {
          ...item.product,
          _ref: product._id
        },
        variantName: variantName || undefined, // Store variant name
        price: effectivePrice, // Store snapshot of effective price
      });
    }

    // Apply fixed costs (Should ideally be from a config)
    const SHIPPING_COST = 300;
    const TAX_RATE = 0.02; // 2%
    const taxAmount = calculatedSubTotal * TAX_RATE;
    const calculatedTotal = calculatedSubTotal + SHIPPING_COST + taxAmount;

    // Optional: Check if client price matches server price (within a small margin)
    // For now, we override with the secure calculated total.

    // Create the order in Sanity
    const orderDoc = await backendClient.create({
      _type: "order",
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      clerkUserId: userId, // Use authenticated ID
      email: metadata.email,
      phone: metadata.phone,
      address: metadata.address,
      paymentMethod: metadata.paymentMethod,
      stripePaymentIntentId: metadata.stripePaymentIntentId,
      stripeCustomerId: metadata.stripeCustomerId,
      stripeCheckoutSessionId: metadata.stripeCheckoutSessionId,
      products: processedOrderItems,
      totalPrice: calculatedTotal, // Use server-side calculated total
      currency,
      amountDiscount,
      status: "pending",
      orderDate: new Date().toISOString(),
    });

    return orderDoc;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}