/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface AgendaItem {
  time: string;
  task: string;
}

interface AgendaData {
  [key: string]: AgendaItem[];
}

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.toDateString());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Hardcoded agenda data
  const agenda: AgendaData = {
    [new Date(currentYear, currentMonth, 5).toDateString()]: [
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
    ],
    [new Date(currentYear, currentMonth, 12).toDateString()]: [
      { time: '2:00 pm', task: 'Project Planning' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
    ],
    [new Date(currentYear, currentMonth, 25).toDateString()]: [
      { time: '1:00 pm', task: 'Client Presentation' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
      { time: '10:00 am', task: 'Team Meeting' },
    ],
  };

  const calendarDays = [];
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const isSelected = selectedDate === date.toDateString();
    const hasAgenda = !!agenda[date.toDateString()];
    const isPast = date.getTime() < startDate;

    calendarDays.push(
      <div
        key={i}
        className={`py-2 text-sm rounded cursor-pointer ${
          isPast
            ? 'text-gray-400 cursor-not-allowed' // Past dates
            : date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            ? 'bg-blue-500 text-white' // Today's date
            : hasAgenda
            ? 'text-green-600' // Dates with agenda
            : 'text-gray-700' // Normal dates
        } ${isSelected && !isPast ? 'border-2 border-blue-500' : ''}`}
        onClick={() => !isPast && setSelectedDate(date.toDateString())} // Disable click for past dates
      >
        {i}
      </div>
    );
  }

  const selectedAgenda = agenda[selectedDate];

  return (
    <Card className="w-full max-w-md text-sm">
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <button onClick={prevMonth} className="p-1">
            <ChevronLeft size={16} />
          </button>
          <CardTitle className="cursor-pointer text-base">
            {months[currentMonth]} {currentYear}
          </CardTitle>
          <button onClick={nextMonth} className="p-1">
            <ChevronRight size={16} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Weekdays */}
          <div className="text-gray-500">S</div>
          <div className="text-gray-500">M</div>
          <div className="text-gray-500">T</div>
          <div className="text-gray-500">W</div>
          <div className="text-gray-500">T</div>
          <div className="text-gray-500">F</div>
          <div className="text-gray-500">S</div>

          {/* Calendar Days */}
          {calendarDays}
        </div>
        <div className="mt-3">
          <h4 className="font-medium text-base text-gray-700">
            Agenda for {selectedDate}
          </h4>
          <div className="mt-2 space-y-2">
            {selectedAgenda ? (
              selectedAgenda.map((item, index) => (
                <div key={index} className="bg-gray-100 rounded p-2">
                  <h5 className="font-medium text-sm">{item.time}</h5>
                  <p className="text-xs">{item.task}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <AlertCircle size={24} />
                <p className="mt-1 text-sm">No Agenda</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;