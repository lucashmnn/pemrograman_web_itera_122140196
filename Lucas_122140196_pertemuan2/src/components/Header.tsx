
import { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  
  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
    setCurrentTime(formattedTime);
  };
  
  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header className="p-4 border-b">
      <h1 className="text-xl">Student Dashboard</h1>
      <p className="text-sm">{currentTime}</p>
    </header>
  );
};

export default Header;
