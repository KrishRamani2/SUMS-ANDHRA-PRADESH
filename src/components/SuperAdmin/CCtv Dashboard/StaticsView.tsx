import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const StatisticsView = () => {
  // Sample data for the chart
  const data = [
    { percentage: 0, student: 85, attendance: 75, avg: 60 },
    { percentage: 10, student: 90, attendance: 85, avg: 65 },
    { percentage: 20, student: 88, attendance: 78, avg: 70 },
    { percentage: 30, student: 92, attendance: 88, avg: 75 },
    { percentage: 40, student: 86, attendance: 76, avg: 68 },
    { percentage: 50, student: 89, attendance: 77, avg: 68 },
    { percentage: 60, student: 91, attendance: 77, avg: 69 },
    { percentage: 70, student: 94, attendance: 80, avg: 72 },
    { percentage: 80, student: 96, attendance: 85, avg: 76 },
    { percentage: 90, student: 98, attendance: 95, avg: 90 },
    { percentage: 100, student: 92, attendance: 90, avg: 85 },
  ];

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="percentage" 
                tickFormatter={(value) => `${value}%`}
                tickCount={11}
                domain={[0, 100]}
                type="number"
              />
              <YAxis hide={true} />
              
              <Line
                type="monotone"
                dataKey="student"
                name="Student Percentage"
                stroke="#2E7D32"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2E7D32" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                name="Class Attendance"
                stroke="#2196F3"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2196F3" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="avg"
                name="Avg Percentage"
                stroke="#F44336"
                strokeWidth={2}
                dot={{ r: 4, fill: "#F44336" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-6 justify-center">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-700 mr-2"></div>
            <span className="text-sm">Student Percentage</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Class Attendance</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Avg Percentage</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsView;