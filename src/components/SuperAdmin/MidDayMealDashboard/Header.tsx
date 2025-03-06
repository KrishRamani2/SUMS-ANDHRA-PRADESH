import { Home, Settings, Bell, ChevronDown, Search } from 'lucide-react';
import { useSchoolStore } from '../../../store/stateStore';
import { useNavigate } from 'react-router-dom'; // Added import for navigation
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Input } from "../../ui/input";

const Header = () => {
  const { selectedState, setSelectedState } = useSchoolStore();
  const states = ['All States', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh'];
  const navigate = useNavigate(); // Added navigation hook

  // Added click handler for Home icon
  const handleHomeClick = () => {
    navigate('/super-admin');
  };

  return (
    <div className="border-b bg-white rounded-xl">
      <div className="flex h-16 items-center px-4">
        {/* Left section - Logo, State Selection and Navigation */}
        <div className="flex items-center space-x-4">
          {/* State Selection Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <span className="text-xl font-bold">{selectedState}</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {states.map((state) => (
                <DropdownMenuItem
                  key={state}
                  onClick={() => setSelectedState(state)}
                >
                  {state}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category Selection */}
          <div className="flex items-center space-x-2 text-sm">
            <Home 
              size={20} 
              className="cursor-pointer" // Added for visual feedback
              onClick={handleHomeClick} // Added click handler
            />
            <span>{'>'}</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-gray-100 px-2 py-1 rounded">
                Mid Day Meal Dashboard
              </DropdownMenuTrigger>
            </DropdownMenu>
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

          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@gov.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;