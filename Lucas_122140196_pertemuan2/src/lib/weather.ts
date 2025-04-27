
const API_KEY = "demo"; // OpenWeatherMap API key for demo mode

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

export const fetchWeather = async (city: string = "Jakarta"): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    // Return mock data when API fails or for development
    return {
      temp: 28,
      description: "clear sky",
      icon: "01d",
      city: city,
    };
  }
};
