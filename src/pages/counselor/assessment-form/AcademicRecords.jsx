import React, { useState, useEffect } from "react";
import Switch from "../../../components/Switch";
import * as XLSX from "xlsx";
import { useAssessment } from "../../../api/counselors/useAssessments";
import toast from "react-hot-toast";

// Helper to transform the sheet to your schema
function transformToSchema(sheetData) {
  const classNames = ["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"];
  const records = classNames.map((className, idx) => {
    return {
      className,
      subjects: sheetData.slice(1).map((row) => ({
        subject: row[0],
        termScores: [
          { term: "1st", score: Number(row[1 + idx * 4] || 0) },
          { term: "2nd", score: Number(row[2 + idx * 4] || 0) },
          { term: "3rd", score: Number(row[3 + idx * 4] || 0) },
        ],
        weightedScore: Number(row[4 + idx * 4] || 0),
        remarks: "",
      })),
      finalExamScore: null,
      repeatScores: [],
    };
  });
  return records;
}

export default function AcademicRecords({ formData, handleSwitchChange, assessmentId }) {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { uploadAcademicRecords } = useAssessment();
  const [uploading, setUploading] = useState(false);

  // Initialize records from formData if they exist
  useEffect(() => {
    if (formData.academicRecords?.records?.length > 0) {
      setRecords(formData.academicRecords.records);
      setCurrentPage(0);
    }
  }, [formData.academicRecords?.records]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const transformed = transformToSchema(json);

      setRecords(transformed);
      setCurrentPage(0);

      // Sync with parent formData
      handleSwitchChange("academicRecords", "records", transformed);
    };

    reader.readAsArrayBuffer(file);
  };

  const classes = records.map((r) => r.className);

  const handleUpload = async () => {
    if (!records.length) {
      alert("No records to upload!");
      return;
    }
    setUploading(true);
    try {
      await uploadAcademicRecords(assessmentId, records);
      // Set status to true after successful upload
      handleSwitchChange("academicRecords", "status", true);
      toast.success("Academic records uploaded successfully!");
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
    setUploading(false);
  };

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
            <p className="small">
              Upload an xls or .csv file for the result of the student
            </p>
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileUpload}
              className="mb-4"
            />
            {records.length > 0 && (
              <div>
                <div className="flex gap-2 my-2 items-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                    disabled={currentPage === 0}
                    className="px-2 py-1 rounded bg-gray-200"
                  >
                    Prev
                  </button>
                  <span className="font-semibold">{classes[currentPage]}</span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, classes.length - 1))
                    }
                    disabled={currentPage === classes.length - 1}
                    className="px-2 py-1 rounded bg-gray-200"
                  >
                    Next
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="ml-4 px-4 py-2 rounded btn-secondary"
                  >
                    {uploading ? "Uploading..." : "Upload Results"}
                  </button>
                </div>
                <table className="w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2">Subject</th>
                      <th className="border px-2">1st Term</th>
                      <th className="border px-2">2nd Term</th>
                      <th className="border px-2">3rd Term</th>
                      <th className="border px-2">Weighted Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records[currentPage].subjects.map((subj, idx) => (
                      <tr key={idx}>
                        <td className="border px-2">{subj.subject}</td>
                        <td className="border px-2">
                          {subj.termScores[0]?.score}
                        </td>
                        <td className="border px-2">
                          {subj.termScores[1]?.score}
                        </td>
                        <td className="border px-2">
                          {subj.termScores[2]?.score}
                        </td>
                        <td className="border px-2">{subj.weightedScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
