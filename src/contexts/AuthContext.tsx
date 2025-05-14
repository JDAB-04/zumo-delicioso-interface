
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// En una aplicación real, usaríamos una API para autenticación
// Esta es una simulación simple usando localStorage
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('fruta-fresca-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login
    try {
      // Verificar si el usuario existe en localStorage
      const users = JSON.parse(localStorage.getItem('fruta-fresca-users') || '[]');
      const foundUser = users.find((u: any) => u.email === email);
      
      if (foundUser && foundUser.password === password) {
        // Eliminar la contraseña antes de almacenar en el estado
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('fruta-fresca-user', JSON.stringify(userWithoutPassword));
        toast.success("Has iniciado sesión correctamente");
        return true;
      }
      
      toast.error("Email o contraseña incorrectos");
      return false;
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error al iniciar sesión");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Comprobar si el usuario ya existe
      const users = JSON.parse(localStorage.getItem('fruta-fresca-users') || '[]');
      
      if (users.some((u: any) => u.email === email)) {
        toast.error("Este email ya está registrado");
        return false;
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      };

      // Guardar en "base de datos" local
      users.push(newUser);
      localStorage.setItem('fruta-fresca-users', JSON.stringify(users));

      // Iniciar sesión automáticamente
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('fruta-fresca-user', JSON.stringify(userWithoutPassword));
      
      toast.success("¡Registro completado con éxito!");
      return true;
    } catch (error) {
      console.error("Error en registro:", error);
      toast.error("Error al registrar la cuenta");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fruta-fresca-user');
    toast.success("Has cerrado sesión");
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('fruta-fresca-user', JSON.stringify(updatedUser));
      
      // También actualizar en la lista de usuarios
      const users = JSON.parse(localStorage.getItem('fruta-fresca-users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.email === user.email ? { ...u, ...userData } : u
      );
      localStorage.setItem('fruta-fresca-users', JSON.stringify(updatedUsers));
      
      toast.success("Perfil actualizado correctamente");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
