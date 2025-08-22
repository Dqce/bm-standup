import React from 'react';
import { motion } from 'framer-motion';

const RandomizeButtons = ({ onFullRandomize, onRandomizeByTeam, isRandomizing }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Randomize Order
      </h3>
      
      <div className="flex gap-2">

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFullRandomize}
          disabled={isRandomizing}
                     animate={isRandomizing ? {
             scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
             rotate: [0, 5, -5, 3, -3, 0],
             x: [0, 3, -3, 2, -2, 0],
             y: [0, -2, 2, -1, 1, 0],
             backgroundColor: ["#8b5cf6", "#ec4899", "#f59e0b", "#ef4444", "#10b981", "#f97316", "#8b5cf6"],
             boxShadow: [
               "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
               "0 10px 15px -3px rgba(139, 92, 246, 0.3)",
               "0 8px 12px -2px rgba(236, 72, 153, 0.3)",
               "0 10px 15px -3px rgba(245, 158, 11, 0.3)",
               "0 8px 12px -2px rgba(239, 68, 68, 0.3)",
               "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
             ],
             transition: {
               duration: 1.0,
               repeat: Infinity,
               ease: "easeInOut"
             }
           } : {}}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-3 rounded text-sm shadow hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isRandomizing ? {
              rotate: [0, 360, -360, 0],
              scale: [1, 1.2, 0.9, 1],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : { rotate: [0, 360] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </motion.svg>
          Full
        </motion.button>


        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRandomizeByTeam}
          disabled={isRandomizing}
                     animate={isRandomizing ? {
             scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
             rotate: [0, -5, 5, -3, 3, 0],
             x: [0, -3, 3, -2, 2, 0],
             y: [0, -2, 2, -1, 1, 0],
             backgroundColor: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#3b82f6"],
             boxShadow: [
               "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
               "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
               "0 8px 12px -2px rgba(6, 182, 212, 0.3)",
               "0 10px 15px -3px rgba(16, 185, 129, 0.3)",
               "0 8px 12px -2px rgba(245, 158, 11, 0.3)",
               "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
             ],
             transition: {
               duration: 1.0,
               repeat: Infinity,
               ease: "easeInOut"
             }
           } : {}}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium py-2 px-3 rounded text-sm shadow hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isRandomizing ? {
              rotate: [0, 360, -360, 0],
              scale: [1, 1.2, 0.9, 1],
              transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : { rotate: [0, 360] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </motion.svg>
          By Team
        </motion.button>
      </div>
    </div>
  );
};

export default RandomizeButtons;
