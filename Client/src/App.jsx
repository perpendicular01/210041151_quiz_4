import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';
import { AuthProvider } from './context/AuthProvider';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes></Routes>
      </Router>
    </AuthProvider>
    
  );
};

export default App;
