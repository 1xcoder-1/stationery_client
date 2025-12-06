// Note: This file should only be imported on the server-side
// For client-side usage, create API routes instead

import { backendClient as client } from "@/sanity/lib/backendClient";

// Get user profile by Clerk user ID
export const getUserProfile = async (clerkUserId: string) => {
  try {
    const query = `*[_type == 'userProfile' && clerkUserId == $clerkUserId][0]`;
    const user = await client.fetch(query, { clerkUserId });
    return user || null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Create new user profile
export const createUserProfile = async (userData: {
  clerkUserId: string;
  name: string;
  email: string;
  phoneNumber?: string;
}) => {
  try {
    console.log("Creating user profile with data:", userData);
    
    const newUser = {
      _type: 'userProfile',
      clerkUserId: userData.clerkUserId,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      accountCreatedDate: new Date().toISOString(),
      lastLoginDate: new Date().toISOString(),
      loyaltyPoints: 0,
      totalOrders: 0,
      totalSpent: 0,
      membershipLevel: 'bronze',
      newsletterSubscription: true
    };

    console.log("Using Sanity client with token:", client.config().token ? "Token present" : "No token");
    console.log("Using Sanity client with CDN:", client.config().useCdn);
    
    const result = await client.create(newUser);
    console.log("User profile created successfully:", result);
    return result;
  } catch (error: any) {
    console.error("Error creating user profile:", error);
    console.error("Error details:", {
      message: error.message,
      statusCode: error.statusCode,
      response: error.response
    });
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (clerkUserId: string, updates: Partial<any>) => {
  try {
    // First, find the document ID
    const query = `*[_type == 'userProfile' && clerkUserId == $clerkUserId][0] {_id}`;
    const userDoc = await client.fetch(query, { clerkUserId });
    
    if (!userDoc?._id) {
      throw new Error("User profile not found");
    }
    
    // Then patch the document
    const result = await client
      .patch(userDoc._id)
      .set({
        ...updates,
        lastLoginDate: new Date().toISOString()
      })
      .commit();
    
    return result;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
};

// Update user statistics after order
export const updateUserStatsAfterOrder = async (clerkUserId: string, orderAmount: number) => {
  try {
    // First get current user stats
    const user = await getUserProfile(clerkUserId);
    if (!user) return null;

    // Calculate new values
    const newTotalOrders = (user.totalOrders || 0) + 1;
    const newTotalSpent = (user.totalSpent || 0) + orderAmount;
    
    // Calculate loyalty points (1 point per $1 spent)
    const newLoyaltyPoints = (user.loyaltyPoints || 0) + Math.floor(orderAmount);
    
    // Determine membership level based on total spent
    let membershipLevel = 'bronze';
    if (newTotalSpent >= 1000) {
      membershipLevel = 'platinum';
    } else if (newTotalSpent >= 500) {
      membershipLevel = 'gold';
    } else if (newTotalSpent >= 100) {
      membershipLevel = 'silver';
    }

    // Update user profile
    const result = await updateUserProfile(clerkUserId, {
      totalOrders: newTotalOrders,
      totalSpent: newTotalSpent,
      loyaltyPoints: newLoyaltyPoints,
      membershipLevel: membershipLevel
    });

    return result;
  } catch (error) {
    console.error("Error updating user stats after order:", error);
    return null;
  }
};