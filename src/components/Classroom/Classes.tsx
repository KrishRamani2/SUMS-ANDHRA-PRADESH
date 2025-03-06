/* eslint-disable no-empty-pattern */
 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Classes = () => {
  const navigate = useNavigate();
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    className: "",
    division: "",
    totalFees: "",
    section: "",
  });

  // Sample data - replace with your actual data management
  const [] = useState([
    {
      id: 1,
      className: "2nd Standard",
      division: "A",
      section: "Primary Section",
      totalFees: 50000,
      paidFees: 35000,
      totalStudents: 45,
    },
    {
      id: 2,
      className: "2nd Standard",
      division: "B",
      section: "Primary Section",
      totalFees: 50000,
      paidFees: 32000,
      totalStudents: 42,
    },
  ]);

  // **Fix: Explicitly type event parameter**
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // **Fix: Define props type for ClassForm**
  interface ClassFormProps {
    onSubmit: () => void;
    submitText: string;
    type: "class" | "division";
  }

  const ClassForm: React.FC<ClassFormProps> = ({ onSubmit, submitText, type }) => (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-2">
        {type === "division" ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Class</label>
              <Input
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="Select class"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Division</label>
              <Input
                name="division"
                value={formData.division}
                onChange={handleInputChange}
                placeholder="Enter division (e.g., A, B, C)"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Class Name</label>
              <Input
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="Enter class name"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Section</label>
              <Input
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                placeholder="Enter section"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium">Total Fees</label>
          <Input
            name="totalFees"
            type="number"
            value={formData.totalFees}
            onChange={handleInputChange}
            placeholder="Enter total fees"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={onSubmit}
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
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Classes</h1>
              <p className="text-gray-600 mt-1">Primary Section</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search classes..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <BookOpen className="mr-2 h-4 w-4" /> Add Class
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                </DialogHeader>
                <ClassForm
                  onSubmit={() => setIsAddClassOpen(false)}
                  submitText="Create Class"
                  type="class"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
