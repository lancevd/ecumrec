import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useSchoolData } from "../../api/counselors/useGetSchoolStudents";
import Spinner from "../../components/Spinner";

export default function NewAssessment() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useAuth();
  const { getSchoolStudents, getStudentProfile } = useSchoolData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getSchoolStudents();
        if (!response?.data?.data?.length) return;
        setStudents(response.data);
      } catch (error) {
        toast.error("Error fetching students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [user.schoolId]);

  const handleStudentSelect = async (studentId) => {
    try {
      const response = await getStudentProfile(studentId);
      setSelectedStudent(response.data.data);
      setShowProfileModal(true);
    } catch (error) {
      toast.error("Error fetching student profile");
    }
  };

  const handleStartAssessment = () => {
    if (selectedStudent) {
      navigate(`/counselor/assessment/${selectedStudent._id}`);
    }
  };

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace("_", " ");

  const renderInfoBlock = (title, data, fields) => (
    <div className="mb-6">
      {title && <h4 className="font-semibold mb-2 text-[#184C85]">{title}</h4>}
      <div className="grid grid-cols-2 gap-4">
        {fields.map(([label, key]) =>
          key.toLowerCase().includes("_id") ||
          key.toLowerCase().includes("createdat") ||
          key.toLowerCase().includes("updatedat") ? null : (
            <div key={key}>
              <p className="text-sm text-gray-600 font-semibold">
                {label || formatLabel(key)}
              </p>
              <p className="text-gray-800">{data[key] || "-"}</p>
            </div>
          )
        )}
      </div>
    </div>
  );

  const renderFamilyBlock = (role, data) =>
    data && (
      <div className="border rounded-lg p-4">
        <h5 className="font-medium mb-2">{role}'s Information</h5>
        {renderInfoBlock(
          "",
          data,
          Object.keys(data).map((key) => [formatLabel(key), key])
        )}
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#184C85]">New Assessment</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Select a Student</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students?.data?.map((student) => (
            <div
              key={student._id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleStudentSelect(student._id)}
            >
              <h4 className="font-medium">
                {student.firstName} {student.lastName}
              </h4>
              <p className="text-sm text-gray-600">
                Admission: {student.admissionNumber}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showProfileModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#184C85]">
                  Student Profile: {selectedStudent.basicInfo?.firstName}{" "}
                  {selectedStudent.basicInfo?.lastName}
                </h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {renderInfoBlock(
                "Basic Information",
                selectedStudent.basicInfo || {},
                Object.keys(selectedStudent.basicInfo || {}).map((key) => [
                  formatLabel(key),
                  key,
                ])
              )}

              {selectedStudent.profileStatus && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-[#184C85]">
                    Profile Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(
                      selectedStudent.profileStatus.completedSections || {}
                    ).map(([key, value]) => (
                      <span
                        key={key}
                        className={`px-2 py-1 rounded text-xs ${
                          value
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {formatLabel(key)}: {value ? "Complete" : "Incomplete"}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedStudent.personalData &&
                renderInfoBlock(
                  "Personal Information",
                  selectedStudent.personalData,
                  Object.keys(selectedStudent.personalData).map((key) => [
                    formatLabel(key),
                    key,
                  ])
                )}

              {selectedStudent.familyBackground && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-[#184C85]">
                    Family Background
                  </h4>
                  <div className="space-y-4">
                    {renderFamilyBlock(
                      "Father",
                      selectedStudent.familyBackground.father
                    )}
                    {renderFamilyBlock(
                      "Mother",
                      selectedStudent.familyBackground.mother
                    )}
                    {renderFamilyBlock(
                      "Guardian",
                      selectedStudent.familyBackground.guardian
                    )}
                  </div>
                </div>
              )}

              {selectedStudent.familyStructure &&
                renderInfoBlock(
                  "Family Structure",
                  selectedStudent.familyStructure,
                  Object.keys(selectedStudent.familyStructure).map((key) => [
                    formatLabel(key),
                    key,
                  ])
                )}

              {selectedStudent.educationalBackground &&
                renderInfoBlock(
                  "Educational Background",
                  selectedStudent.educationalBackground,
                  Object.keys(selectedStudent.educationalBackground).map(
                    (key) => [formatLabel(key), key]
                  )
                )}

              {selectedStudent.notes && selectedStudent.notes.notes && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-[#184C85]">
                    Additional Notes
                  </h4>
                  <div className="border rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-gray-800">
                      {selectedStudent.notes.notes}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartAssessment}
                  className="px-4 py-2 bg-[#184C85] text-white rounded-lg hover:bg-[#133d6a]"
                >
                  Start Assessing this Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
