import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormattedEventData) => void;
  isDarkMode?: boolean;
}

interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  attendees: string[];
  type: EventType;
  repeats: RepeatOption;
}

interface FormattedEventData extends Omit<EventFormData, 'date'> {
  date: Date;
  time: string;
}

type EventType = 'meeting' | 'appointment' | 'reminder' | 'task' | 'social';
type RepeatOption = 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';

interface FormErrors {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
}

const EventForm = ({ isOpen, onClose, onSubmit, isDarkMode = false }: EventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    attendees: [],
    type: 'meeting',
    repeats: 'never'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const eventTypes = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'appointment', label: 'Appointment' },
    { value: 'reminder', label: 'Reminder' },
    { value: 'task', label: 'Task' },
    { value: 'social', label: 'Social Event' }
  ];

  const repeatOptions = [
    { value: 'never', label: 'Never' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name: keyof EventFormData, value: EventType | RepeatOption) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format the data before submission
      const formattedData: FormattedEventData = {
        ...formData,
        time: `${formData.startTime} - ${formData.endTime}`,
        date: new Date(formData.date)
      };
      
      onSubmit(formattedData);
      setFormData({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        attendees: [],
        type: 'meeting',
        repeats: 'never'
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[600px] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create New Event
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Event Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Event Type
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value: EventType) => handleSelectChange('type', value)}
            >
              <SelectTrigger className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="startTime" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  End Time
                </Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`min-h-[100px] ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}
              placeholder="Enter event description"
            />
          </div>

          {/* Repeat Options */}
          <div className="space-y-2">
            <Label htmlFor="repeats" className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              Repeat
            </Label>
            <Select
              value={formData.repeats}
              onValueChange={(value: RepeatOption) => handleSelectChange('repeats', value)}
            >
              <SelectTrigger className={`w-full ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
                <SelectValue placeholder="Select repeat frequency" />
              </SelectTrigger>
              <SelectContent>
                {repeatOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={isDarkMode ? 'border-gray-700 text-gray-300' : ''}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;