import { Link } from "react-router-dom";
import { useAssessment } from "../../api/counselors/useAssessments";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

export default function StudentDirectory() {
  const { getMyAssessments, loading, error } = useAssessment();
  const [students, setStudents] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchAssessments();
  }, []);
  const fetchAssessments = async () => {
    try {
      const response = await getMyAssessments("");
      setStudents(response.data);
      setTotalPages(response.pagination.totalPages || 1);
    } catch (err) {
      console.error("Error fetching assessments:", err);
      setStudents();
      setTotalPages(1);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Directory</h1>
      <input
        type="text"
        placeholder="Search students..."
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="bg-white rounded-lg shadow divide-y">
        {students && students.map((student) => (
          <div
            key={student._id}
            className="flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div>
              <div className="font-semibold">
                {student.studentId.firstName} {student.studentId.lastName}
              </div>
              <div className="text-sm text-gray-500">
                {/* {student.studentId.admissionNumber} */}
              </div>
            </div>
            <Link
              to={`/counselor/students/${student.studentId._id}`}
              className="btn-primary font-medium hover:underline"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
