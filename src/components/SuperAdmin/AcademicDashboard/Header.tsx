import { Home, Settings, Bell, ChevronDown, Search, LogOut } from 'lucide-react';
import { useSchoolStore } from '../../../store/stateStore';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Input } from "../../ui/input";

const Header = () => {
  const { selectedState, selectedDistrict, selectedYear } = useSchoolStore(); // Removed setSelectedState
  const [selectedCategory, setSelectedCategory] = useState('academic'); // Default to 'academic'
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/super-admin');
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing auth tokens)
    navigate('/login'); // Redirect to login page
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const district = selectedDistrict || 'all'; // Use 'all' if no district is selected
    let path = '';
    switch (category) {
      case 'academic':
        path = `/super-admin/${encodeURIComponent(selectedState)}/${encodeURIComponent(district)}/${selectedYear}/academic-dashboard`;
        break;
      case 'exam':
        path = `/super-admin/${encodeURIComponent(selectedState)}/${encodeURIComponent(district)}/${selectedYear}/examination-dashboard`;
        break;
      case 'project':
        path = `/super-admin/${encodeURIComponent(selectedState)}/${encodeURIComponent(district)}/${selectedYear}/project-dashboard`;
        break;
      default:
        path = '/super-admin'; // Fallback
    }
    navigate(path);
  };

  return (
    <div className="border-b bg-white rounded-xl">
      <div className="flex h-16 items-center px-4">
        {/* Left section - Logo, State Display and Navigation */}
        <div className="flex items-center space-x-4">
          {/* Display Current State */}
          <span className="text-xl font-bold px-3 py-2">{selectedState}</span>

          {/* Category Selection */}
          <div className="flex items-center space-x-2 text-sm">
            <Home 
              size={20} 
              className="cursor-pointer"
              onClick={handleHomeClick}
            />
            <span>{'>'}</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-gray-100 px-2 py-1 rounded">
                {selectedCategory === 'academic' ? 'Academic Dashboard' :
                 selectedCategory === 'exam' ? 'Exam Dashboard' :
                 'Project Dashboard'}
                <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleCategoryChange('academic')}>
                  Academic Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryChange('exam')}>
                  Exam Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategoryChange('project')}>
                  Project Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
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

          {/* Profile Section with Logout Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@gov.org</p>
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