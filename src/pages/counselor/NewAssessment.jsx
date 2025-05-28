import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { getStudentProfile } from "../../services/studentProfileService";
import { useAuth } from "../../context/AuthContext";
import { useSchoolData } from "../../api/counselors/useGetSchoolStudents";
import Spinner from "../../components/Spinner";

export default function NewAssessment() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useAuth();
  const {getSchoolStudents} = useSchoolData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getSchoolStudents();
        if (!response.data || response.data.lenth >0) {
          return "loading..."
        }
        setStudents(response.data);
      } catch (error) {
        toast.error("Error fetching students", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user.schoolId]);

  const handleStudentSelect = async (studentId) => {
    // try {
    //   // const response = await getStudentProfile(studentId);
    //   setSelectedStudent(response.data);
    //   setShowProfileModal(true);
    // } catch (error) {
    //   toast.error("Error fetching student profile", "error");
    // }
  };

  const handleStartAssessment = () => {
    if (selectedStudent) {
      navigate(`/counselor/assessment/${selectedStudent._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#184C85]"></div>
      </div>
    );
  }
// console.log(students)
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#184C85]">New Assessment</h2>

      {/* Student List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Select a Student</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.data ? (
            students.data.map((student) => (
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
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#184C85]">
                  Student Profile: {selectedStudent.firstName}{" "}
                  {selectedStudent.lastName}
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

              {/* Personal Data */}
              {selectedStudent.personalData && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p>{selectedStudent.personalData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p>
                        {new Date(
                          selectedStudent.personalData.dateOfBirth
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Place of Birth</p>
                      <p>{selectedStudent.personalData.placeOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">State of Origin</p>
                      <p>{selectedStudent.personalData.stateOfOrigin}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Family Background */}
              {selectedStudent.familyBackground && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Family Background</h4>
                  {selectedStudent.familyBackground.father && (
                    <div className="mb-4">
                      <h5 className="font-medium">Father</h5>
                      <p>{selectedStudent.familyBackground.father.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedStudent.familyBackground.father.occupation}
                      </p>
                    </div>
                  )}
                  {selectedStudent.familyBackground.mother && (
                    <div className="mb-4">
                      <h5 className="font-medium">Mother</h5>
                      <p>{selectedStudent.familyBackground.mother.name}</p>
                      <p className="text-sm text-gray-600">
                        {selectedStudent.familyBackground.mother.occupation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Educational Background */}
              {selectedStudent.educationalBackground && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Educational Background</h4>
                  {selectedStudent.educationalBackground.schools && (
                    <div className="space-y-4">
                      {selectedStudent.educationalBackground.schools
                        .primarySchoolName && (
                        <div>
                          <h5 className="font-medium">Primary School</h5>
                          <p>
                            {
                              selectedStudent.educationalBackground.schools
                                .primarySchoolName
                            }
                          </p>
                        </div>
                      )}
                      {selectedStudent.educationalBackground.schools
                        .juniorSecondarySchoolName && (
                        <div>
                          <h5 className="font-medium">
                            Junior Secondary School
                          </h5>
                          <p>
                            {
                              selectedStudent.educationalBackground.schools
                                .juniorSecondarySchoolName
                            }
                          </p>
                        </div>
                      )}
                      {selectedStudent.educationalBackground.schools
                        .seniorSecondarySchoolName && (
                        <div>
                          <h5 className="font-medium">
                            Senior Secondary School
                          </h5>
                          <p>
                            {
                              selectedStudent.educationalBackground.schools
                                .seniorSecondarySchoolName
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
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
