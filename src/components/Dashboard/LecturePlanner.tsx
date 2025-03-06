import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, Clock, Search, Users, BookOpen, GraduationCap } from 'lucide-react';

interface Lecture {
  id: number;
  date: string;
  className: string;
  subject: string;
  fromTime: string;
  toTime: string;
  teacher: string;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const LecturePlanner: React.FC = () => {
  // Using a constant instead of useState since we're not updating lectures
  const lectures: Lecture[] = [
    { id: 1, date: '2024-02-01', className: 'Computer Science', subject: 'Data Structures', fromTime: '09:00', toTime: '11:00', teacher: 'Dr. Smith' },
    { id: 2, date: '2024-02-02', className: 'Mathematics', subject: 'Linear Algebra', fromTime: '10:00', toTime: '12:00', teacher: 'Prof. Johnson' },
    { id: 3, date: '2024-02-03', className: 'Physics', subject: 'Quantum Mechanics', fromTime: '14:00', toTime: '16:00', teacher: 'Dr. Williams' },
    { id: 4, date: '2024-02-04', className: 'Biology', subject: 'Genetics', fromTime: '11:00', toTime: '13:00', teacher: 'Prof. Brown' },
    { id: 5, date: '2024-02-05', className: 'Chemistry', subject: 'Organic Chemistry', fromTime: '15:00', toTime: '17:00', teacher: 'Dr. Davis' },
  ];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const classes = [...new Set(lectures.map((lecture) => lecture.className))];

  const filteredLectures = lectures.filter((lecture) =>
    (!selectedDate || lecture.date === selectedDate.toISOString().split('T')[0]) &&
    (!selectedClass || lecture.className === selectedClass) &&
    (lecture.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.teacher.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedLectures = filteredLectures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLectures.length / itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, selectedClass, searchTerm]);

  // Custom styles for the DatePicker with proper type definitions
  const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <div className="relative">
        <Input
          value={value || ''}
          onChange={() => {}}
          onClick={onClick}
          ref={ref}
          placeholder="Select date"
          className="pl-10 cursor-pointer"
        />
        <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
      </div>
    )
  );

  return (
    <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="space-y-2 border-b">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Lecture Planner
        </CardTitle>
        <p className="text-center text-gray-500">Manage your academic schedule efficiently</p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Select Date</span>
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              customInput={<CustomInput />}
              dateFormat="yyyy-MM-dd"
              calendarClassName="shadow-lg border-0 rounded-lg"
            />
            {selectedDate && (
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setSelectedDate(null)}
              >
                Clear Date
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Select Class</span>
            </div>
            <Select
              value={selectedClass}
              onValueChange={(value) => setSelectedClass(value === selectedClass ? '' : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </div>
            <div className="relative">
              <Input
                placeholder="Search subject or teacher"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border shadow-sm overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold"><Calendar className="w-4 h-4 inline-block mr-2" />Date</TableHead>
                <TableHead className="font-semibold"><BookOpen className="w-4 h-4 inline-block mr-2" />Class</TableHead>
                <TableHead className="font-semibold"><GraduationCap className="w-4 h-4 inline-block mr-2" />Subject</TableHead>
                <TableHead className="font-semibold"><Clock className="w-4 h-4 inline-block mr-2" />From</TableHead>
                <TableHead className="font-semibold"><Clock className="w-4 h-4 inline-block mr-2" />To</TableHead>
                <TableHead className="font-semibold"><Users className="w-4 h-4 inline-block mr-2" />Teacher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLectures.map((lecture) => (
                <TableRow key={lecture.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>{lecture.date}</TableCell>
                  <TableCell className="font-medium">{lecture.className}</TableCell>
                  <TableCell>{lecture.subject}</TableCell>
                  <TableCell>{lecture.fromTime}</TableCell>
                  <TableCell>{lecture.toTime}</TableCell>
                  <TableCell>{lecture.teacher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-50"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                    className={currentPage === index + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-50"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default LecturePlanner;