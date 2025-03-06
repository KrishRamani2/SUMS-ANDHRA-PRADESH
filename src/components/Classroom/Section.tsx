import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  Edit2, 
  Trash2,
  MoreVertical,
  ArrowLeft,
  School,
  Users,
  CreditCard
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '../ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardFooter 
} from '../ui/card';
import {
  TooltipProvider,
} from "../ui/tooltip";
import useClassroomStore from '../../store/classroomStore';
import useSectionStore from '../../store/sectionStore';

interface Section {
  id: number;
  sectionName: string;
  paymentKeyId: string;
  documentRequired: string;
  sectionRemark: string;
  schoolName: string;
  udiscNo: string;
  indexNo: string;
  totalFees: number;
  feesPaid: number;
  activeStatus: boolean;
  studentCount: number;
}

interface SectionFormData {
  sectionName: string;
  paymentKeyId: string;
  documentRequired: string;
  sectionRemark: string;
  schoolName: string;
  udiscNo: string;
  indexNo: string;
}

interface SectionFormProps {
  onSubmit: () => void;
  submitText: string;
}

interface ClassroomStore {
  selectedClassroom: {
    academicYear: string;
  } | null;
}

interface SectionStore {
  sections: Section[];
  addSection: (section: Section) => void;
  updateSection: (id: number, data: Partial<Section>) => void;
  deleteSection: (id: number) => void;
  setSelectedSection: (section: Section) => void;
}

const SectionDashboard = () => {
  const navigate = useNavigate();
  const { selectedClassroom } = useClassroomStore() as ClassroomStore;
  const { sections, addSection, updateSection, deleteSection, setSelectedSection } = useSectionStore() as SectionStore;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState<SectionFormData>({
    sectionName: '',
    paymentKeyId: '',
    documentRequired: '',
    sectionRemark: '',
    schoolName: '',
    udiscNo: '',
    indexNo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: Date.now(),
      ...formData,
      totalFees: 0,
      feesPaid: 0,
      activeStatus: true,
      studentCount: 0
    };
    addSection(newSection);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditSection = (section: Section, e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    setEditingSection(section);
    setFormData({
      sectionName: section.sectionName,
      paymentKeyId: section.paymentKeyId,
      documentRequired: section.documentRequired,
      sectionRemark: section.sectionRemark,
      schoolName: section.schoolName,
      udiscNo: section.udiscNo,
      indexNo: section.indexNo
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSection = () => {
    if (editingSection) {
      updateSection(editingSection.id, formData);
      setIsEditDialogOpen(false);
      resetForm();
    }
  };

  const handleDeleteSection = (id: number, e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    deleteSection(id);
  };

  const handleEditDropdown = (
    section: Section,
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    handleEditSection(section, event);
  };

  const handleDeleteDropdown = (
    id: number,
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    handleDeleteSection(id, event);
  };

  const resetForm = () => {
    setFormData({
      sectionName: '',
      paymentKeyId: '',
      documentRequired: '',
      sectionRemark: '',
      schoolName: '',
      udiscNo: '',
      indexNo: ''
    });
  };

  const handleCardClick = (section: Section) => {
    setSelectedSection(section);
    navigate(`/section/${section.id}`);
  };

  const filteredSections = sections.filter(section =>
    section.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SectionForm: React.FC<SectionFormProps> = ({ onSubmit, submitText }) => (
    <div className="space-y-4" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Section Name</label>
          <Input
            name="sectionName"
            value={formData.sectionName}
            onChange={handleInputChange}
            placeholder="Enter section name"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Key ID</label>
          <Input
            name="paymentKeyId"
            value={formData.paymentKeyId}
            onChange={handleInputChange}
            placeholder="Enter payment key ID"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">School/College Name</label>
        <Input
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
          placeholder="Enter school/college name"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">UDISC No</label>
          <Input
            name="udiscNo"
            value={formData.udiscNo}
            onChange={handleInputChange}
            placeholder="Enter UDISC number"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Index No</label>
          <Input
            name="indexNo"
            value={formData.indexNo}
            onChange={handleInputChange}
            placeholder="Enter index number"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Required Documents</label>
        <Input
          name="documentRequired"
          value={formData.documentRequired}
          onChange={handleInputChange}
          placeholder="Enter required documents"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Remarks</label>
        <Input
          name="sectionRemark"
          value={formData.sectionRemark}
          onChange={handleInputChange}
          placeholder="Enter remarks"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      </div>
      <DialogFooter>
        <Button
          onClick={onSubmit}
          disabled={!formData.sectionName || !formData.paymentKeyId}
          className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
        >
          {submitText}
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sections</h1>
              <p className="text-gray-600 mt-1">Academic Year: {selectedClassroom?.academicYear}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search sections..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Section
                </Button>
              </DialogTrigger>
              <DialogContent 
                className="sm:max-w-[425px]" 
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <DialogHeader>
                  <DialogTitle>Add New Section</DialogTitle>
                </DialogHeader>
                <SectionForm onSubmit={handleAddSection} submitText="Create Section" />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.map((section) => (
            <Card 
              key={section.id} 
              className="hover:shadow-xl transition-all duration-300 relative overflow-hidden group border-black"
              onClick={() => handleCardClick(section)}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-black" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 flex items-center">
                      <School className="h-5 w-5 mr-2 text-black" />
                      {section.sectionName}
                    </h3>
                    <p className="text-sm text-gray-600">{section.schoolName}</p>
                  </div>
                  <TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={(event: React.MouseEvent<Element, MouseEvent>) => 
                            handleEditDropdown(section, event)
                          }
                        >
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(event: React.MouseEvent<Element, MouseEvent>) => 
                            handleDeleteDropdown(section.id, event)
                          }
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Fees</p>
                    <p className="font-semibold text-gray-900">₹{section.totalFees.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Fees Paid</p>
                    <p className="font-semibold text-gray-900">₹{section.feesPaid.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 mt-2">
                <div className="flex items-center justify-between w-full text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {section.studentCount || 0} Students
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    {((section.feesPaid / section.totalFees) * 100 || 0).toFixed(1)}% Collected
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent 
            className="sm:max-w-[425px]" 
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            </DialogHeader>
            <SectionForm onSubmit={handleUpdateSection} submitText="Update Section" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SectionDashboard;