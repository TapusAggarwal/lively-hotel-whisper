
import { motion } from "framer-motion";

export const LoadingDots = () => {
  return (
    <div className="flex space-x-2 p-4 bg-white/90 backdrop-blur-sm rounded-2xl w-fit">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-3 h-3 bg-[#E6B980] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
};
