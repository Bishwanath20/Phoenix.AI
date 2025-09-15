import React from 'react';
import { TeamMember } from '../../types';
import { UndoIcon } from '../icons';
import { CanvasView } from '../Canvas';

const mockTeam: TeamMember[] = [
    { id: 1, name: 'Aditya', role: 'Project Manager', avatar: 'https://picsum.photos/id/1018/100/100', efficiency: 92 },
    { id: 2, name: 'Himaresh', role: 'Lead Developer', avatar: 'https://picsum.photos/id/1015/100/100', efficiency: 98 },
    { id: 3, name: 'Pavan', role: 'UI/UX Designer', avatar: 'https://picsum.photos/id/1019/100/100', efficiency: 88 },
    { id: 4, name: 'Sushmanth', role: 'Backend Engineer', avatar: 'https://picsum.photos/id/102/100/100', efficiency: 95 },
    { id: 5, name: 'Akash', role: 'QA Tester', avatar: 'https://picsum.photos/id/1021/100/100', efficiency: 85 },
];

interface TeamPageProps {
    setCanvasView: (view: CanvasView) => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ setCanvasView }) => {
    return (
        <div className="p-8 text-gray-800 dark:text-canvas-text-primary">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Team Members</h1>
                <button
                    onClick={() => setCanvasView('landing')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-canvas-lighter dark:hover:bg-canvas-border dark:text-canvas-text-secondary rounded-md font-semibold text-sm transition-colors"
                    aria-label="Back to Dashboard"
                >
                    <UndoIcon className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTeam.map(member => (
                    <div key={member.id} className="bg-white dark:bg-canvas-lighter border border-gray-200 dark:border-canvas-border rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                        <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
                        <h2 className="text-xl font-bold">{member.name}</h2>
                        <p className="text-gray-500 dark:text-canvas-text-secondary mb-4">{member.role}</p>
                        <div className="w-full">
                            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-canvas-text-secondary mb-1">
                                <span>Efficiency</span>
                                <span>{member.efficiency}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-canvas-dark rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${member.efficiency}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamPage;