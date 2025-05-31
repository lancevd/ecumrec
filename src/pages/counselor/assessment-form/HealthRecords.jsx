import React from "react";
import Switch from "../../../components/Switch";


export default function HealthRecords({ formData, handleSwitchChange, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Health Records</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Health Records
          </span>
          <Switch
            enabled={formData.healthRecords.status}
            onChange={() => handleSwitchChange("healthRecords", "status")}
          />
        </div>
        {formData.healthRecords.status && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nature of Problem
              </label>
              <textarea
                value={formData.healthRecords.natureOfProblem}
                onChange={(e) =>
                  handleInputChange(
                    "healthRecords",
                    "natureOfProblem",
                    e.target.value
                  )
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Causes
              </label>
              <textarea
                value={formData.healthRecords.causes}
                onChange={(e) =>
                  handleInputChange("healthRecords", "causes", e.target.value)
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Referrals
              </label>
              <textarea
                value={formData.healthRecords.referrals}
                onChange={(e) =>
                  handleInputChange(
                    "healthRecords",
                    "referrals",
                    e.target.value
                  )
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