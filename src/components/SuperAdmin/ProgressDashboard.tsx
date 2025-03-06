 
import  { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Trophy,
  Users,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Search,
  Filter,
  Award,
  UserPlus,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ProgressDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  // Sample data
  const classPerformanceData = [
    { name: "Class 6A", average: 87, previous: 82, topScore: 98, students: 32, teacher: "Ms. Sharma" },
    { name: "Class 6B", average: 82, previous: 84, topScore: 96, students: 30, teacher: "Mr. Verma" },
    { name: "Class 7A", average: 85, previous: 80, topScore: 97, students: 33, teacher: "Mrs. Nair" },
    { name: "Class 7B", average: 79, previous: 81, topScore: 95, students: 31, teacher: "Mr. Iyer" },
    { name: "Class 8A", average: 88, previous: 85, topScore: 99, students: 34, teacher: "Dr. Reddy" },
    { name: "Class 8B", average: 83, previous: 79, topScore: 94, students: 32, teacher: "Ms. Mehta" }
  ];
  
  const topperData = [
    { id: 1, name: "Riya Gupta", class: "Class 8A", score: 99, subjects: ["Mathematics", "Science", "English"] },
    { id: 2, name: "Arjun Kumar", class: "Class 6A", score: 98, subjects: ["Science", "Social Studies", "Art"] },
    { id: 3, name: "Sneha Reddy", class: "Class 7A", score: 97, subjects: ["English", "Mathematics", "Music"] },
    { id: 4, name: "Rohan Singh", class: "Class 6B", score: 96, subjects: ["Physical Education", "Science", "Mathematics"] },
    { id: 5, name: "Ananya Iyer", class: "Class 7B", score: 95, subjects: ["Social Studies", "English", "Art"] }
  ];
  
  const teacherData = [
    { id: 1, name: "Ms. Sharma", class: "Class 6A", experience: 8, education: "M.COM", subjects: ["Mathematics", "Science"] },
    { id: 2, name: "Mr. Verma", class: "Class 6B", experience: 12, education: "BBA", subjects: ["English", "Social Studies"] },
    { id: 3, name: "Mrs. Nair", class: "Class 7A", experience: 7, education: "M.COM", subjects: ["Science", "Computer Science"] },
    { id: 4, name: "Mr. Iyer", class: "Class 7B", experience: 5, education: "B.COM", subjects: ["Physical Education", "Health"] },
    { id: 5, name: "Dr. Reddy", class: "Class 8A", experience: 15, education: "BBA", subjects: ["Mathematics", "Physics"] },
    { id: 6, name: "Ms. Mehta", class: "Class 8B", experience: 10, education: "M.COM", subjects: ["English", "Drama"] },
    { id: 7, name: "Mr. Bhattacharya", class: null, experience: 9, education: "M.A", subjects: ["Art", "Design"] },
    { id: 9, name: "Dr. Menon", class: null, experience: 14, education: "BBA", subjects: ["Chemistry", "Biology"] },
    { id: 10, name: "Mr. Choudhary", class: null, experience: 6, education: "B.COM", subjects: ["Hindi", "History"] }
  ];
  
  const classTeachersCount = teacherData.filter(teacher => teacher.class !== null).length;
  const totalTeachersCount = teacherData.length;
  
  const educationDistribution = [
    { name: "B.COM", value: teacherData.filter(t => t.education === "B.COM").length },
    { name: "M.COM", value: teacherData.filter(t => t.education === "M.COM").length },
    { name: "BBA", value: teacherData.filter(t => t.education === "BBA").length },
    { name: "Other", value: teacherData.filter(t => !["B.COM", "M.COM", "B.BBA"].includes(t.education)).length }
  ];
  
  const subjectPerformanceData = [
    { name: "Mathematics", average: 84, previous: 82 },
    { name: "Science", average: 86, previous: 83 },
    { name: "English", average: 81, previous: 80 },
    { name: "Social Studies", average: 79, previous: 77 },
    { name: "Art", average: 90, previous: 88 },
    { name: "Physical Education", average: 88, previous: 87 },
    { name: "Hindi", average: 85, previous: 83 }
  ];
  
  const monthlyPerformanceData = [
    { name: "Sep", average: 80 },
    { name: "Oct", average: 82 },
    { name: "Nov", average: 81 },
    { name: "Dec", average: 84 },
    { name: "Jan", average: 83 },
    { name: "Feb", average: 87 }
  ];
  
const navigate = useNavigate();
  const handleTeachersDashboardClick = () => {
    navigate('/total-teachers');
    // In a real application, you would use routing:
    // router.push('/super-admin/teachers/dashboard');
  };
  const handleTeacherDashboardClick = () => {
    navigate('/super-admin/government/teacher/dashboard');
    // In a real application, you would use routing:
    // router.push('/super-admin/teachers/dashboard');
  };

  const getPerformanceChange = (current: number, previous: number) => {
    const change = current - previous;
    const changePercent = ((change / previous) * 100).toFixed(1);
    return { 
      change, 
      changePercent,
      increasing: change > 0
    };
  };

  const schoolAverage = classPerformanceData.reduce((sum, item) => sum + item.average, 0) / classPerformanceData.length;
  const previousSchoolAverage = classPerformanceData.reduce((sum, item) => sum + item.previous, 0) / classPerformanceData.length;
  const schoolAverageChange = getPerformanceChange(schoolAverage, previousSchoolAverage);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Academic Performance</h2>
              <p className="text-gray-500">Comprehensive view of student and teacher performance</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 text-gray-700">Export PDF</button>
              <button className="bg-blue-600 px-4 py-2 rounded-lg text-white shadow-sm hover:bg-blue-700">Generate Report</button>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg p-4 shadow mb-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <select 
                className="appearance-none bg-gray-100 rounded-md py-2 px-4 pr-8 text-gray-700 border border-gray-200 focus:outline-none focus:border-blue-500" 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option>All Classes</option>
                {classPerformanceData.map(item => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500" />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-gray-100 rounded-md py-2 px-4 pr-8 text-gray-700 border border-gray-200 focus:outline-none focus:border-blue-500">
                <option>Current Term</option>
                <option>Previous Term</option>
                <option>Full Year</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search student, teacher or class"
                className="bg-gray-100 rounded-md py-2 px-4 pl-10 text-gray-700 border border-gray-200 focus:outline-none focus:border-blue-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            <button className="flex items-center gap-1 bg-gray-100 rounded-md py-2 px-4 text-gray-700 border border-gray-200 hover:bg-gray-200">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">School Average</p>
                <p className="text-3xl font-bold">{schoolAverage.toFixed(1)}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="text-blue-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              {schoolAverageChange.increasing ? (
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span 
                className={`text-sm ${schoolAverageChange.increasing ? "text-green-500" : "text-red-500"}`}
              >
                {schoolAverageChange.increasing ? "+" : ""}{schoolAverageChange.changePercent}% from previous term
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Top Performer</p>
                <p className="text-3xl font-bold">{Math.max(...classPerformanceData.map(c => c.topScore))}%</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Trophy className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {topperData[0].name} • {topperData[0].class}
              </span>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow cursor-pointer" 
            onClick={handleTeachersDashboardClick}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Total Teachers</p>
                <p className="text-3xl font-bold">{totalTeachersCount}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <GraduationCap className="text-purple-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {classTeachersCount} class teachers • View all
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-3xl font-bold">{classPerformanceData.reduce((sum, item) => sum + item.students, 0)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="text-green-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Across {classPerformanceData.length} classes
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b px-4">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("classes")}
                className={`py-4 px-1 ${
                  activeTab === "classes"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Classes
              </button>
              <button
                onClick={() => setActiveTab("subjects")}
                className={`py-4 px-1 ${
                  activeTab === "subjects"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Subjects
              </button>
              <button
                onClick={() => setActiveTab("toppers")}
                className={`py-4 px-1 ${
                  activeTab === "toppers"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Top Performers
              </button>
              <button
                onClick={() => setActiveTab("teachers")}
                className={`py-4 px-1 ${
                  activeTab === "teachers"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Teachers
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Term Progress</h3>
                  <div className="bg-white p-4 rounded-lg border h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="average" 
                          name="School Average"
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Class Comparison</h3>
                  <div className="bg-white p-4 rounded-lg border h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Bar dataKey="average" name="Current Average" fill="#3b82f6" />
                        <Bar dataKey="previous" name="Previous Term" fill="#93c5fd" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Updates</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <ul className="divide-y divide-gray-200">
                      <li className="py-3 flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                          <Trophy className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">Class 8A achieved the highest average score this term</p>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                      </li>
                      <li className="py-3 flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                          <UserPlus className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">New teacher Dr. Emily Watson joined the faculty</p>
                          <p className="text-sm text-gray-500">1 week ago</p>
                        </div>
                      </li>
                      <li className="py-3 flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                          <Award className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-800">Mathematics Olympiad results announced - 5 students qualified for nationals</p>
                          <p className="text-sm text-gray-500">1 week ago</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "classes" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Class Performance</h3>
                  <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                    Download Class Report
                  </button>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left text-gray-700 font-medium">Class Name</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-medium">Class Teacher</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-medium">Students</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-medium">Average Score</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-medium">Top Score</th>
                        <th className="px-4 py-3 text-left text-gray-700 font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {classPerformanceData.map((classData, index) => {
                        const performanceChange = getPerformanceChange(classData.average, classData.previous);
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-800">{classData.name}</td>
                            <td 
                              className="px-4 py-4 text-blue-600 cursor-pointer hover:underline" 
                              onClick={handleTeacherDashboardClick}
                            >
                              {classData.teacher}
                            </td>
                            <td className="px-4 py-4 text-gray-600">{classData.students}</td>
                            <td className="px-4 py-4 text-gray-600">{classData.average.toFixed(1)}%</td>
                            <td className="px-4 py-4 text-gray-600">{classData.topScore}%</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                {performanceChange.increasing ? (
                                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span 
                                  className={`${performanceChange.increasing ? "text-green-500" : "text-red-500"}`}
                                >
                                  {performanceChange.increasing ? "+" : ""}{performanceChange.changePercent}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === "subjects" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Subject Performance</h3>
                  <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                    Export Subject Data
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="text-gray-700 font-medium mb-4">Subject Average Scores</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={subjectPerformanceData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[70, 100]} />
                          <YAxis dataKey="name" type="category" width={100} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                          />
                          <Legend />
                          <Bar dataKey="average" name="Current Term" fill="#3b82f6" />
                          <Bar dataKey="previous" name="Previous Term" fill="#93c5fd" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="text-gray-700 font-medium mb-4">Performance Breakdown</h4>
                    <div className="space-y-6">
                      {subjectPerformanceData.map((subject, index) => {
                        const performanceChange = getPerformanceChange(subject.average, subject.previous);
                        return (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-gray-700">{subject.name}</p>
                              <div className="flex items-center">
                                <span className="text-gray-800 font-medium mr-2">{subject.average}%</span>
                                <div className="flex items-center">
                                  {performanceChange.increasing ? (
                                    <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                                  ) : (
                                    <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                                  )}
                                  <span 
                                    className={`text-xs ${performanceChange.increasing ? "text-green-500" : "text-red-500"}`}
                                  >
                                    {performanceChange.increasing ? "+" : ""}{performanceChange.changePercent}%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${subject.average}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "toppers" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Top Performing Students</h3>
                  <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                    View Full Rankings
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topperData.slice(0, 3).map((student, index) => (
                    <div key={index} className="bg-white rounded-lg border overflow-hidden">
                      <div className={`h-2 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}></div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium text-gray-800">{student.name}</h4>
                            <p className="text-sm text-gray-500">{student.class}</p>
                          </div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                            index === 1 ? 'bg-gray-100 text-gray-600' : 
                            'bg-orange-100 text-orange-600'
                          }`}>
                            <Trophy className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-gray-600 text-sm">Overall Score</p>
                          <p className="text-gray-800 font-bold text-xl">{student.score}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-2">Top Subjects</p>
                          <div className="flex flex-wrap gap-2">
                            {student.subjects.map((subject, subIndex) => (
                              <span key={subIndex} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="bg-white rounded-lg border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Rank</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Student Name</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Class</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Score</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Top Subjects</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {topperData.map((student, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                                ${index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                                  index === 1 ? 'bg-gray-100 text-gray-600' : 
                                  index === 2 ? 'bg-orange-100 text-orange-600' : 
                                  'bg-blue-100 text-blue-600'}`
                              }>
                                {index + 1}
                              </div>
                            </td>
                            <td className="px-4 py-4 font-medium text-gray-800">{student.name}</td>
                            <td className="px-4 py-4 text-gray-600">{student.class}</td>
                            <td className="px-4 py-4 text-gray-600 font-medium">{student.score}%</td>
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-1">
                                {student.subjects.map((subject, subIndex) => (
                                  <span key={subIndex} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                                    {subject}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "teachers" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Faculty & Staff</h3>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                    onClick={handleTeachersDashboardClick}
                  >
                    Go to Teacher Dashboard
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg border lg:col-span-2">
                    <h4 className="text-gray-700 font-medium mb-4">Teachers List</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">Class</th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">Subjects</th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">Education</th>
                            <th className="px-4 py-3 text-left text-gray-700 font-medium">Experience</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {teacherData.map((teacher, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td 
                                className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline" 
                                onClick={handleTeacherDashboardClick}
                              >
                                {teacher.name}
                              </td>
                              <td className="px-4 py-3 text-gray-600">{teacher.class || "-"}</td>
                              <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1">
                                  {teacher.subjects.map((subject, subIndex) => (
                                    <span key={subIndex} className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full text-xs">
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-600">{teacher.education}</td>
                              <td className="px-4 py-3 text-gray-600">{teacher.experience} years</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="text-gray-700 font-medium mb-4">Education Qualifications</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={educationDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {educationDistribution.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [
                              `${value} teachers`, name
                            ]}
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Distribution of educational qualifications among teaching staff</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">© 2025 Scholars Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;