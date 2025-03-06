import { useState } from 'react';
import { Edit, Save, Download } from 'lucide-react';
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

const TIME_SLOTS = [
  '12:00-1:00',
  '1:00-2:00',
  '2:00-3:00',
  '3:00-4:00',
  '4:00-5:00',
  '5:00-6:00',
] as const;

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

type TimeSlot = typeof TIME_SLOTS[number];
type Day = typeof DAYS[number];

type SlotData = {
  subject: string;
};

type DaySchedule = Record<TimeSlot, SlotData>;
type WeekTimetable = Record<Day, DaySchedule>;

type EditDataType = {
  day: Day;
  time: TimeSlot;
  subject: string;
};

const TeacherTimetable = () => {
  const [teacher, setTeacher] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditDataType>({
    day: 'Monday',
    time: '12:00-1:00',
    subject: '',
  });

  const teachers: string[] = ['Mr. Smith', 'Ms. Johnson', 'Mr. Brown', 'Ms. Davis'];
  const subjects: string[] = ['Math', 'Science', 'History', 'English', 'Art', 'Physics'];

  const [timetable, setTimetable] = useState<WeekTimetable>(() => {
    const emptySchedule: DaySchedule = Object.fromEntries(
      TIME_SLOTS.map((time) => [time, { subject: '' }])
    ) as DaySchedule;

    return Object.fromEntries(DAYS.map((day) => [day, { ...emptySchedule }])) as WeekTimetable;
  });

  const handleEdit = (day: Day, time: TimeSlot) => {
    setEditData({
      day,
      time,
      subject: timetable[day][time].subject,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    setTimetable((prev) => ({
      ...prev,
      [editData.day]: {
        ...prev[editData.day],
        [editData.time]: { subject: editData.subject },
      },
    }));
    setIsDialogOpen(false);
  };

  const exportTimetable = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Time,' + DAYS.join(',') + '\n';

    TIME_SLOTS.forEach((time) => {
      csvContent += [time, ...DAYS.map((day) => timetable[day][time].subject)].join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'teacher_timetable.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="w-full bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Teacher Timetable</CardTitle>
          <div className="flex items-center gap-4 mt-4">
            <Select value={teacher} onValueChange={setTeacher}>
              <SelectTrigger className="w-60 bg-white border border-gray-300">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((tchr) => (
                  <SelectItem key={tchr} value={tchr}>
                    {tchr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={exportTimetable} className="bg-black text-white hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" /> Export Timetable
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Time</TableHead>
                {DAYS.map((day) => (
                  <TableHead key={day}>{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {TIME_SLOTS.map((time) => (
                <TableRow key={time}>
                  <TableCell>{time}</TableCell>
                  {DAYS.map((day) => (
                    <TableCell key={day}>
                      <div className="flex items-center justify-between">
                        <span>{timetable[day][time].subject}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(day, time)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle>Allot Subject</DialogTitle>
          </DialogHeader>
          <Label>Subject</Label>
          <Select value={editData.subject} onValueChange={(value) => setEditData((prev) => ({ ...prev, subject: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((sub) => (
                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherTimetable;
