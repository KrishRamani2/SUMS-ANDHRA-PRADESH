import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useReminderFormStore } from "../../store/reminderStore";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription } from "../ui/alert";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// Define interfaces for type safety
interface Student {
  id: string;
  studentId: string;
  ivId: string;
  name: string;
  class: string;
  particular: string;
  fees: number;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  hasApp: boolean;
}

interface MessageLimits {
  sms: number;
  whatsapp: number;
  email: number;
  app: number;
}

type MediumType = "sms" | "whatsapp" | "email" | "app";

interface SendOptions {
  sms: boolean;
  whatsapp: boolean;
  email: boolean;
  app: boolean; 
}

interface Reminder {
  id: string;
  title: string;
  students: Student[];
  message: string;
  sentTo: SendOptions;
  sentDate: Date;
}

interface Props {
  onClose?: () => void;
}

const StudentsReminderForm: React.FC<Props> = ({ onClose }) => {
  // Local state management
  const [messageError, setMessageError] = useState<string>("");
  const [selectedMedium, setSelectedMedium] = useState<MediumType>("sms");

  // Define message length limits using useMemo
  const MESSAGE_LIMITS = useMemo<MessageLimits>(
    () => ({
      sms: 160,
      whatsapp: 1000,
      email: 5000,
      app: 500,
    }),
    []
  );

  // Helper function to get current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get store values and functions
  const {
    selectedStudents,
    reminderTitle,
    sendDate,
    reminderType,
    template,
    customMessage,
    setSelectedStudents,
    setReminderTitle,
    setSendDate,
    setReminderType,
    setTemplate,
    setCustomMessage,
    setSendOptions,
    addReminder,
  } = useReminderFormStore();
  
  const dummyStudents: Student[] = [
    {
      id: "1",
      studentId: "ST001",
      ivId: "IV001",
      name: "John Doe",
      class: "10A",
      particular: "Tuition Fees",
      fees: 5000,
      parentName: "Michael Doe",
      parentMobile: "9876543210",
      parentEmail: "michael.doe@example.com",
      hasApp: true,
    },
    {
      id: "2",
      studentId: "ST002",
      ivId: "IV002",
      name: "Jane Smith",
      class: "9B",
      particular: "Lab Fees",
      fees: 3000,
      parentName: "Sarah Smith",
      parentMobile: "8765432109",
      parentEmail: "sarah.smith@example.com",
      hasApp: false,
    },
  ];

  // Message templates
  const messageTemplates = {
    template1: {
      sms: "Fee due reminder: Your ward's {fees} fees is pending. Please clear by {date}.",
      whatsapp:
        "🔔 Fee Payment Reminder ✨\nDear {parentName},\nYour ward's fees of ₹{fees} is pending. Please clear by {date}.",
      email:
        "Dear {parentName},\n\nThis is a reminder that your ward's fees payment of ₹{fees} is pending. Please ensure to clear the dues by {date}.\n\nRegards,\nSchool Administration",
      app: "📚 Fee Payment Reminder\nYour fees payment of ₹{fees} is pending. Due date: {date}",
    },
    template2: {
      sms: "Parent meeting scheduled for {date}. Your slot: {time}",
      whatsapp:
        "📅 Parent Meeting Reminder 🎯\nDear {parentName},\nYour meeting is scheduled for {date} at {time}.",
      email:
        "Dear {parentName},\n\nThis is to remind you about the scheduled parent-teacher meeting on {date} at {time}.\n\nRegards,\nSchool Administration",
      app: "🤝 Meeting Reminder\nPTM scheduled for {date} at {time}",
    },
    template3: {
      sms: "Event: Annual Day celebration on {date}. Student reporting time: {time}",
      whatsapp:
        "🎉 Annual Day Celebration 🎭\nDear {parentName},\nJoin us for the Annual Day celebration on {date}. Student reporting time: {time}",
      email:
        "Dear {parentName},\n\nWe're excited to invite you to our Annual Day celebration on {date}. Students should report by {time}.\n\nRegards,\nSchool Administration",
      app: "🎪 Annual Day\nCelebration on {date}\nReporting time: {time}",
    },
  };

  // Function to check for emojis in text
  const containsEmoji = (text: string) => {
    const emojiRegex = /[\p{Emoji}]/u;
    return emojiRegex.test(text);
  };

  // Message validation function
  const validateMessage = useCallback(
    (message: string) => {
      if (selectedMedium === "sms" && containsEmoji(message)) {
        setMessageError("SMS messages cannot contain emojis");
        return false;
      }

      const limit = MESSAGE_LIMITS[selectedMedium];
      if (message.length > limit) {
        setMessageError(
          `Messages cannot exceed ${limit} characters for ${selectedMedium}`
        );
        return false;
      }

      setMessageError("");
      return true;
    },
    [selectedMedium, MESSAGE_LIMITS]
  );

  // Effect to validate message when it changes
  useEffect(() => {
    if (customMessage) {
      validateMessage(customMessage);
    }
  }, [customMessage, validateMessage]);

  // Function to handle medium selection
  const handleMediumChange = (value: string) => {
    const medium = value as MediumType;
    setSelectedMedium(medium);
    const options: SendOptions = {
      sms: false,
      whatsapp: false,
      email: false,
      app:false,
    };
    options[medium] = true;
    setSendOptions(options);
  };

  // Function to toggle student selection
  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(
      selectedStudents.includes(studentId)
        ? selectedStudents.filter((id) => id !== studentId)
        : [...selectedStudents, studentId]
    );
  };

  // Function to handle template selection
  const handleTemplateChange = (templateId: string) => {
    setTemplate(templateId);
    const selectedTemplate =
      messageTemplates[templateId as keyof typeof messageTemplates];
    if (selectedTemplate) {
      setCustomMessage(selectedTemplate[selectedMedium]);
    }
  };

  // Function to handle sending reminder
  const handleSendReminder = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    if (!reminderTitle || !sendDate || !reminderType || !customMessage) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateMessage(customMessage)) {
      return;
    }

    const options: SendOptions = {
      sms: false,
      whatsapp: false,
      email: false,
      app:false,
    };
    options[selectedMedium] = true;

    const newReminder: Reminder = {
      id: `reminder-${Date.now()}`,
      title: reminderTitle,
      students: dummyStudents.filter((student) =>
        selectedStudents.includes(student.id)
      ),
      message: customMessage,
      sentTo: options,
      sentDate: new Date(sendDate),
    };

    addReminder(newReminder);
    console.log("Reminder sent:", newReminder);

    // Reset form
    setSelectedStudents([]);
    setReminderTitle("");
    setSendDate(undefined);
    setReminderType("");
    setTemplate("");
    setCustomMessage("");
    setSelectedMedium("sms");

    if (onClose) {
      onClose();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto min-h-screen">
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Students Reminder Form</h2>
        <Button variant="ghost" onClick={onClose}>
          ×
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 pb-10">
        {/* Students Table */}
        <div className="max-h-[300px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>IV ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Particular</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Parent Name</TableHead>
                <TableHead>Parent Mobile</TableHead>
                <TableHead>Parent Email</TableHead>
                <TableHead>App Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleStudentSelection(student.id)}
                    />
                  </TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.ivId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.particular}</TableCell>
                  <TableCell>₹{student.fees}</TableCell>
                  <TableCell>{student.parentName}</TableCell>
                  <TableCell>{student.parentMobile}</TableCell>
                  <TableCell>{student.parentEmail}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        student.hasApp
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.hasApp ? "Installed" : "Not Installed"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mt-6">
          {/* Reminder Title */}
          <div>
            <Label htmlFor="reminderTitle">Reminder Title</Label>
            <Input
              id="reminderTitle"
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              placeholder="Enter reminder title"
              className="mt-1"
            />
          </div>

          {/* Send Date */}
          <div>
            <Label htmlFor="sendDate">Send Date</Label>
            <Input
              id="sendDate"
              type="date"
              value={sendDate}
              min={getCurrentDate()}
              onChange={(e) => {setSendDate(e.target.value)}}
              className="mt-1"
            />
          </div>

          {/* Reminder Type */}
          <div>
            <Label htmlFor="reminderType">Reminder Type</Label>
            <Select value={reminderType} onValueChange={setReminderType}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select reminder type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fee">Fee Reminder</SelectItem>
                <SelectItem value="exam">Exam Reminder</SelectItem>
                <SelectItem value="event">Event Reminder</SelectItem>
                <SelectItem value="attendance">Attendance Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Template Selection */}
          <div>
            <Label htmlFor="template">Message Template</Label>
            <Select value={template} onValueChange={handleTemplateChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="template1">Fee Payment Reminder</SelectItem>
                <SelectItem value="template2">Parent Meeting</SelectItem>
                <SelectItem value="template3">Annual Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Medium Selection */}
          <div className="space-y-2">
            <Label>Select Message Medium</Label>
            <RadioGroup
              value={selectedMedium}
              onValueChange={handleMediumChange}
              className="mt-1"
            >
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms">SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="app"
                    id="app"
                    disabled={
                      !selectedStudents.some((id) =>
                        dummyStudents.find((student) => student.id === id)?.hasApp
                      )
                    }
                  />
                  <Label htmlFor="app">In-App</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Message Content */}
          <div className="min-h-[200px]">
            <div className="flex justify-between items-center mb-2">
              <Label>Message</Label>
              <div className="text-sm text-gray-500">
                {customMessage ? customMessage.length : 0} /{MESSAGE_LIMITS[selectedMedium]} characters
              </div>
            </div>

            {messageError && (
              <Alert variant="destructive" className="mb-2">
                <AlertDescription>{messageError}</AlertDescription>
              </Alert>
            )}

            <ReactQuill
              value={customMessage || ""}
              onChange={setCustomMessage}
              theme="snow"
              placeholder="Write your custom message here..."
              className="h-[150px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSendReminder}
            disabled={
              selectedStudents.length === 0 ||
              !!messageError ||
              !reminderTitle ||
              !sendDate ||
              !reminderType ||
              !customMessage
            }
            className="w-full mt-10"
          >
            Send Reminder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsReminderForm;