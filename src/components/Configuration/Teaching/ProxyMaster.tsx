import { useState } from 'react';
import { Edit, Plus, Save } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Input } from '../../ui/input';

// Define the type for the form data
interface FormData {
  year: string;
  teacher: string;
  proxyTeacher: string;
  prioritySequence: string;
}

const ProxyTeacherMaster = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    year: '',
    teacher: '',
    proxyTeacher: '',
    prioritySequence: '',
  });
  const [proxyAssignments, setProxyAssignments] = useState<FormData[]>([]);

  // Sample data for dropdowns
  const years = ['2023', '2024', '2025'];
  const teachers = ['Mr. Smith', 'Ms. Johnson', 'Mr. Brown', 'Ms. Davis'];
  const proxyTeachers = ['Mr. White', 'Ms. Green', 'Mr. Black', 'Ms. Purple'];

  // Handle opening the add dialog
  const handleAdd = () => {
    setFormData({ year: '', teacher: '', proxyTeacher: '', prioritySequence: '' });
    setIsDialogOpen(true);
  };

  // Handle saving the form data
  const handleSave = () => {
    setProxyAssignments([...proxyAssignments, formData]);
    setIsDialogOpen(false);
  };

  // Handle editing a proxy assignment
  const handleEdit = (index: number) => {
    setFormData(proxyAssignments[index]);
    setIsDialogOpen(true);
  };

  // Handle updating the form data
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proxy Teacher Master</h1>
        <Button onClick={handleAdd} className="bg-black text-white hover:bg-gray-800">
          <Plus className="h-4 w-4 mr-2" /> Add Proxy Teacher
        </Button>
      </div>

      {/* Table to display proxy assignments */}
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-gray-900 font-bold">Year</TableHead>
              <TableHead className="text-gray-900 font-bold">Teacher</TableHead>
              <TableHead className="text-gray-900 font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proxyAssignments.map((assignment, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="text-gray-900">{assignment.year}</TableCell>
                <TableCell className="text-gray-900">{assignment.teacher}</TableCell>
                <TableCell className="text-gray-900">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                    className="text-gray-900 hover:bg-gray-200"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">
              {formData.year ? 'Edit Proxy Assignment' : 'Add Proxy Assignment'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Year Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right text-gray-900">
                Year
              </Label>
              <Select
                value={formData.year}
                onValueChange={(value) => handleChange('year', value)}
              >
                <SelectTrigger className="col-span-3 bg-white border border-gray-300">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Teacher Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacher" className="text-right text-gray-900">
                Teacher
              </Label>
              <Select
                value={formData.teacher}
                onValueChange={(value) => handleChange('teacher', value)}
              >
                <SelectTrigger className="col-span-3 bg-white border border-gray-300">
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Proxy Teacher Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proxyTeacher" className="text-right text-gray-900">
                Proxy Teacher
              </Label>
              <Select
                value={formData.proxyTeacher}
                onValueChange={(value) => handleChange('proxyTeacher', value)}
              >
                <SelectTrigger className="col-span-3 bg-white border border-gray-300">
                  <SelectValue placeholder="Select Proxy Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {proxyTeachers.map((proxy) => (
                    <SelectItem key={proxy} value={proxy}>
                      {proxy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority Sequence Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prioritySequence" className="text-right text-gray-900">
                Priority Sequence
              </Label>
              <Input
                id="prioritySequence"
                value={formData.prioritySequence}
                onChange={(e) => handleChange('prioritySequence', e.target.value)}
                className="col-span-3 bg-white border border-gray-300"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSave}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProxyTeacherMaster;