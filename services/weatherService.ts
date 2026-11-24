import { WeatherData } from '../types';

// This is a mock weather service. In a real application, you would fetch this data from a weather API.
export const getWeather = async (location: string = "Garden Location"): Promise<WeatherData> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return mock data
    return {
        temperature: 68,
        condition: "Partly Cloudy",
        conditionCode: 116, // A made-up code for "Partly Cloudy"
        location,
        alerts: [
            {
                title: "High pollen count today",
                severity: "medium",
            }
        ],
    };
};
