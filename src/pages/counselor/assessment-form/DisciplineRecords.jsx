import React from "react";
import Switch from "../../../components/Switch";

export default function DisciplineRecords({
  formData,
  handleSwitchChange,
  handleInputChange,
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Discipline Records</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Has Discipline Records
          </span>
          <Switch
            enabled={formData.disciplineRecords.status}
            onChange={() => handleSwitchChange("disciplineRecords", "status")}
          />
        </div>
        {formData.disciplineRecords.status && (
          <div className="space-y-4">
            <button
              onClick={() =>
                handleInputChange("disciplineRecords", "records", [
                  ...formData.disciplineRecords.records,
                  { date: "", offence: "", actionTaken: "" },
                ])
              }
              className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
            >
              Add Record
            </button>
            {formData.disciplineRecords.records.map((record, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 relative"
              >
                <button
                  onClick={() =>
                    handleInputChange(
                      "disciplineRecords",
                      "records",
                      formData.disciplineRecords.records.filter(
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
                    Date
                  </label>
                  <input
                    type="date"
                    value={record.date}
                    onChange={(e) => {
                      const newRecords = [
                        ...formData.disciplineRecords.records,
                      ];
                      newRecords[index] = {
                        ...record,
                        date: e.target.value,
                      };
                      handleInputChange(
                        "disciplineRecords",
                        "records",
                        newRecords
                      );
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Offence
                  </label>
                  <textarea
                    value={record.offence}
                    onChange={(e) => {
                      const newRecords = [
                        ...formData.disciplineRecords.records,
                      ];
                      newRecords[index] = {
                        ...record,
                        offence: e.target.value,
                      };
                      handleInputChange(
                        "disciplineRecords",
                        "records",
                        newRecords
                      );
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Action Taken
                  </label>
                  <textarea
                    value={record.actionTaken}
                    onChange={(e) => {
                      const newRecords = [
                        ...formData.disciplineRecords.records,
                      ];
                      newRecords[index] = {
                        ...record,
                        actionTaken: e.target.value,
                      };
                      handleInputChange(
                        "disciplineRecords",
                        "records",
                        newRecords
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
