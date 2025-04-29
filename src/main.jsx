import { StrictMode, useState } from 'react' // Import useState
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AccessCodeVerification from './components/AccessCodeVerification.jsx' // Import the verification component

// Create a root component to manage state
function Root() {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return (
    <StrictMode>
      {isVerified ? (
        <App />
      ) : (
        <AccessCodeVerification onVerificationSuccess={handleVerificationSuccess} />
      )}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
