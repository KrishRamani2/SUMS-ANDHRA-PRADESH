
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../ui/tabs';
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Download,
  FileText,
  Filter,
  GraduationCap,
  LineChart,
  ListChecks,
  Medal,
  MessageSquare,
  PieChart,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  ThumbsUp,
  Zap,
  InfoIcon,
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Separator } from '../ui/separator';
import Header from './Header';

// Sample Data: Teachers Performance Metrics
const teachersData = [
  {
    id: 1,
    name: "Rahul Sharma",
    subject: "Mathematics",
    avatar: "/api/placeholder/32/32",
    department: "Science",
    joinedYear: 2018,
    performance: {
      studentProgress: 92,
      classAttendance: 98,
      parentFeedback: 4.7,
      peerRating: 4.5,
      administrationRating: 4.8,
      overallScore: 4.7
    },
    achievements: [
      { id: 1, title: "District Best Teacher Award", year: 2024 },
      { id: 2, title: "100% Pass Results in Board Exams", year: 2023 },
      { id: 3, title: "Mathematics Olympiad Mentor", year: 2023 }
    ],
    stats: {
      studentsHelped: 354,
      avgClassScore: 87,
      improvementRate: 24,
      extraClassesHeld: 32
    }
  },
  {
    id: 2,
    name: "Priya Patel",
    subject: "Science",
    avatar: "/api/placeholder/32/32",
    department: "Science",
    joinedYear: 2017,
    performance: {
      studentProgress: 88,
      classAttendance: 95,
      parentFeedback: 4.5,
      peerRating: 4.3,
      administrationRating: 4.6,
      overallScore: 4.5
    },
    achievements: [
      { id: 1, title: "Science Exhibition Coordinator", year: 2024 },
      { id: 2, title: "Research Paper Publication", year: 2023 }
    ],
    stats: {
      studentsHelped: 312,
      avgClassScore: 83,
      improvementRate: 21,
      extraClassesHeld: 28
    }
  },
  {
    id: 3,
    name: "Vikram Singh",
    subject: "History",
    avatar: "/api/placeholder/32/32",
    department: "Humanities",
    joinedYear: 2016,
    performance: {
      studentProgress: 90,
      classAttendance: 96,
      parentFeedback: 4.6,
      peerRating: 4.7,
      administrationRating: 4.4,
      overallScore: 4.6
    },
    achievements: [
      { id: 1, title: "Cultural Program Coordinator", year: 2024 },
      { id: 2, title: "History Book Author", year: 2022 }
    ],
    stats: {
      studentsHelped: 328,
      avgClassScore: 85,
      improvementRate: 22,
      extraClassesHeld: 25
    }
  },
  {
    id: 4,
    name: "Meera Desai",
    subject: "English",
    avatar: "/api/placeholder/32/32",
    department: "Languages",
    joinedYear: 2019,
    performance: {
      studentProgress: 95,
      classAttendance: 97,
      parentFeedback: 4.8,
      peerRating: 4.6,
      administrationRating: 4.7,
      overallScore: 4.8
    },
    achievements: [
      { id: 1, title: "State Level Best Teacher Award", year: 2024 },
      { id: 2, title: "English Language Workshop Facilitator", year: 2023 },
      { id: 3, title: "100% Pass Results for 3 Consecutive Years", year: 2022 }
    ],
    stats: {
      studentsHelped: 378,
      avgClassScore: 90,
      improvementRate: 26,
      extraClassesHeld: 38
    }
  },
  {
    id: 5,
    name: "Arjun Kumar",
    subject: "Physical Education",
    avatar: "/api/placeholder/32/32",
    department: "Sports",
    joinedYear: 2020,
    performance: {
      studentProgress: 87,
      classAttendance: 99,
      parentFeedback: 4.6,
      peerRating: 4.4,
      administrationRating: 4.5,
      overallScore: 4.5
    },
    achievements: [
      { id: 1, title: "District Sports Meet Coordinator", year: 2024 },
      { id: 2, title: "School Team Won State Championship", year: 2023 }
    ],
    stats: {
      studentsHelped: 290,
      avgClassScore: 88,
      improvementRate: 20,
      extraClassesHeld: 35
    }
  }
];

