
import { useState } from 'react';
import TaskManager from './TaskManager';
import ScheduleManager from './ScheduleManager';
import NoteManager from './NoteManager';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('tasks');
  
  return (
    <div className="min-h-screen bg-white p-4">
      <div>
        <button 
          onClick={() => setActiveTab('tasks')} 
          className={`px-3 py-2 ${activeTab === 'tasks' ? 'font-bold' : ''}`}
        >
          Tasks
        </button>
        <button 
          onClick={() => setActiveTab('schedule')} 
          className={`px-3 py-2 ${activeTab === 'schedule' ? 'font-bold' : ''}`}
        >
          Schedule
        </button>
        <button 
          onClick={() => setActiveTab('notes')} 
          className={`px-3 py-2 ${activeTab === 'notes' ? 'font-bold' : ''}`}
        >
          Notes
        </button>
      </div>
      
      <div className="mt-4">
        {activeTab === 'tasks' && <TaskManager />}
        {activeTab === 'schedule' && <ScheduleManager />}
        {activeTab === 'notes' && <NoteManager />}
      </div>
    </div>
  );
};

export default Dashboard;
