"use server";

import { backendClient } from "@/sanity/lib/backendClient";

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

export async function createOrder(
  orderItems: OrderItem[],
  totalPrice: number,
  currency: string,
  metadata: Metadata,
  amountDiscount: number
) {
  try {
    // Create the order in Sanity
    const orderDoc = await backendClient.create({
      _type: "order",
      orderNumber: metadata.orderNumber,
      customerName: metadata.customerName,
      clerkUserId: metadata.clerkUserId,
      email: metadata.email,
      phone: metadata.phone,
      address: metadata.address,
      paymentMethod: metadata.paymentMethod,
      stripePaymentIntentId: metadata.stripePaymentIntentId,
      stripeCustomerId: metadata.stripeCustomerId,
      stripeCheckoutSessionId: metadata.stripeCheckoutSessionId,
      products: orderItems,
      totalPrice,
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