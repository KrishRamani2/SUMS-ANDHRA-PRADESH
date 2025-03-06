import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import { 
  Clock, 
  Megaphone, 
  CalendarDays 
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

// Define types for the announcement structure
type Priority = 'high' | 'medium' | 'low';

interface Announcement {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  priority: Priority;
}

// Define the color mapping type
type PriorityColors = {
  [K in Priority]: string;
};

const priorityColors: PriorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Science Fair Registration",
    date: "Feb 15, 2024",
    time: "3:30 PM",
    category: "Academic",
    description: "Students can now register for the annual science fair. Top three projects will receive special recognition.",
    priority: "high"
  },
  {
    id: 2,
    title: "Sports Day Preparations",
    date: "Mar 1, 2024", 
    time: "2:00 PM",
    category: "Extracurricular",
    description: "All sports team captains must attend the preparatory meeting for the upcoming inter-school sports day.",
    priority: "medium"
  },
  {
    id: 3,
    title: "Parent-Teacher Conference",
    date: "Feb 22, 2024",
    time: "4:00 PM", 
    category: "Administration",
    description: "Quarterly parent-teacher meetings. Online and in-person slots available.",
    priority: "high"
  }
];

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard = ({ announcement }: AnnouncementCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Megaphone className="mr-2 text-blue-500" size={20} />
            {announcement.title}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${priorityColors[announcement.priority]} rounded-full`}
          >
            {announcement.priority.toUpperCase()} PRIORITY
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-2" size={16} />
            <span>{announcement.date}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2" size={16} />
            <span>{announcement.time}</span>
          </div>
          <p className="text-sm mt-2">{announcement.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const SchoolAnnouncements = () => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">School Announcements</h2>
        <Badge variant="secondary">
          {announcements.length} Active Announcements
        </Badge>
      </div>
      <ScrollArea className="h-[400px] pr-4">
        {announcements.map(announcement => (
          <AnnouncementCard 
            key={announcement.id} 
            announcement={announcement} 
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default SchoolAnnouncements;