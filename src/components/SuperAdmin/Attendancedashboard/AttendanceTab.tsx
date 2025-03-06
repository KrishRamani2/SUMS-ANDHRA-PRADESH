import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Grid, List, Cctv, MapPin, BookOpen, TrendingUp, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

// Types
interface AttendanceData {
  present: number;
  total: number;
  percentage: number;
  trend: number[];
  weeklyData: { name: string; attendance: number }[];
}

interface School {
  id: number;
  name: string;
  location: string;
  coordinates: string;
  type: string;
  isActive: boolean;
  attendance: AttendanceData;
  state: string;
  district: string;
  year: string;
  academicProgress: {
    completed: number;
    total: number;
  };
  logo?: string;
}

// Updated schoolsData with Andhra Pradesh districts
const schoolsData: School[] = [
  // Visakhapatnam District
  {
    id: 1,
    name: "Visakha Valley School",
    location: "Visakhapatnam",
    coordinates: "17.6868°N, 83.2185°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 925,
      total: 1000,
      percentage: 92.5,
      trend: [90, 91, 92, 93, 91, 94, 92.5],
      weeklyData: [
        { name: "Mon", attendance: 91 },
        { name: "Tue", attendance: 92 },
        { name: "Wed", attendance: 93 },
        { name: "Thu", attendance: 91 },
        { name: "Fri", attendance: 94 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "Visakhapatnam",
    year: "2023-24",
    academicProgress: {
      completed: 85,
      total: 100
    }
  },
  {
    id: 2,
    name: "Navy Children School",
    location: "Visakhapatnam",
    coordinates: "17.7212°N, 83.3067°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 897,
      total: 1000,
      percentage: 89.7,
      trend: [88, 89, 90, 87, 89, 91, 89.7],
      weeklyData: [
        { name: "Mon", attendance: 88 },
        { name: "Tue", attendance: 89 },
        { name: "Wed", attendance: 90 },
        { name: "Thu", attendance: 87 },
        { name: "Fri", attendance: 91 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "Visakhapatnam",
    year: "2023-24",
    academicProgress: {
      completed: 80,
      total: 100
    }
  },

  // Guntur District
  {
    id: 3,
    name: "Bhashyam Public School",
    location: "Guntur",
    coordinates: "16.3067°N, 80.4365°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 912,
      total: 1000,
      percentage: 91.2,
      trend: [89, 90, 91, 92, 90, 93, 91.2],
      weeklyData: [
        { name: "Mon", attendance: 90 },
        { name: "Tue", attendance: 91 },
        { name: "Wed", attendance: 92 },
        { name: "Thu", attendance: 90 },
        { name: "Fri", attendance: 93 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "Guntur",
    year: "2023-24",
    academicProgress: {
      completed: 82,
      total: 100
    }
  },
  {
    id: 4,
    name: "Nalanda Vidyalaya",
    location: "Guntur",
    coordinates: "16.2981°N, 80.4393°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 885,
      total: 1000,
      percentage: 88.5,
      trend: [87, 88, 89, 87, 88, 90, 88.5],
      weeklyData: [
        { name: "Mon", attendance: 87 },
        { name: "Tue", attendance: 88 },
        { name: "Wed", attendance: 89 },
        { name: "Thu", attendance: 87 },
        { name: "Fri", attendance: 90 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "Guntur",
    year: "2023-24",
    academicProgress: {
      completed: 78,
      total: 100
    }
  },

  // Krishna District
  {
    id: 5,
    name: "NSM Public School",
    location: "Vijayawada",
    coordinates: "16.5062°N, 80.6480°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 908,
      total: 1000,
      percentage: 90.8,
      trend: [89, 90, 91, 89, 90, 92, 90.8],
      weeklyData: [
        { name: "Mon", attendance: 89 },
        { name: "Tue", attendance: 90 },
        { name: "Wed", attendance: 91 },
        { name: "Thu", attendance: 89 },
        { name: "Fri", attendance: 92 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "Krishna",
    year: "2023-24",
    academicProgress: {
      completed: 83,
      total: 100
    }
  },
  {
    id: 6,
    name: "Sri Chaitanya School",
    location: "Vijayawada",
    coordinates: "16.5148°N, 80.6324°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 891,
      total: 1000,
      percentage: 89.1,
      trend: [87, 88, 89, 90, 88, 91, 89.1],
      weeklyData: [
        { name: "Mon", attendance: 87 },
        { name: "Tue", attendance: 88 },
        { name: "Wed", attendance: 89 },
        { name: "Thu", attendance: 90 },
        { name: "Fri", attendance: 91 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "Krishna",
    year: "2023-24",
    academicProgress: {
      completed: 79,
      total: 100
    }
  },

  // East Godavari District
  {
    id: 7,
    name: "Aditya Public School",
    location: "Kakinada",
    coordinates: "16.9891°N, 82.2475°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 915,
      total: 1000,
      percentage: 91.5,
      trend: [90, 91, 92, 91, 90, 93, 91.5],
      weeklyData: [
        { name: "Mon", attendance: 90 },
        { name: "Tue", attendance: 91 },
        { name: "Wed", attendance: 92 },
        { name: "Thu", attendance: 91 },
        { name: "Fri", attendance: 93 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "East Godavari",
    year: "2023-24",
    academicProgress: {
      completed: 84,
      total: 100
    }
  },
  {
    id: 8,
    name: "Bharatiya Vidya Bhavan",
    location: "Rajahmundry",
    coordinates: "17.0005°N, 81.8040°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 899,
      total: 1000,
      percentage: 89.9,
      trend: [88, 89, 90, 88, 89, 91, 89.9],
      weeklyData: [
        { name: "Mon", attendance: 88 },
        { name: "Tue", attendance: 89 },
        { name: "Wed", attendance: 90 },
        { name: "Thu", attendance: 88 },
        { name: "Fri", attendance: 91 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "East Godavari",
    year: "2023-24",
    academicProgress: {
      completed: 81,
      total: 100
    }
  },

  // West Godavari District
  {
    id: 9,
    name: "Sir C.R. Reddy Public School",
    location: "Eluru",
    coordinates: "16.7107°N, 81.0952°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 903,
      total: 1000,
      percentage: 90.3,
      trend: [89, 90, 91, 89, 90, 92, 90.3],
      weeklyData: [
        { name: "Mon", attendance: 89 },
        { name: "Tue", attendance: 90 },
        { name: "Wed", attendance: 91 },
        { name: "Thu", attendance: 89 },
        { name: "Fri", attendance: 92 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "West Godavari",
    year: "2023-24",
    academicProgress: {
      completed: 82,
      total: 100
    }
  },
  {
    id: 10,
    name: "Montessori School",
    location: "Bhimavaram",
    coordinates: "16.5449°N, 81.5212°E",
    type: "Private",
    isActive: true,
    attendance: {
      present: 886,
      total: 1000,
      percentage: 88.6,
      trend: [87, 88, 89, 87, 88, 90, 88.6],
      weeklyData: [
        { name: "Mon", attendance: 87 },
        { name: "Tue", attendance: 88 },
        { name: "Wed", attendance: 89 },
        { name: "Thu", attendance: 87 },
        { name: "Fri", attendance: 90 }
      ]
    },
    state: "ANDHRA PRADESH",
    district: "West Godavari",
    year: "2023-24",
    academicProgress: {
      completed: 77,
      total: 100
    }
  }
];

// Compact Premium Tile View Component
const PremiumTileView: React.FC<{ school: School; onSchoolSelect: (school: School) => void; onCCTVRedirect: (schoolId: number) => void }> = ({ school, onSchoolSelect, onCCTVRedirect }) => {
  const percentage = Math.round(school.attendance.percentage);
  const progressPercentage = (school.academicProgress.completed / school.academicProgress.total) * 100;

  return (
    <Card className="h-36 bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden border border-gray-100" onClick={() => onSchoolSelect(school)}>
      <CardContent className="p-3 flex flex-col h-full relative">
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={e => e.stopPropagation()}>
              <MoreVertical className="h-4 w-4 text-gray-600 hover:text-gray-800" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onSchoolSelect(school)}>Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCCTVRedirect(school.id)}>CCTV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mr-2">
            <span className="text-white text-sm font-bold">{school.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{school.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs bg-blue-50 text-blue-700 border-blue-200">{school.location}</Badge>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-gray-500" />
            <span className="truncate max-w-[100px]">{school.coordinates.split(',')[0]}</span>
          </div>
          <span className="font-medium text-blue-600">{percentage}%</span>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <div className="flex items-center gap-2">
            <Users className="h-3 w-3 text-indigo-500" />
            <span>{school.attendance.present}/{school.attendance.total}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-indigo-500" />
            <span>{progressPercentage}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">Progress</span>
          <Progress value={progressPercentage} className="h-1 w-3/4" />
        </div>
        <div className="h-6 mt-1">
          <ResponsiveContainer>
            <LineChart data={school.attendance.trend.map((value, index) => ({ day: index + 1, value }))}>
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={1} dot={false} />
              <Tooltip formatter={(value) => [`${value}%`, 'Attendance Trend']} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Table View Component
const TableView: React.FC<{ schools: School[]; onSchoolSelect: (school: School) => void; onCCTVRedirect: (schoolId: number) => void }> = ({ schools, onSchoolSelect, onCCTVRedirect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">School</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">District</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Location</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Present/Total</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Attendance</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trend</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => onSchoolSelect(school)}>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{school.name.charAt(0)}</span>
                    </div>
                    <div className="font-medium text-sm">{school.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{school.district}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{school.location}</td>
                <td className="px-4 py-3 text-sm text-center">{school.attendance.present}/{school.attendance.total}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <div className="w-16 text-center px-2 py-1 text-xs font-medium rounded-full" style={{
                      backgroundColor: school.attendance.percentage >= 95 ? '#dcfce7' : 
                                      school.attendance.percentage >= 85 ? '#dbeafe' : 
                                      school.attendance.percentage >= 75 ? '#fef9c3' : '#fee2e2',
                      color: school.attendance.percentage >= 95 ? '#15803d' : 
                             school.attendance.percentage >= 85 ? '#1d4ed8' : 
                             school.attendance.percentage >= 75 ? '#ca8a04' : '#b91c1c'
                    }}>
                      {school.attendance.percentage}%
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-8 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={school.attendance.trend.map((value, index) => ({ day: index + 1, value }))}>
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => onSchoolSelect(school)}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                      onClick={() => onCCTVRedirect(school.id)}
                    >
                      <Cctv className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Dashboard Summary Cards
const DashboardSummary: React.FC<{ schools: School[] }> = ({ schools }) => {
  const navigate = useNavigate();
  
  const totalStudents = schools.reduce((sum, school) => sum + school.attendance.total, 0);
  const presentStudents = schools.reduce((sum, school) => sum + school.attendance.present, 0);
  const averageAttendance = (presentStudents / totalStudents) * 100;
  
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const weeklyData = weekdays.map(day => {
    const attendanceSum = schools.reduce((sum, school) => {
      const dayData = school.attendance.weeklyData.find(d => d.name === day);
      return sum + (dayData ? dayData.attendance : 0);
    }, 0);
    return {
      name: day,
      attendance: Math.round(attendanceSum / schools.length)
    };
  });

  const handleStudentDashboardClick = () => {
    navigate('/super-admin/student/dashboard');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleStudentDashboardClick}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
          <div className="mt-2 text-xs text-gray-500">Across {schools.length} schools</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Present Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{presentStudents.toLocaleString()}</div>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {averageAttendance.toFixed(1)}% Average
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Weekly Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Component
const SchoolDashboard: React.FC = () => {
  const [viewType, setViewType] = useState<'table' | 'tile'>('tile');
  const navigate = useNavigate();

  const handleSchoolSelect = (school: School) => {
    const url = `/super-admin/dashboard/${encodeURIComponent(school.state)}/${encodeURIComponent(school.district)}/${encodeURIComponent(school.year)}/${encodeURIComponent(school.name)}`;
    navigate(url);
  };

  const handleCCTVRedirect = (schoolId: number) => {
    const school = schoolsData.find(s => s.id === schoolId);
    if (!school) return;
    
    const url = `/super-admin/cctv/dashboard/${encodeURIComponent(school.state)}/${encodeURIComponent(school.district)}/${encodeURIComponent(school.year)}/${encodeURIComponent(school.name)}`;
    navigate(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">School Attendance Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === 'tile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('tile')}
              className="h-9"
            >
              <Grid className="h-4 w-4 mr-1" />
              Tile View
            </Button>
            <Button
              variant={viewType === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('table')}
              className="h-9"
            >
              <List className="h-4 w-4 mr-1" />
              Table View
            </Button>
          </div>
        </div>
        
        <DashboardSummary schools={schoolsData} />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Top Performing Schools</h2>
          
          {viewType === 'tile' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolsData.map((school) => (
                <PremiumTileView 
                  key={school.id} 
                  school={school}
                  onSchoolSelect={handleSchoolSelect}
                  onCCTVRedirect={handleCCTVRedirect}
                />
              ))}
            </div>
          ) : (
            <TableView 
              schools={schoolsData}
              onSchoolSelect={handleSchoolSelect}
              onCCTVRedirect={handleCCTVRedirect}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={schoolsData[0].attendance.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pt-4">
                  <svg viewBox="0 0 100 100" className="w-48 h-48 mx-auto">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray={`${90.2 * 2.83} ${100 * 2.83}`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="10"
                      strokeDasharray={`${9.8 * 2.83} ${100 * 2.83}`}
                      transform="rotate(255.6 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold">90.2%</span>
                      <div className="text-gray-500 text-sm">Present</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="text-sm">Present %</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Absent %</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;