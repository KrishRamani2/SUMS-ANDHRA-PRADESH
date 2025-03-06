import  { useState } from 'react';
import { Bell, Mail, Clock, User, Users, Search, X, CheckCircle2, AlertCircle, Info, Calendar } from 'lucide-react';
import { Card, CardContent} from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Header from './DistrictDashHeader';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Emergency Closure",
      content: "Due to severe weather conditions, school will remain closed tomorrow. All staff and students are advised to stay home and check the school portal for updates regarding remote learning options.",
      sender: "Principal Thomas",
      receiver: "All Staff",
      school: "Westlake High School",
      targetAudience: ["Staff", "Students", "Parents"],
      type: "urgent",
      date: "2025-03-02T08:30:00",
      isRead: false
    },
    {
      id: 2,
      title: "Faculty Meeting Reminder",
      content: "Please remember to attend the quarterly faculty meeting at 3:30 PM in the library. Agenda includes budget review, curriculum updates, and end-of-year planning.",
      sender: "Admin Office",
      receiver: "Academic Staff",
      school: "Westlake High School",
      targetAudience: ["Staff"],
      type: "reminder",
      date: "2025-03-01T14:15:00",
      isRead: true
    },
    {
      id: 3,
      title: "Curriculum Updates",
      content: "New science curriculum materials are available for review in the department office. Please provide feedback by March 10th to ensure timely implementation for the next academic year.",
      sender: "Curriculum Committee",
      receiver: "Science Department",
      school: "Westlake High School",
      targetAudience: ["Staff"],
      type: "info",
      date: "2025-02-28T09:45:00",
      isRead: false
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      content: "Parent-Teacher conferences are scheduled for next Thursday and Friday. Please prepare your student progress reports and submit them to the department head by Tuesday for review.",
      sender: "Vice Principal Johnson",
      receiver: "All Teachers",
      school: "Westlake High School",
      targetAudience: ["Staff", "Parents"],
      type: "event",
      date: "2025-02-27T16:20:00",
      isRead: true
    },
    {
      id: 5,
      title: "School Sports Day",
      content: "Annual Sports Day will be held on March 15. All students are encouraged to participate. Teachers are requested to support the Athletics Department with event management.",
      sender: "Athletics Department",
      receiver: "All Departments",
      school: "Westlake High School",
      targetAudience: ["Staff", "Students", "Parents"],
      type: "event",
      date: "2025-02-26T11:10:00",
      isRead: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, isRead: true} : notification
    ));
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-violet-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getNotificationTypeLabel = (type: string) => {
    switch(type) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'reminder':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Reminder</Badge>;
      case 'event':
        return <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">Event</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>;
      default:
        return <Badge variant="outline">General</Badge>;
    }
  };
  
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <TabsList className="h-10">
                    <TabsTrigger value="all" className="text-sm px-4">All Notifications</TabsTrigger>
                    <TabsTrigger value="unread" className="text-sm px-4">Unread</TabsTrigger>
                    <TabsTrigger value="urgent" className="text-sm px-4">Urgent</TabsTrigger>
                  </TabsList>
                  
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search notifications..." 
                      className="pl-9 pr-8 h-10 bg-gray-50 border-gray-200" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1 h-8 w-8 hover:bg-gray-100" 
                        onClick={() => setSearchTerm('')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <TabsContent value="all">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <Card 
                          key={notification.id} 
                          className={`border-l-4 ${notification.isRead ? 'border-l-gray-200 bg-white' : 'border-l-blue-500 bg-blue-50'} hover:shadow-md transition-all`}
                        >
                          <CardContent className="p-5">
                            <div className="flex gap-4">
                              <div className="mt-1 flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className={`font-semibold text-lg ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                      {notification.title}
                                    </h3>
                                    {getNotificationTypeLabel(notification.type)}
                                  </div>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {formatDate(notification.date)}
                                  </span>
                                </div>
                                <p className={`${notification.isRead ? 'text-gray-600' : 'text-gray-800'} mb-4`}>{notification.content}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm bg-white p-3 rounded-md border border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-blue-50 p-1.5 rounded-md">
                                      <User className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">From</span>
                                      <span className="font-medium">{notification.sender}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-indigo-50 p-1.5 rounded-md">
                                      <Mail className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">To</span>
                                      <span className="font-medium">{notification.receiver}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-violet-50 p-1.5 rounded-md">
                                      <Users className="h-4 w-4 text-violet-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">Audience</span>
                                      <span className="font-medium">{notification.targetAudience.join(", ")}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                  {!notification.isRead && (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-xs bg-white" 
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                      Mark as read
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">No notifications found</h3>
                      <p className="text-gray-500">Try changing your search or filter criteria</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="unread">
                  {filteredNotifications.filter(n => !n.isRead).length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.filter(n => !n.isRead).map((notification) => (
                        <Card 
                          key={notification.id} 
                          className="border-l-4 border-l-blue-500 bg-blue-50 hover:shadow-md transition-all"
                        >
                          <CardContent className="p-5">
                            <div className="flex gap-4">
                              <div className="mt-1 flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className="font-semibold text-lg text-gray-900">
                                      {notification.title}
                                    </h3>
                                    {getNotificationTypeLabel(notification.type)}
                                  </div>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {formatDate(notification.date)}
                                  </span>
                                </div>
                                <p className="text-gray-800 mb-4">{notification.content}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm bg-white p-3 rounded-md border border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-blue-50 p-1.5 rounded-md">
                                      <User className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">From</span>
                                      <span className="font-medium">{notification.sender}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-indigo-50 p-1.5 rounded-md">
                                      <Mail className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">To</span>
                                      <span className="font-medium">{notification.receiver}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-violet-50 p-1.5 rounded-md">
                                      <Users className="h-4 w-4 text-violet-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">Audience</span>
                                      <span className="font-medium">{notification.targetAudience.join(", ")}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs bg-white" 
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                    Mark as read
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <CheckCircle2 className="h-12 w-12 mx-auto text-green-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">All caught up!</h3>
                      <p className="text-gray-500">You have no unread notifications</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="urgent">
                  {filteredNotifications.filter(n => n.type === 'urgent').length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.filter(n => n.type === 'urgent').map((notification) => (
                        <Card 
                          key={notification.id} 
                          className={`border-l-4 ${notification.isRead ? 'border-l-red-300' : 'border-l-red-500'} hover:shadow-md transition-all ${notification.isRead ? 'bg-white' : 'bg-red-50'}`}
                        >
                          <CardContent className="p-5">
                            <div className="flex gap-4">
                              <div className="mt-1 flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <h3 className={`font-semibold text-lg ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                      {notification.title}
                                    </h3>
                                    {getNotificationTypeLabel(notification.type)}
                                  </div>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {formatDate(notification.date)}
                                  </span>
                                </div>
                                <p className={`${notification.isRead ? 'text-gray-600' : 'text-gray-800'} mb-4`}>{notification.content}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm bg-white p-3 rounded-md border border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-blue-50 p-1.5 rounded-md">
                                      <User className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">From</span>
                                      <span className="font-medium">{notification.sender}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-indigo-50 p-1.5 rounded-md">
                                      <Mail className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">To</span>
                                      <span className="font-medium">{notification.receiver}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="bg-violet-50 p-1.5 rounded-md">
                                      <Users className="h-4 w-4 text-violet-500" />
                                    </div>
                                    <div>
                                      <span className="text-gray-500 block text-xs">Audience</span>
                                      <span className="font-medium">{notification.targetAudience.join(", ")}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                  {!notification.isRead && (
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-xs bg-white" 
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                                      Mark as read
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">No urgent notifications</h3>
                      <p className="text-gray-500">There are no urgent matters requiring your attention</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationCenter;