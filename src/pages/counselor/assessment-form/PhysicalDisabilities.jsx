import React from "react";
import Switch from "../../../components/Switch";

export default function PhysicalDisabilities({ formData, handleSwitchChange, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Physical Disabilities</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Physical Disabilities
          </span>
          <Switch
            enabled={formData.physicalDisabilities.status}
            onChange={() => handleSwitchChange("physicalDisabilities", "status")}
          />
        </div>
        {formData.physicalDisabilities.status && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Partial Deafness
              </span>
              <Switch
                enabled={formData.physicalDisabilities.partialDeafness}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "partialDeafness")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Partial Blindness
              </span>
              <Switch
                enabled={formData.physicalDisabilities.partialBlindness}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "partialBlindness")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Short Sightedness
              </span>
              <Switch
                enabled={formData.physicalDisabilities.shortSightedness}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "shortSightedness")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Long Sightedness
              </span>
              <Switch
                enabled={formData.physicalDisabilities.longSightedness}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "longSightedness")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Stammering
              </span>
              <Switch
                enabled={formData.physicalDisabilities.stammering}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "stammering")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Squinting
              </span>
              <Switch
                enabled={formData.physicalDisabilities.squinting}
                onChange={() =>
                  handleSwitchChange("physicalDisabilities", "squinting")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Physical Impairment
              </span>
              <Switch
                enabled={formData.physicalDisabilities.physicalImpairment}
                onChange={() =>
                  handleSwitchChange(
                    "physicalDisabilities",
                    "physicalImpairment"
                  )
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Other Disabilities
              </label>
              <textarea
                value={formData.physicalDisabilities.other}
                onChange={(e) =>
                  handleInputChange("physicalDisabilities", "other", e.target.value)
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 