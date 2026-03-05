export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  filter: TaskStatus | 'all';
  searchQuery: string;
}

// Navigation param types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  TasksTab: undefined;
  ProfileTab: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  AddEditTask: { taskId?: string };
};
