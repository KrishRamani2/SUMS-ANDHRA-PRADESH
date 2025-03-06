/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ChangeEvent } from 'react';
import {
  Book,
  Calendar,
  Users,
  Plus,
  Search,
  Upload,
  Download,
  Eye,
  MoreVertical,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  assignedDate: string;
  description: string;
  status: 'active' | 'completed' | 'overdue';
  totalSubmissions: number;
  maxScore: number;
  attachments: string[];
  teacher: string;
  class: string;
}

interface Submission {
  id: number;
  assignmentId: number;
  student: string;
  submissionDate: string;
  status: 'submitted' | 'graded';
  score: number | null;
  feedback: string;
  files: string[];
}

const HomeworkDashboard = () => {
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [, setSelectedAssignment] = useState<Assignment | null>(null);

  const [assignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Linear Algebra Problems",
      subject: "Mathematics",
      dueDate: "2024-02-15",
      assignedDate: "2024-02-01",
      description: "Complete problems 1-10 from Chapter 3",
      status: "active",
      totalSubmissions: 25,
      maxScore: 100,
      attachments: ["Chapter3_Problems.pdf"],
      teacher: "Dr. Smith",
      class: "Grade 12A"
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-02-10",
      assignedDate: "2024-02-01",
      description: "Write a detailed lab report on the pendulum experiment",
      status: "completed",
      totalSubmissions: 28,
      maxScore: 50,
      attachments: ["Lab_Guidelines.pdf"],
      teacher: "Dr. Johnson",
      class: "Grade 12B"
    }
  ]);

  const [] = useState<Submission[]>([
    {
      id: 1,
      assignmentId: 1,
      student: "John Doe",
      submissionDate: "2024-02-14",
      status: "submitted",
      score: null,
      feedback: "",
      files: ["homework1.pdf"]
    },
    {
      id: 2,
      assignmentId: 1,
      student: "Jane Smith",
      submissionDate: "2024-02-13",
      status: "graded",
      score: 95,
      feedback: "Excellent work!",
      files: ["homework1_jane.pdf"]
    }
  ]);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || assignment.subject === selectedSubject;
    const matchesTab = activeTab === "all" || assignment.status === activeTab;
    return matchesSearch && matchesSubject && matchesTab;
  });

  const getStatusBadge = (status: Assignment['status']) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      overdue: "bg-red-100 text-red-800"
    } as const;
    return <Badge className={statusStyles[status]}>{status}</Badge>;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" style={{marginTop:"-225px"}}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework</h1>
          <p className="text-gray-500">Manage and track assignments</p>
        </div>
        <Button onClick={() => setIsNewAssignmentOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> New Assignment
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
    if (value === "all" || value === "active" || value === "completed") {
      setActiveTab(value); 
    }
  }} className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{assignment.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedAssignment(assignment)}>
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsSubmitOpen(true)}>
                    <Upload className="w-4 h-4 mr-2" /> Submit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" /> Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Book className="w-4 h-4 mr-2" />
                  {assignment.subject}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {assignment.totalSubmissions} submissions
                </div>
                <div className="flex items-center justify-between mt-4">
                  {getStatusBadge(assignment.status)}
                  <span className="text-sm text-gray-500">
                    {assignment.maxScore} points
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isNewAssignmentOpen} onOpenChange={setIsNewAssignmentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Assignment Title" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" />
            <Input type="number" placeholder="Maximum Score" />
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Assignment Description"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsNewAssignmentOpen(false)}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Drag and drop your files here, or click to browse
              </p>
            </div>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add any comments (optional)"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsSubmitOpen(false)}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeworkDashboard;