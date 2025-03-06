import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle  } from '../ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Users, UserCheck, UserX, Calendar } from 'lucide-react';

const AttendanceComponent = () => {
  const navigate = useNavigate();

  const attendanceData = [
    { month: "January", present: 42, absent: 8, late: 4 },
    { month: "February", present: 48, absent: 12, late: 6 },
    { month: "March", present: 45, absent: 5, late: 3 },
    { month: "April", present: 40, absent: 10, late: 7 },
    { month: "May", present: 43, absent: 7, late: 5 },
    { month: "June", present: 31, absent: 9, late: 4 },
  ];

  const chartConfig = {
    present: {
      label: "Present",
      color: "hsl(142, 76%, 36%)", // Green
    },
    absent: {
      label: "Absent",
      color: "hsl(0, 84%, 60%)", // Red
    },
    late: {
      label: "Late",
      color: "hsl(45, 93%, 47%)", // Yellow
    },
  } satisfies ChartConfig;

  const todayStats = {
    total: 150,
    present: 138,
    absent: 12,
    late: 8
  };


  const handleTotalStudentsClick = () => {
    navigate('/student-list');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 p-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card 
          className="bg-white cursor-pointer hover:bg-gray-50 transition-colors" 
          onClick={handleTotalStudentsClick}
        >
          <CardContent className="flex items-center p-4">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h3 className="text-xl font-bold">{todayStats.total}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="flex items-center p-4">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Present Today</p>
              <h3 className="text-xl font-bold">{todayStats.present}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="flex items-center p-4">
            <div className="rounded-full bg-red-100 p-2 mr-3">
              <UserX className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Absent Today</p>
              <h3 className="text-xl font-bold">{todayStats.absent}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="flex items-center p-4">
            <div className="rounded-full bg-yellow-100 p-2 mr-3">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Late Today</p>
              <h3 className="text-xl font-bold">{todayStats.late}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Chart */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <ChartContainer config={chartConfig}>
            <BarChart data={attendanceData} className="h-[50px]">
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="present" fill="var(--color-present)" radius={4} />
              <Bar dataKey="absent" fill="var(--color-absent)" radius={4} />
              <Bar dataKey="late" fill="var(--color-late)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceComponent;