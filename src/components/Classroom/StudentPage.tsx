import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  Edit2, 
  Trash2,
  MoreVertical,
  ArrowLeft,
  User,
  CreditCard,
  Mail
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '../ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardFooter 
} from '../ui/card';
import {
  TooltipProvider,
} from "../ui/tooltip";
import useStudentStore from '../../store/studentStore';

interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  graduationYear: string;
  phoneNumber: string;
  address: string;
  totalFees: number;
  feesPaid: number;
  activeStatus: boolean;
  feesPaidPercentage: number;
}

interface StudentFormData {
  name: string;
  email: string;
  major: string;
  graduationYear: string;
  phoneNumber: string;
  address: string;
}

interface StudentFormProps {
  onSubmit: () => void;
  submitText: string;
}

interface StudentStore {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: number, data: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
  setSelectedStudent: (student: Student) => void;
}

const StudentPage: React.FC = () => {
  const navigate = useNavigate();
  const { students, addStudent, updateStudent, deleteStudent, setSelectedStudent } = useStudentStore() as StudentStore;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    major: '',
    graduationYear: '',
    phoneNumber: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: Date.now(),
      ...formData,
      totalFees: 50000,
      feesPaid: 0,
      activeStatus: true,
      feesPaidPercentage: 0
    };
    addStudent(newStudent);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditStudent = (student: Student, e: Event) => {
    e.stopPropagation();
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      major: student.major,
      graduationYear: student.graduationYear,
      phoneNumber: student.phoneNumber,
      address: student.address
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  const handleDeleteStudent = (id: number, e: Event) => {
    e.stopPropagation();
    deleteStudent(id);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      major: '',
      graduationYear: '',
      phoneNumber: '',
      address: ''
    });
  };

  const handleCardClick = (student: Student) => {
    setSelectedStudent(student);
    navigate(`/student-list/student-dashboard/${student.id}`);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, submitText }) => (
    <div className="space-y-4" onClick={e => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
            onClick={e => e.stopPropagation()}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            onClick={e => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Major</label>
          <Input
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            placeholder="Enter major/program"
            onClick={e => e.stopPropagation()}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Graduation Year</label>
          <Input
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleInputChange}
            placeholder="Enter graduation year"
            onClick={e => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            onClick={e => e.stopPropagation()}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            onClick={e => e.stopPropagation()}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={onSubmit}
          disabled={!formData.name || !formData.email}
          className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
        >
          {submitText}
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Students</h1>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search students..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]" onClick={e => e.stopPropagation()}>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <StudentForm onSubmit={handleAddStudent} submitText="Create Student" />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card 
              key={student.id} 
              className="hover:shadow-xl transition-all duration-300 relative overflow-hidden group border-black"
              onClick={() => handleCardClick(student)}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-black" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center">
                      <User className="h-5 w-5 mr-2 text-black" />
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-500" />
                      {student.email}
                    </p>
                  </div>
                  <TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onSelect={(e) => handleEditStudent(student, e)}>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onSelect={(e) => handleDeleteStudent(student.id, e)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Fees</p>
                    <p className="font-semibold text-gray-900">₹{student.totalFees?.toLocaleString() || 0}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Fees Paid</p>
                    <p className="font-semibold text-gray-900">₹{student.feesPaid?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 mt-2">
                <div className="flex items-center justify-between w-full text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {student.major || 'N/A'}
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    {((student.feesPaid / student.totalFees) * 100 || 0).toFixed(1)}% Collected
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]" onClick={e => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            <StudentForm onSubmit={handleUpdateStudent} submitText="Update Student" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentPage;