import React from "react";
import Switch from "../../../components/Switch";

const observationFields = [
  { id: "punctuality", label: "Punctuality" },
  { id: "attendance", label: "Attendance" },
  { id: "reliability", label: "Reliability" },
  { id: "politeness", label: "Politeness" },
  { id: "honesty", label: "Honesty" },
  { id: "relationshipWithStaff", label: "Relationship with Staff" },
  { id: "relationshipWithPeers", label: "Relationship with Peers" },
  { id: "selfControl", label: "Self Control" },
  { id: "cooperation", label: "Cooperation" },
  { id: "attentiveness", label: "Attentiveness" },
  { id: "initiative", label: "Initiative" },
  { id: "organization", label: "Organization" },
  { id: "perseverance", label: "Perseverance" },
  { id: "senseOfLeadership", label: "Sense of Leadership" },
  { id: "respectForAuthority", label: "Respect for Authority" },
  { id: "senseOfResponsibility", label: "Sense of Responsibility" },
  { id: "industry", label: "Industry" },
  { id: "games", label: "Games" },
  { id: "sports", label: "Sports" },
  { id: "gymnastics", label: "Gymnastics" },
  { id: "handlingOfTools", label: "Handling of Tools" },
  { id: "drawingPainting", label: "Drawing/Painting" },
  { id: "craft", label: "Craft" },
  { id: "musicalSkills", label: "Musical Skills" },
  { id: "speechFluency", label: "Speech Fluency" },
  { id: "handlingOfLaboratoryEquipment", label: "Handling of Laboratory Equipment" }
];

export default function Observations({ formData, handleSwitchChange, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Observations</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {observationFields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <select
                  value={formData.observations[field.id]}
                  onChange={(e) =>
                    handleInputChange(
                      "observations",
                      field.id,
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                >
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 