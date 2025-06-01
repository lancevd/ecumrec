import React from "react";
import Switch from "../../../components/Switch";

export default function VocationalInterests({ formData, handleSwitchChange, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Vocational Interests</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Vocational Interests
          </span>
          <Switch
            enabled={formData.vocationalInterests.status}
            onChange={() => handleSwitchChange("vocationalInterests", "status")}
          />
        </div>
        {formData.vocationalInterests.status && (
          <div className="space-y-4">
            <button
              onClick={() =>
                handleInputChange("vocationalInterests", "interests", [
                  ...formData.vocationalInterests.interests,
                  { name: "", description: "", counselorComments: "" },
                ])
              }
              className="px-4 py-2 rounded btn-secondary hover:bg-primary/90"
            >
              Add Interest
            </button>
            {formData.vocationalInterests.interests.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 relative"
              >
                <button
                  onClick={() =>
                    handleInputChange(
                      "vocationalInterests",
                      "interests",
                      formData.vocationalInterests.interests.filter(
                        (_, i) => i !== index
                      )
                    )
                  }
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Interest Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newInterests = [
                        ...formData.vocationalInterests.interests,
                      ];
                      newInterests[index] = {
                        ...item,
                        name: e.target.value,
                      };
                      handleInputChange(
                        "vocationalInterests",
                        "interests",
                        newInterests
                      );
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const newInterests = [
                        ...formData.vocationalInterests.interests,
                      ];
                      newInterests[index] = {
                        ...item,
                        description: e.target.value,
                      };
                      handleInputChange(
                        "vocationalInterests",
                        "interests",
                        newInterests
                      );
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Counselor Comments
                  </label>
                  <textarea
                    value={item.counselorComments}
                    onChange={(e) => {
                      const newInterests = [
                        ...formData.vocationalInterests.interests,
                      ];
                      newInterests[index] = {
                        ...item,
                        counselorComments: e.target.value,
                      };
                      handleInputChange(
                        "vocationalInterests",
                        "interests",
                        newInterests
                      );
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 