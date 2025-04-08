import React from 'react';

const characters = [
  { name: 'Stoic', emoji: '😐' },
  { name: 'Nervous Newbie', emoji: '😰' },
  { name: 'Full Degen', emoji: '🤪' },
];

const CharacterSelect = ({ onSelect }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black text-[#00ff00] p-4">
      <h2 className="text-3xl font-['Press_Start_2P'] mb-10 text-center">SELECT YOUR TRADER</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {characters.map((char) => (
          <button
            key={char.name}
            onClick={() => onSelect(char)} // Pass the whole character object
            className="pixel-button flex flex-col items-center p-6 bg-[#111] border-2 border-[#00ff00] hover:bg-[#222] hover:border-[#33ff33] transition-all duration-200"
            style={{ minWidth: '150px' }} // Ensure buttons have some minimum width
          >
            <span className="text-6xl mb-4">{char.emoji}</span>
            <span className="text-lg font-['Press_Start_2P']">{char.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelect;