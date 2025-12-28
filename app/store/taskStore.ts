import { create } from "zustand";
import { Task, FilterType, SortType } from "../utils/type";
import { addTask, deleteTask, fetchTasks, updateTask } from "../utils/mockApi";

interface TaskStoreProps {
    tasks: Task[];
    filter: FilterType;
    sort: SortType;
    search: string;
    loading: boolean;
    error: string | null;
    loadTask: () => void;
    addNewTask: (title: string, dueDate: string) => void;
    editTask: (editedTask: Task) => void;
    removeTask: (id: number) => void;
    setFilter: (filter: FilterType) => void;
    setSort: (sort: SortType) => void;
    setSearch: (search: string) => void;
}

const useTaskStore = create<TaskStoreProps>((set) => ({
    tasks: [],
    filter: 'All',
    sort: null,
    search: '',
    loading: true,
    error: null,

    //actions
    loadTask: () => {
        try {
            const tasks = fetchTasks();
            set({ tasks, loading: false });
        } catch (error) {
            set({ error: "Couldn't load tasks", loading: false });
        }
    },
    addNewTask: (title, dueDate) => {
        try {
            const addedTask = addTask(title, dueDate);
            set((state) => ({ tasks: [...state.tasks, addedTask] }))
        } catch (error) {
            set({ error: 'Failed to add task' });
        }
    },
    editTask: (editedTask) => {
        try {
            updateTask(editedTask);
            set((state) => ({
                tasks: state.tasks.map((taskItem) => taskItem.id === editedTask.id ? editedTask : taskItem)
            }))
        } catch (error) {
            set({ error: 'Update failed' });
        }
    },
    removeTask: (id) => {
        try {
            deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((taskItem) => taskItem.id !== id)
            }))
        } catch (error) {
            set({ error: 'Delete failed' });
        }
    },
    setFilter: (filter) => set({ filter }),
    setSort: (sort) => set({ sort }),
    setSearch: (search) => set({ search }),
}))