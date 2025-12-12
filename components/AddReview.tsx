"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { createReview } from "@/actions/createReview";
import toast from "react-hot-toast";
import { motion } from "motion/react";

interface Props {
    productId: string;
    slug: string;
}

const AddReview = ({ productId, slug }: Props) => {
    const { user, isSignedIn } = useUser();
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) return;

        setIsSubmitting(true);
        try {
            const result = await createReview({
                productId,
                slug,
                review: {
                    userName: user?.fullName || user?.firstName || "Anonymous",
                    userImage: user?.imageUrl || "",
                    rating,
                    title,
                    comment,
                },
            });

            if (result.success) {
                toast.success("Review added successfully!");
                setTitle("");
                setComment("");
                setRating(5);
            } else {
                toast.error("Failed to add review.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm mb-10 mt-8"
        >
            <h3 className="text-2xl font-bold text-black mb-6">Write a Review</h3>

            {!isSignedIn ? (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-600 mb-4 text-center font-medium">Please login to write a review about this product.</p>
                    <Button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300">
                        Login to Add Review
                    </Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label className="text-base font-semibold">Rating</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-6 h-6 cursor-pointer transition-colors ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-200 hover:text-yellow-400"
                                        }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-semibold">Review Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Excellent Product!"
                            required
                            className="rounded-lg border-gray-200 focus:border-black focus:ring-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment" className="text-base font-semibold">Your Review</Label>
                        <Textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us about your experience..."
                            required
                            className="min-h-[120px] rounded-lg border-gray-200 focus:border-black focus:ring-black resize-y"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 bg-black hover:bg-gray-800 text-white rounded-full font-bold h-12"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                </form>
            )}
        </motion.div>
    );
};

export default AddReview;
