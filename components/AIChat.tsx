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
import { Bot, Send, X, Sparkles, MessageSquare, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      content: "Hello! I'm Doodle Blast's AI assistant. I can help you with questions about our products, orders, and services. How can I assist you today?",
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
          scale: 1.05,
          boxShadow: "0 20px 35px rgba(0,0,0,0.2)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 0 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-shop_dark_green text-white shadow-2xl flex items-center justify-center z-50 group overflow-hidden border-4 border-white/20 backdrop-blur-sm"
        aria-label="Open Doodle Blast AI"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-shop_dark_green via-shop_light_green to-shop_orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          className="relative z-10"
          animate={{
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Bot className="w-8 h-8 text-white drop-shadow-md" />
        </motion.div>

        <motion.div
          className="absolute top-3 right-3 w-3 h-3 bg-shop_orange rounded-full shadow-lg border border-white"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 4
          }}
        />
      </motion.button>

      {/* AI Chat Dialog with enhanced styling */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl w-[95vw] max-w-[95vw] sm:w-auto mx-auto bg-white/95 backdrop-blur-xl [&>button]:hidden">

          {/* Header */}
          <DialogHeader className="flex-shrink-0 bg-shop_dark_green text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-shop_light_green rounded-full blur-3xl opacity-30" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-shop_orange rounded-full blur-3xl opacity-20" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    Doodle Blast AI
                    <span className="px-2 py-0.5 rounded-full bg-shop_light_green/20 text-shop_light_green text-[10px] uppercase tracking-wider font-bold border border-shop_light_green/30">Beta</span>
                  </DialogTitle>
                  <p className="text-sm text-white/70 font-medium">Always here to help</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Messages Area */}
          <div className="flex-grow flex flex-col min-h-0 bg-gray-50/50 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

            <ScrollArea className="flex-grow p-4 md:p-6">
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${message.role === "user"
                          ? "bg-shop_orange text-white"
                          : "bg-shop_dark_green text-white"
                          }`}>
                          {message.role === "user" ? (
                            <MessageSquare className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className={`group relative px-5 py-3.5 shadow-sm ${message.role === "user"
                          ? "bg-shop_dark_green text-white rounded-2xl rounded-tr-sm"
                          : "bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100"
                          }`}>
                          <p className="text-sm md:text-[15px] leading-relaxed">{message.content}</p>
                          <span className={`text-[10px] absolute bottom-1 ${message.role === "user" ? "left-2 text-white/40" : "right-2 text-gray-400"
                            } opacity-0 group-hover:opacity-100 transition-opacity`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-shop_dark_green text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-shop_dark_green rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-shop_dark_green rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-shop_dark_green rounded-full animate-bounce" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <motion.form
              onSubmit={handleSubmit}
              className="relative flex items-end gap-2 bg-gray-50 p-2 rounded-[1.5rem] border border-gray-200 focus-within:border-shop_dark_green focus-within:ring-4 focus-within:ring-shop_dark_green/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Type your message..."
                className="flex-grow min-h-[48px] max-h-[120px] bg-transparent border-none focus-visible:ring-0 resize-none py-3 px-4 text-gray-700 placeholder:text-gray-400 text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className={`h-10 w-10 rounded-full mb-1 mr-1 transition-all duration-300 shadow-sm ${inputValue.trim()
                  ? "bg-shop_dark_green hover:bg-shop_light_green text-white scale-100"
                  : "bg-gray-200 text-gray-400 scale-95"
                  }`}
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <Sparkles className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 ml-0.5" />
                )}
              </Button>
            </motion.form>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3 text-shop_orange" />
                Powered by Doodle Blast AI
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChat;