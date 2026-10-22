import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithEmail: (email?: string, pass?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email?: string, name?: string) => Promise<void>;
  register: (name?: string, email?: string, pass?: string, studioName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_USER: User = {
  id: 'usr_facundo_chavez',
  name: 'Facundo Chavez',
  email: 'facundochavez@gmail.com',
  studioName: 'Facundo Chavez',
  trialDaysLeft: 13,
  phone: '+54 9 11 5544-2211',
  twoFactorEnabled: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start on login screen upon page reload as requested
  const [user, setUser] = useState<User | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('xubio_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('xubio_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  const loginWithEmail = async (email?: string, pass?: string): Promise<{ success: boolean; error?: string }> => {
    // Allows entering with ANY input as requested
    const targetEmail = (email && email.trim()) ? email.trim() : 'facundochavez@gmail.com';
    const targetName = (email && email.includes('@'))
      ? email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : 'Facundo Chavez';

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: targetName || 'Facundo Chavez',
      email: targetEmail,
      studioName: targetName || 'Facundo Chavez',
      trialDaysLeft: 13,
      twoFactorEnabled: false,
    };

    setUser(newUser);
    showToast(`¡Bienvenido de nuevo, ${newUser.name}!`);
    return { success: true };
  };

  const loginWithGoogle = async (emailOverride?: string, nameOverride?: string) => {
    const targetEmail = emailOverride || 'facundochavez@gmail.com';
    const targetName = nameOverride || 'Facundo Chavez';

    const googleUser: User = {
      id: 'usr_g_' + Date.now(),
      name: targetName,
      email: targetEmail,
      studioName: targetName,
      trialDaysLeft: 14,
      avatarUrl: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      twoFactorEnabled: true,
    };

    setUser(googleUser);
    showToast(`Autenticado con Google como ${googleUser.name}`);
  };

  const register = async (name?: string, email?: string, pass?: string, studioName?: string): Promise<{ success: boolean; error?: string }> => {
    // Allows creating account with ANY input as requested
    const finalName = (name && name.trim()) ? name.trim() : 'Facundo Chavez';
    const finalEmail = (email && email.trim()) ? email.trim() : 'facundochavez@gmail.com';
    const finalStudio = (studioName && studioName.trim()) ? studioName.trim() : finalName;

    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: finalName,
      email: finalEmail,
      studioName: finalStudio,
      trialDaysLeft: 14,
      twoFactorEnabled: false,
    };

    setUser(newUser);
    showToast(`¡Cuenta creada con éxito! Bienvenido a Xubio.`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    showToast('Sesión cerrada correctamente. Hasta pronto.');
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      return updated;
    });
    showToast('Datos de perfil actualizados exitosamente');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithEmail,
        loginWithGoogle,
        register,
        logout,
        updateUser,
        toast,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
