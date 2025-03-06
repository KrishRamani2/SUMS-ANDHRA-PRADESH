
import { Card, CardContent } from '../../ui/card';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: '2021', students: 1700, upperBound: 2000, lowerBound: 1500 },
  { year: '2022', students: 1800, upperBound: 2100, lowerBound: 1600 },
  { year: '2023', students: 1600, upperBound: 2000, lowerBound: 1400 },
  { year: '2024', students: 1300, upperBound: 1800, lowerBound: 1200 },
  { year: '2025', students: 1800, upperBound: 2200, lowerBound: 1600 },
  { year: '2026', students: 1500, upperBound: 2000, lowerBound: 1400 }
];

const EnrollmentChart = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Students Enrollment By Year</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-700"></div>
              <span className="text-sm text-gray-600">Students</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border border-gray-300"></div>
              <span className="text-sm text-gray-600">Upper & Lower Bounds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-sm text-gray-600">Forecast</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#166534" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
                domain={[0, 3000]}
                ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="students"
                stroke="#166534"
                fill="url(#colorStudents)"
                strokeWidth={2}
                dot={{ fill: '#166534', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="upperBound"
                stroke="#e2e8f0"
                fill="none"
                strokeWidth={1}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="lowerBound"
                stroke="#e2e8f0"
                fill="none"
                strokeWidth={1}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentChart;