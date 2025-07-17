// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from 'src/pages/AuthContext'; // Certifique-se de que o caminho para AuthContext está correto

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};