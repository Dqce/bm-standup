import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DadJokeGenerator = ({ joke, isLoading, onFetchJoke }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Joke Generator
      </h2>


      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onFetchJoke}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium py-2 px-4 rounded text-sm shadow hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tell me a Joke
          </>
        )}
      </motion.button>


      <AnimatePresence mode="wait">
        {joke && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded p-3 shadow-sm"
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-yellow-800 font-bold text-xs">😄</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm leading-relaxed">
                  {joke}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
};

export default DadJokeGenerator;
