import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

const TeacherPerformanceCharts = () => {
  const performanceData = [
    { name: 'Mrs. Anjali Sharma', score: 98, subject: 'Math' },
    { name: 'Mrs. Kavita Mehta', score: 90, subject: 'Eng' },
    { name: 'Mrs. Anjali Sharma', score: 62, subject: 'Bio' },
    { name: 'Mrs. Priya Iyer', score: 57, subject: 'Bio' },
    { name: 'Mrs. Priya Iyer', score: 87, subject: 'Eng' },
    { name: 'Prof. Samir Bansal', score: 56, subject: 'Hindi' },
  ];

  const teacherDistribution = [
    { name: 'Expert Teachers', value: 35, color: '#FFB547' },
    { name: 'Best Teachers', value: 25, color: '#7CC5F8' },
    { name: 'Good Teachers', value: 40, color: '#2B5468' },
  ];

  return (
    <div className="space-y-6">
      {/* Score Performance Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Teacher Score Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  labelFormatter={(label) => `Teacher: ${label}`}
                />
                <Legend />
                <Bar dataKey="score" fill="#4f46e5" name="Performance Score">
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Distribution Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Teacher Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={teacherDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {teacherDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherPerformanceCharts;