"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getAIResponse } from "@/actions/aiChat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm Shopcart's AI assistant. I can help you with questions about our products, orders, and services. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await getAIResponse(inputValue);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again. If the problem persists, the AI service may be temporarily overloaded. Please try again in a few minutes.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Chat Button with enhanced animation */}
      <motion.button
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-shop_dark_green to-shop_light_green text-white shadow-xl flex items-center justify-center z-50 hover:from-shop_light_green hover:to-shop_dark_green transition-all duration-300"
        aria-label="Open AI Chat"
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Bot className="w-6 h-6 md:w-7 md:h-7" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
        </motion.div>
      </motion.button>

      {/* AI Chat Dialog with enhanced styling */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-xl w-[95vw] max-w-[95vw] sm:w-auto sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          {/* Enhanced Header with gradient */}
          <DialogHeader className="flex-shrink-0 bg-gradient-to-r from-shop_dark_green to-shop_light_green text-white p-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
                <DialogTitle className="flex items-center gap-2 text-white text-lg md:text-xl">
                  Shopcart AI Assistant
                </DialogTitle>
              </motion.div>
              {/* Removed duplicate close button from here */}
            </div>
            <motion.p 
              className="text-xs md:text-sm text-white/90 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Ask me anything about Shopcart
            </motion.p>
          </DialogHeader>

          {/* Close button at top right of dialog */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 h-7 w-7 md:h-8 md:w-8 text-white hover:bg-white/20 z-10"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </Button>

          <div className="flex-grow flex flex-col min-h-0">
            {/* Enhanced Messages Area with proper scrolling */}
            <div className="flex-grow overflow-hidden flex flex-col min-h-0">
              <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-sm ${
                            message.role === "user"
                              ? "bg-shop_dark_green text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.role === "assistant" && (
                              <Bot className="w-4 h-4 md:w-5 md:h-5 text-shop_light_green flex-shrink-0 mt-0.5" />
                            )}
                            <p className="text-sm md:text-base">{message.content}</p>
                          </div>
                          <p className="text-xs mt-2 opacity-70 text-right">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <motion.div 
                        className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-3 py-2 md:px-4 md:py-3"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex space-x-1">
                          <motion.div 
                            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-shop_dark_green rounded-full" 
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-shop_dark_green rounded-full" 
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-shop_dark_green rounded-full" 
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Enhanced Input Form - Fixed at bottom */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex-shrink-0 p-3 md:p-4 border-t bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Shopcart..."
                  className="flex-grow min-h-[50px] md:min-h-[60px] max-h-[100px] md:max-h-[120px] border-2 border-gray-200 focus:border-shop_dark_green rounded-xl resize-none text-sm md:text-base"
                  disabled={isLoading}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="icon"
                    className="h-12 w-12 md:h-16 md:w-14 rounded-xl bg-shop_dark_green hover:bg-shop_light_green transition-colors"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChat;