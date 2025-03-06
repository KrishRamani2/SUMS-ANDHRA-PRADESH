import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {  Star, MessageSquare, Award, TrendingUp, Users, Clock } from 'lucide-react';

const StudentReportDashboard = () => {
  // Sample data - replace with actual data
  const attendanceData = [
    { month: 'Jan', present: 22, absent: 3, late: 1 },
    { month: 'Feb', present: 20, absent: 2, late: 2 },
    { month: 'Mar', present: 21, absent: 1, late: 3 },
    { month: 'Apr', present: 23, absent: 2, late: 0 },
  ];

  const examPerformance = [
    { subject: 'Mathematics', midterm: 85, final: 88 },
    { subject: 'Physics', midterm: 78, final: 82 },
    { subject: 'Chemistry', midterm: 92, final: 85 },
    { subject: 'Biology', midterm: 88, final: 90 },
  ];

  const teacherFeedback = [
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      date: '2024-02-01',
      rating: 4,
      comment: 'Shows excellent problem-solving skills. Need to work on time management.',
      strengths: ['Analytical thinking', 'Concept understanding'],
      improvements: ['Speed', 'Homework completion']
    },
    {
      id: 2,
      subject: 'Physics',
      teacher: 'Prof. Johnson',
      date: '2024-02-15',
      rating: 5,
      comment: 'Outstanding performance in practical experiments. Excellent grasp of concepts.',
      strengths: ['Lab work', 'Theoretical knowledge'],
      improvements: ['Written expression']
    }
  ];

  const calculateAttendancePercentage = () => {
    const totalClasses = attendanceData.reduce((sum, month) => 
      sum + month.present + month.absent + month.late, 0);
    const totalPresent = attendanceData.reduce((sum, month) => sum + month.present, 0);
    return ((totalPresent / totalClasses) * 100).toFixed(1);
  };

  const calculateAveragePerformance = () => {
    const totalScores = examPerformance.reduce((sum, subject) => 
      sum + subject.midterm + subject.final, 0);
    return (totalScores / (examPerformance.length * 2)).toFixed(1);
  };

  // Define pie chart data with colors
  const attendanceDistributionData = [
    { name: 'Present', value: 86, color: '#4ade80' },  // Green
    { name: 'Absent', value: 8, color: '#f87171' },    // Red
    { name: 'Late', value: 6, color: '#fbbf24' }       // Yellow
  ];

  return (
    <div className="p-6 bg-white min-h-screen rounded-xl">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-blue-100">Attendance Rate</p>
                <h3 className="text-3xl font-bold">{calculateAttendancePercentage()}%</h3>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-purple-100">Average Performance</p>
                <h3 className="text-3xl font-bold">{calculateAveragePerformance()}%</h3>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">Teacher Feedback</p>
                <h3 className="text-3xl font-bold">{teacherFeedback.length}</h3>
              </div>
              <MessageSquare className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-orange-100">Academic Rank</p>
                <h3 className="text-3xl font-bold">Top 10%</h3>
              </div>
              <Award className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="attendance" className="data-[state=active]:bg-blue-50">
            <Clock className="w-4 h-4 mr-2" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-50">
            <TrendingUp className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-green-50">
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" fill="#4ade80" name="Present" />
                      <Bar dataKey="absent" fill="#f87171" name="Absent" />
                      <Bar dataKey="late" fill="#fbbf24" name="Late" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {attendanceDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={examPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="midterm" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        name="Mid Term"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="final" 
                        stroke="#06b6d4" 
                        strokeWidth={2}
                        name="Final"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-6">
                    {examPerformance.map((subject, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{subject.subject}</h4>
                          <span className="text-sm text-gray-500">
                            Avg: {((subject.midterm + subject.final) / 2).toFixed(1)}%
                          </span>
                        </div>
                        <div className="bg-gray-100 h-2 rounded-full">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(subject.midterm + subject.final) / 2}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-6">
                  {teacherFeedback.map((feedback) => (
                    <Card key={feedback.id} className="border shadow-sm">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold">{feedback.subject}</h3>
                              <p className="text-sm text-gray-500">
                                {feedback.teacher} • {feedback.date}
                              </p>
                            </div>
                            <div className="flex">
                              {[...Array(feedback.rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-700">{feedback.comment}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Strengths</h4>
                              <div className="space-y-1">
                                {feedback.strengths.map((strength, index) => (
                                  <div key={index} className="flex items-center text-sm">
                                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2" />
                                    {strength}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Areas for Improvement</h4>
                              <div className="space-y-1">
                                {feedback.improvements.map((improvement, index) => (
                                  <div key={index} className="flex items-center text-sm">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-2" />
                                    {improvement}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentReportDashboard;