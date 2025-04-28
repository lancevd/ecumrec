import { useParams } from 'react-router-dom';
import { students } from '../../utils/data';

export default function StudentProfile() {
  const { id } = useParams();
  const student = students.find((s) => s.id === Number(id));

  if (!student) {
    return <div className="text-red-600">Student not found.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Profile: {student.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Demographics & Contact Info</h2>
          <div className="text-gray-700">
            <div><span className="font-medium">Name:</span> {student.name}</div>
            <div><span className="font-medium">Grade:</span> {student.grade}</div>
            <div><span className="font-medium">Email:</span> {student.email}</div>
            <div><span className="font-medium">Phone:</span> {student.phone}</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Assessment History</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {student.assessments.map((a, idx) => (
              <li key={idx}>{a.type} Assessment - {a.date}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Notes & Action Plans</h2>
        <ul className="list-disc ml-5 text-gray-700">
          {student.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 