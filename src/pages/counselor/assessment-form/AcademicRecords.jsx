import React from "react";
import Switch from "../../../components/Switch";

export default function AcademicRecords({ formData, handleSwitchChange, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Academic Records</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Academic Records
          </span>
          <Switch
            enabled={formData.academicRecords.status}
            onChange={() => handleSwitchChange("academicRecords", "status")}
          />
        </div>
        {formData.academicRecords.status && (
          <div className="space-y-4">
            <button
              onClick={() =>
                handleInputChange("academicRecords", "records", [
                  ...formData.academicRecords.records,
                  {
                    class: "",
                    subjects: [],
                  },
                ])
              }
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
            >
              Add Class Record
            </button>
            {formData.academicRecords.records.map((record, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 relative"
              >
                <button
                  onClick={() =>
                    handleInputChange(
                      "academicRecords",
                      "records",
                      formData.academicRecords.records.filter(
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
                    Class
                  </label>
                  <input
                    type="text"
                    value={record.class}
                    onChange={(e) => {
                      const newRecords = [...formData.academicRecords.records];
                      newRecords[index] = {
                        ...record,
                        class: e.target.value,
                      };
                      handleInputChange("academicRecords", "records", newRecords);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subjects
                  </label>
                  <div className="space-y-2">
                    {record.subjects.map((subject, subjectIndex) => (
                      <div key={subjectIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => {
                            const newRecords = [...formData.academicRecords.records];
                            newRecords[index].subjects[subjectIndex] = e.target.value;
                            handleInputChange("academicRecords", "records", newRecords);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                        />
                        <button
                          onClick={() => {
                            const newRecords = [...formData.academicRecords.records];
                            newRecords[index].subjects = newRecords[index].subjects.filter(
                              (_, i) => i !== subjectIndex
                            );
                            handleInputChange("academicRecords", "records", newRecords);
                          }}
                          className="mt-1 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newRecords = [...formData.academicRecords.records];
                        newRecords[index].subjects.push("");
                        handleInputChange("academicRecords", "records", newRecords);
                      }}
                      className="text-sm text-primary hover:text-primary/90"
                    >
                      + Add Subject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 