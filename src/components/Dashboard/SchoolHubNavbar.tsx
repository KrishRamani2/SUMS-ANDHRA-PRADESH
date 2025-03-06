import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Search, MessageSquare, Bell, Palette, Save, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/loginStore';
import { HexColorPicker } from 'react-colorful';
import { useNavigate } from 'react-router-dom';

interface SavedTheme {
  color: string;
  timestamp: number;
}

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
  resetTheme: () => void;
}

const MAX_SAVED_THEMES = 3;

const Header = () => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const { theme, setTheme, resetTheme } = useThemeStore() as ThemeStore;
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
  const { logout, user } = useAuthStore();

  useEffect(() => {
    const savedThemesData = localStorage.getItem('savedThemes');
    const themes: SavedTheme[] = savedThemesData ? JSON.parse(savedThemesData) : [];
    setSavedThemes(themes);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const saveTheme = () => {
    if (savedThemes.length >= MAX_SAVED_THEMES) {
      alert(`You can only save up to ${MAX_SAVED_THEMES} themes`);
      return;
    }
    
    const newThemes: SavedTheme[] = [...savedThemes, { color: theme, timestamp: Date.now() }];
    setSavedThemes(newThemes);
    localStorage.setItem('savedThemes', JSON.stringify(newThemes));
  };

  const removeTheme = (index: number) => {
    const newThemes = savedThemes.filter((_, i) => i !== index);
    setSavedThemes(newThemes);
    localStorage.setItem('savedThemes', JSON.stringify(newThemes));
  };

  return (
    <header className="bg-white" style={{ backgroundColor: theme }}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select your school" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>School</SelectLabel>
                <SelectItem value="school1">School 1</SelectItem>
                <SelectItem value="school2">School 2</SelectItem>
                <SelectItem value="school3">School 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">Theme</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="p-2">
                <h3 className="font-medium mb-2">Pick a Dashboard Color</h3>
                <HexColorPicker color={theme} onChange={setTheme} />
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Saved Themes</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={saveTheme}
                      disabled={savedThemes.length >= MAX_SAVED_THEMES}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save Current
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {savedThemes.map((savedTheme, index) => (
                      <div 
                        key={savedTheme.timestamp}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div 
                          className="w-8 h-8 rounded cursor-pointer"
                          style={{ backgroundColor: savedTheme.color }}
                          onClick={() => setTheme(savedTheme.color)}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeTheme(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="mt-4 w-full" onClick={resetTheme}>
                  Reset to Default
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-4">
          <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Notification 1
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Notification 2
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Notification 3
                </a>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative">
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Message 1
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Message 2
                </a>
              </div>
            </PopoverContent>
          </Popover>

          <div className="relative">
            <Input type="text" placeholder="Search..." className="pr-10" />
            <Button variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="relative">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                  <AvatarFallback>{user?.username?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-600 border-b">
                  {user?.username}
                </div>
                <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;