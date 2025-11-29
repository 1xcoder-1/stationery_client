"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getAIResponse(userMessage: string) {
  try {
    // Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        message: "AI service not configured properly. Please contact administrator."
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use the correct model name (gemini-1.5-flash is the stable version)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create context about Doodle Blast
    const context = `You are an AI assistant for Doodle Blast, an e-commerce platform. 
    You can help with questions about:
    1. Products and categories
    2. Orders and shipping
    3. Returns and refunds
    4. Account management
    5. General shopping assistance
    
    Keep your responses concise, helpful, and focused only on Doodle Blast-related topics. 
    Do not discuss topics unrelated to Doodle Blast.
    
    User's question: ${userMessage}`;

    const result = await model.generateContent(context);
    const response = await result.response;

    return {
      success: true,
      message: response.text()
    };
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);

    // Provide more specific error messages
    if (error.message && error.message.includes("404")) {
      return {
        success: false,
        message: "Sorry, there was an issue with the AI model. Please try again later."
      };
    } else if (error.message && error.message.includes("401")) {
      return {
        success: false,
        message: "Sorry, the AI service is not properly authorized."
      };
    } else if (error.message && error.message.includes("503")) {
      return {
        success: false,
        message: "The AI service is temporarily overloaded. Please try again in a few minutes."
      };
    } else if (error.message) {
      return {
        success: false,
        message: `Sorry, I encountered an error: ${error.message}`
      };
    } else {
      return {
        success: false,
        message: "Sorry, I'm having trouble connecting to the AI service. Please try again later."
      };
    }
  }
}