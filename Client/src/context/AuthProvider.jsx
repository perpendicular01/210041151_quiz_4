import { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config'; 
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth(app);
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          
          const res = await axios.post(`http://localhost:5001/login`, {
            email: firebaseUser.email,
            password: 'dummy', 
          });

          const token = res.data.token;
          localStorage.setItem('access-token', token);

          
          const decoded = JSON.parse(atob(token.split('.')[1]));
          setUser({ email: firebaseUser.email, role: decoded.role });

        } catch (error) {
          console.error('Login error:', error);
          setUser(null);
        }
      } else {
        setUser(null);
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authValues = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};


export const useAuthContext = () => useContext(AuthContext);
