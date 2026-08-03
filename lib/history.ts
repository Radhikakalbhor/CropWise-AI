import { FarmerFormData } from "@/types/farmer";

export interface HistoryItem {
  id: string;
  date: string;

  crop: string;
  state: string;
  district: string;

  disease: string;
  confidence: string;

  image?: string;

  formData: Omit<FarmerFormData, "image">;

  result: any;
}

const STORAGE_KEY = "cropwise-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveHistory(item: HistoryItem) {
  const history = getHistory();

  history.unshift(item);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function deleteHistory(id: string) {
  const history = getHistory().filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getHistoryItem(id: string) {
  return getHistory().find((item) => item.id === id);
}