import React from "react";
import Switch from "../../../components/Switch";


const OBSERVATION_CATEGORIES = [
  {
    name: "academicPerformance",
    label: "Academic Performance",
    description: "Student's performance in academic activities",
  },
  {
    name: "socialSkills",
    label: "Social Skills",
    description: "Student's ability to interact with peers and adults",
  },
  {
    name: "emotionalStability",
    label: "Emotional Stability",
    description: "Student's emotional well-being and stability",
  },
  {
    name: "behavioralPatterns",
    label: "Behavioral Patterns",
    description: "Student's behavior in different situations",
  },
  {
    name: "motivation",
    label: "Motivation",
    description: "Student's level of motivation and engagement",
  },
];

export default function Observations({ formData, handleSwitchChange, handleInputChange }) {
  const handleScoreChange = (category, score) => {
    handleInputChange("observations", category, score);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Counselor Observations</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Observations
          </span>
          <Switch
            enabled={formData.observations.status}
            onChange={() => handleSwitchChange("observations", "status")}
          />
        </div>
        {formData.observations.status && (
          <div className="space-y-6">
            {OBSERVATION_CATEGORIES.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {category.label}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleScoreChange(category.name, score)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          formData.observations[category.name] === score
                            ? "bg-[var(--primary-dark)] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                value={formData.observations.notes}
                onChange={(e) =>
                  handleInputChange("observations", "notes", e.target.value)
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                placeholder="Add any additional observations or comments..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 