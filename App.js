import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importing from the assets folder as per your current directory tree
import Home from './assets/home'; 
import Auth from './assets/auth'; 
import Projects from './assets/projects';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInitials, setUserInitials] = useState('AG');
  
  // New state to manage active page: 'home' or 'projects'
  const [activePage, setActivePage] = useState('home');

  const handleLogin = (name) => {
    if (name && name.length >= 2) {
      const initials = name.substring(0, 2).toUpperCase();
      setUserInitials(initials);
    } else if (name && name.length === 1) {
      setUserInitials(name.toUpperCase() + 'X');
    }
    setIsAuthenticated(true);
  };

  /**
   * Page Router
   * This function renders the correct component based on activePage state.
   */
  const renderContent = () => {
    if (activePage === 'home') {
      return (
        <Home 
          userInitials={userInitials} 
          onNavigate={(page) => setActivePage(page)} 
        />
      );
    } else if (activePage === 'projects') {
      return (
        <Projects 
          onNavigate={(page) => setActivePage(page)} 
        />
      );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      
      {isAuthenticated ? (
        renderContent()
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </SafeAreaProvider>
  );
}