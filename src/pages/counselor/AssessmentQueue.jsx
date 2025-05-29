import { useEffect, useState } from "react";
import { useAssessment } from "../../api/counselors/useAssessments";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function AssessmentQueue() {
  const [assessments, setAssessments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("ongoing");
  const { getMyAssessments, loading, error } = useAssessment();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, [currentPage, statusFilter]);

   const fetchAssessments = async () => {
     try {
       const response = await getMyAssessments(statusFilter);
       setAssessments(response.data);
       setTotalPages(response.pagination.totalPages || 1);
     } catch (err) {
       console.error("Error fetching assessments:", err);
       setAssessments([]);
       setTotalPages(1);
     }
   };

  const handleStatusChange = (newStatus) => {
    setStatusFilter(newStatus);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAssessmentClick = (assessmentId) => {
    navigate(`/counselor/assessment-queue/${assessmentId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assessment Queue</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusChange("ongoing")}
            className={`rounded btn-primary  ${
              statusFilter === "ongoing" ? "btn-secondary" : "btn-primary"
            }`}
          >
            Ongoing
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            className={`rounded btn-primary  ${
              statusFilter === "completed" ? "btn-secondary" : "btn-primary"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => handleStatusChange("cancelled")}
            className={`rounded btn-primary  ${
              statusFilter === "cancelled" ? "btn-secondary" : "btn-primary"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : assessments.length === 0 ? (
        <div className="text-center py-4 text-red-600">
          There are no assessments in this category!
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow divide-y">
            {assessments.map((assessment) => (
              <div
                key={assessment._id}
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                onClick={() => handleAssessmentClick(assessment._id)}
              >
                <div>
                  <div className="font-semibold">
                    {assessment.studentId.firstName}{" "}
                    {assessment.studentId.lastName}
                  </div>
                  <div
                    className={`text-sm ${getStatusColor(assessment.status)}`}
                  >
                    Assessment (
                    {assessment.status.charAt(0).toUpperCase() +
                      assessment.status.slice(1)}
                    )
                  </div>
                </div>
                {assessment.status === "ongoing" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAssessmentClick(assessment._id);
                    }}
                    className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
                  >
                    Continue
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 