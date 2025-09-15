
import React, { useContext, useState } from 'react';
import { CanvasView } from '../Canvas';
import { EditorContext } from '../../contexts/EditorContext';
import { generateHtml } from '../../services/htmlGenerator';
import { UndoIcon, RocketLaunchIcon, FlexboxIcon, SidebarIcon, UserIcon, DocumentIcon, FileUploadIcon } from '../icons';

const componentIcons: { [key: string]: React.FC<{className?: string}> } = {
    'Flexbox': FlexboxIcon,
    'Sidebar': SidebarIcon,
    'LoginForm': UserIcon,
    'ContactForm': DocumentIcon,
    'FileUpload': FileUploadIcon,
};


const DeploymentModal: React.FC<{ onClose: () => void; deployedUrl: string | null; }> = ({ onClose, deployedUrl }) => {
    const [status, setStatus] = useState<'deploying' | 'success'>('deploying');

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('success');
        }, 2500); // Simulate deployment
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-canvas-light rounded-lg shadow-xl p-8 max-w-md w-full text-gray-800 dark:text-canvas-text-primary text-center">
                {status === 'deploying' ? (
                    <>
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold mb-2">Deployment in Progress...</h2>
                        <p className="text-gray-600 dark:text-canvas-text-secondary">Your project is being built and deployed. Please wait a moment.</p>
                    </>
                ) : (
                     <>
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Deployment Successful!</h2>
                        <p className="text-gray-600 dark:text-canvas-text-secondary mb-4">Your project has been generated.</p>
                        <div className="bg-gray-100 dark:bg-canvas-dark p-2 rounded-md text-sm break-all mb-6">
                            {deployedUrl ? (
                                <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                                    Click here to view your deployed page
                                </a>
                            ) : (
                                <span className="text-red-500">Could not generate URL.</span>
                            )}
                        </div>
                        <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 w-full">
                            Done
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};


const EditorPage: React.FC<{ setCanvasView: (view: CanvasView) => void; isDarkMode: boolean; }> = ({ setCanvasView, isDarkMode }) => {
    const editorContext = useContext(EditorContext);
    const [showDeployModal, setShowDeployModal] = useState(false);
    const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

    if (!editorContext) return <div>Error: Editor context not found.</div>;
    const { components, clearComponents } = editorContext;

    const handleExitEditor = () => {
        clearComponents();
        setCanvasView('projects');
    };

    const handleDeploy = () => {
        const theme = isDarkMode ? 'dark' : 'light';
        const componentTypes = components.map(c => c.type);
        const htmlString = generateHtml(componentTypes, theme);
        const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlString);
        
        setDeployedUrl(dataUrl);
        setShowDeployModal(true);
    };

    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-canvas-dark text-gray-800 dark:text-canvas-text-primary">
            {showDeployModal && <DeploymentModal onClose={() => setShowDeployModal(false)} deployedUrl={deployedUrl} />}
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-canvas-border bg-white dark:bg-canvas-light shrink-0">
                <h1 className="text-xl font-bold">Project Editor</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExitEditor}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-canvas-lighter dark:hover:bg-canvas-border dark:text-canvas-text-secondary rounded-md font-semibold text-sm transition-colors"
                    >
                        <UndoIcon className="w-4 h-4" /> Exit Editor
                    </button>
                    <button 
                        onClick={handleDeploy}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold text-sm transition-colors"
                    >
                        <RocketLaunchIcon className="w-4 h-4" /> Deploy Project
                    </button>
                </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto bg-gray-200 dark:bg-canvas-dark">
                <div className="bg-white/70 dark:bg-canvas-light/70 backdrop-blur-sm border border-gray-200 dark:border-canvas-border rounded-lg min-h-full p-4 space-y-4 shadow-inner">
                    {components.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-canvas-text-secondary">
                            <p>Click components from the library on the left to add them here.</p>
                        </div>
                    ) : (
                        components.map(comp => {
                             const Icon = componentIcons[comp.type] || DocumentIcon;
                             return (
                                <div key={comp.id} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center gap-4 text-slate-800 dark:text-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                   <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-md">
                                     <Icon className="w-8 h-8 text-slate-600 dark:text-slate-400 shrink-0" />
                                   </div>
                                   <div className="flex-1">
                                    <p className="font-bold">{comp.type}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Component added to canvas</p>
                                   </div>
                                </div>
                             )
                        })
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditorPage;