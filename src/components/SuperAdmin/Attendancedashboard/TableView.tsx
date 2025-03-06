/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cctv} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const TableVie = () => {
  const navigate = useNavigate();
  
  // You should replace these with your actual state values or props
  const formattedState = "your-state";
  const formattedDistrict = "your-district";
  const selectedYear = "2024";

  const handleDashboardClick = (_schoolId: number) => {
    navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}/academic-dashboard`);
  };

  const weeklyData = [
    { name: 'Mon', attendance: 40 },
    { name: 'Tue', attendance: 45 },
    { name: 'Wed', attendance: 86 },
    { name: 'Thu', attendance: 35 },
    { name: 'Fri', attendance: 45 },
  ];

  return (
    <div className="flex gap-4 p-6 bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Logo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">School Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">District</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Address</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Attendance%</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Academic Progress</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">CCTV</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  </td>
                  <td className="px-4 py-3 text-sm">Sample School {index + 1}</td>
                  <td className="px-4 py-3 text-sm">District {index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">123 Sample Street, City</td>
                  <td className="px-4 py-3 text-sm font-medium">90.5%</td>
                  <td className="px-4 py-3">
                    <button 
                      className="px-4 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                      onClick={() => handleDashboardClick(index)}
                    >
                      Academic Progress
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Cctv className="w-5 h-5 text-gray-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Sidebar */}
      <div className="w-80 space-y-4">
        {/* Weekly Attendance Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Overall Weekly Attendance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="attendance" fill="#047857" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Attendance %</h2>
          <div className="relative pt-4">
            <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#047857"
                strokeWidth="10"
                strokeDasharray={`${80 * 2.83} ${100 * 2.83}`}
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#ef4444"
                strokeWidth="10"
                strokeDasharray={`${20 * 2.83} ${100 * 2.83}`}
                transform="rotate(201.6 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-bold">80%</span>
                <div className="text-gray-500 text-sm">Attendance</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-700" />
              <span className="text-sm">Attendance %</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Absent %</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableVie;