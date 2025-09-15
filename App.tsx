
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ComponentLibrary from './components/ComponentLibrary';
import Canvas from './components/Canvas';
import AiPanel from './components/AiPanel';
import PropertiesPanel from './components/PropertiesPanel';
import { EditorProvider } from './contexts/EditorContext';
import { ViewMode, PanelTab, User } from './types';
import { CanvasView } from './components/Canvas';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Dock);
  const [activeTab, setActiveTab] = useState<PanelTab>(PanelTab.AIChat);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [canvasView, setCanvasView] = useState<CanvasView>('landing');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  const isLoggedIn = !!currentUser;

  // Effect to manage dark mode class on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Effect to load user from localStorage on initial render
  useEffect(() => {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    } catch (error) {
        console.error("Failed to load user from localStorage", error);
        localStorage.removeItem('currentUser');
    }
  }, []);

  const handleSetCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
  };


  const isInEditor = canvasView === 'editor';

  return (
    <EditorProvider>
      <div className="flex flex-col h-screen bg-white dark:bg-canvas-dark text-gray-900 dark:text-canvas-text-primary font-sans overflow-hidden">
        <Header 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <div className="flex flex-1 overflow-hidden">
          <ComponentLibrary isInEditor={isInEditor} />
          <main className="flex-1 flex flex-col bg-gray-100 dark:bg-canvas-light overflow-hidden">
            <Canvas 
              viewMode={viewMode} 
              isLoggedIn={isLoggedIn} 
              setCurrentUser={handleSetCurrentUser}
              canvasView={canvasView}
              setCanvasView={setCanvasView}
              isDarkMode={isDarkMode}
            />
          </main>
          {isInEditor ? <PropertiesPanel /> : <AiPanel activeTab={activeTab} setActiveTab={setActiveTab} />}
        </div>
      </div>
    </EditorProvider>
  );
};

export default App;