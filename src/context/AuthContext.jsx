import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];


    const userExists = existingUsers.find((u) => u.email === email);
    if (userExists) {
      alert('User already exists!');
      return false;
    }

    const newUser = { email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
