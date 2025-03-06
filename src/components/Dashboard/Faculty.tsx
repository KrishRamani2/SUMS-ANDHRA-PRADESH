import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Info, Search, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface FacultyLeave {
  id: string;
  proxyFaculty: string;
  originalFaculty: string;
  fromDate: string;
  toDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  approvedBy?: string;
  approvalDate?: string;
}

const FacultyLeaveManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeave, setSelectedLeave] = useState<FacultyLeave | null>(null);

  const leaveData: FacultyLeave[] = [
    {
      id: '1',
      proxyFaculty: 'Dr. Sarah Thompson',
      originalFaculty: 'Dr. John Miller',
      fromDate: '2024-02-15',
      toDate: '2024-02-20',
      status: 'Approved',
      approvedBy: 'Dean Robert Wilson',
      approvalDate: '2024-02-10'
    },
    {
      id: '2',
      proxyFaculty: 'Prof. Michael Chen',
      originalFaculty: 'Dr. Emily Rodriguez',
      fromDate: '2024-03-01',
      toDate: '2024-03-05',
      status: 'Pending'
    },
    {
      id: '3',
      proxyFaculty: 'Dr. Rachel Kim',
      originalFaculty: 'Prof. David Williams',
      fromDate: '2024-02-25',
      toDate: '2024-02-28',
      status: 'Rejected',
      approvedBy: 'Prof. Jennifer Clark',
      approvalDate: '2024-02-20'
    }
  ];

  const filteredLeaves = leaveData.filter(leave =>
    leave.originalFaculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.proxyFaculty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Card className="w-full bg-gradient-to-b from-white to-gray-50/50 shadow-lg">
        <CardHeader className="space-y-1 px-6 py-8 border-b border-gray-100">
          <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Faculty Leave Management
          </CardTitle>
          <p className="text-sm text-gray-500">
            Manage and track faculty leave requests across departments
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by faculty name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold text-gray-700">Proxy Faculty</TableHead>
                  <TableHead className="font-semibold text-gray-700">Original Faculty</TableHead>
                  <TableHead className="font-semibold text-gray-700">Leave Period</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Approval Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves.map((leave) => (
                  <TableRow key={leave.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium">{leave.proxyFaculty}</TableCell>
                    <TableCell>{leave.originalFaculty}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                          <span className="text-sm">{formatDate(leave.fromDate)}</span>
                          <span className="hidden sm:inline mx-1 text-gray-400">→</span>
                          <span className="text-sm">{formatDate(leave.toDate)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`
                          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                          ${leave.status === 'Approved' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                            leave.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20' :
                            'bg-red-50 text-red-700 ring-1 ring-red-600/20'}
                        `}
                      >
                        {leave.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {leave.approvedBy ? (
                        <button
                          onClick={() => setSelectedLeave(leave)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Info className="h-4 w-4" />
                          <span className="text-sm">View Details</span>
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500 italic">Pending approval</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedLeave} onOpenChange={() => setSelectedLeave(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Leave Approval Details</DialogTitle>
          </DialogHeader>
          {selectedLeave && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-500">Leave Request</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Original Faculty</p>
                    <p className="font-medium">{selectedLeave.originalFaculty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Proxy Faculty</p>
                    <p className="font-medium">{selectedLeave.proxyFaculty}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-500">Leave Period</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <span>{formatDate(selectedLeave.fromDate)}</span>
                    <span className="text-gray-400">→</span>
                    <span>{formatDate(selectedLeave.toDate)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-500">Approval Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Approved By</p>
                    <p className="font-medium">{selectedLeave.approvedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approval Date</p>
                    <p className="font-medium">{formatDate(selectedLeave.approvalDate || '')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <span
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${selectedLeave.status === 'Approved' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                      selectedLeave.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20' :
                      'bg-red-50 text-red-700 ring-1 ring-red-600/20'}
                  `}
                >
                  {selectedLeave.status}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FacultyLeaveManagement;