import React, { useState } from 'react';
import { CanvasView } from '../Canvas';
import { User } from '../../types';
import { register } from '../../services/authService';

interface RegisterPageProps {
    setCanvasView: (view: CanvasView) => void;
    setCurrentUser: (user: User) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setCanvasView, setCurrentUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const newUser = await register(name, email, password);
            setCurrentUser(newUser);
            setCanvasView('landing');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-canvas-light text-gray-800 dark:text-canvas-text-primary p-8">
            <div className="max-w-md w-full">
                <div className="flex items-center justify-center mb-8">
                    <span className="text-2xl font-bold">Smart Canvas</span>
                </div>
                <div className="bg-white dark:bg-canvas-dark p-8 rounded-xl shadow-md border border-gray-200 dark:border-canvas-border">
                    <h2 className="text-2xl font-bold text-center mb-1">Create an Account</h2>
                    <p className="text-center text-gray-500 dark:text-canvas-text-secondary mb-6">Join Smart Canvas to start building.</p>
                    <form onSubmit={handleRegister} className="space-y-6">
                        {error && (
                            <div className="bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-md text-sm" role="alert">
                                {error}
                            </div>
                        )}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-canvas-text-secondary">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-canvas-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-canvas-text-secondary">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-canvas-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-canvas-text-secondary">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-canvas-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-transparent disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
                 <p className="mt-6 text-center text-sm text-gray-500 dark:text-canvas-text-secondary">
                    Already have an account?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setCanvasView('login'); }} className="font-medium text-blue-600 hover:text-blue-500 dark:hover:text-blue-400">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;