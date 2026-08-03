"use client";

import { useState } from "react";
import { FarmerFormData } from "@/types/farmer";

export function useFarmerForm() {
  const [formData, setFormData] = useState<FarmerFormData>({
    crop: "",
    growthStage: "",

    state: "",
    district: "",

    latitude: null,
    longitude: null,

    soilType: "",
    soilCondition: "",

    weather: "",
    temperature: "",
    humidity: "",

    // 🌐 Default language
    language: "English",

    image: null,

    question: "",
  });

  const updateField = (
    field: keyof FarmerFormData,
    value: string | number | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    formData,
    updateField,
  };
}