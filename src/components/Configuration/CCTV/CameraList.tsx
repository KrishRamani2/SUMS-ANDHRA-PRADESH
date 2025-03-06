import { useState } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Label } from '../../ui/label';

interface CameraConfig {
  id: number;
  classroomname: string;
  camera: string;
}

interface FormData {
  id?: number;
  classroomname: string;
  camera: string;
}

const CameraList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [configToDelete, setConfigToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    classroomname: '',
    camera: '',
  });

  const [dvrConfigs, setDvrConfigs] = useState<CameraConfig[]>([
    {
      id: 1,
      classroomname: 'RTSP',
      camera: '192.168.1.100',
    },
    {
      id: 2,
      classroomname: 'HTTP',
      camera: '192.168.1.101',
    }
  ]);

  const filteredData = dvrConfigs.filter(config => 
    Object.values(config).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteClick = (id: number) => {
    setConfigToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (configToDelete !== null) {
      setDvrConfigs(dvrConfigs.filter(config => config.id !== configToDelete));
      setIsDeleteDialogOpen(false);
      setConfigToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setConfigToDelete(null);
  };

  const handleAdd = () => {
    setFormData({
      classroomname: '',
      camera: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (id: number) => {
    const configToEdit = dvrConfigs.find(config => config.id === id);
    if (configToEdit) {
      setFormData(configToEdit);
      setIsDialogOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      setDvrConfigs(dvrConfigs.map(config => 
        config.id === formData.id ? { ...formData as CameraConfig } : config
      ));
    } else {
      const newConfig: CameraConfig = {
        ...formData,
        id: dvrConfigs.length + 1
      };
      setDvrConfigs([...dvrConfigs, newConfig]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className='p-8'>
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Camera List</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative flex-1 mt-5">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search configurations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2 mt-6 bg-primary">
              <Plus className="h-4 w-4" /> Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classroom Name</TableHead>
                  <TableHead>Camera</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell>{config.classroomname}</TableCell>
                    <TableCell>{config.camera}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(config.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(config.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Main Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Camera List' : 'Add Camera List'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="classroomname" className="text-right">Classroom Name</Label>
                <Input
                  id="classroomname"
                  name="classroomname"
                  value={formData.classroomname}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="camera" className="text-right">Camera </Label>
                <Input
                  id="camera"
                  name="camera"
                  value={formData.camera}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{formData.id ? 'Save Changes' : 'Add Configuration'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-black">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-black">Are you sure you want to delete this configuration?</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              className="text-black border-black"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-black text-white hover:bg-gray-800"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CameraList;