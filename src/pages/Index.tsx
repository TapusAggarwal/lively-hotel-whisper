
import { useState } from "react";
import { motion } from "framer-motion";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LoadingDots } from "@/components/LoadingDots";

const Index = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; hotels?: string[] }>>([
    { text: "Hello! I'm your luxury hotel concierge. How may I assist you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch("YOUR_FLASK_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });
      const hotels = await response.json();
      
      setMessages(prev => [...prev, {
        text: hotels.length > 0 
          ? "I found these luxury hotels that match your criteria:" 
          : "I couldn't find any hotels matching your request. Could you please try a different search?",
        isUser: false,
        hotels: hotels.length > 0 ? hotels : undefined
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "I'm currently unable to process your request. Please try again.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3]"
    >
      <div className="max-w-3xl mx-auto p-4 sm:p-6 h-screen flex flex-col">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-playfair text-center text-gray-800 mb-8"
        >
          Luxury Hotel Concierge
        </motion.h1>
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} hotels={msg.hotels} />
          ))}
          {isLoading && <LoadingDots />}
        </div>

        <ChatInput
          message={inputMessage}
          setMessage={setInputMessage}
          onSend={handleSend}
          disabled={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default Index;
