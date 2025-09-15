import React from 'react';
import { CanvasView } from '../Canvas';
import { User } from '../../types';

interface LandingPageProps {
    setCanvasView: (view: CanvasView) => void;
    isLoggedIn: boolean;
    setCurrentUser: (user: User | null) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCanvasView, isLoggedIn, setCurrentUser }) => {
    const handleNavigateToLogin = () => {
        setCanvasView('login');
    };

    const handleSignOut = () => {
        setCurrentUser(null);
    };

    const handleTryUs = () => {
        if (isLoggedIn) {
            setCanvasView('projects');
        } else {
            setCanvasView('login');
        }
    };
    
    return (
        <div className="min-h-full flex flex-col text-gray-800 dark:text-canvas-text-primary">
            <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-canvas-border">
                <div className="flex items-center">
                    <span className="text-2xl font-bold">Smart Canvas</span>
                </div>
                <nav className="flex items-center gap-8 text-gray-600 dark:text-canvas-text-secondary font-medium">
                    <a href="#" onClick={(e) => { e.preventDefault(); setCanvasView('landing'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCanvasView('projects'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Projects</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCanvasView('team'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Team</a>
                </nav>
                {isLoggedIn ? (
                     <button onClick={handleSignOut} className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                        Sign Out
                    </button>
                ) : (
                    <button onClick={handleNavigateToLogin} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Sign In
                    </button>
                )}
            </header>
            <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="main-container">
                    <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Simplify your workflow.
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl text-gray-600 dark:text-canvas-text-secondary italic">
                        “Projects without the chaos. Teamwork without the headache. Productivity without the burnout.”
                    </p>
                    <div className="mt-10 text-lg text-gray-700 dark:text-canvas-text-secondary">
                        We debug so you don't have to — common, 
                        <button 
                            onClick={handleTryUs}
                            className="ml-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Try us
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;