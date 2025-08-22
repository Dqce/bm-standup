import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamMember from './components/TeamMember';
import RandomizeButtons from './components/RandomizeButtons';
import DadJokeGenerator from './components/DadJokeGenerator';
import CopyToClipboard from './components/CopyToClipboard';

const initialTeamMembers = [
  { id: 1, name: 'Jacques', roles: ['Middleware'], notes: '' },
  { id: 2, name: 'Hendrik', roles: ['Middleware'], notes: '' },
  { id: 3, name: 'Abdurahman', roles: ['Middleware'], notes: '' },
  { id: 4, name: 'Jade', roles: ['App'], notes: '' },
  { id: 5, name: 'Khuanita', roles: ['App'], notes: '' },
  { id: 6, name: 'Kamarin', roles: ['App'], notes: '' },
  { id: 7, name: 'Mohammed', roles: ['App'], notes: '' },
  { id: 8, name: 'James', roles: ['Middleware'], notes: '' },
  { id: 9, name: 'Josh', roles: ['Web'], notes: '' },
  { id: 10, name: 'Jasper', roles: ['App', 'Middleware'], notes: '' },
];

function App() {
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem('teamMembers');
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });
  const [generalNotes, setGeneralNotes] = useState(() => {
    const saved = localStorage.getItem('generalNotes');
    return saved || '';
  });
  const [joke, setJoke] = useState('');
  const [isLoadingJoke, setIsLoadingJoke] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState({ name: '', roles: ['App'] });
  const [showClearModal, setShowClearModal] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [particles, setParticles] = useState([]);

  const updateNotes = (id, notes) => {
    setTeamMembers(prev => {
      const updated = prev.map(member => 
        member.id === id ? { ...member, notes } : member
      );
      localStorage.setItem('teamMembers', JSON.stringify(updated));
      return updated;
    });
  };


  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 3,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
        velocity: {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6
        }
      });
    }
    setParticles(newParticles);
  };


  const createExplosionParticles = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const newParticles = [];
    
    for (let i = 0; i < 150; i++) {
      const angle = (Math.PI * 2 * i) / 150;
      const speed = Math.random() * 12 + 6;
      newParticles.push({
        id: Date.now() + i + 1000,
        x: centerX,
        y: centerY,
        size: Math.random() * 10 + 5,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a855f7', '#ef4444', '#10b981', '#f59e0b', '#f97316', '#06b6d4', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 14)],
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        }
      });
    }
    setParticles(newParticles);
  };


  const fullRandomize = () => {
    setIsRandomizing(true);
    createParticles();

    setTimeout(() => {
      const shuffled = [...teamMembers].sort(() => Math.random() - 0.5);
      setTeamMembers(shuffled);
      localStorage.setItem('teamMembers', JSON.stringify(shuffled));
      setIsRandomizing(false);
      createExplosionParticles();

      setTimeout(() => setParticles([]), 3000);
    }, 1200);
  };


  const randomizeByTeam = () => {
    setIsRandomizing(true);
    createParticles();

    setTimeout(() => {

      const grouped = {};
      teamMembers.forEach(member => {
        const primaryRole = member.roles[0] || 'Other';
        if (!grouped[primaryRole]) {
          grouped[primaryRole] = [];
        }
        grouped[primaryRole].push(member);
      });


      Object.keys(grouped).forEach(role => {
        grouped[role].sort(() => Math.random() - 0.5);
      });

  
      const shuffled = Object.values(grouped).flat();
      setTeamMembers(shuffled);
      localStorage.setItem('teamMembers', JSON.stringify(shuffled));
      setIsRandomizing(false);
      createExplosionParticles();

      setTimeout(() => setParticles([]), 3000);
    }, 1200);
  };


  const fetchDadJoke = async () => {
    setIsLoadingJoke(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
      const data = await response.json();
      
      if (data.error) {
        throw new Error('API returned an error');
      }
      

      if (data.type === 'twopart') {
        setJoke(`${data.setup}\n\n${data.delivery}`);
      } else if (data.type === 'single') {
        setJoke(data.joke);
      } else {
        setJoke('Why did the programmer quit his job? Because he didn\'t get arrays! 😄');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Why did the programmer quit his job? Because he didn\'t get arrays! 😄');
    } finally {
      setIsLoadingJoke(false);
    }
  };


  const openMemberModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setNewMember({ name: member.name, roles: [...member.roles] });
    } else {
      setEditingMember(null);
      setNewMember({ name: '', roles: ['App'] });
    }
    setShowMemberModal(true);
  };


  const saveTeamMember = () => {
    if (newMember.name.trim() && newMember.roles.length > 0) {
      if (editingMember) {

        setTeamMembers(prev => {
          const updated = prev.map(member => 
            member.id === editingMember.id 
              ? { ...member, name: newMember.name.trim(), roles: newMember.roles }
              : member
          );
          localStorage.setItem('teamMembers', JSON.stringify(updated));
          return updated;
        });
      } else {

        const member = {
          id: Date.now(),
          name: newMember.name.trim(),
          roles: newMember.roles,
          notes: ''
        };
        setTeamMembers(prev => {
          const updated = [...prev, member];
          localStorage.setItem('teamMembers', JSON.stringify(updated));
          return updated;
        });
      }
      setShowMemberModal(false);
      setEditingMember(null);
      setNewMember({ name: '', roles: ['App'] });
    }
  };


  const deleteTeamMember = (id) => {
    setTeamMembers(prev => {
      const updated = prev.filter(member => member.id !== id);
      localStorage.setItem('teamMembers', JSON.stringify(updated));
      return updated;
    });
  };


  const toggleRole = (role) => {
    setNewMember(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  
  const clearAllNotes = () => {

    setGeneralNotes('');
    localStorage.setItem('generalNotes', '');
    

    setTeamMembers(prev => {
      const updated = prev.map(member => ({ ...member, notes: '' }));
      localStorage.setItem('teamMembers', JSON.stringify(updated));
      return updated;
    });
    
    setShowClearModal(false);
  };


  const getRoleColor = (role) => {
    switch (role) {
      case 'App':
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


   const copyToClipboard = () => {

     const now = new Date();
     const gmtPlus2 = new Date(now.getTime() + (2 * 60 * 60 * 1000));
     const dateString = gmtPlus2.toLocaleDateString('en-GB'); // D/M/Y format
     

     let htmlContent = '';
     

      htmlContent += `<table style="border-collapse: collapse; width: 80vw; font-family: Arial, sans-serif !important; font-size: 14px !important; color: #000000 !important;">`;
      

        htmlContent += `<tr style="border: 1px solid #000000;">`;
        htmlContent += `<td style="border: 1px solid #000000; padding: 8px; font-weight: bold !important; width: 30%; font-family: Arial, sans-serif !important; font-size: 14px !important; color: #000000 !important;">${dateString}</td>`;
        htmlContent += `<td style="border: 1px solid #000000; padding: 8px; font-weight: bold !important; width: 70%; font-family: Arial, sans-serif !important; font-size: 14px !important; color: #000000 !important;">What am I currently working on?</td>`;
        htmlContent += `</tr>`;
      

      if (generalNotes.trim()) {
        htmlContent += `<tr style="border: 1px solid #000000;">`;
        htmlContent += `<td style="border: 1px solid #000000; padding: 8px; font-weight: normal !important; font-size: 16px !important; font-family: Arial, sans-serif !important; color: #000000 !important;">General Notes</td>`;
        const formattedGeneralNotes = generalNotes.split('\n').map(line => `• ${line}`).join('\n');
        htmlContent += `<td style="border: 1px solid #000000; padding: 8px; white-space: pre-wrap; line-height: 1.2; font-weight: normal !important; font-size: 14px !important; font-family: Arial, sans-serif !important; color: #000000 !important;">${formattedGeneralNotes}</td>`;
        htmlContent += `</tr>`;
      }
      

       teamMembers.forEach((member, index) => {
         htmlContent += `<tr style="border: 1px solid #000000;">`;
         htmlContent += `<td style="border: 1px solid #000000; padding: 8px; font-weight: normal !important; font-size: 16px !important; font-family: Arial, sans-serif !important; color: #000000 !important;">${member.name}</td>`;
         const formattedNotes = member.notes.split('\n').map(line => `• ${line}`).join('\n');
         htmlContent += `<td style="border: 1px solid #000000; padding: 8px; white-space: pre-wrap; line-height: 1.2; font-weight: normal !important; font-size: 14px !important; font-family: Arial, sans-serif !important; color: #000000 !important;">${formattedNotes}</td>`;
         htmlContent += `</tr>`;
       });
     

     htmlContent += `</table>`;
    

    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';
    document.body.appendChild(tempElement);
    

    const range = document.createRange();
    range.selectNodeContents(tempElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    

    try {
      document.execCommand('copy');
      console.log('Copied to clipboard with formatting!');
    } catch (err) {
      console.error('Failed to copy: ', err);

      let plainText = '';
      plainText += `${dateString}\n\n`;
      if (generalNotes.trim()) {
        plainText += `General:\n${generalNotes}\n\n`;
      }
      plainText += teamMembers
        .map(member => `${member.name} (${member.roles.join(', ')}):\n${member.notes}`)
        .join('\n\n');
      navigator.clipboard.writeText(plainText);
    }
    

    document.body.removeChild(tempElement);
    selection.removeAllRanges();
  };



     return (
     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-2 overflow-hidden">
       <div className="max-w-8xl mx-auto">

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-8"
        >
          <h1 className="text-3xl font-bold text-white mb-1">
            BlueMarket Weekly Standup
          </h1>
          <p className="text-blue-100 text-sm">
            Standup notes
          </p>
                 </motion.div>


         {isRandomizing && (
           <div className="fixed inset-0 pointer-events-none z-10">
             {particles.map((particle) => (
               <motion.div
                 key={particle.id}
                 className="absolute rounded-full"
                 style={{
                   left: particle.x,
                   top: particle.y,
                   width: particle.size,
                   height: particle.size,
                   backgroundColor: particle.color,
                   boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                 }}
                                   animate={{
                    x: [0, particle.velocity.x * 100],
                    y: [0, particle.velocity.y * 100],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 720]
                  }}
                  transition={{
                    duration: 3.0,
                    ease: "easeOut"
                  }}
               />
             ))}
           </div>
         )}

         <div className="flex justify-center">
          <div className="flex flex-col lg:flex-row gap-6 max-w-7xl">
            <div className="lg:w-80">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-4 h-fit w-full"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  General Notes
                </h2>
                                 <textarea
                   value={generalNotes}
                   onChange={(e) => {
                     setGeneralNotes(e.target.value);
                     localStorage.setItem('generalNotes', e.target.value);
                   }}
                   placeholder="General meeting notes, announcements, etc."
                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                   rows="8"
                   style={{ minHeight: '120px', height: 'auto' }}
                   onInput={(e) => {
                     e.target.style.height = 'auto';
                     e.target.style.height = e.target.scrollHeight + 'px';
                   }}
                 />
              </motion.div>
            </div>

                    
             <div className="lg:w-[700px]">
                             <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                                   animate={isRandomizing ? {
                    opacity: [1, 0.98, 1],
                    x: [0, 2, -2, 1, -1, 0],
                    y: [0, 1, -1, 0.5, -0.5, 0],
                    rotate: [0, 0.5, -0.5, 0.2, -0.2, 0],
                    scale: [1, 1.01, 0.99, 1.005, 0.995, 1],
                    transition: {
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : { opacity: 1, x: 0 }}
                 className="bg-white rounded-lg shadow-lg p-4 w-full"
               >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Team Members
                </h2>
                                 <div className="flex gap-2">
                   <CopyToClipboard onCopy={copyToClipboard} />
                   <button
                     onClick={() => setShowClearModal(true)}
                     className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                   >
                     Clear All
                   </button>
                 </div>
               </div>

               <div className="mb-4">
                                   <RandomizeButtons
                    onFullRandomize={fullRandomize}
                    onRandomizeByTeam={randomizeByTeam}
                    isRandomizing={isRandomizing}
                  />
               </div>

                  <div className="space-y-2 max-h-[560px] overflow-y-auto pr-2">
                  <AnimatePresence mode="wait">
                                         {teamMembers.map((member, index) => (
                       <motion.div
                         key={member.id}
                         initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                   animate={isRandomizing ? {
                            opacity: [1, 0.95, 1],
                            y: [0, -8, 8, -4, 4, 0],
                            x: [0, 8, -8, 4, -4, 0],
                            scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
                            rotate: [0, 360, -360, 180, -180, 0],
                            transition: {
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.05
                            }
                          } : { opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: -20, scale: 0.95 }}
                         transition={{ 
                           delay: index * 0.03,
                           duration: 0.3,
                           ease: "easeOut"
                         }}
                         layout

                         className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                         onClick={() => openMemberModal(member)}
                       >
                                                <div className="flex items-center gap-3 mb-2">

                            <motion.div 
                              className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                                                             animate={isRandomizing ? {
                                 rotate: [0, 360, -360, 180, -180, 0],
                                 scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
                                 x: [0, 5, -5, 3, -3, 0],
                                 y: [0, -3, 3, -2, 2, 0],
                                 backgroundColor: ["#60a5fa", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981", "#f97316", "#60a5fa"],
                                 transition: {
                                   duration: 0.6,
                                   repeat: Infinity,
                                   ease: "easeInOut",
                                   delay: index * 0.03
                                 }
                               } : {}}
                            >
                              {member.name.charAt(0)}
                            </motion.div>
                           

                           <div className="flex-1 min-w-0">
                             <div className="flex items-center gap-2">
                               <h3 className="text-base font-semibold text-gray-900">
                                 {member.name}
                               </h3>
                                                               <div className="flex gap-1">
                                  {member.roles.map((role, roleIndex) => (
                                    <motion.span 
                                      key={roleIndex} 
                                      className={`px-1.5 py-0.5 text-xs font-medium rounded-full border ${getRoleColor(role)}`}
                                                                             animate={isRandomizing ? {
                                         rotate: [0, 360, -360, 180, -180, 0],
                                         scale: [1, 1.05, 0.98, 1.02, 0.99, 1],
                                         x: [0, 3, -3, 2, -2, 0],
                                         y: [0, -2, 2, -1, 1, 0],
                                         transition: {
                                           duration: 0.5,
                                           repeat: Infinity,
                                           delay: (roleIndex * 0.05) + (index * 0.02),
                                           ease: "easeInOut"
                                         }
                                       } : {}}
                                    >
                                      {role}
                                    </motion.span>
                                  ))}
                                </div>
                             </div>
                           </div>
                         </div>


                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            What am I currently working on?
                          </label>
                                                     <textarea
                             value={member.notes}
                             onChange={(e) => updateNotes(member.id, e.target.value)}
                             placeholder=""
                             className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-xs overflow-hidden"
                             rows="2"
                             style={{ minHeight: '40px', height: 'auto' }}
                             onInput={(e) => {
                               e.target.style.height = 'auto';
                               e.target.style.height = e.target.scrollHeight + 'px';
                             }}
                             onClick={(e) => e.stopPropagation()}
                           />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
            </motion.div>
          </div>

           <div className="lg:w-80">
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-lg shadow-lg p-4 h-fit w-full"
             >
               <DadJokeGenerator
                 joke={joke}
                 isLoading={isLoadingJoke}
                 onFetchJoke={fetchDadJoke}
               />
             </motion.div>
           </div>
        </div>
      </div>

        {showMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMemberModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h3>
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roles
                  </label>
                  <div className="space-y-2">
                    {['App', 'Middleware', 'Web'].map((role) => (
                      <label key={role} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newMember.roles.includes(role)}
                          onChange={() => toggleRole(role)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={saveTeamMember}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    {editingMember ? 'Update' : 'Add'}
                  </button>
                  {editingMember && (
                    <button
                      onClick={() => {
                        deleteTeamMember(editingMember.id);
                        setShowMemberModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
                 )}

         {showClearModal && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={() => setShowClearModal(false)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="text-center">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
                   Clear All Notes?
                 </h3>
                 <p className="text-gray-600 mb-6">
                   This will clear all general notes and team member notes. This action cannot be undone.
                 </p>
                 <div className="flex gap-3 justify-center">
                   <button
                     onClick={() => setShowClearModal(false)}
                     className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                   >
                     Cancel
                   </button>
                   <button
                     onClick={clearAllNotes}
                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                   >
                     Clear All
                   </button>
                 </div>
               </div>
             </motion.div>
           </motion.div>
         )}
       </div>
     </div>
   );
 }

export default App;
