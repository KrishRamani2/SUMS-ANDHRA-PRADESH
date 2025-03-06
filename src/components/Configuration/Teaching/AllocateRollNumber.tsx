import { useState, FormEvent, ChangeEvent } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Label } from '../../ui/label';

// Define interfaces for our data structures
interface Student {
  id: number;
  name: string;
  rollNumber: string;
}

interface FormData {
  id: number | null;
  name: string;
  rollNumber: string;
}

const AllocateRollNumber = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    id: null,
    name: '',
    rollNumber: '',
  });

  // Sample student data
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', rollNumber: '101' },
    { id: 2, name: 'Jane Smith', rollNumber: '102' },
    { id: 3, name: 'Alice Johnson', rollNumber: '103' },
  ]);

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle opening the dialog for adding/editing
  const handleAdd = () => {
    setFormData({ id: null, name: '', rollNumber: '' });
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const studentToEdit = students.find(student => student.id === id);
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
    setIsDialogOpen(true);
  };

  // Handle deleting a student
  const handleDelete = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      // Edit existing student
      setStudents(students.map(student =>
        student.id === formData.id ? { ...formData, id: student.id } : student
      ));
    } else {
      // Add new student
      const newStudent: Student = {
        ...formData,
        id: Math.max(0, ...students.map(s => s.id)) + 1,
      };
      setStudents([...students, newStudent]);
    }
    setIsDialogOpen(false);
  };

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="w-full bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Allocate Roll Number</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                className="pl-8 bg-white border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"
            >
              <Plus className="h-4 w-4" /> Allocate Roll Number
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-900 font-bold">Name</TableHead>
                  <TableHead className="text-gray-900 font-bold">Roll Number</TableHead>
                  <TableHead className="text-right text-gray-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="text-gray-900">{student.name}</TableCell>
                    <TableCell className="text-gray-900">{student.rollNumber}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(student.id)}
                          className="text-gray-900 hover:bg-gray-200"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(student.id)}
                          className="text-gray-900 hover:bg-gray-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">
              {formData.id ? 'Edit Roll Number' : 'Allocate Roll Number'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-gray-900">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3 bg-white border border-gray-300"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rollNumber" className="text-right text-gray-900">
                  Roll Number
                </Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="col-span-3 bg-white border border-gray-300"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800"
              >
                {formData.id ? 'Save Changes' : 'Allocate'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocateRollNumber;