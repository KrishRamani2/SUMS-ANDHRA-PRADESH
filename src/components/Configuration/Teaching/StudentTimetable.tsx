import { useState } from 'react';
import { Edit, Save } from 'lucide-react';
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

// Define types for the timetable structure
type TimeSlot = {
  faculty: string;
  subject: string;
};

type DaySchedule = {
  [key: string]: TimeSlot;
};

type WeekTimetable = {
  [key in WeekDay]: DaySchedule;
};

type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

type EditDataType = {
  day: WeekDay;
  time: string;
  faculty: string;
  subject: string;
};

const StudentTimetable = () => {
  const [section, setSection] = useState('');
  const [classSelected, setClassSelected] = useState('');
  const [division, setDivision] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState<EditDataType>({ 
    day: 'Monday', 
    time: '', 
    faculty: '', 
    subject: '' 
  });

  // Sample data for dropdowns
  const sections = ['A', 'B', 'C', 'D'];
  const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4'];
  const divisions = ['Division 1', 'Division 2', 'Division 3'];

  const timeSlots = [
    '12:00-1:00',
    '1:00-2:00',
    '2:00-3:00',
    '3:00-4:00',
    '4:00-5:00',
    '5:00-6:00'
  ] as const;

  // Initialize timetable with proper typing
  const [timetable, setTimetable] = useState<WeekTimetable>({
    'Monday': Object.fromEntries(timeSlots.map(time => [time, { faculty: '', subject: '' }])),
    'Tuesday': Object.fromEntries(timeSlots.map(time => [time, { faculty: '', subject: '' }])),
    'Wednesday': Object.fromEntries(timeSlots.map(time => [time, { faculty: '', subject: '' }])),
    'Thursday': Object.fromEntries(timeSlots.map(time => [time, { faculty: '', subject: '' }])),
    'Friday': Object.fromEntries(timeSlots.map(time => [time, { faculty: '', subject: '' }])),
    'Saturday': Object.fromEntries(timeSlots.map(time => [time, { faculty: '', subject: '' }])),
  });

  // Handle opening the edit dialog
  const handleEdit = (day: WeekDay, time: string) => {
    setEditData({
      day,
      time,
      faculty: timetable[day][time].faculty,
      subject: timetable[day][time].subject,
    });
    setIsDialogOpen(true);
  };

  // Handle saving the edited data
  const handleSave = () => {
    setTimetable(prev => ({
      ...prev,
      [editData.day]: {
        ...prev[editData.day],
        [editData.time]: {
          faculty: editData.faculty,
          subject: editData.subject,
        },
      },
    }));
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="w-full bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Student Timetable</CardTitle>
          <div className="flex items-center gap-4 mt-4">
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-40 bg-white border border-gray-300">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((sec) => (
                  <SelectItem key={sec} value={sec}>
                    {sec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={classSelected} onValueChange={setClassSelected}>
              <SelectTrigger className="w-40 bg-white border border-gray-300">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={division} onValueChange={setDivision}>
              <SelectTrigger className="w-40 bg-white border border-gray-300">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((div) => (
                  <SelectItem key={div} value={div}>
                    {div}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-900 font-bold">Time</TableHead>
                  {(Object.keys(timetable) as WeekDay[]).map((day) => (
                    <TableHead key={day} className="text-gray-900 font-bold">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((time) => (
                  <TableRow key={time} className="hover:bg-gray-50">
                    <TableCell className="text-gray-900">{time}</TableCell>
                    {(Object.keys(timetable) as WeekDay[]).map((day) => (
                      <TableCell key={day} className="text-gray-900">
                        <div className="flex items-center justify-between">
                          <span>
                            {timetable[day][time].faculty} - {timetable[day][time].subject}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(day, time)}
                            className="text-gray-900 hover:bg-gray-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">Edit Timetable Slot</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty" className="text-right text-gray-900">
                Faculty
              </Label>
              <Input
                id="faculty"
                value={editData.faculty}
                onChange={(e) =>
                  setEditData({ ...editData, faculty: e.target.value })
                }
                className="col-span-3 bg-white border border-gray-300"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right text-gray-900">
                Subject
              </Label>
              <Input
                id="subject"
                value={editData.subject}
                onChange={(e) =>
                  setEditData({ ...editData, subject: e.target.value })
                }
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

export default StudentTimetable;