import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, X } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface DvrConfig {
  id: number;
  year: string;
  faculty: string;
  status: string;
  deafaulttime: string;
}

interface FormData {
  id: number | null;
  year: string;
  faculty: string;
  status: string;
  deafaulttime: string;
}

const AllocateTeacher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<FormData>({
    id: null,
    year: '',
    faculty: '',
    status: '',
    deafaulttime: '',
  });
  const [configToDelete, setConfigToDelete] = useState<DvrConfig | null>(null);

  // Sample data for dropdowns
  const classList = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
  const facultyList = ['A', 'B', 'C', 'D'];
  const statusList = ['Camera 1', 'Camera 2', 'Camera 3', 'Camera 4'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [dvrConfigs, setDvrConfigs] = useState<DvrConfig[]>([
    {
      id: 1,
      year: 'Class 1',
      faculty: 'A',
      status: 'status 1',
      deafaulttime: 'Monday: 09:00-10:00, Tuesday: 10:00-11:00',
    },
    {
      id: 2,
      year: 'Class 2',
      faculty: 'B',
      status: 'status 2',
      deafaulttime: 'Wednesday: 09:00-10:00, Thursday: 10:00-11:00',
    }
  ]);

  const filteredData = dvrConfigs.filter(config => 
    Object.values(config).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: number) => {
    const config = dvrConfigs.find(config => config.id === id);
    if (config) {
      setConfigToDelete(config);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (configToDelete) {
      setDvrConfigs(dvrConfigs.filter(config => config.id !== configToDelete.id));
      setIsDeleteDialogOpen(false);
      setConfigToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setConfigToDelete(null);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      year: '',
      faculty: '',
      status: '',
      deafaulttime: '',
    });
    setTimeSlots([]);
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const configToEdit = dvrConfigs.find(config => config.id === id);
    if (configToEdit) {
      if (configToEdit.deafaulttime) {
        const timeSlotArray = configToEdit.deafaulttime.split(', ').map(slot => {
          const [day, time] = slot.split(': ');
          const [startTime, endTime] = time.split('-');
          return { day, startTime, endTime };
        });
        setTimeSlots(timeSlotArray);
      }
      setFormData(configToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleSelectChange = (value: string, field: keyof FormData) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleAddTimeSlot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const newTimeSlot: TimeSlot = {
      day: (formElement.elements.namedItem('day') as HTMLSelectElement).value,
      startTime: (formElement.elements.namedItem('startTime') as HTMLInputElement).value,
      endTime: (formElement.elements.namedItem('endTime') as HTMLInputElement).value,
    };
    setTimeSlots([...timeSlots, newTimeSlot]);
    formElement.reset();
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleTimeSubmit = () => {
    const timeString = timeSlots
      .map(slot => `${slot.day}: ${slot.startTime}-${slot.endTime}`)
      .join(', ');
    
    setFormData({
      ...formData,
      deafaulttime: timeString
    });
    setIsTimeDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      setDvrConfigs(dvrConfigs.map(config => 
        config.id === formData.id ? { ...formData, id: formData.id } : config
      ));
    } else {
      const newConfig: DvrConfig = {
        ...formData,
        id: dvrConfigs.length + 1
      } as DvrConfig;
      setDvrConfigs([...dvrConfigs, newConfig]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Allocate Teacher</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative flex-1 mt-5">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search configurations..."
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
                  <TableHead>Year</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell>{config.year}</TableCell>
                    <TableCell>{config.faculty}</TableCell>
                    <TableCell>{config.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(config.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(config.id)}
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Allocate status' : 'Add Allocate status'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">Year</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => handleSelectChange(value, 'year')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {classList.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="faculty" className="text-right">Faculty</Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(value) => handleSelectChange(value, 'faculty')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {facultyList.map((faculty) => (
                      <SelectItem key={faculty} value={faculty}>
                        {faculty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange(value, 'status')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusList.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{formData.id ? 'Save Changes' : 'Add Configuration'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Time Allocation Dialog */}
      <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Allocate Time Slots</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddTimeSlot} className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 sm:col-span-1">
                <Label htmlFor="day">Day</Label>
                <Select name="day" defaultValue={daysOfWeek[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 sm:col-span-1">
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="time" name="startTime" required />
              </div>
              <div className="col-span-4 sm:col-span-1">
                <Label htmlFor="endTime">End Time</Label>
                <Input type="time" name="endTime" required />
              </div>
              <div className="col-span-4 sm:col-span-1">
                <Button type="submit" className="mt-6">Add Slot</Button>
              </div>
            </div>
          </form>

          <div className="mt-4">
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded mb-2">
                <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTimeSlot(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleTimeSubmit}>Save Time Slots</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the configuration for <strong>{configToDelete?.year}</strong>?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocateTeacher;