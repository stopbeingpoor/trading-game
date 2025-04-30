import React from 'react';
import BackgroundGif from '../assets/background/SBP.gif'; // Import the background GIF
import StoicImg from '../assets/Characters/Stoic.png';
import NervousNewbieImg from '../assets/Characters/NervousNewbie.png';
import FullDegenImg from '../assets/Characters/FullDegen.png';

const characters = [
  { name: 'Stoic', image: StoicImg },
  { name: 'Nervous Newbie', image: NervousNewbieImg },
  { name: 'Full Degen', image: FullDegenImg },
];

const CharacterSelect = ({ onCharacterSelect }) => { // Renamed prop
  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center text-[#00ff00] p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${BackgroundGif})` }}
    >
      {/* Overlay div for darkening */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-['Press_Start_2P'] mb-10 text-center">SELECT YOUR TRADER</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char) => (
            <button
              key={char.name}
              onClick={() => onCharacterSelect(char.name)} // Pass only the character name
              className="pixel-button flex flex-col items-center p-6 bg-[#111] border-2 border-[#00ff00] hover:bg-[#222] hover:border-[#33ff33] transition-all duration-200"
              style={{ minWidth: '150px' }} // Ensure buttons have some minimum width
            >
              {/* Replaced emoji span with img tag */}
              <img src={char.image} alt={char.name} className="w-24 h-24 mb-4 object-contain" />
              <span className="text-lg font-['Press_Start_2P']">{char.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;