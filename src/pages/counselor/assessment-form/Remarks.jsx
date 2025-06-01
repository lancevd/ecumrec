import React from "react";

export default function Remarks({ formData, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Overall Assessment</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Overall Remark
          </label>
          <textarea
            value={formData.overallRemark.remark}
            onChange={(e) => handleInputChange("overallRemark","remark", e.target.value)}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Provide an overall assessment of the student with recommendations"
          />
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Recommendations
          </label>
          <textarea
            value={formData.recommendations}
            onChange={(e) => handleInputChange("recommendations", e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Provide recommendations for the student's development..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Follow-up Actions
          </label>
          <textarea
            value={formData.followUpActions}
            onChange={(e) => handleInputChange("followUpActions", e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="Specify any follow-up actions or interventions needed..."
          />
        </div> */}
      </div>
    </div>
  );
} 