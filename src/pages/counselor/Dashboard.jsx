import { useEffect, useState } from "react";
import { useAssessment } from "../../api/counselors/useAssessments";


export default function CounselorDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    ongoing: 0,
    completed: 0,
    false: 0,
  });
  const { getAssessmentStats, loading, error } = useAssessment();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAssessmentStats();
        setStats(data);
      } catch (err) {
        console.error("Error fetching assessment stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Counselor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-primary">{stats.total}</span>
          <span className="mt-2 text-gray-600">Total Assessments</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-primary">{stats.ongoing}</span>
          <span className="mt-2 text-gray-600">Ongoing Assessments</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-primary">{stats.completed}</span>
          <span className="mt-2 text-gray-600">Completed Assessments</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-gray-700">
          <li>Assessment started for John Doe</li>
          <li>Appointment scheduled with Jane Smith</li>
          <li>Note added to Michael Brown's profile</li>
        </ul>
      </div>
    </div>
  );
}
