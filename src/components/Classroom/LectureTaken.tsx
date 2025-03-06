import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Lecture {
  id: number;
  subject: string;
  time: string;
  date: string;
}

interface LecturesByDate {
  [key: string]: Lecture[];
}

const LectureCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [lectures, setLectures] = useState<LecturesByDate>({});
  const [newLecture, setNewLecture] = useState<Omit<Lecture, 'id'>>({
    subject: '',
    time: '',
    date: ''
  });

  const generateCalendarDays = (): (Date | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }

    return days;
  };

  const addLecture = (): void => {
    if (newLecture.subject && newLecture.date) {
      const updatedLectures = { ...lectures };
      const dateKey = newLecture.date;
      
      if (!updatedLectures[dateKey]) {
        updatedLectures[dateKey] = [];
      }
      
      updatedLectures[dateKey].push({
        ...newLecture,
        id: Date.now()
      });

      setLectures(updatedLectures);
      
      setNewLecture({
        subject: '',
        time: '',
        date: ''
      });
    }
  };

  const deleteLecture = (date: string, lectureId: number): void => {
    const updatedLectures = { ...lectures };
    updatedLectures[date] = updatedLectures[date].filter(
      (lecture: Lecture) => lecture.id !== lectureId
    );
    
    if (updatedLectures[date].length === 0) {
      delete updatedLectures[date];
    }
    
    setLectures(updatedLectures);
  };

  const formatDate = (date: Date | null): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft />
          </Button>
          <CardTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input 
            placeholder="Subject" 
            value={newLecture.subject}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setNewLecture({...newLecture, subject: e.target.value})}
          />
          <Input 
            type="time" 
            value={newLecture.time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setNewLecture({...newLecture, time: e.target.value})}
            placeholder="Time"
          />
        </div>
        
        <Input 
          type="date" 
          value={newLecture.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setNewLecture({...newLecture, date: e.target.value})}
          className="w-full"
        />
        
        <Button onClick={addLecture} className="w-full">
          <Plus className="mr-2" /> Add Lecture
        </Button>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="font-bold text-sm">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`border p-1 min-h-[80px] relative ${day ? 'cursor-pointer' : 'bg-gray-100'}`}
            >
              {day && (
                <>
                  <div className="text-sm">{day.getDate()}</div>
                  <ScrollArea className="h-16 w-full">
                    {lectures[formatDate(day)]?.map((lecture: Lecture) => (
                      <div 
                        key={lecture.id} 
                        className="bg-blue-100 rounded p-1 mb-1 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-xs font-bold">{lecture.subject}</p>
                          <p className="text-xs">{lecture.time}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => deleteLecture(formatDate(day), lecture.id)}
                          className="w-4 h-4"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureCalendar;