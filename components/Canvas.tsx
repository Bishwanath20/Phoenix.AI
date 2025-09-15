
import React from 'react';
import { ViewMode, User } from '../types';
import LandingPage from './canvas/LandingPage';
import ProjectsPage from './canvas/ProjectsPage';
import TeamPage from './canvas/TeamPage';
import LoginPage from './canvas/LoginPage';
import RegisterPage from './canvas/RegisterPage';
import EditorPage from './canvas/EditorPage';

export type CanvasView = 'landing' | 'projects' | 'team' | 'login' | 'register' | 'editor';

interface CanvasProps {
    viewMode: ViewMode;
    isLoggedIn: boolean;
    setCurrentUser: (user: User | null) => void;
    canvasView: CanvasView;
    setCanvasView: (view: CanvasView) => void;
    isDarkMode: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ viewMode, isLoggedIn, setCurrentUser, canvasView, setCanvasView, isDarkMode }) => {
    
    const getCanvasWidth = () => {
        switch (viewMode) {
            case ViewMode.Mobile:
                return 'w-[375px]';
            case ViewMode.Tablet:
                return 'w-[768px]';
            case ViewMode.Dock:
            default:
                return 'w-full';
        }
    };
    
    const renderContent = () => {
        switch (canvasView) {
            case 'projects':
                return <ProjectsPage setCanvasView={setCanvasView} isLoggedIn={isLoggedIn} />;
            case 'team':
                return <TeamPage setCanvasView={setCanvasView} />;
            case 'login':
                return <LoginPage setCanvasView={setCanvasView} setCurrentUser={setCurrentUser} />;
            case 'register':
                return <RegisterPage setCanvasView={setCanvasView} setCurrentUser={setCurrentUser} />;
            case 'editor':
                return <EditorPage setCanvasView={setCanvasView} isDarkMode={isDarkMode} />;
            case 'landing':
            default:
                return <LandingPage setCanvasView={setCanvasView} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />;
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-200 dark:bg-canvas-dark overflow-auto">
            <div
                className={`transition-all duration-300 ease-in-out h-full ${getCanvasWidth()}`}
            >
                <div className="bg-white dark:bg-canvas-light rounded-lg shadow-2xl h-full overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Canvas;