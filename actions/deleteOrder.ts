"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { revalidatePath } from "next/cache";

export async function deleteOrder(orderId: string) {
    try {
        await backendClient.delete(orderId);
        revalidatePath("/orders");
        return { success: true };
    } catch (error) {
        console.error("Error deleting order:", error);
        return { success: false, error: "Failed to delete order" };
    }
}
