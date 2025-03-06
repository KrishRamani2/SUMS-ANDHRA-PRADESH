/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { BarChart, ActivitySquare, Users, Award, Clock, Calendar, FileText, Zap, ChevronDown, Search } from 'lucide-react';
import Header from './Header';

const ExaminationDashboard = () => {
  const [_activeTab, _setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState('Advanced Mathematics');

  const courses = [
    { "id": 1, "name": "Mathematics", "progress": 80, "exams": 3, "upcoming": 1 },
    { "id": 2, "name": "Science", "progress": 75, "exams": 3, "upcoming": 1 },
    { "id": 3, "name": "Social Science", "progress": 78, "exams": 2, "upcoming": 1 },
    { "id": 4, "name": "English", "progress": 85, "exams": 2, "upcoming": 0 },
    { "id": 5, "name": "Hindi", "progress": 82, "exams": 2, "upcoming": 0 }
  ];

  const upcomingExams = [
    { "id": 1, "name": "Algebra & Geometry", "course": "Mathematics", "date": "Mar 15, 2025", "time": "10:00 AM", "duration": "2.5 hours" },
    { "id": 2, "name": "Physics & Chemistry", "course": "Science", "date": "Mar 12, 2025", "time": "1:00 PM", "duration": "3 hours" },
    { "id": 3, "name": "History & Civics", "course": "Social Science", "date": "Mar 18, 2025", "time": "10:00 AM", "duration": "2 hours" }
  ];

  const recentResults = [
    { "id": 1, "name": "Arithmetic", "course": "Mathematics", "score": 88, "grade": "A", "date": "Feb 20, 2025" },
    { "id": 2, "name": "Physics", "course": "Science", "score": 90, "grade": "A+", "date": "Feb 22, 2025" },
    { "id": 3, "name": "Geography", "course": "Social Science", "score": 85, "grade": "A", "date": "Feb 18, 2025" },
    { "id": 4, "name": "Grammar & Composition", "course": "English", "score": 89, "grade": "A", "date": "Feb 25, 2025" },
    { "id": 5, "name": "Hindi Literature", "course": "Hindi", "score": 87, "grade": "A", "date": "Feb 19, 2025" },
  ];

  const performanceData = [
    { "subject": "Mathematics", "score": 85 },
    { "subject": "Science", "score": 88 },
    { "subject": "Social Science", "score": 80 },
    { "subject": "English", "score": 83 },
    { "subject": "Hindi", "score": 82 },
    { "subject": "Sanskrit", "score": 75 },
    { "subject": "Computer Science", "score": 78 },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 w-full p-0">
        <div className="h-full w-full">
          {/* Top bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 px-8 pt-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Examination Dashboard</h1>
              <p className="text-gray-600 mt-1">Here's your examination overview for this semester.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Quick Prep
              </button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Upcoming Exams</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Next in <span className="font-medium text-gray-900">8 days</span></p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Average Score</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">88.3%</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600"><span className="text-green-600">↑ 4.2%</span> from last semester</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <ActivitySquare className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Courses</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">75%</span> completion rate</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Study Time</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">142h</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600"><span className="text-amber-600">↑ 12h</span> this week</p>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 h-[calc(100vh-300px)]">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8 overflow-y-auto">
              {/* Course progress */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Course Progress</h2>
                  <div className="relative">
                    <select 
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {courses.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {courses.map(course => (
                    <div key={course.id} className={course.name === selectedCourse ? 'block' : 'hidden'}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-700">{course.name}</p>
                        <p className="text-sm font-medium text-gray-900">{course.progress}%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600">Completed Exams</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">{course.exams}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600">Upcoming Exams</p>
                          <p className="text-xl font-bold text-gray-900 mt-1">{course.upcoming}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent results */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Results</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Exam</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Score</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Grade</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentResults.map(result => (
                        <tr key={result.id}>
                          <td className="py-4 px-4 text-sm font-medium text-gray-900">{result.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{result.course}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex rounded-full text-xs font-medium px-2 py-1 ${
                              result.score >= 90 ? 'bg-green-100 text-green-800' : 
                              result.score >= 80 ? 'bg-blue-100 text-blue-800' :
                              result.score >= 70 ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.score}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-center text-gray-900">{result.grade}</td>
                          <td className="py-4 px-4 text-sm text-right text-gray-600">{result.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-8 overflow-y-auto">
              {/* Upcoming exams */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Upcoming Exams</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Calendar View</button>
                </div>
                
                <div className="space-y-4">
                  {upcomingExams.map(exam => (
                    <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">{exam.name}</h3>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{exam.course}</span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {exam.date}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {exam.time} • {exam.duration}
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800">View Details</button>
                        <button className="text-xs font-medium text-gray-600 hover:text-gray-800 flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          Quick Prep
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Performance by subject */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Performance by Subject</h2>
                  <p className="text-sm text-gray-600 mt-1">Academic year 2024-2025</p>
                </div>
                
                <div className="space-y-4">
                  {performanceData.map(item => (
                    <div key={item.subject}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                        <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.score >= 90 ? 'bg-green-600' : 
                            item.score >= 80 ? 'bg-blue-600' :
                            item.score >= 70 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md text-sm transition-colors">
                  View Detailed Analytics
                </button>
              </div>
              
              {/* Premium features */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-sm p-6 text-white">
                <h2 className="text-lg font-bold">Premium Features</h2>
                <p className="text-sm opacity-90 mt-1">You have access to all premium features</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-2 rounded-md">
                      <Users className="h-4 w-4" />
                    </div>
                    <p className="ml-3 text-sm font-medium">AI Study Assistant</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-2 rounded-md">
                      <FileText className="h-4 w-4" />
                    </div>
                    <p className="ml-3 text-sm font-medium">Advanced Practice Tests</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-2 rounded-md">
                      <BarChart className="h-4 w-4" />
                    </div>
                    <p className="ml-3 text-sm font-medium">Performance Analytics</p>
                  </div>
                </div>
                
                <button className="mt-6 w-full py-2 bg-white text-blue-700 font-medium rounded-md text-sm hover:bg-blue-50 transition-colors">
                  Explore Premium Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminationDashboard;