/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Plus,
  Search,
  Filter,
  MoreVertical,
  BookOpen,
  Users,
  CalendarRange,
  GraduationCap
} from 'lucide-react';
import {
  ScrollArea,
  ScrollBar
} from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardHeader
} from '../ui/card';
import { Badge } from "../ui/badge";

type ExamType = 'mid-term' | 'final' | 'quiz' | 'practical';
type ExamStatus = 'upcoming' | 'ongoing' | 'completed';

interface ExamTypeStyles extends Record<ExamType, { color: string }> {}
interface StatusColors extends Record<ExamStatus, string> {}

interface Examination {
  id: number;
  name: string;
  subject: string;
  examType: ExamType;
  className: string;
  date: string;
  time: string;
  duration: string;
  totalMarks: number;
  venue: string;
  examiner: string;
  students: number;
  status: ExamStatus;
}

const Examinations = () => {
  const [isNewExamOpen, setIsNewExamOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedExamType, setSelectedExamType] = useState<ExamType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Sample data
  const [examinations] = useState<Examination[]>([
    {
      id: 1,
      name: 'Mid-Term Mathematics',
      subject: 'Mathematics',
      examType: 'mid-term',
      className: '10th Grade',
      date: '2024-02-15',
      time: '09:00 AM - 11:00 AM',
      duration: '2 hours',
      totalMarks: 100,
      venue: 'Hall A',
      examiner: 'John Smith',
      students: 45,
      status: 'upcoming'
    },
    {
      id: 2,
      name: 'Final Science Practical',
      subject: 'Science',
      examType: 'final',
      className: '9th Grade',
      date: '2024-02-20',
      time: '10:00 AM - 01:00 PM',
      duration: '3 hours',
      totalMarks: 75,
      venue: 'Science Lab',
      examiner: 'Sarah Johnson',
      students: 38,
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'English Quiz',
      subject: 'English',
      examType: 'quiz',
      className: '8th Grade',
      date: '2024-02-10',
      time: '11:00 AM - 12:00 PM',
      duration: '1 hour',
      totalMarks: 25,
      venue: 'Room 101',
      examiner: 'Mike Wilson',
      students: 42,
      status: 'completed'
    }
  ]);

  const examTypes: ExamTypeStyles = {
    'mid-term': { color: 'bg-blue-100 text-blue-800' },
    'final': { color: 'bg-purple-100 text-purple-800' },
    'quiz': { color: 'bg-green-100 text-green-800' },
    'practical': { color: 'bg-orange-100 text-orange-800' }
  } as const;

  const statusColors: StatusColors = {
    upcoming: 'bg-yellow-100 text-yellow-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  } as const;

  const filteredExams = examinations.filter(exam => {
    const matchesType = selectedExamType === 'all' || exam.examType === selectedExamType;
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const examDate = new Date(exam.date);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    
    const matchesDate = (!startDate || examDate >= startDate) && 
                       (!endDate || examDate <= endDate);

    return matchesType && matchesSearch && matchesDate;
  });

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] w-full rounded-md">
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Examinations</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSearchTerm('')}
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsNewExamOpen(true)}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Schedule Exam
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setSelectedExamType('all')}>
                All Exams
              </TabsTrigger>
              {(Object.keys(examTypes) as ExamType[]).map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  onClick={() => setSelectedExamType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Search Bar */}
          <div className="mb-6">
            <Input
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{exam.name}</h3>
                      <p className="text-sm text-gray-500">{exam.subject}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Download Hall Ticket</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={examTypes[exam.examType].color}>
                        {exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className={statusColors[exam.status]}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-500 mb-1">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {new Date(exam.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {exam.time}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {exam.students} Students
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-center text-gray-500 mb-1">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {exam.className}
                        </div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {exam.examiner}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <CalendarRange className="h-4 w-4 mr-1" />
                          {exam.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Exam Dialog */}
          <Dialog open={isNewExamOpen} onOpenChange={setIsNewExamOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Examination</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Exam Name" />
                <Input placeholder="Subject" />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" placeholder="Date" />
                  <Input type="time" placeholder="Time" />
                </div>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select Exam Type</option>
                  {(Object.keys(examTypes) as ExamType[]).map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <Input placeholder="Venue" />
                <Input placeholder="Examiner" />
                <Input type="number" placeholder="Total Marks" />
                <Input type="number" placeholder="Duration (hours)" />
              </div>
              <DialogFooter>
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => setIsNewExamOpen(false)}
                >
                  Schedule Exam
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Filter Dialog */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Filter Examinations</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm text-gray-500">From</label>
                      <Input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">To</label>
                      <Input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

export default Examinations;