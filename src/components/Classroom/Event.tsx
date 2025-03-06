import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
  description: string;
}

interface EventMap {
  [key: string]: Event[];
}

interface NewEvent {
  title: string;
  time: string;
  date: string;
  description: string;
}

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventMap>({});
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    time: '',
    date: '',
    description: ''
  });

  // Generate calendar days
  const generateCalendarDays = (): (Date | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const days: (Date | null)[] = [];

    // Previous month's days to fill initial spaces
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }

    return days;
  };

  const addEvent = (): void => {
    if (newEvent.title && newEvent.date) {
      const updatedEvents = {...events};
      
      if (!updatedEvents[newEvent.date]) {
        updatedEvents[newEvent.date] = [];
      }
      
      updatedEvents[newEvent.date].push({
        ...newEvent,
        id: Date.now()
      });

      setEvents(updatedEvents);
      
      setNewEvent({
        title: '',
        time: '',
        date: '',
        description: ''
      });
    }
  };

  const deleteEvent = (date: string, eventId: number): void => {
    const updatedEvents = {...events};
    if (updatedEvents[date]) {
      updatedEvents[date] = updatedEvents[date].filter(
        event => event.id !== eventId
      );
      
      if (updatedEvents[date].length === 0) {
        delete updatedEvents[date];
      }
      
      setEvents(updatedEvents);
    }
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
            placeholder="Event Title" 
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          />
          <Input 
            type="time" 
            value={newEvent.time}
            onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            placeholder="Time"
          />
        </div>
        
        <Input 
          type="date" 
          value={newEvent.date}
          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
          className="w-full"
        />
        
        <Input 
          placeholder="Description (Optional)" 
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
          className="w-full"
        />
        
        <Button onClick={addEvent} className="w-full">
          <Plus className="mr-2" /> Add Event
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
                    {events[formatDate(day)]?.map(event => (
                      <div 
                        key={event.id} 
                        className="bg-blue-100 rounded p-1 mb-1 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-xs font-bold">{event.title}</p>
                          <p className="text-xs">{event.time}</p>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => deleteEvent(formatDate(day), event.id)}
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

export default EventsCalendar;