import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Edit2, 
  Trash2,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader 
} from '../ui/card';
import useClassroomStore from '../../store/classroomStore';

interface Classroom {
  id: number;
  academicYear: string;
  totalFees: number;
  feesPaid: number;
  activeStatus: boolean;
  totalStudents: number;
}

const ClassroomDashboard = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [academicYear, setAcademicYear] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
  const [tempStatus, setTempStatus] = useState(false); // Temporary status for the switch
  const [hasStatusChanged, setHasStatusChanged] = useState(false); // Track if status has been changed
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    {
      id: 1,
      academicYear: '2023-2024',
      totalFees: 500000,
      feesPaid: 350000,
      activeStatus: true,
      totalStudents: 120
    }
  ]);

  const { setSelectedClassroom } = useClassroomStore();

  const handleAddClassroom = () => {
    const yearExists = classrooms.some(
      classroom => classroom.academicYear === academicYear
    );

    if (yearExists) {
      alert('This academic year already exists!');
      return;
    }

    const newClassroom: Classroom = {
      id: Date.now(),
      academicYear,
      totalFees: 0,
      feesPaid: 0,
      activeStatus: isActive,
      totalStudents: 0
    };

    const updatedClassrooms = [...classrooms, newClassroom]
      .sort((a, b) => {
        const yearA = parseInt(a.academicYear.split('-')[0]);
        const yearB = parseInt(b.academicYear.split('-')[0]);
        return yearA - yearB;
      });

    setClassrooms(updatedClassrooms);
    setIsAddDialogOpen(false);
    setAcademicYear('');
  };

  const handleEditClassroom = (classroom: Classroom) => {
    setEditingClassroom(classroom);
    setTempStatus(classroom.activeStatus); // Initialize temporary status
    setHasStatusChanged(false); // Reset the change tracker
    setIsEditDialogOpen(true);
  };

  const handleStatusToggle = (checked: boolean) => {
    setTempStatus(checked);
    setHasStatusChanged(true);
  };

  const updateClassroomStatus = () => {
    if (!hasStatusChanged || !editingClassroom) {
      setIsEditDialogOpen(false);
      return;
    }

    const updatedClassrooms = classrooms.map(classroom => 
      classroom.id === editingClassroom.id 
        ? {...classroom, activeStatus: tempStatus}
        : classroom
    );

    setClassrooms(updatedClassrooms);
    setIsEditDialogOpen(false);
    setHasStatusChanged(false);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setHasStatusChanged(false);
    setTempStatus(editingClassroom?.activeStatus || false);
  };

  const deleteClassroom = (id: number) => {
    setClassrooms(classrooms.filter(classroom => classroom.id !== id));
  };

  const handleCardClick = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
    navigate(`/classroom/${classroom.id}`);
  };

  const availableYears = ['2022-2023', '2023-2024', '2024-2025', '2025-2026', '2026-2027', '2028']
    .filter(year => !classrooms.some(classroom => classroom.academicYear === year));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Classroom</h1>
        <div className="flex space-x-4">
          <Input 
            placeholder="Search classrooms..." 
            className="w-64"
          />
          <Dialog 
            open={isAddDialogOpen} 
            onOpenChange={setIsAddDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" /> Add Classroom
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Classroom</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Select 
                  value={academicYear}
                  onValueChange={setAcademicYear}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <span>Active Classroom</span>
                </div>
                <Button 
                  onClick={handleAddClassroom}
                  disabled={!academicYear}
                >
                  Create Classroom
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Edit Status Dialog */}
      <Dialog 
        open={isEditDialogOpen} 
        onOpenChange={handleCloseEditDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Classroom Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={tempStatus}
                onCheckedChange={handleStatusToggle}
              />
              <span>
                {tempStatus ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseEditDialog}>
                Cancel
              </Button>
              <Button 
                onClick={updateClassroomStatus}
                disabled={!hasStatusChanged}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map(classroom => (
          <Card 
            key={classroom.id} 
            className={`
              hover:shadow-lg transition-shadow cursor-pointer
              ${!classroom.activeStatus ? 'opacity-50 bg-gray-100' : ''}
            `}
            onClick={() => handleCardClick(classroom)}
          >
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center space-x-4 w-full">
                <span className="font-bold text-lg">{classroom.academicYear}</span>
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem 
                        onSelect={() => handleEditClassroom(classroom)}
                      >
                        {classroom.activeStatus ? (
                          <>
                            <Edit2 className="mr-2 w-4 h-4" /> Edit Status
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 w-4 h-4 text-green-600" /> Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onSelect={() => deleteClassroom(classroom.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Fees</p>
                  <p className="font-semibold">₹{classroom.totalFees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fees Paid</p>
                  <p className="font-semibold text-green-600">
                    ₹{classroom.feesPaid.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unpaid Fees</p>
                  <p className="font-semibold text-red-500">
                    ₹{(classroom.totalFees - classroom.feesPaid).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="font-semibold">{classroom.totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className={`
                    inline-block px-2 py-1 rounded-full text-xs font-medium
                    ${classroom.activeStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  `}>
                    {classroom.activeStatus ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassroomDashboard;