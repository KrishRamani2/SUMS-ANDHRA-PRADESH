
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
  ResponsiveContainer
} from "recharts";
import {
  Award,
  BookOpen,
  ChevronDown,
  Search,
  Filter,
  Bell,
  GraduationCap,
  Clock,
  HomeIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  // Single teacher data
  const teacher = {
    name: "Ms. Sharma",
    class: "Class 6A",
    experience: 8,
    education: "M.COM",
    subjects: ["Mathematics", "Science"],
    rating: 4.8,
    totalClasses: 25,
    totalStudents: 32
  };
  
  // Teacher performance data (mock data)
  const teacherPerformanceData = [
    { name: "Sep", rating: 4.6 },
    { name: "Oct", rating: 4.7 },
    { name: "Nov", rating: 4.5 },
    { name: "Dec", rating: 4.8 },
    { name: "Jan", rating: 4.7 },
    { name: "Feb", rating: 4.8 }
  ];
  
  // Subject teaching load for this teacher
  const subjectTeachingLoad = [
    { name: "Mathematics", classes: 15, students: 32 },
    { name: "Science", classes: 10, students: 32 }
  ];
  
  // Teacher certifications
  const teacherCertifications = [
    { name: "Professional Teaching License", status: "Active" },
    { name: "Digital Learning", status: "Active" },
    { name: "Advanced Mathematics Instruction", status: "Active" }
  ];
  
  // Teacher attendance (mock data)
  const teacherAttendanceData = [
    { name: "Sep", attendance: 98 },
    { name: "Oct", attendance: 97 },
    { name: "Nov", attendance: 96 },
    { name: "Dec", attendance: 95 },
    { name: "Jan", attendance: 97 },
    { name: "Feb", attendance: 98 }
  ];
  
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/super-admin');
    // In a real application, you would use routing:
    // router.push('/super-admin/teachers/dashboard');
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">{teacher.name}'s Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="relative p-2 rounded-full hover:bg-gray-100" onClick={handleHomeClick}>
              <HomeIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="border-l h-6 mx-2"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="font-medium text-blue-600">{teacher.name.charAt(0)}</span>
              </div>
              <span className="font-medium text-gray-700">{teacher.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Teaching Overview</h2>
              <p className="text-gray-500">Your performance and teaching statistics</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 text-gray-700">Export Report</button>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg p-4 shadow mb-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <select 
                className="appearance-none bg-gray-100 rounded-md py-2 px-4 pr-8 text-gray-700 border border-gray-200 focus:outline-none focus:border-blue-500" 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {teacher.subjects.map(subject => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500" />
            </div>
            
            <div className="relative">
              <select className="appearance-none bg-gray-100 rounded-md py-2 px-4 pr-8 text-gray-700 border border-gray-200 focus:outline-none focus:border-blue-500">
                <option>Current Term</option>
                <option>Previous Term</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-500" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your records"
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
                <p className="text-gray-500 text-sm">Current Class</p>
                <p className="text-3xl font-bold">{teacher.class}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <GraduationCap className="text-blue-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Subjects: {teacher.subjects.join(", ")}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Experience</p>
                <p className="text-3xl font-bold">{teacher.experience} yrs</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Education: {teacher.education}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Performance Rating</p>
                <p className="text-3xl font-bold">{teacher.rating}/5</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="text-purple-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Current term average
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm">Teaching Load</p>
                <p className="text-3xl font-bold">{teacher.totalClasses}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="text-green-600 w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {teacher.totalStudents} students
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
                onClick={() => setActiveTab("schedule")}
                className={`py-4 px-1 ${
                  activeTab === "schedule"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`py-4 px-1 ${
                  activeTab === "performance"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Performance
              </button>
              <button
                onClick={() => setActiveTab("attendance")}
                className={`py-4 px-1 ${
                  activeTab === "attendance"
                    ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Attendance
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Performance Trend</h3>
                  <div className="bg-white p-4 rounded-lg border h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={teacherPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[4, 5]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="rating" 
                          name="Rating"
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
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Teaching Load</h3>
                  <div className="bg-white p-4 rounded-lg border h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectTeachingLoad}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Bar dataKey="classes" name="Classes" fill="#3b82f6" />
                        <Bar dataKey="students" name="Students" fill="#93c5fd" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "schedule" && (
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Weekly Schedule</h3>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Day</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Time</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Subject</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Class</th>
                          <th className="px-4 py-3 text-left text-gray-700 font-medium">Room</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3">Monday</td>
                          <td className="px-4 py-3">9:00 - 10:00</td>
                          <td className="px-4 py-3">Mathematics</td>
                          <td className="px-4 py-3">{teacher.class}</td>
                          <td className="px-4 py-3">Room 301</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Monday</td>
                          <td className="px-4 py-3">10:15 - 11:15</td>
                          <td className="px-4 py-3">Science</td>
                          <td className="px-4 py-3">{teacher.class}</td>
                          <td className="px-4 py-3">Science Lab 2</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Tuesday</td>
                          <td className="px-4 py-3">11:30 - 12:30</td>
                          <td className="px-4 py-3">Mathematics</td>
                          <td className="px-4 py-3">{teacher.class}</td>
                          <td className="px-4 py-3">Room 301</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Wednesday</td>
                          <td className="px-4 py-3">13:00 - 14:00</td>
                          <td className="px-4 py-3">Science</td>
                          <td className="px-4 py-3">{teacher.class}</td>
                          <td className="px-4 py-3">Science Lab 2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "performance" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Performance Metrics</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={teacherPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[4, 5]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="rating" 
                          name="Rating"
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Rating Components</h4>
                      <ul className="space-y-1">
                        <li className="text-sm text-gray-600">• Student feedback: 4.7/5</li>
                        <li className="text-sm text-gray-600">• Peer review: 4.9/5</li>
                        <li className="text-sm text-gray-600">• Admin evaluation: 4.8/5</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Certifications</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="space-y-4">
                      {teacherCertifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{cert.name}</p>
                            <p className="text-sm text-gray-500">Status: {cert.status}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            Valid
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "attendance" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Attendance Record</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={teacherAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[90, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="attendance" 
                          name="Attendance %" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Current Month</h4>
                        <span className="text-green-600 font-medium">98%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Absences</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Feb 28, 2025</p>
                          <p className="text-sm text-gray-500">Sick Leave - Illness</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Approved</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Dec 15, 2024</p>
                          <p className="text-sm text-gray-500">Personal Leave</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;