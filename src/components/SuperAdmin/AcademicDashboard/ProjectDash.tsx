/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Clock, CreditCard, Inbox, LineChart, Users, CheckCircle, Calendar as CalendarIcon, MessagesSquare, AlertTriangle, ArrowUpRight, TrendingUp, Layers } from 'lucide-react';
import Header from './Header';

const ProjectDashboard = () => {
  const [_activeTab, setActiveTab] = useState('overview');
  
  // Mock data for projects
  const projects = [
    { 
      "id": 1, 
      "name": "School Library Setup", 
      "progress": 75, 
      "status": "In Progress", 
      "dueDate": "Mar 20, 2025",
      "members": 5,
      "tasks": { "total": 20, "completed": 15 },
      "budget": { "allocated": "₹50,000", "used": "₹35,000" },
      "priority": "High"
    },
    { 
      "id": 2, 
      "name": "Smart Classroom Installation", 
      "progress": 50, 
      "status": "In Progress", 
      "dueDate": "Apr 15, 2025",
      "members": 4,
      "tasks": { "total": 25, "completed": 12 },
      "budget": { "allocated": "₹1,20,000", "used": "₹55,000" },
      "priority": "Medium"
    },
    { 
      "id": 3, 
      "name": "Annual Day Preparation", 
      "progress": 90, 
      "status": "Review", 
      "dueDate": "Mar 10, 2025",
      "members": 6,
      "tasks": { "total": 15, "completed": 14 },
      "budget": { "allocated": "₹30,000", "used": "₹28,000" },
      "priority": "High"
    },
    { 
      "id": 4, 
      "name": "Sports Equipment Purchase", 
      "progress": 40, 
      "status": "In Progress", 
      "dueDate": "May 5, 2025",
      "members": 3,
      "tasks": { "total": 10, "completed": 4 },
      "budget": { "allocated": "₹20,000", "used": "₹7,500" },
      "priority": "Low"
    }
  ];

  // Mock data for team members
  const team = [
    { "id": 1, "name": "Rajesh Kumar", "role": "Principal", "avatar": "RK" },
    { "id": 2, "name": "Pooja Sharma", "role": "Class Teacher (Class 3)", "avatar": "PS" },
    { "id": 3, "name": "Amit Sinha", "role": "PE Teacher", "avatar": "AS" },
    { "id": 4, "name": "Suman Das", "role": "IT Coordinator", "avatar": "SD" },
    { "id": 5, "name": "Neha Verma", "role": "Event Coordinator", "avatar": "NV" }
  ];

  // Mock tasks data
  const tasks = [
    { "id": 1, "title": "Arrange bookshelves for the library", "project": "School Library Setup", "dueDate": "Mar 10", "status": "Completed" },
    { "id": 2, "title": "Install projector and smartboard", "project": "Smart Classroom Installation", "dueDate": "Mar 15", "status": "In Progress" },
    { "id": 3, "title": "Rehearsal for dance performance", "project": "Annual Day Preparation", "dueDate": "Mar 7", "status": "Review" },
    { "id": 4, "title": "Order football and cricket kits", "project": "Sports Equipment Purchase", "dueDate": "Mar 20", "status": "Not Started" },
    { "id": 5, "title": "Set up reading corners", "project": "School Library Setup", "dueDate": "Mar 12", "status": "In Progress" }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Review': return 'bg-amber-500';
      case 'Not Started': return 'bg-slate-400';
      default: return 'bg-slate-400';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High': return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>;
      case 'Medium': return <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>;
      case 'Low': return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
      default: return <Badge>Normal</Badge>;
    }
  };

  return (
    <>
    <Header />
    <div className="p-6 max-w-full mx-auto bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
        <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-slate-200 hover:bg-slate-300 text-slate-700">
            <Inbox className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Messages</span>
          </Button>
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Projects</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <Layers className="h-8 w-8 text-indigo-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">In Progress</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
            <LineChart className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <h3 className="text-2xl font-bold">4</h3>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Team Members</p>
              <h3 className="text-2xl font-bold">16</h3>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Project Status Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Status</CardTitle>
                <CardDescription>Current distribution of project statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completed</span>
                      <span>33%</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>In Progress</span>
                      <span>58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Not Started</span>
                      <span>9%</span>
                    </div>
                    <Progress value={9} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Morgan completed the homepage design</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SK</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Kim added comments to API documentation</p>
                      <p className="text-xs text-slate-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mike Johnson created a new branch for feature development</p>
                      <p className="text-xs text-slate-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines and Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                <CardDescription>Projects due in the next 2 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projects.filter(p => p.dueDate < 'Mar 20, 2025').map(project => (
                    <div key={project.id} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-3 ${project.progress > 90 ? 'bg-green-500' : project.progress > 50 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                        <span>{project.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-500">{project.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
                <CardDescription>Project completion trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">On-time Completion Rate</p>
                      <p className="text-sm text-slate-500">Last 30 days</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl font-bold mr-2">92%</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Budget Adherence</p>
                      <p className="text-sm text-slate-500">Current projects</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl font-bold mr-2">87%</span>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Completion Rate</p>
                      <p className="text-sm text-slate-500">This week</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl font-bold mr-2">78%</span>
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Active Projects</h2>
            <Button>New Project</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>Due: {project.dueDate}</CardDescription>
                    </div>
                    {getPriorityBadge(project.priority)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{project.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{project.budget.used} / {project.budget.allocated}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{project.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Tasks</h2>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button>Add Task</Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-3 ${getStatusColor(task.status)}`}></div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-slate-500">{task.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-slate-400" />
                        <span className="text-sm">{task.dueDate}</span>
                      </div>
                      <Badge variant={task.status === 'Completed' ? 'outline' : 'default'} className={task.status === 'Completed' ? 'text-green-500 border-green-200 bg-green-50' : ''}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Team Members</h2>
            <Button>Invite</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.map(member => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarFallback className="text-lg">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.role}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Profile</Button>
                      <Button size="sm" variant="outline">
                        <MessagesSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Panel */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-sm">You have <strong>5 tasks</strong> that need attention before the end of the week.</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">View Tasks</Button>
            <Button size="sm">Take Action</Button>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default ProjectDashboard;