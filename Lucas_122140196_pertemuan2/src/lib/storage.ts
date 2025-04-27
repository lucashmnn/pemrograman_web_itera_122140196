
export class StorageManager<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  getAll = (): T[] => {
    const items = localStorage.getItem(this.key);
    return items ? JSON.parse(items) : [];
  };

  add = (item: T): void => {
    const items = this.getAll();
    localStorage.setItem(this.key, JSON.stringify([...items, item]));
  };

  update = (updatedItem: T & { id: string }): void => {
    const items = this.getAll();
    const updatedItems = items.map((item: any) => 
      item.id === updatedItem.id ? updatedItem : item
    );
    localStorage.setItem(this.key, JSON.stringify(updatedItems));
  };

  delete = (id: string): void => {
    const items = this.getAll();
    const filteredItems = items.filter((item: any) => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(filteredItems));
  };

  clear = (): void => {
    localStorage.removeItem(this.key);
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ClassSchedule {
  id: string;
  title: string;
  location: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export const taskManager = new StorageManager<Task>('tasks');
export const scheduleManager = new StorageManager<ClassSchedule>('schedule');
export const noteManager = new StorageManager<Note>('notes');
