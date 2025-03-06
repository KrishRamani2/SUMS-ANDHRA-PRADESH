import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../ui/card";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../ui/radio-group";
import {
  Dialog,
  DialogContent
} from "../../ui/dialog";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import OfflineAuto from "./offlineAuto";
import OfflineManual from "./OfflineManual";
import OnlineAuto from "./OnlineAutoQuestionPaper";
import OnlineManual from "./OnlineManual";

// Define types for the form data
interface FormData {
  year: string;
  class: string;
  subject: string;
  test: string;
  chapter: string;
  title: string;
  totalMarks: string;
  examType: "offline" | "online";
  questionPaperType: "withAnswer" | "withoutAnswer";
  paperGeneration: "auto" | "manual";
}

// Define valid form field names
type FormField = keyof FormData;

const AddQuestionPaper = () => {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    class: "",
    subject: "",
    test: "",
    chapter: "",
    title: "",
    totalMarks: "",
    examType: "offline",
    questionPaperType: "withAnswer",
    paperGeneration: "auto",
  });

  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const requiredFields: FormField[] = ["year", "class", "subject"];
    const areRequiredFieldsFilled = requiredFields.every(field => formData[field] !== "");
    setIsPreviewEnabled(areRequiredFieldsFilled);
  }, [formData]);

  const handleChange = (field: FormField, value: string) => {
    let updates: Partial<FormData> = { [field]: value };
    
    if (field === "examType") {
      updates = {
        ...updates,
        paperGeneration: value === "online" ? "manual" : "auto"
      } as Partial<FormData>;
    }
    
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const getPreviewComponent = () => {
    const { examType, paperGeneration } = formData;

    if (examType === "offline") {
      if (paperGeneration === "auto") {
        return <OfflineAuto />;
      } else if (paperGeneration === "manual") {
        return <OfflineManual />;
      }
    } else if (examType === "online") {
      if (paperGeneration === "auto") {
        return <OnlineAuto />;
      } else if (paperGeneration === "manual") {
        return <OnlineManual />;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <div className="flex items-center gap-4">
            <Link to="/configuration/exam/question-paper">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>Add Question Paper</CardTitle>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Academic Year</Label>
                  <Select 
                    value={formData.year}
                    onValueChange={(value) => handleChange("year", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024-25</SelectItem>
                      <SelectItem value="2023">2023-24</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) => handleChange("class", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleChange("subject", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Test Type</Label>
                  <Select
                    value={formData.test}
                    onValueChange={(value) => handleChange("test", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Test Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="midterm">Mid Term</SelectItem>
                      <SelectItem value="final">Final Term</SelectItem>
                      <SelectItem value="unit">Unit Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Paper Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Chapter</Label>
                  <Select
                    value={formData.chapter}
                    onValueChange={(value) => handleChange("chapter", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ch1">Chapter 1</SelectItem>
                      <SelectItem value="ch2">Chapter 2</SelectItem>
                      <SelectItem value="ch3">Chapter 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    placeholder="Enter paper title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Marks</Label>
                  <Input 
                    type="number"
                    placeholder="Enter total marks"
                    value={formData.totalMarks}
                    onChange={(e) => handleChange("totalMarks", e.target.value)}
                  />
                </div>
              </div>

              {/* Exam Settings */}
              <div className="space-y-6 md:col-span-2">
                <div className="space-y-4">
                  <Label>Exam Type</Label>
                  <RadioGroup 
                    className="flex gap-4"
                    value={formData.examType}
                    onValueChange={(value: "offline" | "online") => handleChange("examType", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="offline" id="offline" />
                      <Label htmlFor="offline">Offline</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.examType === "offline" && (
                  <div className="space-y-4">
                    <Label>Question Paper Type</Label>
                    <RadioGroup 
                      className="flex gap-4"
                      value={formData.questionPaperType}
                      onValueChange={(value: "withAnswer" | "withoutAnswer") => 
                        handleChange("questionPaperType", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="withAnswer" id="withAnswer" />
                        <Label htmlFor="withAnswer">With Writing Answer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="withoutAnswer" id="withoutAnswer" />
                        <Label htmlFor="withoutAnswer">Without Writing Answer</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="space-y-4">
                  <Label>Paper Generation</Label>
                  <RadioGroup 
                    className="flex gap-4"
                    value={formData.paperGeneration}
                    onValueChange={(value: "auto" | "manual") => 
                      handleChange("paperGeneration", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="auto" id="auto" />
                      <Label htmlFor="auto">Auto Generation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manual Entry</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-start">
                  <Button 
                    type="button"
                    disabled={!isPreviewEnabled}
                    className="flex items-center gap-2"
                    onClick={() => setDialogOpen(true)}
                  >
                    <FileText className="h-4 w-4" />
                    See Question Paper
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-gray-50/50 p-6">
            <div className="flex justify-end gap-4 w-full">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Paper
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="overflow-y-auto">
            {getPreviewComponent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestionPaper;