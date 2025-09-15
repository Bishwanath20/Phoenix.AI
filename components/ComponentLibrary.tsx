import React, { useContext } from 'react';
import { EditorContext } from '../contexts/EditorContext';
import { SearchIcon, FlexboxIcon, SidebarIcon, UserIcon, DocumentIcon, FileUploadIcon } from './icons';

interface ComponentItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isEnabled: boolean;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ icon, label, onClick, isEnabled }) => (
    <div 
        onClick={isEnabled ? onClick : undefined}
        className={`flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-canvas-lighter rounded-lg p-4 transition-all ${
            isEnabled 
                ? 'cursor-pointer hover:bg-canvas-primary hover:text-white group' 
                : 'cursor-grab'
        }`}
    >
        {icon}
        <span className={`text-sm text-gray-500 dark:text-canvas-text-secondary ${isEnabled ? 'group-hover:text-white' : ''}`}>{label}</span>
    </div>
);

interface ComponentLibraryProps {
    isInEditor: boolean;
}

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ isInEditor }) => {
    const editorContext = useContext(EditorContext);
    
    if (!editorContext) return null;
    const { addComponent } = editorContext;

    const components = [
        { type: 'Layout', items: [
            { label: 'Flexbox', icon: <FlexboxIcon className="w-8 h-8 text-gray-400 dark:text-canvas-text-secondary group-hover:text-white transition-colors" /> },
            { label: 'Sidebar', icon: <SidebarIcon className="w-8 h-8 text-gray-400 dark:text-canvas-text-secondary group-hover:text-white transition-colors" /> },
        ]},
        { type: 'Forms', items: [
            { label: 'LoginForm', icon: <UserIcon className="w-8 h-8 text-gray-400 dark:text-canvas-text-secondary group-hover:text-white transition-colors" /> },
            { label: 'ContactForm', icon: <DocumentIcon className="w-8 h-8 text-gray-400 dark:text-canvas-text-secondary group-hover:text-white transition-colors" /> },
            { label: 'FileUpload', icon: <FileUploadIcon className="w-8 h-8 text-gray-400 dark:text-canvas-text-secondary group-hover:text-white transition-colors" /> },
        ]},
    ];

    return (
        <aside className="hidden lg:flex w-72 bg-white dark:bg-canvas-light border-r border-gray-200 dark:border-canvas-border p-4 flex-col gap-6 shrink-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-canvas-text-primary">Component Library</h2>
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-canvas-text-secondary" />
                <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full bg-gray-100 dark:bg-canvas-dark border border-gray-300 dark:border-canvas-border rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-canvas-primary"
                />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto">
                {components.map(group => (
                    <div key={group.type}>
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-canvas-text-secondary uppercase mb-2">{group.type}</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {group.items.map(item => (
                                <ComponentItem 
                                    key={item.label} 
                                    icon={item.icon} 
                                    label={item.label}
                                    isEnabled={isInEditor}
                                    onClick={() => addComponent(item.label)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default ComponentLibrary;