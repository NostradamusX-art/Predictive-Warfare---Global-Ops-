import { Language } from "../types";

export interface IntelReport {
  title: string;
  summary: string;
  region: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  lat: number;
  lng: number;
}

export const fetchRealTimeIntel = async (lang: Language): Promise<IntelReport[]> => {
  try {
    const response = await fetch(`/api/intel?lang=${lang}`);
    if (!response.ok) {
      throw new Error("Failed to fetch from server API");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch real-time intel:", error);
    return [];
  }
};
