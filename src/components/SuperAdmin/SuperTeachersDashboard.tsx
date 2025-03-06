import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import {  Award, School, Users, BarChart3, Briefcase, Trophy, Star, TrendingUp, Calendar } from "lucide-react";
import Header from './Header';

// Define types for our data structures
interface District {
  id: number;
  name: string;
  teacherCount: number;
  schoolCount: number;
  avgPerformance: number;
}

interface Teacher {
  id: number;
  name: string;
  district: string;
  school: string;
  subject: string;
  rating: number;
  achievements: string[];
  avatar: string;
}

interface School {
  id: number;
  name: string;
  district: string;
  teacherCount: number;
  studentCount: number;
  performance: number;
}

interface Achievement {
  id: number;
  teacher: string;
  achievement: string;
  date: string;
}

const TeachersDashboard: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  
  // Sample data with explicit typing
  const districtData: District[] = [
    { id: 1, name: "Ranchi", teacherCount: 540, schoolCount: 65, avgPerformance: 89 },
    { id: 2, name: "Jamshedpur", teacherCount: 470, schoolCount: 58, avgPerformance: 87 },
    { id: 3, name: "Dhanbad", teacherCount: 420, schoolCount: 52, avgPerformance: 90 },
    { id: 4, name: "Bokaro", teacherCount: 390, schoolCount: 48, avgPerformance: 85 }
  ];
  
  const topTeachers: Teacher[] = [
    { id: 1, name: "Amit Kumar", district: "Ranchi", school: "DPS Ranchi", subject: "Mathematics", rating: 98, achievements: ["State Best Teacher Award 2024", "Mathematics Excellence Award"], avatar: "/api/placeholder/32/32" },
    { id: 2, name: "Neha Sharma", district: "Jamshedpur", school: "St. Xavier’s School", subject: "Physics", rating: 96, achievements: ["District Top Educator", "Science Fair Mentor"], avatar: "/api/placeholder/32/32" },
    { id: 3, name: "Rajesh Verma", district: "Dhanbad", school: "Bishop Westcott Boys' School", subject: "English", rating: 95, achievements: ["Best Language Teacher Award", "Published Author"], avatar: "/api/placeholder/32/32" },
    { id: 4, name: "Suman Gupta", district: "Bokaro", school: "Loreto Convent", subject: "Computer Science", rating: 94, achievements: ["Tech Integration Award", "National Coding Olympiad Mentor"], avatar: "/api/placeholder/32/32" },
    { id: 5, name: "Priya Patel", district: "Ranchi", school: "Kairali School", subject: "Biology", rating: 93, achievements: ["Environmental Education Award", "Research Excellence Award"], avatar: "/api/placeholder/32/32" }
  ];
  
  const schoolData: School[] = [
    { id: 1, name: "DPS Ranchi", district: "Ranchi", teacherCount: 85, studentCount: 1200, performance: 95 },
    { id: 2, name: "St. Xavier’s School", district: "Jamshedpur", teacherCount: 78, studentCount: 1100, performance: 92 },
    { id: 3, name: "Bishop Westcott Boys' School", district: "Dhanbad", teacherCount: 72, studentCount: 980, performance: 90 },
    { id: 4, name: "Loreto Convent", district: "Bokaro", teacherCount: 65, studentCount: 850, performance: 88 },
    { id: 5, name: "Kairali School", district: "Ranchi", teacherCount: 60, studentCount: 820, performance: 86 }
  ];
  
  const recentAchievements: Achievement[] = [
    { id: 1, teacher: "Amit Kumar", achievement: "State Best Teacher Award 2024", date: "Feb 15, 2025" },
    { id: 2, teacher: "DPS Ranchi", achievement: "Excellence in STEM Education Award", date: "Jan 28, 2025" },
    { id: 3, teacher: "Jamshedpur District", achievement: "Highest Academic Progress in State", date: "Jan 12, 2025" },
    { id: 4, teacher: "Neha Sharma", achievement: "District Top Educator", date: "Dec 10, 2024" }
  ];
  
  
  const filteredSchools: School[] = selectedDistrict === "all" 
    ? schoolData 
    : schoolData.filter(school => school.district === selectedDistrict);
  
  const filteredTeachers: Teacher[] = selectedDistrict === "all"
    ? topTeachers
    : topTeachers.filter(teacher => teacher.district === selectedDistrict);
  
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <Header />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Educators Excellence Dashboard</h1>
          <p className="text-gray-500">Comprehensive analytics and achievements tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2 px-3 py-1">
            <Calendar size={16} />
            March 1, 2025
          </Badge>
        </div>
      </div>

      {/* District Selection */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold">View Performance By:</h2>
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            {districtData.map(district => (
              <SelectItem key={district.id} value={district.name}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* District Stats */}
          <div className="grid grid-cols-4 gap-4">
            {districtData.map(district => (
              <Card key={district.id} className={selectedDistrict === district.name ? "border-2 border-primary" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <School size={18} className="text-primary" />
                    {district.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Teachers</span>
                    <span className="font-medium">{district.teacherCount}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Schools</span>
                    <span className="font-medium">{district.schoolCount}</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500 text-sm">Performance</span>
                      <span className="font-medium">{district.avgPerformance}%</span>
                    </div>
                    <Progress value={district.avgPerformance} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Top Performing Teachers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />
                Top Performing Educators
              </CardTitle>
              <CardDescription>The highest rated teachers across {selectedDistrict === "all" ? "all districts" : selectedDistrict}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTeachers.slice(0, 3).map((teacher, index) => (
                  <div key={teacher.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10 border border-gray-200">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{teacher.name}</h3>
                      <p className="text-sm text-gray-500">{teacher.school} • {teacher.subject}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={14} className={star <= Math.floor(teacher.rating/20) ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <Badge variant="secondary">{teacher.rating}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                    View All Teachers
                  </Badge>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>All Top Performing Teachers</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto space-y-4">
                    {filteredTeachers.map((teacher, index) => (
                      <div key={teacher.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{teacher.name}</h3>
                          <p className="text-sm text-gray-500">{teacher.school} • {teacher.subject}</p>
                          <p className="text-sm text-gray-400">{teacher.district}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} size={14} className={star <= Math.floor(teacher.rating/20) ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                            ))}
                          </div>
                          <Badge variant="secondary">{teacher.rating}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={18} className="text-green-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAchievements.map(item => (
                  <div key={item.id} className="flex items-center p-3 border-b last:border-b-0">
                    <div className="bg-green-50 p-2 rounded-full">
                      <Award size={16} className="text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{item.teacher}</p>
                      <p className="text-sm text-gray-500">{item.achievement}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">{item.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School size={18} className="text-primary" />
                {selectedDistrict === "all" ? "All Schools" : `Schools in ${selectedDistrict}`}
              </CardTitle>
              <CardDescription>Performance metrics for {filteredSchools.length} schools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSchools.map(school => (
                  <div key={school.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{school.name}</h3>
                      <Badge>{school.district}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Teachers</p>
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-primary" />
                          <p className="font-medium">{school.teacherCount}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Students</p>
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-blue-500" />
                          <p className="font-medium">{school.studentCount}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Student-Teacher Ratio</p>
                        <p className="font-medium">{(school.studentCount / school.teacherCount).toFixed(1)}:1</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-gray-500">Overall Performance</p>
                        <p className="font-medium">{school.performance}%</p>
                      </div>
                      <Progress value={school.performance} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                Top Educators
              </CardTitle>
              <CardDescription>Detailed profiles of outstanding teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredTeachers.map(teacher => (
                  <div key={teacher.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/80 to-primary p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border-2 border-white">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="text-white">
                          <h3 className="font-bold text-lg">{teacher.name}</h3>
                          <p>{teacher.subject}</p>
                        </div>
                      </div>
                      <Badge className="bg-white text-primary hover:bg-gray-100">
                        {teacher.rating}% Rating
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">School</p>
                          <p className="font-medium">{teacher.school}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">District</p>
                          <p className="font-medium">{teacher.district}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Key Achievements</p>
                        <div className="flex flex-wrap gap-2">
                          {teacher.achievements.map((achievement, i) => (
                            <Badge key={i} variant="secondary" className="flex items-center gap-1">
                              <Award size={12} />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="bg-amber-50">
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Trophy size={18} className="text-amber-500" />
                  State Level
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {[
                    { name: "Ravi Sharma", achievement: "Teacher of the Year 2024", school: "DPS Ranchi" },
                    { name: "East District", achievement: "Highest Academic Progress", school: "District-wide" },
                    { name: "Anita Mishra", achievement: "Excellence in Leadership", school: "St. Xavier’s School" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 border-b last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <Badge variant="outline" className="bg-amber-50">State</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{item.achievement}</p>
                      <p className="text-xs text-gray-400">{item.school}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Trophy size={18} className="text-blue-500" />
                  District Level
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {[
                    { name: "Amit Sharma", achievement: "Innovation Award", school: "DPS Ranchi" },
                    { name: "Priya Verma", achievement: "STEM Education Excellence", school: "St. Xavier’s School" },
                    { name: "North District", achievement: "Best Teacher Retention", school: "District-wide" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 border-b last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <Badge variant="outline" className="bg-blue-50">District</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{item.achievement}</p>
                      <p className="text-xs text-gray-400">{item.school}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Trophy size={18} className="text-green-500" />
                  School Level
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {[
                    { name: "Suman Gupta", achievement: "Coding Competition Mentor", school: "Loreto Convent" },
                    { name: "DPS Ranchi", achievement: "Excellence in Arts Education", school: "School-wide" },
                    { name: "St. Xavier’s School", achievement: "Community Engagement Award", school: "School-wide" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 border-b last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <Badge variant="outline" className="bg-green-50">School</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{item.achievement}</p>
                      <p className="text-xs text-gray-400">{item.school}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" />
                Achievement Analytics
              </CardTitle>
              <CardDescription>Performance trends and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Awards by District</h3>
                    <TrendingUp size={16} className="text-green-500" />
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Ranchi District", count: 24, percent: 85 },
                      { name: "East Singhbhum District", count: 21, percent: 75 },
                      { name: "Dhanbad District", count: 18, percent: 65 },
                      { name: "Bokaro District", count: 16, percent: 58 }
                    ].map(item => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.name}</span>
                          <span>{item.count}</span>
                        </div>
                        <Progress value={item.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Achievement Categories</h3>
                    <TrendingUp size={16} className="text-green-500" />
                  </div>
                  <div className="space-y-2">
                    {[
                       { name: "Teaching Excellence", count: 32, percent: 90 },
                       { name: "Innovation in Education", count: 28, percent: 80 },
                       { name: "Leadership in Schools", count: 24, percent: 70 },
                       { name: "Community Impact in Jharkhand", count: 20, percent: 60 }
                    ].map(item => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.name}</span>
                          <span>{item.count}</span>
                        </div>
                        <Progress value={item.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Achievement Levels</h3>
                    <TrendingUp size={16} className="text-green-500" />
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "School Level", count: 48, percent: 65 },
                      { name: "District Level", count: 32, percent: 45 },
                      { name: "State Level", count: 18, percent: 25 },
                      { name: "National Level", count: 6, percent: 10 }
                    ].map(item => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.name}</span>
                          <span>{item.count}</span>
                        </div>
                        <Progress value={item.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeachersDashboard;