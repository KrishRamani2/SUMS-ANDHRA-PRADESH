import { Button } from "../../ui/button";
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

// Base interface for shared properties
interface BaseTest {
  year: string;
  class: string;
  division: string;
  testName: string;
  subtestName: string;
  subject: string;
  testDate: string;
  examType: string;
  status: string;
  maxMarks: string;
}

// Interface for the form data (without required id)
interface FormData extends BaseTest {
  id?: number;
}

// Interface for the complete test data (with required id)
interface Test extends BaseTest {
  id: number;
}

const TestTakenPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    year: '',
    class: '',
    division: '',
    testName: '',
    subtestName: '',
    subject: '',
    examType: '',
    status: 'Pending',
    testDate: '',
    maxMarks: '',
  });

  const [tests, setTests] = useState<Test[]>([
    {
      id: 1,
      year: '2023',
      class: '10',
      division: 'A',
      testName: 'Mid Term',
      subtestName: 'Maths Paper 1',
      subject: 'Mathematics',
      testDate: '2023-10-15',
      examType: 'Offline',
      status: 'Completed',
      maxMarks: '100',
    },
    {
      id: 2,
      year: '2023',
      class: '11',
      division: 'B',
      testName: 'Unit Test',
      subtestName: 'Physics Paper 1',
      subject: 'Physics',
      testDate: '2023-11-20',
      examType: 'Online',
      status: 'Pending',
      maxMarks: '50',
    },
  ]);

  const filteredData = tests.filter(test =>
    Object.values(test).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: number) => {
    setTestToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (testToDelete !== null) {
      setTests(tests.filter(test => test.id !== testToDelete));
      setIsDeleteDialogOpen(false);
      setTestToDelete(null);
    }
  };

  const handleAdd = () => {
    setFormData({
      year: '',
      class: '',
      division: '',
      testName: '',
      subtestName: '',
      subject: '',
      examType: '',
      status: 'Pending',
      testDate: '',
      maxMarks: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const testToEdit = tests.find(test => test.id === id);
    if (testToEdit) {
      setFormData(testToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.id) {
      // Edit existing test
      const updatedTests = tests.map(test =>
        test.id === formData.id ? { ...formData, id: test.id } as Test : test
      );
      setTests(updatedTests);
    } else {
      // Add new test
      const newId = Math.max(...tests.map(t => t.id), 0) + 1;
      const newTest: Test = {
        ...formData,
        id: newId,
      };
      setTests([...tests, newTest]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className='pl-8 pr-8'>
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Test Taken</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative flex-1 mt-5">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search tests..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2 mt-6 bg-primary">
              <Plus className="h-4 w-4" /> Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Subtest Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Test Date</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>{test.class}</TableCell>
                    <TableCell>{test.division}</TableCell>
                    <TableCell>{test.testName}</TableCell>
                    <TableCell>{test.subtestName}</TableCell>
                    <TableCell>{test.subject}</TableCell>
                    <TableCell>{test.testDate}</TableCell>
                    <TableCell>{test.examType}</TableCell>
                    <TableCell>{test.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(test.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(test.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Test' : 'Add Test'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => setFormData({ ...formData, class: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="division" className="text-right">Division</Label>
                <Input
                  id="division"
                  name="division"
                  value={formData.division}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="testName" className="text-right">Test Name</Label>
                <Input
                  id="testName"
                  name="testName"
                  value={formData.testName}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="examType" className="text-right">Exam Type</Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) => setFormData({ ...formData, examType: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subtestName" className="text-right">Subtest Name</Label>
                <Input
                  id="subtestName"
                  name="subtestName"
                  value={formData.subtestName}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="testDate" className="text-right">Test Date</Label>
                <Input
                  id="testDate"
                  name="testDate"
                  type="date"
                  value={formData.testDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxMarks" className="text-right">Max Marks</Label>
                <Input
                  id="maxMarks"
                  name="maxMarks"
                  type="number"
                  value={formData.maxMarks}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{formData.id ? 'Save Changes' : 'Add Test'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Are you sure you want to delete this test?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestTakenPage;