"use server";

import { backendClient } from "@/sanity/lib/backendClient";
import { revalidatePath } from "next/cache";

interface CreateReviewParams {
    productId: string;
    slug: string;
    review: {
        userName: string;
        userImage: string; // URL from Clerk
        rating: number;
        title: string;
        comment: string;
    };
}

export async function createReview({ productId, slug, review }: CreateReviewParams) {
    try {
        let imageAssetId = null;

        if (review.userImage) {
            try {
                const response = await fetch(review.userImage);
                if (response.ok) {
                    const blob = await response.blob();
                    const buffer = Buffer.from(await blob.arrayBuffer());
                    const asset = await backendClient.assets.upload("image", buffer, {
                        filename: `${review.userName}-avatar.jpg`,
                    });
                    imageAssetId = asset._id;
                }
            } catch (error) {
                console.error("Failed to upload user image to Sanity:", error);
                // Continue without image if upload fails
            }
        }

        const newReview = {
            _key: new Date().toISOString(), // Unique key for the array item
            userName: review.userName,
            // Only include userImage if we successfully uploaded an asset
            ...(imageAssetId && {
                userImage: {
                    _type: "image",
                    asset: {
                        _type: "reference",
                        _ref: imageAssetId,
                    },
                },
            }),
            rating: review.rating,
            reviewDate: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
            title: review.title,
            comment: review.comment,
        };

        await backendClient
            .patch(productId)
            .setIfMissing({ reviews: [] })
            .append("reviews", [newReview])
            .commit();

        revalidatePath(`/product/${slug}`);

        return { success: true };
    } catch (error) {
        console.error("Error creating review:", error);
        return { success: false, error: "Failed to create review" };
    }
}
