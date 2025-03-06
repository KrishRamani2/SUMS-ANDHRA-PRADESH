import { Home, Settings, Bell, ChevronDown, Search } from 'lucide-react'; 
import  useSchoolStore  from '../../../store/schoolStore'; // Import schoolStore
import { useSchoolStore as useStateStore } from '../../../store/stateStore'; // Import stateStore
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

const Header = () => { 
  // Fetch selected state from stateStore
  const { selectedState } = useStateStore(); 
  
  // Fetch selected school from schoolStore
  const { selectedSchool } = useSchoolStore(); 

  // Display the selected state and school dynamically
  const displayTitle = selectedState === 'All' ? 'All States' : selectedState;
  const displaySchool = selectedSchool || 'Attendance Dashboard'; // Fallback to "Attendance Dashboard" if no school is selected
  console.log('Selected School:', selectedSchool); 
  return ( 
    <div className="border-b bg-white rounded-xl">
      <div className="flex h-16 items-center px-4">
        {/* Left section - State and School */} 
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-xl font-bold">
                  {displayTitle} {/* Display selected state */}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Home size={20} />
            <span>&gt;</span>
            <span>{displaySchool}</span> {/* Display selected school */}
          </div>
        </div>

        {/* Middle section - Search */} 
        <div className="flex-1 px-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search schools or metrics..." 
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