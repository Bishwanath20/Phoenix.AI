
import React from 'react';
import { CircleStackIcon } from './icons';

interface SchemaField {
    name: string;
    type: string;
    description: string;
    isKey?: boolean;
}

interface SchemaTableProps {
    name: string;
    fields: SchemaField[];
}

const SchemaTable: React.FC<SchemaTableProps> = ({ name, fields }) => (
    <div className="bg-white dark:bg-canvas-lighter rounded-lg border border-gray-200 dark:border-canvas-border overflow-hidden">
        <h4 className="text-lg font-bold p-3 bg-gray-50 dark:bg-canvas-dark border-b border-gray-200 dark:border-canvas-border text-canvas-primary">{name}</h4>
        <div className="divide-y divide-gray-200 dark:divide-canvas-border">
            {fields.map(field => (
                <div key={field.name} className="p-3 grid grid-cols-3 gap-2 items-start">
                    <div className="font-mono text-sm text-gray-800 dark:text-canvas-text-primary col-span-1">
                        {field.name} {field.isKey && <span className="text-yellow-400 ml-1">🔑</span>}
                    </div>
                    <div className="font-mono text-sm text-blue-500 dark:text-blue-400 col-span-1">{field.type}</div>
                    <div className="text-xs text-gray-500 dark:text-canvas-text-secondary col-span-1">{field.description}</div>
                </div>
            ))}
        </div>
    </div>
);


const SchemaView: React.FC = () => {
    const usersTable: SchemaField[] = [
        { name: 'id', type: 'UUID', description: 'Primary key for the user.', isKey: true },
        { name: 'email', type: 'VARCHAR(255)', description: 'User\'s unique email address.' },
        { name: 'password_hash', type: 'TEXT', description: 'Hashed password for authentication.' },
        { name: 'created_at', type: 'TIMESTAMPTZ', description: 'Timestamp of user creation.' },
    ];

    const projectsTable: SchemaField[] = [
        { name: 'id', type: 'UUID', description: 'Primary key for the project.', isKey: true },
        { name: 'name', type: 'VARCHAR(255)', description: 'The name of the project.' },
        { name: 'owner_id', type: 'UUID', description: 'Foreign key to the users table.' },
        { name: 'created_at', type: 'TIMESTAMPTZ', description: 'Timestamp of project creation.' },
    ];

    const tasksTable: SchemaField[] = [
        { name: 'id', type: 'UUID', description: 'Primary key for the task.', isKey: true },
        { name: 'project_id', type: 'UUID', description: 'Foreign key to the projects table.' },
        { name: 'title', type: 'VARCHAR(255)', description: 'The title of the task.' },
        { name: 'status', type: 'ENUM', description: 'e.g., "todo", "in_progress", "done"' },
        { name: 'due_date', type: 'DATE', description: 'When the task is due.' },
    ];

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center gap-2 text-gray-900 dark:text-canvas-text-primary">
                <CircleStackIcon className="w-5 h-5" />
                <h3 className="font-semibold">Database Schema</h3>
            </div>
            <SchemaTable name="Users" fields={usersTable} />
            <SchemaTable name="Projects" fields={projectsTable} />
            <SchemaTable name="Tasks" fields={tasksTable} />
        </div>
    );
};

export default SchemaView;