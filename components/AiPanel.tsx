import React from 'react';
import { PanelTab } from '../types';
import AiChat from './AiChat';
import CodeView from './CodeView';
import SchemaView from './SchemaView';

interface AiPanelProps {
    activeTab: PanelTab;
    setActiveTab: (tab: PanelTab) => void;
}

const AiPanel: React.FC<AiPanelProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [PanelTab.AIChat, PanelTab.Code, PanelTab.Schema];
    
    const renderContent = () => {
        switch (activeTab) {
            case PanelTab.Code:
                return <CodeView />;
            case PanelTab.Schema:
                return <SchemaView />;
            case PanelTab.AIChat:
            default:
                return <AiChat />;
        }
    };

    return (
        <aside className="hidden lg:flex w-96 bg-white dark:bg-canvas-light border-l border-gray-200 dark:border-canvas-border flex-col shrink-0">
            <div className="flex items-center border-b border-gray-200 dark:border-canvas-border">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${
                            activeTab === tab 
                                ? 'text-gray-900 dark:text-canvas-text-primary' 
                                : 'text-gray-500 dark:text-canvas-text-secondary hover:text-gray-800 dark:hover:text-canvas-text-primary'
                        }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-canvas-primary"></div>
                        )}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </aside>
    );
};

export default AiPanel;