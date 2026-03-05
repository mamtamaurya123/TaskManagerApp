import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import uuid from "react-native-uuid";
import { Task, TaskState, TaskStatus, TaskPriority } from "../types";
import StorageService from "../services/StorageService";
import { CONSTANTS_DATA, STORAGE_KEYS } from "../constants";

// Action Task
type TaskAction =
  | { type: "LOAD_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "SET_FILTER"; payload: TaskStatus | "all" }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

//Initial State
const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  filter: "all",
  searchQuery: "",
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case CONSTANTS_DATA.LOAD_TASKS:
      return { ...state, tasks: action.payload, isLoading: false };
    case CONSTANTS_DATA.ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case CONSTANTS_DATA.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case CONSTANTS_DATA.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case CONSTANTS_DATA.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload
            ? {
                ...t,
                status:
                  t.status === CONSTANTS_DATA.completed
                    ? CONSTANTS_DATA.pending
                    : CONSTANTS_DATA.completed,
                updatedAt: new Date().toISOString(),
              }
            : t,
        ),
      };
    case CONSTANTS_DATA.SET_FILTER:
      return { ...state, filter: action.payload };
    case CONSTANTS_DATA.SET_SEARCH:
      return { ...state, searchQuery: action.payload };
    case CONSTANTS_DATA.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

//Context
interface TaskContextType {
  state: TaskState;
  addTask: (
    data: Omit<Task, "id" | "createdAt" | "updatedAt" | "status">,
  ) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  setFilter: (filter: TaskStatus | "all") => void;
  setSearch: (query: string) => void;
  getFilteredTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | null>(null);

// Provider
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load on mount
  useEffect(() => {
    (async () => {
      dispatch({ type: CONSTANTS_DATA.SET_LOADING, payload: true });
      const stored = await StorageService.get<Task[]>(STORAGE_KEYS.TASKS);
      dispatch({ type: CONSTANTS_DATA.LOAD_TASKS, payload: stored ?? [] });
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (!state.isLoading) {
      StorageService.set(STORAGE_KEYS.TASKS, state.tasks);
    }
  }, [state.tasks, state.isLoading]);

  const addTask = useCallback(
    async (data: Omit<Task, "id" | "createdAt" | "updatedAt" | "status">) => {
      dispatch({
        type: CONSTANTS_DATA.ADD_TASK,
        payload: {
          ...data,
          id: uuid.v4() as string,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    },
    [],
  );

  const updateTask = useCallback(async (task: Task) => {
    dispatch({
      type: CONSTANTS_DATA.UPDATE_TASK,
      payload: { ...task, updatedAt: new Date().toISOString() },
    });
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    dispatch({ type: CONSTANTS_DATA.DELETE_TASK, payload: id });
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    dispatch({ type: CONSTANTS_DATA.TOGGLE_TASK, payload: id });
  }, []);

  const setFilter = useCallback((filter: TaskStatus | "all") => {
    dispatch({ type: CONSTANTS_DATA.SET_FILTER, payload: filter });
  }, []);

  const setSearch = useCallback((query: string) => {
    dispatch({ type: CONSTANTS_DATA.SET_SEARCH, payload: query });
  }, []);

  // Derived list
  const getFilteredTasks = useCallback((): Task[] => {
    let list = [...state.tasks];
    if (state.filter !== "all")
      list = list.filter((t) => t.status === state.filter);
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }
    const order: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };
    return list.sort(
      (a, b) =>
        order[a.priority] - order[b.priority] ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [state.tasks, state.filter, state.searchQuery]);

  return (
    <TaskContext.Provider
      value={{
        state,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        setFilter,
        setSearch,
        getFilteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook
export const useTaskStore = (): TaskContextType => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error(CONSTANTS_DATA.ErrorTextt);
  return ctx;
};
