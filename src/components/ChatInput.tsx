
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export const ChatInput = ({ message, setMessage, onSend, disabled }: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        placeholder="Ask about hotels..."
        className="w-full p-4 pr-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 focus:outline-none focus:border-[#E6B980] focus:ring-2 focus:ring-[#E6B980]/20 transition-all"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={disabled || !message.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#E6B980] to-[#eacda3] rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={20} />
      </motion.button>
    </form>
  );
};
