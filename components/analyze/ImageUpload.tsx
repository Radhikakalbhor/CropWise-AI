"use client";

import { useState, useEffect } from "react";
import { FarmerFormData } from "@/types/farmer";

interface Props {
  formData: FarmerFormData;
  updateField: (
    field: keyof FarmerFormData,
    value: string | number | File | null
  ) => void;
}

export default function ImageUpload({
  formData,
  updateField,
}: Props) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!formData.image) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(formData.image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [formData.image]);

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    updateField("image", file);
  }

  function removeImage() {
    updateField("image", null);
    setPreview("");
  }

  return (
    <section className="mb-10 rounded-2xl border border-green-100 bg-green-50/40 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          📷 Crop Image
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Upload a crop image for AI disease detection.
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full rounded-xl border bg-white p-3"
      />

      {preview && (
        <div className="mt-6">
          <img
            src={preview}
            alt="Preview"
            className="h-72 w-full rounded-2xl border object-cover shadow-md"
          />

          <button
            type="button"
            onClick={removeImage}
            className="mt-4 rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Remove Image
          </button>
        </div>
      )}
    </section>
  );
}