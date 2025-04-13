
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800"
};

export const colorOptions = [
  { name: "purple", value: "#8B5CF6" },
  { name: "blue", value: "#3B82F6" },
  { name: "green", value: "#10B981" },
  { name: "yellow", value: "#F59E0B" },
  { name: "red", value: "#EF4444" },
  { name: "pink", value: "#EC4899" },
];

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
