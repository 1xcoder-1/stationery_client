"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <SignIn 
        appearance={{
          elements: {
            card: "shadow-none border-0",
            headerTitle: "hidden",
            headerSubtitle: "hidden"
          }
        }}
      />
    </div>
  );
};

export default LoginPage;