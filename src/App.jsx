import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import GameViewportScaler from './components/GameViewportScaler';
import CharacterSelect from './components/CharacterSelect';
import Login from './components/Login';
import InteractiveTradingPreview from './components/InteractiveTradingPreview';
import './App.css';

const AppContent = () => {
  const { session, isGuest } = useAuth();
  const [character, setCharacter] = React.useState(null);

  if (!session && !isGuest) {
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
      <Router>
        <GameViewportScaler>
          <Routes>
            <Route path="/" element={<AppContent />} />
          </Routes>
        </GameViewportScaler>
      </Router>
    </AuthProvider>
  );
}

export default App;
