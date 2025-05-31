import React from "react";
import Switch from "../../../components/Switch";


export default function StandardizedTests({ formData, handleSwitchChange, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Standardized Tests</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Standardized Tests
          </span>
          <Switch
            enabled={formData.standardizedTests.status}
            onChange={() => handleSwitchChange("standardizedTests", "status")}
          />
        </div>
        {formData.standardizedTests.status && (
          <div className="space-y-4">
            <button
              onClick={() =>
                handleInputChange("standardizedTests", "tests", [
                  ...formData.standardizedTests.tests,
                  {
                    testName: "",
                    description: "",
                    score: "",
                    interpretation: "",
                  },
                ])
              }
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
            >
              Add Test
            </button>
            {formData.standardizedTests.tests.map((test, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 relative"
              >
                <button
                  onClick={() =>
                    handleInputChange(
                      "standardizedTests",
                      "tests",
                      formData.standardizedTests.tests.filter(
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
                    Test Name
                  </label>
                  <input
                    type="text"
                    value={test.testName}
                    onChange={(e) => {
                      const newTests = [...formData.standardizedTests.tests];
                      newTests[index] = {
                        ...test,
                        testName: e.target.value,
                      };
                      handleInputChange("standardizedTests", "tests", newTests);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={test.description}
                    onChange={(e) => {
                      const newTests = [...formData.standardizedTests.tests];
                      newTests[index] = {
                        ...test,
                        description: e.target.value,
                      };
                      handleInputChange("standardizedTests", "tests", newTests);
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Score
                  </label>
                  <input
                    type="text"
                    value={test.score}
                    onChange={(e) => {
                      const newTests = [...formData.standardizedTests.tests];
                      newTests[index] = {
                        ...test,
                        score: e.target.value,
                      };
                      handleInputChange("standardizedTests", "tests", newTests);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Interpretation
                  </label>
                  <textarea
                    value={test.interpretation}
                    onChange={(e) => {
                      const newTests = [...formData.standardizedTests.tests];
                      newTests[index] = {
                        ...test,
                        interpretation: e.target.value,
                      };
                      handleInputChange("standardizedTests", "tests", newTests);
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