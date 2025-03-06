import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PlusCircle,
  MoreVertical,
  BookOpen,
  Clock,
  Users
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import {
  ScrollArea,
  ScrollBar
} from "../ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardFooter 
} from '../ui/card';

interface Subject {
  id: number;
  subjectName: string;
  className: string;
  teacherName: string;
  hoursPerWeek: number;
  totalStudents: number;
  description: string;
  nextClass: string;
  completedTopics: number;
  totalTopics: number;
}

interface FormData {
  subjectName: string;
  className: string;
  teacherName: string;
  hoursPerWeek: string;
  description: string;
}

interface SubjectFormProps {
  onSubmit: () => void;
  submitText: string;
}

const Subjects = () => {
  const navigate = useNavigate();
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    subjectName: '',
    className: '',
    teacherName: '',
    hoursPerWeek: '',
    description: ''
  });

  // Sample data
  const [subjects] = useState<Subject[]>([
    {
      id: 1,
      subjectName: 'Mathematics',
      className: '2nd Standard',
      teacherName: 'John Smith',
      hoursPerWeek: 6,
      totalStudents: 87,
      description: 'Basic arithmetic and problem solving',
      nextClass: 'Tomorrow, 9:00 AM',
      completedTopics: 12,
      totalTopics: 20
    },
    {
      id: 2,
      subjectName: 'Science',
      className: '2nd Standard',
      teacherName: 'Sarah Johnson',
      hoursPerWeek: 5,
      totalStudents: 85,
      description: 'Introduction to basic science concepts',
      nextClass: 'Today, 2:00 PM',
      completedTopics: 8,
      totalTopics: 15
    },
    {
      id: 3,
      subjectName: 'History',
      className: '2nd Standard',
      teacherName: 'Sarah Johnson',
      hoursPerWeek: 5,
      totalStudents: 85,
      description: 'Introduction to basic science concepts',
      nextClass: 'Today, 2:00 PM',
      completedTopics: 8,
      totalTopics: 15
    },
    {
      id: 4,
      subjectName: 'Science',
      className: '2nd Standard',
      teacherName: 'Sarah Johnson',
      hoursPerWeek: 5,
      totalStudents: 85,
      description: 'Introduction to basic science concepts',
      nextClass: 'Today, 2:00 PM',
      completedTopics: 8,
      totalTopics: 15
    },
    {
      id: 5,
      subjectName: 'Science',
      className: '2nd Standard',
      teacherName: 'Sarah Johnson',
      hoursPerWeek: 5,
      totalStudents: 85,
      description: 'Introduction to basic science concepts',
      nextClass: 'Today, 2:00 PM',
      completedTopics: 8,
      totalTopics: 15
    },
    {
      id: 6,
      subjectName: 'Science',
      className: '2nd Standard',
      teacherName: 'Sarah Johnson',
      hoursPerWeek: 5,
      totalStudents: 85,
      description: 'Introduction to basic science concepts',
      nextClass: 'Today, 2:00 PM',
      completedTopics: 8,
      totalTopics: 15
    },
    {
      id: 7,
      subjectName: 'Science',
      className: '2nd Standard',
      teacherName: 'Sarah Johnson',
      hoursPerWeek: 5,
      totalStudents: 85,
      description: 'Introduction to basic science concepts',
      nextClass: 'Today, 2:00 PM',
      completedTopics: 8,
      totalTopics: 15
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const SubjectForm = ({ onSubmit, submitText }: SubjectFormProps) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          name="subjectName"
          value={formData.subjectName}
          onChange={handleInputChange}
          placeholder="Subject name"
        />
      </div>
      <div className="space-y-2">
        <Input
          name="className"
          value={formData.className}
          onChange={handleInputChange}
          placeholder="Class"
        />
      </div>
      <div className="space-y-2">
        <Input
          name="teacherName"
          value={formData.teacherName}
          onChange={handleInputChange}
          placeholder="Teacher name"
        />
      </div>
      <div className="space-y-2">
        <Input
          name="hoursPerWeek"
          type="number"
          value={formData.hoursPerWeek}
          onChange={handleInputChange}
          placeholder="Hours per week"
        />
      </div>
      <DialogFooter>
        <Button
          onClick={onSubmit}
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          {submitText}
        </Button>
      </DialogFooter>
    </div>
  );

  const filteredSubjects = subjects.filter(subject =>
    subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsSearchOpen(true)}>
                <Search className="mr-2 h-4 w-4" /> Search
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsAddSubjectOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Search Subjects</DialogTitle>
            </DialogHeader>
            <Input 
              placeholder="Search subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2"
            />
          </DialogContent>
        </Dialog>

        {/* Add Subject Dialog */}
        <Dialog open={isAddSubjectOpen} onOpenChange={setIsAddSubjectOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <SubjectForm onSubmit={() => setIsAddSubjectOpen(false)} submitText="Create Subject" />
          </DialogContent>
        </Dialog>

        {/* Subject Cards Grid with ScrollArea */}
        <ScrollArea className="h-[470px] rounded-md border">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredSubjects.map((subject) => (
                <Card 
                  key={subject.id} 
                  className="hover:shadow-lg transition-all duration-300 relative overflow-hidden group border-black cursor-pointer"
                  onClick={() => navigate(`/subject/${subject.id}`)}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-black" />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-black" />
                          {subject.subjectName}
                        </h3>
                        <p className="text-sm text-gray-600">{subject.className}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {subject.hoursPerWeek}h/week
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-3 w-3 mr-1" />
                          {subject.totalStudents} Students
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 pt-2 pb-2">
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{((subject.completedTopics / subject.totalTopics) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-black rounded-full h-1.5" 
                          style={{ width: `${(subject.completedTopics / subject.totalTopics) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Subjects;