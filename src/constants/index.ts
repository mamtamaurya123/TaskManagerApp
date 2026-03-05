export const STORAGE_KEYS = {
  TASKS: "@TaskManager:tasks",
  USER: "@TaskManager:user",
} as const;

export const CONSTANTS_DATA = {
  TASKSFLOW: "TaskFlow",
  MyTasks: "My Tasks",
  TaskList: "TaskList",
  TaskDetail: "TaskDetail",
  TaskDetails: "TaskDetails",
  AddEditTask: "AddEditTask",
  Add: "Add",
  New_Task: "New Task",
  TasksTab: "TasksTab",
  Tasks: "Tasks",
  ProfileTab: "ProfileTab",
  InvalidText: "Invalid username or password",
  ErrorText: "useAuth must be used within AuthProvider",
  ErrorTextt: "useTaskStore must be used within TaskProvider",
  SET_SEARCH: "SET_SEARCH",
  SET_FILTER: "SET_FILTER",
  TOGGLE_TASK: "TOGGLE_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  ADD_TASK: "ADD_TASK",
  SET_LOADING: "SET_LOADING",
  LOAD_TASKS: "LOAD_TASKS",
  completed: "completed",
  pending: "pending",
  All: "All",
  Done: "Done",
  Pending: "Pending",
  SearchText: "Search tasks...",
  No_results_found: "No results found",
  No_tasks_yet: "No tasks yet",
  Try_a_different_keyword: "Try a different keyword",
  Tap: 'Tap "+ Add" to create your first task',
  Create_Task: "+ Create Task",
  all: "all",
  Heyy: "Hey ,",
  Cancel: "Cancel",
  Delete: "Delete",
  Organize: " Organize your day, your way",
  Title: "Title is required",
  Min_5: "Min 5 characters",
  Max_100: "Max 100 characters",
  Max_500: "Max 500 characters",
  Edit_Task: "Edit Task",
  UpdateTask: "Update Task",
  CreateTask: "Create Task",
  EG: "e.g. March 10, 2026",
  Due: "Due Date (optional)",
  Priority: "Priority",
  ADD_Details: "Add details (optional)",
  Description: "Description",
  What: "What needs to be done?",
  Taskk: "Task Title *",
  Sign_Out:"Sign Out",
  COMP:"Completion Rate",
  TaskPriorty:"Tasks by Priority",
  High:"High",
  Medium:"Medium",
  Low:"Low",
  Total:"Total",
  Welcome:"Welcome back",
  Sign:"Sign in to continue",
  Username:"Username",
  Password:"Password",
  Signin:"Sign In",
  Demo:"Demo:"
} as const;

export const DUMMY_CREDENTIALS = {
  username: "admin",
  password: "admin123",
} as const;

export const DUMMY_USER = {
  id: "usr_001",
  username: "admin",
  name: "Mamta Maurya",
};

export const PRIORITY_CONFIG = {
  low: {
    label: "Low",
    color: "#10B981",
    bgColor: "#F0FDF4",
    icon: "arrow-down" as const,
  },
  medium: {
    label: "Medium",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    icon: "remove" as const,
  },
  high: {
    label: "High",
    color: "#EF4444",
    bgColor: "#FEF2F2",
    icon: "arrow-up" as const,
  },
} as const;

export const COLORS = {
  primary: "#6C63FF",
  primaryDark: "#5A52D5",
  primaryLight: "#EEF0FF",
  secondary: "#FF6584",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  background: "#F8F9FE",
  card: "#FFFFFF",
  text: "#1A1A2E",
  textSecondary: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  black: "#000",
  cream: "#DCFCE7",
  yellow: "#FEF9C3",
  lightcream:'#FECACA',
  offwhite: '#FFF0F0',
} as const;

export const FONT_WEIGHT = {
  bold_700: 700,
  bold_800: 800,
  bold_600: 600,
  bold_500: 500,
} as const;
export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 20,
  xl: 30,
  full: 999,
} as const;
