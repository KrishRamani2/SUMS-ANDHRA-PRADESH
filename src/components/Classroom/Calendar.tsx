 
import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Moon,
  Sun,
  Clock,
  X,
  Users,
  MapPin,
  Calendar as CalendarIcon,
  List
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../ui/toggle-group";

interface EventType {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  location: string;
  attendees: string[];
}

interface EventFormProps {
  onClose: () => void;
}

interface EventModalProps {
  events: EventType[];
  isOpen: boolean;
  onClose: () => void;
}

interface WeeklyViewProps {
  currentDate: Date;
  events: EventType[];
}

interface MonthlyViewProps {
  currentDate: Date;
  events: EventType[];
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [viewType, setViewType] = useState<'month' | 'week'>('month');
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: 'Movie Night',
      date: new Date(2024, 2, 6),
      time: '07:00 - 10:00 PM',
      description: 'Join us for a special screening of classic movies',
      location: 'Main Hall',
      attendees: ['user1.jpg', 'user2.jpg', 'user3.jpg'],
    },
    {
      id: 2,
      title: 'Color Run',
      date: new Date(2025, 1, 6),
      time: '09:00 AM - 12:00 PM',
      description: 'Annual charity run with color powder stations',
      location: 'City Park',
      attendees: ['user4.jpg', 'user5.jpg'],
    },
    {
      id: 3,
      title: 'Team Meeting',
      date: new Date(2025, 1, 15),
      time: '02:00 - 03:30 PM',
      description: 'Monthly team sync and planning session',
      location: 'Conference Room A',
      attendees: ['user1.jpg', 'user2.jpg'],
    }
  ]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getWeekDates = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(date.getFullYear(), date.getMonth(), diff + i));
    }
    return weekDates;
  };

  const goToPrevious = () => {
    if (viewType === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  const goToNext = () => {
    if (viewType === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDateClick = (date: Date, events: EventType[]) => {
    if (events.length > 0) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const EventForm = ({ onClose }: EventFormProps) => {
    const [formData, setFormData] = useState({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      location: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newEvent: EventType = {
        id: events.length + 1,
        title: formData.title,
        date: new Date(formData.date),
        time: `${formData.startTime} - ${formData.endTime}`,
        description: formData.description,
        location: formData.location,
        attendees: []
      };
      setEvents([...events, newEvent]);
      onClose();
    };

    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const EventModal = ({ events, isOpen, onClose }: EventModalProps) => {
    if (!isOpen) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Events</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{event.title}</h3>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onClose()}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="mr-2 h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="mr-2 h-4 w-4" />
                    {event.attendees.length} attendees
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const WeeklyView = ({ currentDate, events }: WeeklyViewProps) => {
    const weekDates = getWeekDates(currentDate);
    
    return (
      <div className={`border rounded-3xl overflow-hidden ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className={`grid grid-cols-7 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-50'}`}>
          {weekDates.map((date, index) => (
            <div key={index} className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="text-sm font-medium">{weekDays[date.getDay()]}</div>
              <div className={`text-lg mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className={`grid grid-cols-7 divide-x ${isDarkMode ? 'divide-gray-800' : 'divide-gray-50'}`}>
          {weekDates.map((date, index) => {
            const dayEvents = events.filter(event => 
              event.date.getDate() === date.getDate() &&
              event.date.getMonth() === date.getMonth() &&
              event.date.getFullYear() === date.getFullYear()
            );

            return (
              <div
                key={index}
                onClick={() => handleDateClick(date, dayEvents)}
                className={`min-h-[500px] p-3 transition-all cursor-pointer
                  ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="space-y-2">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`rounded-2xl p-3 transition-all
                        ${isDarkMode ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'bg-blue-50/50 hover:bg-blue-50'}`}
                    >
                      <div className={`font-medium text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                        {event.title}
                      </div>
                      <div className={`text-xs mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {event.time}
                      </div>
                      <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const MonthlyView = ({ currentDate, events }: MonthlyViewProps) => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const days = Array.from({ length: 42 }, (_, i) => {
      const dayNumber = i - firstDayOfMonth + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) return null;
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
    });

    const weeks = Array.from({ length: 6 }, (_, i) =>
      days.slice(i * 7, (i + 1) * 7)
    );

    return (
      <div className={`border rounded-3xl overflow-hidden ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className={`grid grid-cols-7 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-50'}`}>
          {weekDays.map((day) => (
            <div key={day} className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="text-sm font-medium">{day}</div>
            </div>
          ))}
        </div>
        <div className={`grid grid-rows-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 divide-x divide-y first:divide-t-0 h-24">
              {week.map((date, dayIndex) => {
                if (!date) {
                  return (
                    <div
                      key={dayIndex}
                      className={`p-2 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}
                    />
                  );
                }

                const dayEvents = events.filter(event =>
                  event.date.getDate() === date.getDate() &&
                  event.date.getMonth() === date.getMonth() &&
                  event.date.getFullYear() === date.getFullYear()
                );

                const isToday = 
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth() &&
                  date.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={dayIndex}
                    onClick={() => handleDateClick(date, dayEvents)}
                    className={`p-2 cursor-pointer transition-colors relative
                      ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`flex justify-center mb-1
                      ${isToday ? 'bg-blue-500 text-white w-6 h-6 rounded-full items-center mx-auto' : 
                        isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}
                    >
                      {date.getDate()}
                    </div>
                    <div className="space-y-1 max-h-16 overflow-hidden">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs rounded-lg p-1 truncate
                            ${isDarkMode ? 
                              'bg-blue-900/20 text-blue-300' : 
                              'bg-blue-50 text-blue-900'}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-4">
              <h2 className={`text-3xl font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {viewType === 'month' 
                  ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : `Week of ${formatDate(getWeekDates(currentDate)[0])}`}
              </h2>
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className="rounded-full h-8 w-8 p-0"
              >
                {isDarkMode ? 
                  <Sun className="h-4 w-4 text-gray-400" /> : 
                  <Moon className="h-4 w-4 text-gray-600" />
                }
              </Button>
            </div>
            <div className="relative w-full md:w-64">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 
                ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <Input 
                placeholder="Search events..." 
                className={`pl-10 w-full rounded-full focus:ring-2 
                  ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-900' : 
                    'bg-white border-gray-100 focus:ring-blue-50'}`}
              />
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <ToggleGroup type="single" value={viewType} onValueChange={(value) => {
    if (value === "month" || value === "week") {
      setViewType(value);
    }
  }} >
            <ToggleGroupItem value="month">
              <CalendarIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="week">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className={`flex items-center border rounded-full p-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
            <Button 
              variant="ghost" 
              onClick={goToPrevious}
              className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={goToNext}
              className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
            onClick={() => setIsNewEventModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </div>
      </div>

      {viewType === 'month' ? (
        <MonthlyView currentDate={currentDate} events={events} />
      ) : (
        <WeeklyView currentDate={currentDate} events={events} />
      )}

      <EventModal
        events={selectedDate ? events.filter(event => 
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
        ) : []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {isNewEventModalOpen && (
        <EventForm
          onClose={() => setIsNewEventModalOpen(false)}
        />
      )}
    </div>
  </div>
);
};

export default Calendar;