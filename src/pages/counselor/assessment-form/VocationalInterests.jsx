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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interests
              </label>
              <div className="space-y-2">
                {formData.vocationalInterests.interests.map((interest, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => {
                        const newInterests = [...formData.vocationalInterests.interests];
                        newInterests[index] = e.target.value;
                        handleInputChange("vocationalInterests", "interests", newInterests);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                      placeholder="Enter vocational interest"
                    />
                    <button
                      onClick={() => {
                        const newInterests = formData.vocationalInterests.interests.filter(
                          (_, i) => i !== index
                        );
                        handleInputChange("vocationalInterests", "interests", newInterests);
                      }}
                      className="mt-1 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newInterests = [...formData.vocationalInterests.interests, ""];
                    handleInputChange("vocationalInterests", "interests", newInterests);
                  }}
                  className="text-sm text-primary hover:text-primary/90"
                >
                  + Add Interest
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Comments
              </label>
              <textarea
                value={formData.vocationalInterests.comments}
                onChange={(e) =>
                  handleInputChange("vocationalInterests", "comments", e.target.value)
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                placeholder="Add any comments about the student's vocational interests..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 