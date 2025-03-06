import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../ui/dialog";
import { Label } from "../../ui/label";

// Define interfaces for type safety
interface Schedule {
  id: number;
  class: string;
  div: string;
  testName: string;
  examType: string;
  subTestName: string;
  status: string;
}

interface FormData extends Omit<Schedule, 'id'> {
  id?: number;
}

// Sample data
const initialData: Schedule[] = [
  {
    id: 1,
    class: "10",
    div: "A",
    testName: "Mid-Term",
    examType: "Written",
    subTestName: "Math",
    status: "Scheduled",
  },
  {
    id: 2,
    class: "9",
    div: "B",
    testName: "Final",
    examType: "Oral",
    subTestName: "Science",
    status: "Pending",
  },
];

const ExamSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    class: "",
    div: "",
    testName: "",
    examType: "",
    subTestName: "",
    status: "",
  });

  const filteredData = schedules.filter((schedule) =>
    Object.values(schedule).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: number) => {
    setScheduleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (scheduleToDelete !== null) {
      setSchedules(schedules.filter((schedule) => schedule.id !== scheduleToDelete));
      setIsDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  const handleAdd = () => {
    setFormData({
      class: "",
      div: "",
      testName: "",
      examType: "",
      subTestName: "",
      status: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const scheduleToEdit = schedules.find((schedule) => schedule.id === id);
    if (scheduleToEdit) {
      setFormData(scheduleToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === formData.id ? { ...formData, id: schedule.id } : schedule
        )
      );
    } else {
      const newSchedule: Schedule = {
        ...formData,
        id: schedules.length + 1,
      };
      setSchedules([...schedules, newSchedule]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Exam Schedule</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative flex-1 mt-5">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by test name..."
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
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Sub Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.class}</TableCell>
                    <TableCell>{schedule.div}</TableCell>
                    <TableCell>{schedule.testName}</TableCell>
                    <TableCell>{schedule.examType}</TableCell>
                    <TableCell>{schedule.subTestName}</TableCell>
                    <TableCell>{schedule.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(schedule.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(schedule.id)}
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
            <DialogTitle>{formData.id ? "Edit Schedule" : "Add Schedule"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">Class</Label>
                <Input
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="div" className="text-right">Division</Label>
                <Input
                  id="div"
                  name="div"
                  value={formData.div}
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
                <Label htmlFor="examType" className="text-right">Exam Type</Label>
                <Input
                  id="examType"
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subTestName" className="text-right">Sub Test Name</Label>
                <Input
                  id="subTestName"
                  name="subTestName"
                  value={formData.subTestName}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{formData.id ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this schedule?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamSchedule;