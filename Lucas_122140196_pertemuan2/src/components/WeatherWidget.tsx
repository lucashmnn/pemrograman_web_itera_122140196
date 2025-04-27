
import { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "@/lib/weather";

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Jakarta");
  
  const getWeatherData = async () => {
    setLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Weather fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getWeatherData();
    const interval = setInterval(getWeatherData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);
  
  if (loading) {
    return (
      <div className="border p-3">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="border p-3">
      <div className="flex justify-between items-center">
        <div>
          <h3>{weather?.city}</h3>
          <div className="text-lg">{weather?.temp}°C</div>
          <p className="text-sm">{weather?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
