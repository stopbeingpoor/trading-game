import React from 'react';
import AuthProvider from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import GameViewportScaler from './components/GameViewportScaler';
import CharacterSelect from './components/CharacterSelect';
import Login from './components/Login';
import InteractiveTradingPreview from './components/InteractiveTradingPreview';
import './App.css';

const AppContent = () => {
  const { session } = useAuth();
  const [character, setCharacter] = React.useState(null);

  if (!session) {
    return <Login />;
  }

  if (!character) {
    return <CharacterSelect onCharacterSelect={setCharacter} />;
  }

  return <InteractiveTradingPreview selectedCharacter={character} />;
};


function App() {
  return (
    <AuthProvider>
      <GameViewportScaler>
        <AppContent />
      </GameViewportScaler>
    </AuthProvider>
  );
}

export default App;