// Department Performance Data
const departmentPerformance = [
  { department: "Science", score: 92, lastYearScore: 88, teachers: 12 },
  { department: "Mathematics", score: 90, lastYearScore: 85, teachers: 8 },
  { department: "Languages", score: 94, lastYearScore: 90, teachers: 10 },
  { department: "Humanities", score: 87, lastYearScore: 84, teachers: 9 },
  { department: "Sports", score: 89, lastYearScore: 86, teachers: 4 }
];

// Recent Professional Development Activities
const professionalDevelopment = [
  { id: 1, title: "Teaching with Technology Workshop", participants: 25, date: "Feb 25, 2025", type: "workshop" },
  { id: 2, title: "Assessment Strategies Seminar", participants: 30, date: "Feb 15, 2025", type: "seminar" },
  { id: 3, title: "Child Psychology Course", participants: 18, date: "Jan 30, 2025", type: "course" },
  { id: 4, title: "Curriculum Development Program", participants: 22, date: "Jan 20, 2025", type: "program" }
];

// Monthly Performance Trend
const performanceTrend = [
  { month: "Sep 2024", avgScore: 85 },
  { month: "Oct 2024", avgScore: 86 },
  { month: "Nov 2024", avgScore: 88 },
  { month: "Dec 2024", avgScore: 87 },
  { month: "Jan 2025", avgScore: 90 },
  { month: "Feb 2025", avgScore: 91 }
];

// Recent Teaching Awards and Recognition
const recentAwards = [
  { id: 1, teacher: "Meera Desai", award: "State Level Best Teacher Award", date: "Feb 2025", highlight: true },
  { id: 2, teacher: "Rahul Sharma", award: "District Best Teacher Award", date: "Jan 2025", highlight: true },
  { id: 3, teacher: "Priya Patel", award: "Science Innovation Recognition", date: "Jan 2025", highlight: false },
  { id: 4, teacher: "Arjun Kumar", award: "Sports Achievement Award", date: "Dec 2024", highlight: false }
];

