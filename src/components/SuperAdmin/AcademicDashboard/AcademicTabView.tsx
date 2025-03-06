/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { School, BookOpen, LineChart, LayoutGrid, List, CalendarClock, Cctv, Video, Users } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

// Define interfaces for type safety
interface School {
  name: string;
  district: string;
  address: string;
  attendance: string;
  academicScore: number;
  progress: string;
  lastAssessment: string;
  subjects: SubjectPerformance[];
  cctvStatus: "online" | "offline" | "maintenance";
}

interface SubjectPerformance {
  name: string;
  score: number;
  change: number;
}

interface ProgressData {
  month: string;
  mathScore: number;
  scienceScore: number;
  languageScore: number;
}

const AcademicDashboard = () => {
  const [viewMode, setViewMode] = useState<'tile' | 'table'>('tile');
  const [_activeTab, setActiveTab] = useState<string>('overview'); // Kept for Tabs component
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const navigate = useNavigate();
  const state = 'state';
  const year = 2025;

  const handleSubjectPerformanceClick = (school: School): void => {
    navigate(`/academics/${state}/${school.district}/${year}/subject-performance/${encodeURIComponent(school.name)}`);
  };

  const handleAttendanceClick = (school: School): void => {
    navigate(`/super-admin/${state}/${school.district}/${year}/attendance-dashboard`);
  };

  const handleProgressDashboardClick = (_school: School): void => {
    navigate(`/super-admin/progress/dashboard`);
  };

  const handleCctvClick = (school: School): void => {
    navigate(`/super-admin/cctv/dashboard/${state}/${school.district}/${year}/${encodeURIComponent(school.name)}`);
  };

  const handleTeachersClick = (): void => {
    navigate(`/super-admin/teachers/dashboard`);
  };

  // Get district name for title
  const getDistrictName = () => {
    if (selectedDistrict === "all") return "All Districts";
    return selectedDistrict.toUpperCase();
  };

  const schools: School[] = [
    {
      "name": "Delhi Public School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Steel Plant Township, Visakhapatnam, Andhra Pradesh 530032",
      "attendance": "94.2%",
      "academicScore": 92.3,
      "progress": "Excellent",
      "lastAssessment": "Feb 15, 2025",
      "cctvStatus": "online",
      "subjects": [
        { "name": "Mathematics", "score": 90, "change": 5 },
        { "name": "Science", "score": 93, "change": 4 },
        { "name": "Language", "score": 95, "change": 3 }
      ]
    },
    {
      "name": "Sri Chaitanya School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Gajuwaka, Visakhapatnam, Andhra Pradesh 530026",
      "attendance": "90.5%",
      "academicScore": 89.1,
      "progress": "Above Average",
      "lastAssessment": "Feb 15, 2025",
      "cctvStatus": "online",
      "subjects": [
        { "name": "Mathematics", "score": 87, "change": 4 },
        { "name": "Science", "score": 90, "change": 3 },
        { "name": "Language", "score": 92, "change": 2 }
      ]
    },
    {
      "name": "Narayana e-Techno School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "MVP Colony, Visakhapatnam, Andhra Pradesh 530017",
      "attendance": "89.3%",
      "academicScore": 87.5,
      "progress": "Good",
      "lastAssessment": "Feb 15, 2025",
      "cctvStatus": "online",
      "subjects": [
        { "name": "Mathematics", "score": 85, "change": 3 },
        { "name": "Science", "score": 88, "change": 2 },
        { "name": "Language", "score": 90, "change": 1 }
      ]
    },
    {
      "name": "Bhashyam School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Seethammadhara, Visakhapatnam, Andhra Pradesh 530013",
      "attendance": "88.0%",
      "academicScore": 86.0,
      "progress": "Good",
      "lastAssessment": "Feb 15, 2025",
      "cctvStatus": "online",
      "subjects": [
        { "name": "Mathematics", "score": 83, "change": 2 },
        { "name": "Science", "score": 86, "change": 1 },
        { "name": "Language", "score": 89, "change": 0 }
      ]
    },
    {
      "name": "Oakridge International School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Tagarapuvalasa, Visakhapatnam, Andhra Pradesh 531162",
      "attendance": "87.1%",
      "academicScore": 84.5,
      "progress": "Average",
      "lastAssessment": "Feb 15, 2025",
      "cctvStatus": "online",
      "subjects": [
        { "name": "Mathematics", "score": 80, "change": 2 },
        { "name": "Science", "score": 85, "change": 1 },
        { "name": "Language", "score": 87, "change": -1 }
      ]
    }
  ];
  
  const progressData: ProgressData[] = [
    { month: 'Sep', mathScore: 72, scienceScore: 68, languageScore: 75 },
    { month: 'Oct', mathScore: 78, scienceScore: 74, languageScore: 79 },
    { month: 'Nov', mathScore: 81, scienceScore: 76, languageScore: 82 },
    { month: 'Dec', mathScore: 85, scienceScore: 82, languageScore: 85 },
    { month: 'Jan', mathScore: 89, scienceScore: 85, languageScore: 88 },
    { month: 'Feb', mathScore: 92, scienceScore: 89, languageScore: 91 }
  ];

  const getProgressColor = (progress: string) => {
    switch(progress) {
      case 'Excellent': return 'bg-green-700 hover:bg-green-800';
      case 'Above Average': return 'bg-blue-700 hover:bg-blue-800';
      case 'Average': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'Below Average': return 'bg-orange-600 hover:bg-orange-700';
      case 'Needs Improvement': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getCctvStatusColor = (status: School["cctvStatus"]) => {
    switch(status) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'maintenance': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  const getCctvStatusText = (status: School["cctvStatus"]) => {
    switch(status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) return <span className="text-green-600">↑{change}%</span>;
    if (change < 0) return <span className="text-red-600">↓{Math.abs(change)}%</span>;
    return <span className="text-gray-600">-</span>;
  };

  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>School Name</TableHead>
          <TableHead>District</TableHead>
          <TableHead className="text-center">Academic Score</TableHead>
          <TableHead className="text-center">Attendance</TableHead>
          <TableHead className="text-center">Progress</TableHead>
          <TableHead className="text-center">Last Assessment</TableHead>
          <TableHead className="text-center">CCTV Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schools.map((school, index) => (
          <TableRow key={index}>
            <TableCell className="flex items-center gap-2">
              <School className="h-4 w-4" />
              {school.name}
            </TableCell>
            <TableCell>{school.district}</TableCell>
            <TableCell className="text-center font-medium">
              {school.academicScore}%
            </TableCell>
            <TableCell 
              className="text-center cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handleAttendanceClick(school)}
            >
              {school.attendance}
            </TableCell>
            <TableCell className="text-center">
              <Badge 
                variant="secondary" 
                className={`text-white cursor-pointer transition-colors ${getProgressColor(school.progress)}`}
                onClick={() => handleProgressDashboardClick(school)}
              >
                {school.progress}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex items-center justify-center gap-1">
                <CalendarClock className="h-3 w-3" />
                <span>{school.lastAssessment}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div 
                className={`flex items-center justify-center gap-1 cursor-pointer hover:underline ${getCctvStatusColor(school.cctvStatus)}`}
                onClick={() => handleCctvClick(school)}
              >
                <Cctv className="h-4 w-4" />
                <span>{getCctvStatusText(school.cctvStatus)}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSubjectPerformanceClick(school)}
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Subjects
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCctvClick(school)}
                >
                  <Video className="h-3 w-3 mr-1" />
                  CCTV
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const TileView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {schools.map((school, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <School className="h-4 w-4" />
                <CardTitle className="text-sm font-medium">{school.name}</CardTitle>
              </div>
              <Badge 
                variant="secondary" 
                className={`text-white ${getProgressColor(school.progress)}`}
              >
                {school.progress}
              </Badge>
            </div>
            <CardDescription className="text-xs mt-1">{school.district}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-medium text-gray-500">Academic Score</p>
                  <p className="text-lg font-bold">{school.academicScore}%</p>
                </div>
                <div 
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleAttendanceClick(school)}
                >
                  <p className="text-xs font-medium text-gray-500">Attendance</p>
                  <p className="text-lg font-bold">{school.attendance}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-gray-500">Subject Performance</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2 text-xs"
                    onClick={() => handleSubjectPerformanceClick(school)}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-2">
                  {school.subjects.map((subject, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">{subject.score}%</span>
                        <span className="text-xs">{getChangeIndicator(subject.change)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <CalendarClock className="h-3 w-3" />
                    <span className="text-xs">{school.lastAssessment}</span>
                  </div>
                  <div 
                    className={`flex items-center gap-1 cursor-pointer hover:underline ${getCctvStatusColor(school.cctvStatus)}`}
                    onClick={() => handleCctvClick(school)}
                  >
                    <Cctv className="h-4 w-4" />
                    <span className="text-xs">{getCctvStatusText(school.cctvStatus)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleProgressDashboardClick(school)}
                >
                  <LineChart className="h-3 w-3 mr-1" />
                  Progress
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCctvClick(school)}
                >
                  <Video className="h-3 w-3 mr-1" />
                  View CCTV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const AcademicProgressChart = () => (
    <Card>
      <CardHeader>
        <CardTitle>Academic Performance Trends</CardTitle>
        <CardDescription>Average scores across key subjects for the past 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[50, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mathScore" 
                name="Mathematics"
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="scienceScore" 
                name="Science"
                stroke="#10b981" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="languageScore" 
                name="Language"
                stroke="#8b5cf6" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const PerformanceMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Average Academic Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-bold">89.8%</p>
            <p className="text-sm text-green-600">+4.2%</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to previous term</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Average Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-bold">94.1%</p>
            <p className="text-sm text-green-600">+1.8%</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Compared to previous term</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Top Performing Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-bold">Language</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">91.5% average score</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">CCTV Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-1">
            <p className="text-3xl font-bold">75%</p>
            <p className="text-xs text-amber-600 mt-1">(3/4 schools operational)</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-xs text-green-600"><div className="h-2 w-2 rounded-full bg-green-600 mr-1"></div>Online: 2</span>
            <span className="flex items-center text-xs text-amber-600"><div className="h-2 w-2 rounded-full bg-amber-600 mr-1"></div>Maintenance: 1</span>
            <span className="flex items-center text-xs text-red-600"><div className="h-2 w-2 rounded-full bg-red-600 mr-1"></div>Offline: 1</span>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={handleTeachersClick}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-3xl font-bold">128</p>
              <p className="text-xs text-gray-500 mt-1">Across all schools</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SubjectPerformance = () => (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance Analysis</CardTitle>
        <CardDescription>Average score by subject across all schools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={[
                { subject: "Mathematics", score: 88.5 },
                { subject: "Science", score: 86.2 },
                { subject: "Language", score: 91.5 },
                { subject: "Social Studies", score: 85.7 },
                { subject: "Computer Science", score: 89.3 }
              ]}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[70, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );

  const CctvStatusView = () => (
    <Card>
      <CardHeader>
        <CardTitle>CCTV Status Overview</CardTitle>
        <CardDescription>Monitoring status across all schools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Last Checked</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    <School className="h-4 w-4" />
                    {school.name}
                  </TableCell>
                  <TableCell>{school.district}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`${getCctvStatusColor(school.cctvStatus)}`}
                    >
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${school.cctvStatus === 'online' ? 'bg-green-600' : school.cctvStatus === 'maintenance' ? 'bg-amber-600' : 'bg-red-600'}`}></div>
                        {getCctvStatusText(school.cctvStatus)}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {school.lastAssessment}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCctvClick(school)}
                    >
                      <Video className="h-3 w-3 mr-1" />
                      View Feeds
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{getDistrictName()}</h2>
          <p className="text-gray-500">Performance metrics for schools in the district</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border rounded-md">
            <Button
              variant={viewMode === 'tile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tile')}
              className="px-3"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Select 
            defaultValue="all" 
            onValueChange={(value) => setSelectedDistrict(value)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="narsipatnam">Narsipatnam</SelectItem>
              <SelectItem value="koyyuru">Koyyuru</SelectItem>
              <SelectItem value="kakinada">Kakinada</SelectItem>
              <SelectItem value="vijayawada">Vijayawada</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2025">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2024-2025</SelectItem>
              <SelectItem value="2024">2023-2024</SelectItem>
              <SelectItem value="2023">2022-2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="cctv">CCTV Monitoring</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <PerformanceMetrics />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AcademicProgressChart />
            <SubjectPerformance />
          </div>
        </TabsContent>
        
        <TabsContent value="schools" className="space-y-6 mt-6">
          {viewMode === 'tile' ? (
            <TileView />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <TableView />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Subject Performance by School</CardTitle>
                <CardDescription>Comparing scores across schools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={schools.map(school => ({
                        name: school.name.split(',')[0],
                        Mathematics: school.subjects.find(s => s.name === 'Mathematics')?.score || 0,
                        Science: school.subjects.find(s => s.name === 'Science')?.score || 0,
                        Language: school.subjects.find(s => s.name === 'Language')?.score || 0
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[50, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Bar dataKey="Mathematics" fill="#3b82f6" name="Mathematics" />
                      <Bar dataKey="Science" fill="#10b981" name="Science" />
                      <Bar dataKey="Language" fill="#8b5cf6" name="Language" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Schools</CardTitle>
                <CardDescription>By academic score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...schools]
                    .sort((a, b) => b.academicScore - a.academicScore)
                    .map((school, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-700 h-8 w-8 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{school.name.split(',')[0]}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{school.district}</p>
                            <p className="text-sm font-bold">{school.academicScore}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cctv" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 gap-6">
            <CctvStatusView />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {schools.map((school, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{school.name}</CardTitle>
                    <div className={`flex items-center gap-1 ${getCctvStatusColor(school.cctvStatus)}`}>
                      <Cctv className="h-4 w-4" />
                      <span className="text-xs">{getCctvStatusText(school.cctvStatus)}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 h-36 rounded-md flex items-center justify-center">
                      {school.cctvStatus === 'online' ? (
                        <div className="text-center">
                          <Video className="h-10 w-10 mx-auto text-blue-600" />
                          <p className="text-sm mt-2">Live Feed Available</p>
                        </div>
                      ) : school.cctvStatus === 'maintenance' ? (
                        <div className="text-center">
                          <Video className="h-10 w-10 mx-auto text-amber-600" />
                          <p className="text-sm mt-2">Under Maintenance</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Video className="h-10 w-10 mx-auto text-red-600" />
                          <p className="text-sm mt-2">Feed Unavailable</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => handleCctvClick(school)}
                        disabled={school.cctvStatus !== 'online'}
                      >
                        <Video className="h-3 w-3 mr-1" />
                        {school.cctvStatus === 'online' ? 'View Live Feed' : 'Feed Unavailable'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicDashboard;