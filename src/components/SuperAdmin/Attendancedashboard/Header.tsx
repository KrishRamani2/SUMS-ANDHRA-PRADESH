import { Home, Settings, Bell, ChevronDown, Search, LogOut } from 'lucide-react';
import { useSchoolStore } from '../../../store/stateStore';
import { useAuthStore } from '../../../store/loginStore';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Input } from "../../ui/input";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { selectedState } = useSchoolStore();
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  
  const displayTitle = selectedState === 'All' ? 'Govt Dashboard' : selectedState;
  const overviewText = selectedState === 'All' ? 'Overview' : `School Overview in ${selectedState}`;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/super-admin');
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
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Bell className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>New Message</DropdownMenuItem>
              <DropdownMenuItem>System Update</DropdownMenuItem>
              <DropdownMenuItem>View All</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Section with Logout Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
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
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-gray-100 transition-colors" 
                onClick={handleLogout}
              >
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