const TotalTeachersDash = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [topPerformer] = useState(teachersData.sort((a, b) => b.performance.overallScore - a.performance.overallScore)[0]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Teacher Performance Dashboard</h2>
              <p className="text-gray-600">Monday, March 02, 2025 | Govt. Higher Secondary School, Delhi</p>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <Button className="flex items-center">
                <FileText size={16} className="mr-2" />
                Export Report
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Departments</DropdownMenuItem>
                  <DropdownMenuItem>Science</DropdownMenuItem>
                  <DropdownMenuItem>Mathematics</DropdownMenuItem>
                  <DropdownMenuItem>Languages</DropdownMenuItem>
                  <DropdownMenuItem>Humanities</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Top Performer Highlight Card */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src="/api/placeholder/96/96" alt={topPerformer.name} />
                      <AvatarFallback className="text-2xl">{topPerformer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                      <Trophy size={16} className="text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start">
                    <h3 className="text-xl font-bold text-gray-800">{topPerformer.name}</h3>
                    <Badge className="ml-2 bg-yellow-500">Top Performer</Badge>
                  </div>
                  <p className="text-gray-600">{topPerformer.subject} Teacher | Since {topPerformer.joinedYear}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start mt-2 gap-2">
                    {topPerformer.achievements.slice(0, 2).map(achievement => (
                      <Badge key={achievement.id} variant="outline" className="bg-white">
                        {achievement.title}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex-shrink-0 bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-indigo-600">{topPerformer.performance.overallScore}</span>
                    <span className="text-gray-500 text-sm">/5.0</span>
                    <p className="text-xs text-gray-500">Overall Performance Score</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(topPerformer.performance.overallScore) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="overview" className="flex items-center">
                <PieChart size={16} className="mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="teachers" className="flex items-center">
                <Users size={16} className="mr-2" />
                Teachers
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center">
                <Award size={16} className="mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart3 size={16} className="mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Users size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Teachers</p>
                      <h3 className="text-2xl font-bold">43</h3>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        +3 from last semester
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Award size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Awards Received</p>
                      <h3 className="text-2xl font-bold">17</h3>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        +5 this academic year
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <BookOpen size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Performance</p>
                      <h3 className="text-2xl font-bold">4.3/5</h3>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        +0.3 from last year
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <GraduationCap size={24} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Training Completion</p>
                      <h3 className="text-2xl font-bold">92%</h3>
                      <p className="text-xs text-green-600 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        +7% from last cycle
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Performance & Recent Achievements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase size={18} className="mr-2" />
                      Department Performance
                    </CardTitle>
                    <CardDescription>Overall scores by academic department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentPerformance.map((dept) => (
                        <div key={dept.department} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="font-medium">{dept.department}</span>
                              <Badge variant="outline" className="ml-2 text-xs">{dept.teachers} teachers</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold">{dept.score}%</span>
                              <Badge variant="outline" className={dept.score > dept.lastYearScore ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                                {dept.score > dept.lastYearScore ? (
                                  <ArrowUpRight size={12} className="mr-1" />
                                ) : (
                                  <ArrowDownRight size={12} className="mr-1" />
                                )}
                                {Math.abs(dept.score - dept.lastYearScore)}%
                              </Badge>
                            </div>
                          </div>
                          <Progress value={dept.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy size={18} className="mr-2" />
                      Recent Awards & Recognition
                    </CardTitle>
                    <CardDescription>Recent achievements by our teachers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAwards.map((award) => (
                        <div key={award.id} className={`p-3 rounded-lg border ${award.highlight ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{award.award}</h4>
                              <p className="text-sm text-gray-600">Awarded to: {award.teacher}</p>
                            </div>
                            <div className="flex items-center justify-center">
                              {award.highlight && <Award size={20} className="text-yellow-500" />}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">{award.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Professional Development & Performance Trend */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap size={18} className="mr-2" />
                      Professional Development Activities
                    </CardTitle>
                    <CardDescription>Recent workshops and trainings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {professionalDevelopment.map((pd) => (
                        <div key={pd.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                          <div>
                            <h4 className="font-medium">{pd.title}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{pd.date}</span>
                              <Badge variant="outline">{pd.participants} participants</Badge>
                            </div>
                          </div>
                          <Badge className={
                            pd.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                            pd.type === 'seminar' ? 'bg-green-100 text-green-800' :
                            pd.type === 'course' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }>
                            {pd.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Development Programs</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart size={18} className="mr-2" />
                      Performance Trend
                    </CardTitle>
                    <CardDescription>Average teacher performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <div className="w-full space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Monthly Average Score</span>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            <TrendingUp size={12} className="mr-1" />
                            +6% in 6 months
                          </Badge>
                        </div>
                        
                        {/* Simplified Chart Visualization */}
                        <div className="relative pt-5">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            {performanceTrend.map((data, index) => (
                              <div key={index} className="text-center">
                                <div className="whitespace-nowrap">{data.month.split(' ')[0]}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="relative h-40">
                            <div className="absolute inset-0 flex items-end">
                              {performanceTrend.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                  <div 
                                    className="w-6 bg-indigo-500 rounded-t-sm" 
                                    style={{ height: `${(data.avgScore/100) * 100}%` }}
                                  ></div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-xs font-medium mt-1">
                            {performanceTrend.map((data, index) => (
                              <div key={index} className="text-center">{data.avgScore}%</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Teachers Tab Content */}
            <TabsContent value="teachers" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold">Teacher Performance Rankings</h3>
                  <Badge>43 Teachers</Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter size={14} className="mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download size={14} className="mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {teachersData.sort((a, b) => b.performance.overallScore - a.performance.overallScore).map((teacher, index) => (
                  <Card key={teacher.id} className={index === 0 ? "border-2 border-yellow-400" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/api/placeholder/32/32" alt={teacher.name} />
                            <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {index < 3 && (
                            <div className={`absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${
                              index === 0 ? "bg-yellow-500" : 
                              index === 1 ? "bg-gray-400" :
                              "bg-amber-700"
                            }`}>
                              {index + 1}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <h4 className="font-medium">{teacher.name}</h4>
                            <Badge variant="outline" className="ml-2">{teacher.subject}</Badge>
                            <div className="ml-2 flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className={i < Math.floor(teacher.performance.overallScore) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                            ))}
                            </div>
                            <span className="ml-1 text-sm font-medium">{teacher.performance.overallScore}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Student Progress</span>
                              <div className="flex items-center">
                                <Progress value={teacher.performance.studentProgress} className="h-1.5 flex-grow mr-2" />
                                <span className="text-xs font-medium">{teacher.performance.studentProgress}%</span>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Attendance</span>
                              <div className="flex items-center">
                                <Progress value={teacher.performance.classAttendance} className="h-1.5 flex-grow mr-2" />
                                <span className="text-xs font-medium">{teacher.performance.classAttendance}%</span>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Parent Feedback</span>
                              <div className="flex items-center">
                                <Progress value={teacher.performance.parentFeedback * 20} className="h-1.5 flex-grow mr-2" />
                                <span className="text-xs font-medium">{teacher.performance.parentFeedback}/5</span>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Admin Rating</span>
                              <div className="flex items-center">
                                <Progress value={teacher.performance.administrationRating * 20} className="h-1.5 flex-grow mr-2" />
                                <span className="text-xs font-medium">{teacher.performance.administrationRating}/5</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 hidden md:flex items-center space-x-1">
                          <div className="text-center px-3">
                            <div className="text-2xl font-bold">{teacher.stats.studentsHelped}</div>
                            <div className="text-xs text-gray-500">Students Helped</div>
                          </div>
                          <Separator orientation="vertical" className="h-10" />
                          <div className="text-center px-3">
                            <div className="text-2xl font-bold">{teacher.stats.avgClassScore}</div>
                            <div className="text-xs text-gray-500">Avg. Score</div>
                          </div>
                          <Separator orientation="vertical" className="h-10" />
                          <div className="text-center px-3">
                            <div className="flex items-center justify-center text-2xl font-bold text-green-600">
                              +{teacher.stats.improvementRate}%
                            </div>
                            <div className="text-xs text-gray-500">Improvement</div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="flex-shrink-0">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">Load More Teachers</Button>
              </div>
            </TabsContent>
            
            {/* Achievements Tab Content */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Teacher Achievements & Recognition</h3>
                  <p className="text-gray-600 text-sm">Celebrating excellence in teaching and mentorship</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        2024-2025
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>2024-2025</DropdownMenuItem>
                      <DropdownMenuItem>2023-2024</DropdownMenuItem>
                      <DropdownMenuItem>2022-2023</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachersData.flatMap(teacher => 
                  teacher.achievements.map(achievement => ({
                    achievementId: `${teacher.id}-${achievement.id}`, // Unique ID to avoid overwriting
                    teacherName: teacher.name,
                    teacherSubject: teacher.subject,
                    teacherAvatar: teacher.avatar,
                    title: achievement.title,
                    year: achievement.year
                  }))
                ).sort((a, b) => b.year - a.year).slice(0, 9).map((achievement) => (
                  <Card key={achievement.achievementId} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-white text-indigo-600">{achievement.year}</Badge>
                          <Medal size={24} className="text-yellow-300" />
                        </div>
                        <h4 className="mt-2 text-white font-bold">{achievement.title}</h4>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={achievement.teacherAvatar} alt={achievement.teacherName} />
                            <AvatarFallback>{achievement.teacherName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{achievement.teacherName}</div>
                            <div className="text-sm text-gray-500">{achievement.teacherSubject} Teacher</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <Button variant="ghost" size="sm" className="text-indigo-600">
                            View Details
                          </Button>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon">
                              <ThumbsUp size={14} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MessageSquare size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">View All Achievements</Button>
              </div>
            </TabsContent>
            
            {/* Analytics Tab Content */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">Performance Analytics</h3>
                  <p className="text-gray-600 text-sm">Detailed metrics and insights</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <RefreshCcw size={14} className="mr-1" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download size={14} className="mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertTitle>Analytics Overview</AlertTitle>
                <AlertDescription>
                  This dashboard shows aggregated performance metrics for all teachers. 
                  Data is updated daily and reflects the current academic year.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart size={18} className="mr-2" />
                      Performance Metrics Distribution
                    </CardTitle>
                    <CardDescription>Breakdown of teacher evaluation categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Student Progress</span>
                              <span className="font-medium">89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Class Attendance</span>
                              <span className="font-medium">94%</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Learning Materials</span>
                              <span className="font-medium">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Admin Rating</span>
                              <span className="font-medium">4.6/5</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Parent Feedback</span>
                              <span className="font-medium">4.3/5</span>
                            </div>
                            <Progress value={86} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Peer Rating</span>
                              <span className="font-medium">4.5/5</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ListChecks size={18} className="mr-2" />
                      Performance Improvement Areas
                    </CardTitle>
                    <CardDescription>Areas needing additional support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="bg-red-100 p-2 rounded-full">
                              <ArrowDownRight size={16} className="text-red-600" />
                            </div>
                            <h4 className="font-medium">Technology Integration</h4>
                          </div>
                          <Badge variant="outline" className="bg-red-100 text-red-800">-5%</Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          Decline in effective use of educational technology in classrooms
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="bg-amber-100 p-2 rounded-full">
                              <ArrowDownRight size={16} className="text-amber-600" />
                            </div>
                            <h4 className="font-medium">Personalized Learning</h4>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">-3%</Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          Slight decrease in customization of learning paths for individual students
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="bg-amber-100 p-2 rounded-full">
                              <ArrowDownRight size={16} className="text-amber-600" />
                            </div>
                            <h4 className="font-medium">Assessment Variety</h4>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800">-2%</Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          Need for more diverse assessment methods beyond traditional testing
                        </p>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        View Improvement Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 size={18} className="mr-2" />
                    Cross-Department Performance Comparison
                  </CardTitle>
                  <CardDescription>
                    Comparing key metrics across different academic departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Department</th>
                          <th className="text-center py-3 px-4">Teachers</th>
                          <th className="text-center py-3 px-4">Avg. Score</th>
                          <th className="text-center py-3 px-4">Student Progress</th>
                          <th className="text-center py-3 px-4">Parent Rating</th>
                          <th className="text-center py-3 px-4">Awards</th>
                          <th className="text-center py-3 px-4">Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">Science</td>
                          <td className="text-center py-3 px-4">12</td>
                          <td className="text-center py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">4.7/5</Badge>
                          </td>
                          <td className="text-center py-3 px-4">92%</td>
                          <td className="text-center py-3 px-4">4.5/5</td>
                          <td className="text-center py-3 px-4">7</td>
                          <td className="text-center py-3 px-4 text-green-600">+6%</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">Mathematics</td>
                          <td className="text-center py-3 px-4">8</td>
                          <td className="text-center py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">4.5/5</Badge>
                          </td>
                          <td className="text-center py-3 px-4">90%</td>
                          <td className="text-center py-3 px-4">4.4/5</td>
                          <td className="text-center py-3 px-4">5</td>
                          <td className="text-center py-3 px-4 text-green-600">+5%</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">Languages</td>
                          <td className="text-center py-3 px-4">10</td>
                          <td className="text-center py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">4.8/5</Badge>
                          </td>
                          <td className="text-center py-3 px-4">94%</td>
                          <td className="text-center py-3 px-4">4.6/5</td>
                          <td className="text-center py-3 px-4">8</td>
                          <td className="text-center py-3 px-4 text-green-600">+7%</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">Humanities</td>
                          <td className="text-center py-3 px-4">9</td>
                          <td className="text-center py-3 px-4">
                            <Badge variant="outline" className="bg-amber-100 text-amber-800">4.3/5</Badge>
                          </td>
                          <td className="text-center py-3 px-4">87%</td>
                          <td className="text-center py-3 px-4">4.2/5</td>
                          <td className="text-center py-3 px-4">4</td>
                          <td className="text-center py-3 px-4 text-green-600">+3%</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">Sports</td>
                          <td className="text-center py-3 px-4">4</td>
                          <td className="text-center py-3 px-4">
                            <Badge variant="outline" className="bg-green-100 text-green-800">4.5/5</Badge>
                          </td>
                          <td className="text-center py-3 px-4">89%</td>
                          <td className="text-center py-3 px-4">4.6/5</td>
                          <td className="text-center py-3 px-4">3</td>
                          <td className="text-center py-3 px-4 text-green-600">+5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TotalTeachersDash;