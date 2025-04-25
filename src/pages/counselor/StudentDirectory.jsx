import { Link } from 'react-router-dom';
import { students } from '../../utils/data';

export default function StudentDirectory() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Directory</h1>
      <input
        type="text"
        placeholder="Search students..."
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="bg-white rounded-lg shadow divide-y">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div>
              <div className="font-semibold">{student.name}</div>
              <div className="text-sm text-gray-500">Grade {student.grade} &bull; {student.email}</div>
            </div>
            <Link
              to={`/counselor/students/${student.id}`}
              className="text-primary font-medium hover:underline"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 