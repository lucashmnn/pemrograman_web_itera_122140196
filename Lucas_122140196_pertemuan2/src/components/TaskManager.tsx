
import { useState, useEffect } from "react";
import { Task, taskManager } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateId } from "@/lib/utils";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadedTasks = taskManager.getAll();
    setTasks(loadedTasks);
  }, []);
  
  // Add new task
  const addTask = () => {
    if (!newTaskTitle) return;
    
    const task: Task = {
      id: generateId(),
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate || undefined,
      priority: newTaskPriority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // Update state and localStorage
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    taskManager.add(task);
    
    // Reset form
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority("medium");
    setNewTaskDueDate("");
  };
  
  // Toggle task completion status
  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        taskManager.update(updatedTask);
        return updatedTask;
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };
  
  // Delete task
  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    taskManager.delete(id);
  };
  
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Title:</label>
              <Input 
                placeholder="Enter task title" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Description:</label>
              <Input 
                placeholder="Task description (optional)" 
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Priority:</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 text-sm">Due Date:</label>
                <Input 
                  type="date" 
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
              </div>
            </div>
            
            <Button onClick={addTask} className="w-full">
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <h2 className="font-bold mb-4">Task List</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center py-6 border rounded bg-white">
          <p>No tasks yet. Add your first task!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`p-4 border rounded ${task.completed ? 'bg-gray-100' : 'bg-white'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                  
                  <div className="text-xs mt-2">
                    {task.dueDate && (
                      <span className="mr-2">Deadline: {new Date(task.dueDate).toLocaleDateString()}</span>
                    )}
                    
                    <span className={`px-2 py-1 rounded text-white ${
                      task.priority === 'high' ? 'bg-red-500' : 
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      {task.priority === 'high' ? 'High' : 
                       task.priority === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`mr-2 px-2 py-1 rounded text-white ${task.completed ? 'bg-gray-500' : 'bg-green-500'}`}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManager;
