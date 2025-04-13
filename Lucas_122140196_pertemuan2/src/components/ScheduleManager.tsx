
import { useState, useEffect } from "react";
import { ClassSchedule, scheduleManager } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateId, weekdays } from "@/lib/utils";

const ScheduleManager = () => {
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [newClass, setNewClass] = useState({
    title: "",
    location: "",
    day: "Monday",
    startTime: "",
    endTime: ""
  });
  
  // Load schedules from localStorage on component mount
  useEffect(() => {
    const loadedSchedules = scheduleManager.getAll();
    setSchedules(loadedSchedules);
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClass({
      ...newClass,
      [name]: value
    });
  };
  
  // Add new schedule
  const addClass = () => {
    if (!newClass.title || !newClass.startTime || !newClass.endTime) return;
    
    const schedule: ClassSchedule = {
      id: generateId(),
      title: newClass.title,
      location: newClass.location,
      day: newClass.day,
      startTime: newClass.startTime,
      endTime: newClass.endTime
    };
    
    // Update state and localStorage
    const updatedSchedules = [...schedules, schedule];
    setSchedules(updatedSchedules);
    scheduleManager.add(schedule);
    
    // Reset form
    setNewClass({
      title: "",
      location: "",
      day: "Monday",
      startTime: "",
      endTime: ""
    });
  };
  
  // Delete schedule
  const deleteSchedule = (id: string) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(updatedSchedules);
    scheduleManager.delete(id);
  };
  
  // Group schedules by day
  const schedulesByDay = weekdays.map(day => {
    return {
      day,
      classes: schedules.filter(schedule => schedule.day === day)
    };
  });
  
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Class Name:</label>
              <Input 
                name="title"
                placeholder="Enter class name" 
                value={newClass.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Location:</label>
              <Input 
                name="location"
                placeholder="Class location" 
                value={newClass.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">Day:</label>
              <select 
                name="day"
                className="w-full p-2 border rounded"
                value={newClass.day}
                onChange={handleInputChange}
              >
                {weekdays.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Start Time:</label>
                <Input 
                  name="startTime"
                  type="time" 
                  value={newClass.startTime}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm">End Time:</label>
                <Input 
                  name="endTime"
                  type="time" 
                  value={newClass.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <Button onClick={addClass} className="w-full">
              Add Class
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <h2 className="font-bold mb-4">Class Schedule</h2>
      
      {schedules.length === 0 ? (
        <div className="text-center py-6 border rounded bg-white">
          <p>No classes yet. Add your first class!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {schedulesByDay.map(({ day, classes }) => {
            if (classes.length === 0) return null;
            
            return (
              <div key={day}>
                <h3 className="font-medium mb-2">{day}</h3>
                <div className="space-y-2">
                  {classes.map(classItem => (
                    <div 
                      key={classItem.id} 
                      className="p-3 border rounded bg-white"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{classItem.title}</h4>
                          {classItem.location && (
                            <div className="text-sm text-gray-500">{classItem.location}</div>
                          )}
                          <div className="text-sm">
                            {classItem.startTime} - {classItem.endTime}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteSchedule(classItem.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;
