import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const monthlyAppointments = [
  { name: 'Jan', appointments: 65 },
  { name: 'Feb', appointments: 59 },
  { name: 'Mar', appointments: 80 },
  { name: 'Apr', appointments: 81 },
  { name: 'May', appointments: 56 },
  { name: 'Jun', appointments: 55 },
];

const studentDistribution = [
  { name: 'Year 1', students: 120 },
  { name: 'Year 2', students: 98 },
  { name: 'Year 3', students: 86 },
  { name: 'Year 4', students: 99 },
  { name: 'Year 5', students: 85 },
];

const appointmentTypes = [
  { name: 'Academic', value: 400 },
  { name: 'Personal', value: 300 },
  { name: 'Career', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#184C85', '#2C6AA0', '#4088C5', '#54A6EA'];

export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#184C85]">Analytics & Reports</h1>
      
      {/* Monthly Appointments Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Monthly Appointments</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyAppointments}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#184C85"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Distribution and Appointment Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Student Distribution Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Student Distribution by Year</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={studentDistribution}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#184C85" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Types Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Appointment Types</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Export Reports Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-[#184C85]">Exportable Reports</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded bg-[#184C85] text-white hover:bg-[#123a69] transition">
            Export as CSV
          </button>
          <button className="px-4 py-2 rounded bg-[#184C85] text-white hover:bg-[#123a69] transition">
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
} 