import { Button } from "../../ui/button";
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

// Define interfaces for type safety
interface DVRConfig {
  id: number;
  streamType: string;
  ip: string;
  port: string;
  channel: string;
  username: string;
  password: string;
}

interface FormData {
  id?: number;
  streamType: string;
  ip: string;
  port: string;
  channel: string;
  username: string;
  password: string;
}

const DVRConfigTable = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [configToDelete, setConfigToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    streamType: '',
    ip: '',
    port: '',
    channel: '',
    username: '',
    password: ''
  });

  const [dvrConfigs, setDvrConfigs] = useState<DVRConfig[]>([
    {
      id: 1,
      streamType: 'RTSP',
      ip: '192.168.1.100',
      port: '554',
      channel: '1',
      username: 'admin',
      password: '******'
    },
    {
      id: 2,
      streamType: 'HTTP',
      ip: '192.168.1.101',
      port: '80',
      channel: '2',
      username: 'user',
      password: '******'
    }
  ]);

  const filteredData = dvrConfigs.filter(config => 
    Object.values(config).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: number) => {
    setConfigToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (configToDelete) {
      setDvrConfigs(dvrConfigs.filter(config => config.id !== configToDelete));
      setIsDeleteDialogOpen(false);
      setConfigToDelete(null);
    }
  };

  const handleAdd = () => {
    setFormData({
      streamType: '',
      ip: '',
      port: '',
      channel: '',
      username: '',
      password: ''
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
      // Edit existing config
      setDvrConfigs(dvrConfigs.map(config => 
        config.id === formData.id ? { ...formData as DVRConfig } : config
      ));
    } else {
      // Add new config
      const newConfig: DVRConfig = {
        ...formData,
        id: dvrConfigs.length + 1
      };
      setDvrConfigs([...dvrConfigs, newConfig]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className='pl-8 pr-8'>
      <Card className="w-full mt-12 ">
        <CardHeader>
          <CardTitle>DVR Configuration</CardTitle>
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
                  <TableHead>Stream Type</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell>{config.streamType}</TableCell>
                    <TableCell>{config.ip}</TableCell>
                    <TableCell>{config.port}</TableCell>
                    <TableCell>{config.channel}</TableCell>
                    <TableCell>{config.username}</TableCell>
                    <TableCell>{config.password}</TableCell>
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
                          onClick={() => handleDelete(config.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit DVR Configuration' : 'Add DVR Configuration'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="streamType" className="text-right">Stream Type</Label>
                <Input
                  id="streamType"
                  name="streamType"
                  value={formData.streamType}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ip" className="text-right">IP Address</Label>
                <Input
                  id="ip"
                  name="ip"
                  value={formData.ip}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">Port</Label>
                <Input
                  id="port"
                  name="port"
                  value={formData.port}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="channel" className="text-right">Channel</Label>
                <Input
                  id="channel"
                  name="channel"
                  value={formData.channel}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Are you sure you want to delete this configuration?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DVRConfigTable;