import { useState, FormEvent } from 'react';
import { Search, Plus, Pencil, Trash2, Clock, X } from 'lucide-react';
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
  class: string;
  division: string;
  deafaulttime: string;
  classroomname: string;
  camera: string;
}

interface FormDataType {
  id?: number;
  class: string;
  division: string;
  deafaulttime: string;
  classroomname: string;
  camera: string;
}

const AllocateCamera = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    class: '',
    division: '',
    deafaulttime: '',
    classroomname: '',
    camera: '',
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [configToDelete, setConfigToDelete] = useState<number | null>(null);

  const classList = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  const divisionList = ['A', 'B', 'C', 'D'];
  const cameraList = ['Camera 1', 'Camera 2', 'Camera 3', 'Camera 4'];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [dvrConfigs, setDvrConfigs] = useState<DvrConfig[]>([
    {
      id: 1,
      class: 'Class 1',
      division: 'A',
      deafaulttime: 'Mon: 09:00-10:00, Wed: 11:00-12:00',
      classroomname: 'Room 101',
      camera: 'Camera 1',
    },
    {
      id: 2,
      class: 'Class 2',
      division: 'B',
      deafaulttime: 'Tue: 10:00-11:00, Thu: 14:00-15:00',
      classroomname: 'Room 102',
      camera: 'Camera 2',
    }
  ]);

  const filteredData = dvrConfigs.filter(config => 
    Object.values(config).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteClick = (id: number) => {
    setConfigToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (configToDelete) {
      setDvrConfigs(dvrConfigs.filter(config => config.id !== configToDelete));
      setIsDeleteDialogOpen(false);
      setConfigToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setConfigToDelete(null);
  };

  const handleAdd = () => {
    setFormData({
      class: '',
      division: '',
      deafaulttime: '',
      classroomname: '',
      camera: '',
    });
    setTimeSlots([]);
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const configToEdit = dvrConfigs.find(config => config.id === id);
    if (configToEdit) {
      const timeSlotArray = configToEdit.deafaulttime.split(', ').map(slot => {
        const [day, time] = slot.split(': ');
        const [startTime, endTime] = time.split('-');
        return { day, startTime, endTime };
      });
      setTimeSlots(timeSlotArray);
      setFormData(configToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleSelectChange = (value: string, field: keyof FormDataType) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeAllocation = () => {
    setIsTimeDialogOpen(true);
  };

  const handleAddTimeSlot = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const dayInput = formElement.day as HTMLSelectElement;
    const startTimeInput = formElement.startTime as HTMLInputElement;
    const endTimeInput = formElement.endTime as HTMLInputElement;
    
    const newTimeSlot: TimeSlot = {
      day: dayInput.value,
      startTime: startTimeInput.value,
      endTime: endTimeInput.value,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      setDvrConfigs(dvrConfigs.map(config => 
        config.id === formData.id ? { ...formData as DvrConfig } : config
      ));
    } else {
      const newConfig: DvrConfig = {
        ...formData,
        id: dvrConfigs.length + 1
      };
      setDvrConfigs([...dvrConfigs, newConfig]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Allocate Camera</CardTitle>
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
                  <TableHead>Class</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Default Time</TableHead>
                  <TableHead>Classroom Name</TableHead>
                  <TableHead>Camera</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell>{config.class}</TableCell>
                    <TableCell>{config.division}</TableCell>
                    <TableCell>{config.deafaulttime}</TableCell>
                    <TableCell>{config.classroomname}</TableCell>
                    <TableCell>{config.camera}</TableCell>
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
                          onClick={() => handleDeleteClick(config.id)}
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

      {/* Main Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Allocate Camera' : 'Add Allocate Camera'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => handleSelectChange(value, 'class')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select class" />
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
                <Label htmlFor="division" className="text-right">Division</Label>
                <Select
                  value={formData.division}
                  onValueChange={(value) => handleSelectChange(value, 'division')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisionList.map((div) => (
                      <SelectItem key={div} value={div}>
                        {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="camera" className="text-right">Camera</Label>
                <Select
                  value={formData.camera}
                  onValueChange={(value) => handleSelectChange(value, 'camera')}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    {cameraList.map((cam) => (
                      <SelectItem key={cam} value={cam}>
                        {cam}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="classroomname" className="text-right">Classroom Name</Label>
                <Input
                  id="classroomname"
                  name="classroomname"
                  value={formData.classroomname}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deafaulttime" className="text-right">Default Time</Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="deafaulttime"
                    name="deafaulttime"
                    value={formData.deafaulttime}
                    onChange={handleInputChange}
                    className="flex-1"
                    required
                    readOnly
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleTimeAllocation}
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
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
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  type="time"
                  id="startTime"
                  name="startTime"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  type="time"
                  id="endTime"
                  name="endTime"
                  required
                />
              </div>
              <div className="col-span-4 sm:col-span-1 flex items-end">
                <Button type="submit" className="w-full">Add Slot</Button>
              </div>
            </div>
          </form>

          {/* Display added time slots */}
          <div className="mt-4">
            <Label>Added Time Slots:</Label>
            <div className="mt-2 space-y-2">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
                  <span>{`${slot.day}: ${slot.startTime} - ${slot.endTime}`}</span>
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
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleTimeSubmit}>Save Time Slots</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-black">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-black">Are you sure you want to delete this configuration?</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              className="text-black border-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-black text-white hover:bg-gray-800"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocateCamera;