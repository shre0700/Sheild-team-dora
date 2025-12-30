import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '@/data/mockUsers';

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  allUsers: User[];
  updateUser: (userId: string, updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, ...updates }));
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, allUsers: users, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
