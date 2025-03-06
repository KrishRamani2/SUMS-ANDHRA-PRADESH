 
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LayoutDashboard } from 'lucide-react';
import { useSchoolStore } from '../../store/stateStore';
import { useNavigate } from 'react-router-dom';

interface CircularProgressProps {
  percentage: number;
  color: string;
  subLabel?: string;
}

interface AcademicData {
  percentage: number;
  label: string;
  color: string;
}

type AcademicTypes = {
  month: AcademicData;
  week: AcademicData;
}




const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, color }) => (
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={[
          { value: percentage },
          { value: 100 - percentage }
        ]}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        startAngle={90}
        endAngle={-270}
        dataKey="value"
      >
        <Cell fill={color} strokeWidth={0} />
        <Cell fill="#f3f4f6" strokeWidth={0} />
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000"
        fontSize="24"
        fontWeight="bold"
      >
        {percentage}%
      </text>
    </PieChart>
  </ResponsiveContainer>
);

const DashboardMetrics: React.FC = () => {
  const [academicType, setAcademicType] = useState<keyof AcademicTypes>('month');
  const navigate = useNavigate();
  const { selectedState, selectedDistrict, selectedYear } = useSchoolStore();
  const handleAttendanceDash= () => {
    const formattedState = selectedState.toLowerCase().replace(/\s+/g, "-");
    const formattedDistrict = selectedDistrict ? selectedDistrict.toLowerCase().replace(/\s+/g, "-") : "all";
    navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}/attendance-dashboard`);
  };
  const handleAcademicDash= () => {
    const formattedState = selectedState.toLowerCase().replace(/\s+/g, "-");
    const formattedDistrict = selectedDistrict ? selectedDistrict.toLowerCase().replace(/\s+/g, "-") : "all";
    navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}/academic-dashboard`);
  };
  const handleMidDayMealDash= () => {
    const formattedState = selectedState.toLowerCase().replace(/\s+/g, "-");
    const formattedDistrict = selectedDistrict ? selectedDistrict.toLowerCase().replace(/\s+/g, "-") : "all";
    navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}/mid-day-meal`);
  };
  const academicData: AcademicTypes = {
    month: {
      percentage: 32,
      label: 'Monthly Progress',
      color: '#3b82f6'
    },
    week: {
      percentage: 75,
      label: 'Weekly Progress',
      color: '#8b5cf6'
    }
  };

  const handleValueChange = (value: string) => {
    setAcademicType(value as keyof AcademicTypes);
  };

  // Function to handle redirect

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-lg">
      <Card className="duration-300 border-0 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-600"></div>
        <CardHeader>
          <CardTitle className="text-lg">Attendance</CardTitle>
          <span className="text-sm text-gray-500">Jan 2024-Jun 2024</span>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CircularProgress 
            percentage={63}
            color="#15803d"
            subLabel="Attendance%"
          />
          <div className="text-center mt-4">
            <div className="text-2xl font-bold">63%</div>
            <div className="text-sm text-gray-500">Attendance Rate</div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-700"></div>
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm">Absent</span>
            </div>
          </div>
        </CardContent>
        <button 
          onClick={handleAttendanceDash}
          className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
          aria-label="View Attendance Dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
        </button>
      </Card>

      <Card className=" border-0 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Academic Progress</CardTitle>
          <Select 
            value={academicType}
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CircularProgress 
            percentage={academicData[academicType].percentage}
            color={academicData[academicType].color}
            subLabel={academicData[academicType].label}
          />
          <div className="text-center mt-4">
            <div className="text-2xl font-bold">{academicData[academicType].percentage}%</div>
            <div className="text-sm text-gray-500">{academicData[academicType].label}</div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: academicData[academicType].color }}></div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm">Pending</span>
            </div>
          </div>
        </CardContent>
        <button 
          onClick={handleAcademicDash}
          className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
          aria-label="View Academic Dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
        </button>
      </Card>

      <Card className=" border-0 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
        <CardHeader>
          <CardTitle className="text-lg">Mid Day Meal</CardTitle>
          <span className="text-sm text-gray-500">Jan 2024-Jun 2024</span>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <CircularProgress 
            percentage={29}
            color="#ef4444"
            subLabel="Meal Utilization"
          />
          <div className="text-center mt-4">
            <div className="text-2xl font-bold">29%</div>
            <div className="text-sm text-gray-500">Utilization Rate</div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Consumed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm">Unused</span>
            </div>
          </div>
        </CardContent>
        <button 
          onClick={handleMidDayMealDash}
          className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
          aria-label="View Meals Dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
        </button>
      </Card>
    </div>
  );
};

export default DashboardMetrics;