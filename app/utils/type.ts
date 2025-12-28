export interface Task {
    id: number;
    title: string;
    dueDate: string; 
    status: 'Pending' | 'Completed';
  }
  
  export type FilterType = 'All' | 'Completed' | 'Pending';
  export type SortType = 'name' | 'date' | null;