/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';
import { Search, Plus, Pencil, Trash2, Mail, MessageCircle, Printer } from 'lucide-react';
import { Button } from "../../ui/button";
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
  DialogDescription,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Alert, AlertDescription } from "../../ui/alert";

interface ResultData {
  id?: number;
  year: string;
  class: string;
  division: string;
  title: string;
  printDate: string;
  description: string;
  test: string;
  isResultPublished: boolean;
  resultPublishDate: string;
  resultPublishTime: string;
}

interface AlertState {
  show: boolean;
  message: string;
  type: 'default' | 'destructive';
}

const INITIAL_FORM_STATE: ResultData = {
  year: '',
  class: '',
  division: '',
  title: '',
  printDate: '',
  description: '',
  test: '',
  isResultPublished: false,
  resultPublishDate: '',
  resultPublishTime: ''
};

const INITIAL_ALERT_STATE: AlertState = {
  show: false,
  message: '',
  type: 'default'
};

const GenerateResultPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [resultToDelete, setResultToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<ResultData>(INITIAL_FORM_STATE);
  const [showAlert, setShowAlert] = useState<AlertState>(INITIAL_ALERT_STATE);
  const [results, setResults] = useState<Array<ResultData & { id: number }>>([
    {
      id: 1,
      year: '2023',
      class: '10th',
      division: 'A',
      title: 'Mid-Term Exam',
      printDate: '2023-10-01',
      description: 'Mid-Term Results',
      test: 'Mathematics',
      isResultPublished: true,
      resultPublishDate: '2023-10-05',
      resultPublishTime: '10:00'
    },
    {
      id: 2,
      year: '2023',
      class: '9th',
      division: 'B',
      title: 'Final Exam',
      printDate: '2023-12-15',
      description: 'Final Results',
      test: 'Science',
      isResultPublished: false,
      resultPublishDate: '',
      resultPublishTime: ''
    }
  ]);

  const filteredData = useCallback(() => {
    return results.filter(result =>
      Object.values(result).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [results, searchTerm]);

  const showNotification = (message: string, type: AlertState['type'] = 'default') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert(INITIAL_ALERT_STATE), 3000);
  };

  const handleDelete = useCallback((id: number) => {
    setResultToDelete(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (resultToDelete === null) return;
    
    try {
      setResults(prev => prev.filter(result => result.id !== resultToDelete));
      setIsDeleteDialogOpen(false);
      setResultToDelete(null);
      showNotification('Result deleted successfully');
    } catch (error) {
      showNotification('Error deleting result', 'destructive');
    }
  }, [resultToDelete]);

  const handleAdd = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback((id: number) => {
    const resultToEdit = results.find(result => result.id === id);
    if (resultToEdit) {
      setFormData(resultToEdit);
      setIsDialogOpen(true);
    }
  }, [results]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        setResults(prev => 
          prev.map(result => 
            result.id === formData.id 
              ? { ...formData as ResultData & { id: number } } 
              : result
          )
        );
        showNotification('Result updated successfully');
      } else {
        const newResult = {
          ...formData,
          id: Math.max(...results.map(r => r.id), 0) + 1
        };
        setResults(prev => [...prev, newResult]);
        showNotification('Result added successfully');
      }
      setIsDialogOpen(false);
    } catch (error) {
      showNotification('Error saving result', 'destructive');
    }
  }, [formData, results]);

  const handlePublish = useCallback((id: number, publishType: string) => {
    const result = results.find(r => r.id === id);
    if (!result) return;

    showNotification(`Publishing ${result.title} via ${publishType}`);
    // Implement actual publishing logic here
  }, [results]);

  const getInputValue = (key: keyof ResultData): string => {
    const value = formData[key];
    return value?.toString() || '';
  };

  return (
    <div className="p-8">
      {showAlert.show && (
        <Alert variant={showAlert.type} className="mb-4">
          <AlertDescription>{showAlert.message}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Generate Result</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search results..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Print Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Publish Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData().map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.year}</TableCell>
                    <TableCell>{result.class}</TableCell>
                    <TableCell>{result.division}</TableCell>
                    <TableCell>{result.title}</TableCell>
                    <TableCell>{result.printDate}</TableCell>
                    <TableCell>{result.description}</TableCell>
                    <TableCell>{result.test}</TableCell>
                    <TableCell>{result.isResultPublished ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{result.resultPublishDate}</TableCell>
                    <TableCell>{result.resultPublishTime}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(result.id)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(result.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublish(result.id, 'email')}
                          title="Send Email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublish(result.id, 'message')}
                          title="Send Message"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePublish(result.id, 'print')}
                          title="Print"
                        >
                          <Printer className="h-4 w-4" />
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
            <DialogTitle>{formData.id ? 'Edit Result' : 'Add Result'}</DialogTitle>
            <DialogDescription>
              Fill in the details for the result record.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {Object.keys(INITIAL_FORM_STATE).map((key) => (
                key !== 'isResultPublished' && (
                  <div key={key} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={key} className="text-right capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <Input
                      id={key}
                      name={key}
                      type={key.includes('Date') ? 'date' : key.includes('Time') ? 'time' : 'text'}
                      value={getInputValue(key as keyof ResultData)}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                )
              ))}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isResultPublished" className="text-right">Published</Label>
                <Checkbox
                  id="isResultPublished"
                  name="isResultPublished"
                  checked={formData.isResultPublished}
                  onCheckedChange={(checked) => 
                    handleInputChange({ 
                      target: { 
                        name: 'isResultPublished', 
                        type: 'checkbox', 
                        checked 
                      } 
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{formData.id ? 'Save Changes' : 'Add Result'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this result?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateResultPage;