import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/context';
import BackgroundGif from '../assets/background/SBP.gif'; // Import the background GIF
import StoicImg from '../assets/Characters/Stoic.png';
import NervousNewbieImg from '../assets/Characters/NervousNewbie.png';
import FullDegenImg from '../assets/Characters/FullDegen.png';

const characters = [
    { name: 'Stoic', image: StoicImg, description: "Calm and calculated, the Stoic trader relies on logic and discipline, unfazed by market volatility. Starting Sanity: 80, Heart Rate: 60." },
    { name: 'Nervous Newbie', image: NervousNewbieImg, description: "Anxious and impulsive, the Nervous Newbie is prone to panic selling and FOMO buying. Starting Sanity: 50, Heart Rate: 90." },
    { name: 'Full Degen', image: FullDegenImg, description: "A high-risk, high-reward gambler who thrives on chaos and isn't afraid to go all-in. Starting Sanity: 30, Heart Rate: 75." },
];

const CharacterSelect = ({ onCharacterSelect }) => {
    const { profile, isGuest } = useContext(AuthContext);
    const [hoveredChar, setHoveredChar] = useState(null);

    return (
        <div
            className="h-full w-full flex flex-col items-center justify-center text-[#00ff00] p-4 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${BackgroundGif})` }}
        >
            {/* Overlay div for darkening */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                <div className="text-center mb-8">
                    <p className="text-xl font-['Press_Start_2P'] text-white">
                        {isGuest
                            ? "Welcome, Guest. To proceed select your trading character."
                            : `Welcome, ${profile?.username || 'Trader'}. To proceed select your trading character.`}
                    </p>
                </div>
                <h2 className="text-3xl font-['Press_Start_2P'] mb-10 text-center">SELECT YOUR TRADER</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {characters.map((char) => (
                        <button
                            key={char.name}
                            onClick={() => onCharacterSelect(char)}
                            onMouseEnter={() => setHoveredChar(char)}
                            onMouseLeave={() => setHoveredChar(null)}
                            className="pixel-button flex flex-col items-center p-6 bg-[#111] border-2 border-[#00ff00] hover:bg-[#222] hover:border-[#33ff33] transition-all duration-200"
                            style={{ minWidth: '150px' }}
                        >
                            <img src={char.image} alt={char.name} className="w-24 h-24 mb-4 object-contain" />
                            <span className="text-lg font-['Press_Start_2P']">{char.name}</span>
                        </button>
                    ))}
                </div>
                <div className="mt-8 text-center h-24 w-3/4">
                    {hoveredChar && (
                        <p className="text-md font-['Press_Start_2P'] text-white">
                            {hoveredChar.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharacterSelect;