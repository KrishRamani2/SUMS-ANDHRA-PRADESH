import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "../../ui/select";

interface Schedule {
  id: number;
  class: string;
  testName: string;
  status: string;
}

interface FormData {
  year: string;
  class: string;
  isRegular: string;
  testType: string;
  testName: string;
  description: string;
}

const initialData: Schedule[] = [
  { id: 1, class: "10", testName: "Mid-Term", status: "Scheduled" },
  { id: 2, class: "9", testName: "Final", status: "Pending" },
];

const classes = ["8", "9", "10", "11", "12"];

const TestType = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialData);
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    year: "",
    class: "",
    isRegular: "",
    testType: "",
    testName: "",
    description: "",
  });

  const filteredData = schedules.filter(
    (schedule) => selectedClass === "All" || schedule.class === selectedClass
  );

  const handleAdd = () => {
    setFormData({
      year: "",
      class: "",
      isRegular: "",
      testType: "",
      testName: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      class: formData.class,
      testName: formData.testName,
      status: "Scheduled",
    };
    setSchedules((prev) => [...prev, newSchedule]);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Grading Structure</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  <TableHead>Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.class}</TableCell>
                    <TableCell>{schedule.testName}</TableCell>
                    <TableCell>{schedule.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
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
            <DialogTitle>Add Schedule</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">
                  Class
                </Label>
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
                <Label htmlFor="isRegular" className="text-right">
                  Regular Test
                </Label>
                <Input
                  id="isRegular"
                  name="isRegular"
                  value={formData.isRegular}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="testType" className="text-right">
                  Test Type
                </Label>
                <Input
                  id="testType"
                  name="testType"
                  value={formData.testType}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="testName" className="text-right">
                  Test Name
                </Label>
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
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestType;