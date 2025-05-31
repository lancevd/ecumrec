import React from "react";

export default function PhysicalDevelopment({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Physical Development</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height
          </label>
          <input
            type="text"
            value={formData.physicalDevelopment.height}
            onChange={(e) =>
              handleInputChange("physicalDevelopment", "height", e.target.value)
            }
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            type="text"
            value={formData.physicalDevelopment.weight}
            onChange={(e) =>
              handleInputChange("physicalDevelopment", "weight", e.target.value)
            }
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Other Features
          </label>
          <textarea
            value={formData.physicalDevelopment.otherFeatures}
            onChange={(e) =>
              handleInputChange(
                "physicalDevelopment",
                "otherFeatures",
                e.target.value
              )
            }
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
} 