/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../ui/dialog";
import { Label } from "../../ui/label";

const initialData = [
  { id: 1, from: "0", to: "50", grade: "D", status: "Active" },
  { id: 2, from: "51", to: "75", grade: "C", status: "Active" },
];

const GradingStructure = () => {
  const [schedules, setSchedules] = useState(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    grade: "",
  });

  const handleAdd = () => {
    setFormData({
      from: "",
      to: "",
      grade: "",
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newSchedule = {
      id: schedules.length + 1,
      from: formData.from,
      to: formData.to,
      grade: formData.grade,
      status: "Active",
    };
    setSchedules([...schedules, newSchedule]);
    setIsDialogOpen(false);
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Grading Structure</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
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
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.from}</TableCell>
                    <TableCell>{schedule.to}</TableCell>
                    <TableCell>{schedule.grade}</TableCell>
                    <TableCell>{schedule.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
            <DialogTitle>Add Grading Rule</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="from" className="text-right">From</Label>
                <Input
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="text-right">To</Label>
                <Input
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">Grade</Label>
                <Input
                  id="grade"
                  name="grade"
                  value={formData.grade}
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

export default GradingStructure;
