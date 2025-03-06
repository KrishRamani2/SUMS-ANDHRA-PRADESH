import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip, TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Users, Download, Calendar } from "lucide-react";

interface AttendanceRecord {
  boys: number;
  girls: number;
  total: number;
}

interface DailyRecord extends AttendanceRecord {
  day: string;
}

interface MonthlyRecord extends AttendanceRecord {
  month: string;
}

interface YearlyRecord extends AttendanceRecord {
  year: string;
}

interface AttendanceData {
  daily: DailyRecord[];
  monthly: MonthlyRecord[];
  yearly: YearlyRecord[];
}

const attendanceData: AttendanceData = {
  daily: [
    { day: "Mon", boys: 50, girls: 45, total: 95 },
    { day: "Tue", boys: 48, girls: 42, total: 90 },
    { day: "Wed", boys: 55, girls: 50, total: 105 },
    { day: "Thu", boys: 60, girls: 53, total: 113 },
    { day: "Fri", boys: 58, girls: 52, total: 110 },
  ],
  monthly: [
    { month: "Jan", boys: 1200, girls: 1150, total: 2350 },
    { month: "Feb", boys: 1100, girls: 1070, total: 2170 },
    { month: "Mar", boys: 1250, girls: 1180, total: 2430 },
    { month: "Apr", boys: 1300, girls: 1200, total: 2500 },
    { month: "May", boys: 1350, girls: 1225, total: 2575 },
  ],
  yearly: [
    { year: "2020", boys: 14000, girls: 13500, total: 27500 },
    { year: "2021", boys: 14500, girls: 14000, total: 28500 },
    { year: "2022", boys: 15000, girls: 14200, total: 29200 },
    { year: "2023", boys: 15500, girls: 14800, total: 30300 },
  ],
};

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">
              {entry.name === "boys" ? "Boys" : "Girls"}:
            </span>
            <span className="font-semibold text-gray-900">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

type PeriodType = "daily" | "monthly" | "yearly";

export function AttendanceChart() {
  const [period, setPeriod] = useState<PeriodType>("daily");
  const chartData = attendanceData[period];

  const xAxisKey = {
    daily: "day",
    monthly: "month",
    yearly: "year",
  }[period];

  const getAttendanceStats = () => {
    const currentPeriodData = chartData[chartData.length - 1];
    const previousPeriodData = chartData[chartData.length - 2];
    const growth = ((currentPeriodData.total - previousPeriodData.total) / previousPeriodData.total) * 100;
    return {
      total: currentPeriodData.total,
      growth: growth.toFixed(1),
      boysPercentage: ((currentPeriodData.boys / currentPeriodData.total) * 100).toFixed(1),
      girlsPercentage: ((currentPeriodData.girls / currentPeriodData.total) * 100).toFixed(1),
    };
  };

  const stats = getAttendanceStats();

  return (
    <Card className="w-full bg-white border border-gray-100 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold text-gray-900">Attendance Overview</CardTitle>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                +{stats.growth}%
              </Badge>
            </div>
            <p className="text-gray-500 text-sm mt-1">Student attendance analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Select onValueChange={(value: PeriodType) => setPeriod(value)} defaultValue="daily">
              <SelectTrigger className="w-[120px] border border-gray-200">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Users className="w-4 h-4" />
              <span>Total Students</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {stats.total.toLocaleString()}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Boys</span>
            </div>
            <div className="text-xl font-bold text-blue-700">
              {stats.boysPercentage}%
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-yellow-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Girls</span>
            </div>
            <div className="text-xl font-bold text-yellow-700">
              {stats.girlsPercentage}%
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                period === "monthly" ? value.slice(0, 3) : value
              }
              className="text-gray-600"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-gray-600"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                return <span className="text-gray-600 capitalize">{value}</span>;
              }}
            />
            <Bar
              dataKey="boys"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="girls"
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default AttendanceChart;