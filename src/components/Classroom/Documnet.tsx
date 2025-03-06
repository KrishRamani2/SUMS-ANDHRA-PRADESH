import { useState } from 'react';
import {
  File,
  Folder,
  MoreVertical,
  Upload,
  Plus,
  Search,
  Download,
  Trash2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import {
  ScrollArea,
  ScrollBar
} from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface FolderStructure {
  id: string;
  name: string;
  children: FolderStructure[];
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  folder: string;
}

interface FolderPath {
  id: string;
  path: string;
}

const Documents = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [newFolderName, setNewFolderName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const [folderStructure] = useState<FolderStructure>({
    id: 'root',
    name: 'All Documents',
    children: [
      {
        id: 'academic',
        name: 'Academic',
        children: [
          {
            id: 'courses',
            name: 'Courses',
            children: [
              {
                id: 'mathematics',
                name: 'Mathematics',
                children: [
                  {
                    id: 'calculus',
                    name: 'Calculus',
                    children: [
                      {
                        id: 'assignments',
                        name: 'Assignments',
                        children: [
                          {
                            id: 'homework',
                            name: 'Homework',
                            children: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'administrative',
        name: 'Administrative',
        children: [
          {
            id: 'policies',
            name: 'Policies',
            children: []
          }
        ]
      }
    ]
  });

  const [documents] = useState<Document[]>([
    {
      id: 1,
      name: 'Syllabus 2024.pdf',
      type: 'pdf',
      size: '2.5 MB',
      uploadedBy: 'John Smith',
      uploadDate: '2024-01-15',
      folder: 'courses'
    },
    {
      id: 2,
      name: 'Class Schedule.xlsx',
      type: 'excel',
      size: '1.2 MB',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2024-01-16',
      folder: 'homework'
    },
    {
      id: 3,
      name: 'Student Handbook.pdf',
      type: 'pdf',
      size: '4.8 MB',
      uploadedBy: 'Mike Wilson',
      uploadDate: '2024-01-17',
      folder: 'policies'
    },
    {
      id: 4,
      name: 'Exam Guidelines.docx',
      type: 'word',
      size: '1.8 MB',
      uploadedBy: 'Emily Brown',
      uploadDate: '2024-01-18',
      folder: 'calculus'
    }
  ]);

  const toggleFolder = (folderId: string): void => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const renderFolder = (folder: FolderStructure, level = 0): JSX.Element => {
    const isExpanded = expandedFolders.has(folder.id);
    const paddingLeft = level * 12;

    return (
      <div key={folder.id}>
        <Button
          variant="ghost"
          className={`w-full justify-start mb-1 ${selectedFolder === folder.id ? 'bg-gray-100' : ''}`}
          onClick={() => {
            setSelectedFolder(folder.id);
            toggleFolder(folder.id);
          }}
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
        >
          {folder.children.length > 0 && (
            isExpanded ? 
              <ChevronDown className="h-4 w-4 mr-1" /> : 
              <ChevronRight className="h-4 w-4 mr-1" />
          )}
          <Folder className="mr-2 h-4 w-4" />
          {folder.name}
        </Button>
        {isExpanded && folder.children.map(child => renderFolder(child, level + 1))}
      </div>
    );
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'root' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (): JSX.Element => {
    return <File className="h-6 w-6 text-gray-500" />;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAllFolderPaths = (folder: FolderStructure, path = ''): FolderPath[] => {
    const currentPath = path ? `${path}/${folder.name}` : folder.name;
    let paths: FolderPath[] = [{ id: folder.id, path: currentPath }];
    
    folder.children.forEach(child => {
      paths = [...paths, ...getAllFolderPaths(child, currentPath)];
    });
    
    return paths;
  };

  const folderPaths = getAllFolderPaths(folderStructure);

  return (
    <ScrollArea className="h-[calc(100vh-2rem)] rounded-md w-full max-w-6xl mx-auto">
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsUploadOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" /> Upload Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsNewFolderOpen(true)}>
                    <Folder className="mr-2 h-4 w-4" /> New Folder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Folders Sidebar */}
            <div className="w-64">
              <Card>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="p-2">
                    {renderFolder(folderStructure)}
                  </div>
                  <ScrollBar />
                </ScrollArea>
              </Card>
            </div>

            {/* Documents List */}
            <div className="flex-1">
              <Card>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <div className="p-4">
                    <div className="grid gap-4">
                      {filteredDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center">
                            {getFileIcon()}
                            <div className="ml-4">
                              <h3 className="font-medium text-gray-900">{doc.name}</h3>
                              <p className="text-sm text-gray-500">
                                {doc.size} • Uploaded by {doc.uploadedBy} • {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ScrollBar />
                </ScrollArea>
              </Card>
            </div>
          </div>

          {/* Dialogs */}
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your files here, or click to browse
                  </p>
                </div>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select Folder</option>
                  {folderPaths.map(({ id, path }) => (
                    <option key={id} value={id}>{path}</option>
                  ))}
                </select>
              </div>
              <DialogFooter>
                <Button className="w-full" onClick={() => setIsUploadOpen(false)}>
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewFolderOpen} onOpenChange={setIsNewFolderOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <select className="w-full p-2 border rounded-md mt-4">
                <option value="">Select Parent Folder</option>
                {folderPaths.map(({ id, path }) => (
                  <option key={id} value={id}>{path}</option>
                ))}
              </select>
              <DialogFooter>
                <Button className="w-full" onClick={() => setIsNewFolderOpen(false)}>
                  Create Folder
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search Documents</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

export default Documents;