
import React, { createContext, useState, ReactNode } from 'react';

interface EditorComponent {
    id: string;
    type: string;
}

interface EditorContextType {
    components: EditorComponent[];
    addComponent: (type: string) => void;
    clearComponents: () => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
    children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [components, setComponents] = useState<EditorComponent[]>([]);

    const addComponent = (type: string) => {
        const newComponent: EditorComponent = {
            id: `${type}-${Date.now()}`,
            type: type,
        };
        setComponents(prev => [...prev, newComponent]);
    };

    const clearComponents = () => {
        setComponents([]);
    };

    return (
        <EditorContext.Provider value={{ components, addComponent, clearComponents }}>
            {children}
        </EditorContext.Provider>
    );
};
