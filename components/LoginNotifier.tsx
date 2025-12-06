"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { initializeStoreWithUser } from "@/store";

const LoginNotifier = () => {
  const { user, isLoaded } = useUser();
  const hasSentNotification = useRef(false);
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    // Initialize store with current user
    if (isLoaded) {
      initializeStoreWithUser(user?.id || null);
    }
    
    // Only run when user is loaded
    if (isLoaded && user) {
      // Check if this is a new login by comparing with previous user ID
      if (user.id !== previousUserId.current && !hasSentNotification.current) {
        // Update refs
        previousUserId.current = user.id;
        hasSentNotification.current = true;
        
        // Get additional information
        const ipAddress = typeof window !== 'undefined' ? 
          window.location.hostname : 'Server-side render';
        
        const userAgent = typeof window !== 'undefined' ? 
          navigator.userAgent : 'Server-side render';

        // Send login notification via API
        fetch("/api/login-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            name: user.fullName || user.firstName || "User",
            email: user.primaryEmailAddress?.emailAddress || "No email",
            loginTime: new Date().toISOString(),
            ipAddress,
            userAgent,
          }),
        }).catch(error => {
          console.error("Failed to send login notification:", error);
        });
      }
    }
    
    // Reset notification flag when user logs out
    if (isLoaded && !user) {
      hasSentNotification.current = false;
      previousUserId.current = null;
    }
  }, [user, isLoaded]);

  // This component doesn't render anything
  return null;
};

export default LoginNotifier;