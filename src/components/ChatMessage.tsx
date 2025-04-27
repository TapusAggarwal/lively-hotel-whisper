
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  hotels?: string[];
}

export const ChatMessage = ({ message, isUser, hotels }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-[#E6B980] to-[#eacda3] text-gray-800'
            : 'bg-white/90 backdrop-blur-sm shadow-lg'
        }`}
      >
        <p className="text-lg font-inter">{message}</p>
        {hotels && hotels.length > 0 && (
          <div className="mt-4 space-y-2">
            {hotels.map((hotel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-white/80 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-playfair text-gray-800">{hotel}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
