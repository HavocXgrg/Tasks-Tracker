import { Task } from "./type";

const STORAGE_KEY = "tasks";

const getStoredTasks = (): Task[] => {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.log("couldn't retrieve data", error);
        localStorage.removeItem(STORAGE_KEY); //to remove corrupted data
        return [];
    }
};

const saveTasks = (task: Task[]) => {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
        } catch (error) {
            console.log("couldn't save the data", error);
        }
    }
};

export const fetchTasks = (): Task[] => getStoredTasks();

export const addTask = (title: string, dueDate: string) => {
    const newTask: Task = {
        id: Date.now(),
        title,
        dueDate,
        status: "Pending",
    };
    saveTasks([...getStoredTasks(), newTask]);
    return newTask;
};

export const updateTask = (editedTask: Task): void => {
    const tasks = getStoredTasks().map(task => task.id === editedTask.id ? editedTask : task);
    saveTasks(tasks);
}
export const deleteTask = (id: number): void => {
    saveTasks(getStoredTasks().filter(task => task.id !== id));
};