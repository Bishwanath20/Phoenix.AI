import React from 'react';
import { ViewMode } from '../types';
import { DockIcon, TabletIcon, MobileIcon, ChevronDownIcon, UndoIcon, RedoIcon, DownloadIcon, SettingsIcon, SunIcon, MoonIcon, MagicWandIcon } from './icons';

interface HeaderProps {
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode, isDarkMode, setIsDarkMode }) => {
    const viewModes = [
        { id: ViewMode.Dock, icon: DockIcon },
        { id: ViewMode.Tablet, icon: TabletIcon },
        { id: ViewMode.Mobile, icon: MobileIcon },
    ];

    return (
        <header className="flex items-center justify-between h-16 px-4 bg-white dark:bg-canvas-light border-b border-gray-200 dark:border-canvas-border shrink-0">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-900 dark:text-canvas-text-primary">
                    <MagicWandIcon className="w-6 h-6 text-purple-500" />
                    <span className="font-bold text-lg">Phoenix.AI</span>
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-canvas-border"></div>
                <span className="text-gray-500 dark:text-canvas-text-secondary">Demo</span>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-500 dark:text-canvas-text-secondary">Auto-saved</span>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center gap-6">
                <div className="flex items-center bg-gray-100 dark:bg-canvas-dark rounded-md p-1">
                    {viewModes.map(({ id, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setViewMode(id)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                                viewMode === id ? 'bg-canvas-primary text-white' : 'text-gray-600 dark:text-canvas-text-secondary hover:bg-white dark:hover:bg-canvas-lighter'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {id}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-canvas-text-secondary">
                    <span>Zoom:</span>
                    <button className="flex items-center gap-1 text-gray-800 dark:text-canvas-text-primary">
                        100% <ChevronDownIcon className="w-4 h-4" />
                    </button>
                </div>
                <button className="flex items-center gap-2 text-gray-500 dark:text-canvas-text-secondary hover:text-gray-800 dark:hover:text-canvas-text-primary">
                    <UndoIcon className="w-5 h-5" /> Undo
                </button>
                <button className="flex items-center gap-2 text-gray-500 dark:text-canvas-text-secondary hover:text-gray-800 dark:hover:text-canvas-text-primary">
                    <RedoIcon className="w-5 h-5" /> Redo
                </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                 <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-gray-500 dark:text-canvas-text-secondary hover:text-gray-800 dark:hover:text-canvas-text-primary p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-canvas-lighter transition-colors">
                    {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="bg-green-500/20 text-green-500 dark:text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                        Performance: 94
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-canvas-primary hover:bg-canvas-primary-dark text-white rounded-md font-semibold text-sm transition-colors">
                    <DownloadIcon className="w-4 h-4" />
                    Export Code
                </button>
                <button className="text-gray-500 dark:text-canvas-text-secondary hover:text-gray-800 dark:hover:text-canvas-text-primary">
                    <SettingsIcon className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Header;