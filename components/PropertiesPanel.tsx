import React from 'react';
import { SettingsIcon } from './icons';

const PropertiesPanel: React.FC = () => {
    return (
        <aside className="hidden lg:flex w-96 bg-white dark:bg-canvas-light border-l border-gray-200 dark:border-canvas-border flex-col shrink-0 p-4">
            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-canvas-text-primary">
                <SettingsIcon className="w-5 h-5" />
                <h3 className="font-semibold">Properties</h3>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-canvas-dark rounded-md flex items-center justify-center">
                <p className="text-gray-500 dark:text-canvas-text-secondary text-sm">Select a component to see its properties.</p>
            </div>
        </aside>
    );
};

export default PropertiesPanel;