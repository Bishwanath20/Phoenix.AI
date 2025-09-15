import React, { useState, useEffect } from 'react';
import { Project, Task } from '../../types';
import { UndoIcon, PlusIcon, TrashIcon } from '../icons';
import { CanvasView } from '../Canvas';

const initialProjects: Project[] = [
    { id: 1, name: 'Smart Canvas UI Overhaul', lastUpdated: '2 hours ago', status: 'In Progress', tasks: [
        { id: 1, text: 'Design new dashboard layout', completed: true },
        { id: 2, text: 'Implement dark mode toggle', completed: false },
        { id: 3, text: 'Create reusable button component', completed: true },
    ]},
    { id: 2, name: 'API Integration for Analytics', lastUpdated: '1 day ago', status: 'In Progress', tasks: [] },
    { id: 3, name: 'Mobile App Wireframes', lastUpdated: '3 days ago', status: 'Completed', tasks: [] },
];

const getStatusColor = (status: Project['status']) => {
    switch (status) {
        case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'Archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300';
    }
};

interface ProjectsPageProps {
    setCanvasView: (view: CanvasView) => void;
    isLoggedIn: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setCanvasView, isLoggedIn }) => {
    const [projects, setProjects] = useState<Project[]>(() => {
        try {
            const savedProjects = localStorage.getItem('smartCanvasProjects');
            // If there's nothing saved, seed with initial data, otherwise parse saved data.
            return savedProjects ? JSON.parse(savedProjects) : initialProjects;
        } catch (error) {
            console.error("Failed to parse projects from localStorage", error);
            return initialProjects; // Fallback to initial data on error
        }
    });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem('smartCanvasProjects', JSON.stringify(projects));
        } catch (error) {
            console.error("Failed to save projects to localStorage", error);
        }
    }, [projects]);


    const handleCreateProject = () => {
        const newProject: Project = {
            id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
            name: `New Project ${projects.length + 1}`,
            lastUpdated: 'Just now',
            status: 'In Progress',
            tasks: [],
        };
        setProjects(prev => [newProject, ...prev]);
        setSelectedProject(newProject);
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim() || !selectedProject) return;
        const task: Task = { id: Date.now(), text: newTask, completed: false };
        const updatedProjects = projects.map(p => 
            p.id === selectedProject.id ? { ...p, tasks: [...p.tasks, task], lastUpdated: 'Just now' } : p
        );
        setProjects(updatedProjects);
        setSelectedProject(prev => prev ? { ...prev, tasks: [...prev.tasks, task], lastUpdated: 'Just now' } : null);
        setNewTask('');
    };

    const handleToggleTask = (taskId: number) => {
        if (!selectedProject) return;
        const updatedTasks = selectedProject.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const updatedProjects = projects.map(p => p.id === selectedProject.id ? { ...p, tasks: updatedTasks, lastUpdated: 'Just now' } : p);
        setProjects(updatedProjects);
        setSelectedProject(prev => prev ? { ...prev, tasks: updatedTasks } : null);
    };

    const handleDeleteTask = (taskId: number) => {
         if (!selectedProject) return;
        const updatedTasks = selectedProject.tasks.filter(t => t.id !== taskId);
        const updatedProjects = projects.map(p => p.id === selectedProject.id ? { ...p, tasks: updatedTasks, lastUpdated: 'Just now' } : p);
        setProjects(updatedProjects);
        setSelectedProject(prev => prev ? { ...prev, tasks: updatedTasks } : null);
    };

    // Render Project Detail View (Tasks)
    if (selectedProject) {
        return (
            <div className="p-8 text-gray-800 dark:text-canvas-text-primary h-full flex flex-col">
                <div className="flex items-start justify-between mb-6 shrink-0">
                    <div>
                        <button onClick={() => setSelectedProject(null)} className="text-sm text-gray-500 dark:text-canvas-text-secondary hover:text-gray-800 dark:hover:text-white mb-2 flex items-center gap-1">
                            <UndoIcon className="w-4 h-4" /> All Projects
                        </button>
                        <h1 className="text-3xl font-bold">{selectedProject.name}</h1>
                    </div>
                    <button
                        onClick={() => setCanvasView('editor')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Open Editor
                    </button>
                </div>
                <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-canvas-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                    />
                    <button type="submit" className="bg-gray-800 dark:bg-canvas-primary text-white p-2 rounded-md hover:bg-gray-900 dark:hover:bg-canvas-primary-dark">
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </form>
                <div className="flex-1 overflow-y-auto space-y-2">
                    {selectedProject.tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-50 dark:bg-canvas-dark p-3 rounded-md">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)} className="w-5 h-5 text-blue-600 rounded border-gray-300 dark:border-canvas-border focus:ring-blue-500 bg-gray-100 dark:bg-canvas-lighter" />
                                <span className={`${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>{task.text}</span>
                            </div>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                     {selectedProject.tasks.length === 0 && (
                        <p className="text-center text-gray-500 dark:text-canvas-text-secondary pt-8">No tasks yet. Add one above to get started!</p>
                    )}
                </div>
            </div>
        );
    }
    
    // Render Project List View
    return (
        <div className="p-8 text-gray-800 dark:text-canvas-text-primary h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <h1 className="text-3xl font-bold">Projects</h1>
                <button
                    onClick={() => setCanvasView('landing')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-canvas-lighter dark:hover:bg-canvas-border dark:text-canvas-text-secondary rounded-md font-semibold text-sm transition-colors"
                >
                    <UndoIcon className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>
            {projects.length > 0 ? (
                <div className="rounded-lg border border-gray-200 dark:border-canvas-border overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-canvas-dark border-b border-gray-200 dark:border-canvas-border">
                            <tr>
                                <th className="p-4 font-semibold">Project Name</th>
                                <th className="p-4 font-semibold">Last Updated</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} onClick={() => setSelectedProject(project)} className="border-b dark:border-canvas-border last:border-b-0 hover:bg-gray-50 dark:hover:bg-canvas-lighter cursor-pointer">
                                    <td className="p-4 font-medium">{project.name}</td>
                                    <td className="p-4 text-gray-600 dark:text-canvas-text-secondary">{project.lastUpdated}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="max-w-md">
                        <p className="text-2xl text-gray-600 dark:text-canvas-text-secondary mb-8">
                            You don't have any projects yet.
                        </p>
                        <button
                            onClick={handleCreateProject}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            Create Your First Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsPage;