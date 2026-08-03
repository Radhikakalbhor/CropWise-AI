"use client";

import CropInformation from "./CropInformation";
import LocationInformation from "./LocationInformation";
import SoilInformation from "./SoilInformation";
import WeatherInformation from "./WeatherInformation";
import LanguageSelector from "./LanguageSelector";
import ImageUpload from "./ImageUpload";
import FarmerQuestion from "./FarmerQuestion";
import SubmitButton from "./SubmitButton";

import { useFarmerForm } from "@/hooks/useFarmerForm";

export default function AnalyzeForm() {
  const { formData, updateField } = useFarmerForm();

  return (
    <>
      <CropInformation
        formData={formData}
        updateField={updateField}
      />

      <LocationInformation
        formData={formData}
        updateField={updateField}
      />

      <SoilInformation
        formData={formData}
        updateField={updateField}
      />

      <WeatherInformation
        formData={formData}
        updateField={updateField}
      />

      {/* 🌐 New Language Selector */}
      <LanguageSelector
        formData={formData}
        updateField={updateField}
      />

      <ImageUpload
        formData={formData}
        updateField={updateField}
      />

      <FarmerQuestion
        formData={formData}
        updateField={updateField}
      />

      <SubmitButton
        formData={formData}
      />
    </>
  );
}