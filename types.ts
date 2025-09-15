
export enum ViewMode {
  Dock = 'Dock',
  Tablet = 'Tablet',
  Mobile = 'Mobile'
}

export enum PanelTab {
  AIChat = 'AI Chat',
  Code = 'Code',
  Schema = 'Schema'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface Project {
  id: number;
  name: string;
  lastUpdated: string;
  status: 'In Progress' | 'Completed' | 'Archived';
  tasks: Task[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  efficiency: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
