import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

 const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  setLoading(true);
  try {
    await axios.post('http://localhost:3001/signup', { email, password, firstName, lastName });
    setLoading(false);
    return { error: null };
  } catch (err: any) {
    setLoading(false);
    // Extrair a mensagem de erro do axios
    let message = 'Erro desconhecido';
    
    if (err.response && err.response.data) {
      if (typeof err.response.data === 'string') {
        message = err.response.data;
      } else if (err.response.data.error) {
        message = err.response.data.error;
      } else if (err.response.data.message) {
        message = err.response.data.message;
      }
    } else if (err.message) {
      message = err.message;
    }

    return { error: { message } };
  }
};


 const signIn = async (email: string, password: string, firstName: string, lastName: string) => {
  setLoading(true);
  try {
    await axios.post('http://localhost:3001/signin', { email, password, firstName, lastName });
    setUser(res.data.user);
    setLoading(false);
    return { error: null };
  } catch (err: any) {
    setLoading(false);
    let message = 'Erro desconhecido';
    
    if (err.response && err.response.data) {
      if (typeof err.response.data === 'string') {
        message = err.response.data;
      } else if (err.response.data.error) {
        message = err.response.data.error;
      } else if (err.response.data.message) {
        message = err.response.data.message;
      }
    } else if (err.message) {
      message = err.message;
    }
    return { error: err.response?.data || { message: 'Erro desconhecido' } };
  }
};


  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
