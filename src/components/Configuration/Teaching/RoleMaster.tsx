import { useState } from 'react';
import { Save, Plus, Trash, FileDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';

interface RoleForm {
  role: string;
  description: string;
  menuType: string;
  submenu: string;
}

interface Permission {
  moduleName: string;
  searchTool: boolean;
  view: boolean;
  add: boolean;
  delete: boolean;
  edit: boolean;
}

const RoleMaster = () => {
  const [roleForm, setRoleForm] = useState<RoleForm>({
    role: '',
    description: '',
    menuType: '',
    submenu: '',
  });
  const [roles, setRoles] = useState<RoleForm[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([
    { moduleName: 'Dashboard', searchTool: false, view: false, add: false, delete: false, edit: false },
    { moduleName: 'User Management', searchTool: false, view: false, add: false, delete: false, edit: false },
    { moduleName: 'Reports', searchTool: false, view: false, add: false, delete: false, edit: false },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Sample data for dropdowns
  const roleOptions = ['Admin', 'Teacher', 'Student', 'Guest'];
  const menuTypes = ['Main Menu', 'Submenu'];
  const submenus = ['Settings', 'Profile', 'Dashboard', 'Reports'];

  // Handle form input changes
  const handleFormChange = (field: keyof RoleForm, value: string) => {
    setRoleForm({ ...roleForm, [field]: value });
  };

  // Handle saving or updating a role
  const handleSaveRole = () => {
    if (isEditing && editIndex !== null) {
      const updatedRoles = [...roles];
      updatedRoles[editIndex] = roleForm;
      setRoles(updatedRoles);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setRoles([...roles, roleForm]);
    }
    setRoleForm({ role: '', description: '', menuType: '', submenu: '' });
  };

  // Handle permission changes
  const handlePermissionChange = (
    index: number,
    field: keyof Permission,
    value: boolean | string
  ) => {
    const updatedPermissions = [...permissions];
    if (field === 'moduleName') {
      updatedPermissions[index][field] = value as string;
    } else {
      updatedPermissions[index][field] = value as boolean;
    }
    setPermissions(updatedPermissions);
  };

  // Handle creating a new module
  const handleAddModule = () => {
    setPermissions([
      ...permissions,
      { moduleName: 'New Module', searchTool: false, view: false, add: false, delete: false, edit: false },
    ]);
  };

  // Handle deleting a module
  const handleDeleteModule = (index: number) => {
    const updatedPermissions = permissions.filter((_, i) => i !== index);
    setPermissions(updatedPermissions);
  };

  // Handle exporting to Excel
  const handleExportToExcel = () => {
    const headers = ['Module Name', 'Search Tool', 'View', 'Add', 'Delete', 'Edit'];
    const csvData = [
      headers.join(','),
      ...permissions.map(permission => [
        permission.moduleName,
        permission.searchTool ? 'Yes' : 'No',
        permission.view ? 'Yes' : 'No',
        permission.add ? 'Yes' : 'No',
        permission.delete ? 'Yes' : 'No',
        permission.edit ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'permissions.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Role Master</h1>
        {roleForm.role === 'Admin' && (
          <Button
            onClick={handleExportToExcel}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <FileDown className="h-4 w-4 mr-2" /> Export to Excel
          </Button>
        )}
      </div>

      {/* Role Creation Form */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role" className="text-gray-900">
              Role
            </Label>
            <Select
              value={roleForm.role}
              onValueChange={(value) => handleFormChange('role', value)}
            >
              <SelectTrigger className="bg-white border border-gray-300">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-900">
              Description
            </Label>
            <Input
              id="description"
              value={roleForm.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              className="bg-white border border-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="menuType" className="text-gray-900">
              Menu Type
            </Label>
            <Select
              value={roleForm.menuType}
              onValueChange={(value) => handleFormChange('menuType', value)}
            >
              <SelectTrigger className="bg-white border border-gray-300">
                <SelectValue placeholder="Select Menu Type" />
              </SelectTrigger>
              <SelectContent>
                {menuTypes.map((menu) => (
                  <SelectItem key={menu} value={menu}>
                    {menu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="submenu" className="text-gray-900">
              Submenu
            </Label>
            <Select
              value={roleForm.submenu}
              onValueChange={(value) => handleFormChange('submenu', value)}
            >
              <SelectTrigger className="bg-white border border-gray-300">
                <SelectValue placeholder="Select Submenu" />
              </SelectTrigger>
              <SelectContent>
                {submenus.map((submenu) => (
                  <SelectItem key={submenu} value={submenu}>
                    {submenu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6">
          <Button
            onClick={handleSaveRole}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Save className="h-4 w-4 mr-2" /> {isEditing ? 'Update Role' : 'Save Role'}
          </Button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-gray-900 font-bold">Module Name</TableHead>
              <TableHead className="text-gray-900 font-bold">Search Tool</TableHead>
              <TableHead className="text-gray-900 font-bold">View</TableHead>
              <TableHead className="text-gray-900 font-bold">Add</TableHead>
              <TableHead className="text-gray-900 font-bold">Delete</TableHead>
              <TableHead className="text-gray-900 font-bold">Edit</TableHead>
              <TableHead className="text-gray-900 font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="text-gray-900">
                  <Input
                    value={permission.moduleName}
                    onChange={(e) => handlePermissionChange(index, 'moduleName', e.target.value)}
                    className="bg-white border border-gray-300"
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permission.searchTool}
                    onCheckedChange={(value) => 
                      handlePermissionChange(index, 'searchTool', Boolean(value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permission.view}
                    onCheckedChange={(value) => 
                      handlePermissionChange(index, 'view', Boolean(value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permission.add}
                    onCheckedChange={(value) => 
                      handlePermissionChange(index, 'add', Boolean(value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permission.delete}
                    onCheckedChange={(value) => 
                      handlePermissionChange(index, 'delete', Boolean(value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permission.edit}
                    onCheckedChange={(value) => 
                      handlePermissionChange(index, 'edit', Boolean(value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteModule(index)}
                      className="text-red-600 hover:bg-red-100"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Module Button */}
      <div className="mt-6">
        <Button
          onClick={handleAddModule}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Module
        </Button>
      </div>
    </div>
  );
};

export default RoleMaster;