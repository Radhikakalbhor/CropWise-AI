export interface FarmerFormData {
  crop: string;
  growthStage: string;

  state: string;
  district: string;

  latitude: number | null;
  longitude: number | null;

  soilType: string;
  soilCondition: string;

  weather: string;
  temperature: string;
  humidity: string;

  // 🌐 Preferred AI response language
  language: string;

  image: File | null;

  question: string;
}