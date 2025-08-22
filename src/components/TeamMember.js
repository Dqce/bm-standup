import React from 'react';
import { motion } from 'framer-motion';

const TeamMember = ({ member, onUpdateNotes }) => {

  const handleNotesChange = (e) => {
    onUpdateNotes(member.id, e.target.value);
  };


  const getRoleColor = (role) => {
    switch (role) {
      case 'App Dev':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Middleware':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Web':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'App & Middleware':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      layout
      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-4">

        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {member.name.charAt(0)}
          </div>
        </div>


        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {member.name}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(member.role)}`}>
              {member.role}
            </span>
          </div>
        </div>
      </div>

    
      <div className="mt-3">
        <label htmlFor={`notes-${member.id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Meeting Notes
        </label>
        <textarea
          id={`notes-${member.id}`}
          value={member.notes}
          onChange={handleNotesChange}
          placeholder="What did you do yesterday? What are you working on today? Any blockers?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows="3"
        />
      </div>
    </motion.div>
  );
};

export default TeamMember;
