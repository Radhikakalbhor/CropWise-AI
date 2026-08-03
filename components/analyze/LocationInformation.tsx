"use client";

import dynamic from "next/dynamic";
import { State, City } from "country-state-city";
import { FarmerFormData } from "@/types/farmer";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

interface LocationInformationProps {
  formData: FarmerFormData;
  updateField: (
    field: keyof FarmerFormData,
    value: string | number | File | null
  ) => void;
}

export default function LocationInformation({
  formData,
  updateField,
}: LocationInformationProps) {
  const states = State.getStatesOfCountry("IN");

  const stateOptions = states.map((state) => ({
    value: state.name,
    label: state.name,
    isoCode: state.isoCode,
  }));

  const selectedState =
    stateOptions.find((s) => s.value === formData.state) || null;

  const cities = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode)
    : [];

  const districtOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
    latitude: Number(city.latitude),
    longitude: Number(city.longitude),
  }));

  const selectedDistrict =
    districtOptions.find(
      (district) => district.value === formData.district
    ) || null;

  return (
    <section className="mb-10 rounded-2xl border border-green-100 bg-green-50/40 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          📍 Location Information
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Select your farm location.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            State
          </label>

          <Select
            options={stateOptions}
            value={selectedState}
            placeholder="Search State..."
            isSearchable
            onChange={(option: any) => {
              updateField("state", option?.value || "");
              updateField("district", "");
              updateField("latitude", null);
              updateField("longitude", null);
            }}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">
            District / City
          </label>

          <Select
            options={districtOptions}
            value={selectedDistrict}
            placeholder={
              selectedState
                ? "Search District..."
                : "Select State First"
            }
            isSearchable
            isDisabled={!selectedState}
            onChange={(option: any) => {
              updateField("district", option?.value || "");
              updateField("latitude", option?.latitude ?? null);
              updateField("longitude", option?.longitude ?? null);
            }}
          />
        </div>
      </div>
    </section>
  );
}