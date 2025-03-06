 
import { useState } from 'react';
import {
  Plus,
  Mail,
  MessageSquare,
  Phone,
  MoreVertical,
  Filter
} from 'lucide-react';
import {
  ScrollArea,
  ScrollBar
} from "../../../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger} from '../../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent
} from '../../../components/ui/card';
import {
  Badge
} from "../../../components/ui/badge";

type Channel = 'email' | 'sms' | 'whatsapp';

type Announcement = {
  id: number;
  title: string;
  message: string;
  channels: Channel[];
  sentDate: string;
  sentTo: string;
  sentBy: string;
  status: string;
};

const Announcements = () => {
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<Array<Channel | 'all'>>(['all']);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      message: 'Annual parent-teacher meeting scheduled for next week',
      channels: ['email', 'sms', 'whatsapp'],
      sentDate: '2024-02-01',
      sentTo: 'All Parents',
      sentBy: 'John Smith',
      status: 'sent'
    },
    {
      id: 2,
      title: 'Holiday Notice',
      message: 'School will remain closed for spring break',
      channels: ['email', 'whatsapp'],
      sentDate: '2024-01-28',
      sentTo: 'All Students',
      sentBy: 'Sarah Johnson',
      status: 'sent'
    },
    {
      id: 3,
      title: 'Sports Day Announcement',
      message: 'Annual sports day scheduled for March 15th',
      channels: ['sms', 'whatsapp'],
      sentDate: '2024-01-25',
      sentTo: 'All Students & Parents',
      sentBy: 'Mike Wilson',
      status: 'sent'
    }
  ]);

  const channelIcons: Record<Channel, JSX.Element> = {
    email: <Mail className="h-4 w-4" />,
    sms: <MessageSquare className="h-4 w-4" />,
    whatsapp: <Phone className="h-4 w-4" />
  };
  
  const channelColors: Record<Channel, string> = {
    email: 'bg-blue-100 text-blue-800',
    sms: 'bg-green-100 text-green-800',
    whatsapp: 'bg-emerald-100 text-emerald-800'
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesChannel = selectedChannels.includes('all') || 
      announcement.channels.some(channel => selectedChannels.includes(channel));
    
    const announcementDate = new Date(announcement.sentDate);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    
    const matchesDate = (!startDate || announcementDate >= startDate) && 
                       (!endDate || announcementDate <= endDate);

    return matchesChannel && matchesDate;
  });

  const toggleChannel = (channel: Channel | 'all') => {
    if (channel === 'all') {
      setSelectedChannels(['all']);
    } else {
      const newChannels = selectedChannels.filter(c => c !== 'all');
      if (newChannels.includes(channel)) {
        setSelectedChannels(newChannels.filter(c => c !== channel));
      } else {
        setSelectedChannels([...newChannels, channel]);
      }
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-1rem)] w-full rounded-md">
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsNewAnnouncementOpen(true)}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> New Announcement
              </Button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`cursor-pointer ${
                  selectedChannels.includes('all') ? 'bg-gray-100' : ''
                }`}
                onClick={() => toggleChannel('all')}
              >
                All Channels
              </Badge>
              {(Object.keys(channelIcons) as Channel[]).map((channel) => (
                <Badge
                  key={channel}
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedChannels.includes(channel) ? channelColors[channel] : ''
                  }`}
                  onClick={() => toggleChannel(channel)}
                >
                  <span className="mr-1">{channelIcons[channel]}</span>
                  {channel.charAt(0).toUpperCase() + channel.slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Announcements List */}
          <Card>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {filteredAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                          <p className="text-sm text-gray-500">{announcement.message}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Resend</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {announcement.channels.map((channel) => (
                            <Badge
                              key={channel}
                              variant="secondary"
                              className={channelColors[channel]}
                            >
                              {channelIcons[channel]}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(announcement.sentDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <ScrollBar />
            </ScrollArea>
          </Card>

          {/* New Announcement Dialog */}
          <Dialog open={isNewAnnouncementOpen} onOpenChange={setIsNewAnnouncementOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Title" />
                <textarea
                  className="w-full h-32 p-2 border rounded-md"
                  placeholder="Message"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Send via:</label>
                  <div className="flex gap-2">
                    {(Object.keys(channelIcons) as Channel[]).map((channel) => (
                      <Button
                        key={channel}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        {channelIcons[channel]}
                        {channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => setIsNewAnnouncementOpen(false)}
                >
                  Send Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Filter Dialog */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Filter Announcements</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-sm text-gray-500">From</label>
                      <Input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">To</label>
                      <Input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

export default Announcements;