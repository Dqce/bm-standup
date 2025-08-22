import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CopyToClipboard = ({ onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);


  const handleCopy = () => {
    onCopy();
    setIsCopied(true);
    

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
        isCopied
          ? 'bg-green-500 text-white shadow'
          : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-sm'
      }`}
    >
      {isCopied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Notes
        </>
      )}
    </motion.button>
  );
};

export default CopyToClipboard;
