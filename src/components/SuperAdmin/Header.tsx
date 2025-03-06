import { Home, Settings, Bell, ChevronDown, Search, LogOut } from 'lucide-react';
import { useSchoolStore } from '../../store/stateStore';
import { useAuthStore } from '../../store/loginStore';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { useNavigate } from 'react-router-dom';

// Define the notification type
type NotificationType = 'report' | 'system' | 'user';

// Define the notification interface
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
}

// Define the notifications state interface
interface NotificationsState {
  unread: Notification[];
  read: Notification[];
}

const Header = () => {
  const { selectedState } = useSchoolStore();
  const { logout, user } = useAuthStore();
  const router = useNavigate();
  
  // Sample notifications data
  const [notifications] = useState<NotificationsState>({
    unread: [
      {
        id: 1,
        title: "New Report Available",
        description: "The quarterly performance report is now available for review.",
        time: "5 minutes ago",
        type: "report"
      },
      {
        id: 2,
        title: "System Update",
        description: "Dashboard will undergo maintenance tonight from 11PM to 2AM.",
        time: "1 hour ago",
        type: "system"
      },
      {
        id: 3,
        title: "New User Registration",
        description: "A new school admin has registered and requires approval.",
        time: "3 hours ago",
        type: "user"
      }
    ],
    read: [
      {
        id: 4,
        title: "Data Sync Complete",
        description: "All school data has been successfully synchronized.",
        time: "Yesterday",
        type: "system"
      },
      {
        id: 5,
        title: "Weekly Summary",
        description: "Your weekly dashboard summary is ready for review.",
        time: "2 days ago",
        type: "report"
      }
    ]
  });
  
  const displayTitle = selectedState === 'All' ? 'Govt Dashboard' : selectedState;
  const overviewText = selectedState === 'All' ? 'Overview' : `School Overview in ${selectedState}`;
  
  const handleLogout = () => {
    logout();
    router('/login');
  };

  const handleHomeClick = () => {
    router('/super-admin');
  };

  const handleNotificationClick = () => {
    router('/notification');
  };

  return (
    <div className="border-b bg-white rounded-xl">
      <div className="flex h-16 items-center px-4">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-xl font-bold">
                  {displayTitle}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <button onClick={handleHomeClick} className="focus:outline-none">
              <Home size={20} className="cursor-pointer hover:text-gray-700" />
            </button>
            <span>{'>'}</span>
            <span>{overviewText}</span>
          </div>
        </div>

        {/* Middle section - Search */}
        <div className="flex-1 px-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
        </div>

        {/* Right section - Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center">
                <Settings className="h-5 w-5" />
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>General Settings</DropdownMenuItem>
              <DropdownMenuItem>Security</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="focus:outline-none" 
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {notifications.unread.length > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1 min-w-4 h-4 flex items-center justify-center text-xs" variant="destructive">
                  {notifications.unread.length}
                </Badge>
              )}
            </button>
          </div>

          {/* Profile Section */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" alt="User avatar" />
                  <AvatarFallback>
                    {user?.username?.substring(0, 2).toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.role || 'User'}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;