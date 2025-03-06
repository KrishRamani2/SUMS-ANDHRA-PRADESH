/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Button } from '../ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  AlertTriangle, 
  Clock, 
  CreditCard, 
  Bell, 
  QrCode 
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import StudentsReminderForm from './Reminderform'; // Fixed to match actual file name

// Define TypeScript interfaces for fee data
interface Penalty {
  amount: number;
  afterDate: string;
}

interface ClassFeeDetails {
  total: number;
  paid: number;
  deadline: string;
  penalties: Penalty[];
}

interface FeeData {
  [year: string]: {
    [className: string]: ClassFeeDetails;
  };
}

// Define store interface
interface FeeStore {
  selectedYear: string;
  selectedClass: string;
  setSelectedYear: (year: string) => void;
  setSelectedClass: (className: string) => void;
}

// Import fee store with type
import useFeeStore from '../../store/feeStore';

const PaymentReminder: React.FC = () => {
  const { selectedYear, selectedClass, setSelectedYear, setSelectedClass } = useFeeStore() as FeeStore;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [paymentProgress, setPaymentProgress] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(30);

  const feeData: FeeData = {
    '2024': {
      'Class 9': {
        total: 5000,
        paid: 2000,
        deadline: '2024-06-30',
        penalties: [
          { amount: 500, afterDate: '2024-05-31' },
          { amount: 1000, afterDate: '2024-06-30' }
        ]
      },
      'Class 10': {
        total: 6000,
        paid: 3000,
        deadline: '2024-06-30',
        penalties: [
          { amount: 600, afterDate: '2024-05-31' },
          { amount: 1200, afterDate: '2024-06-30' }
        ]
      }
    },
    '2025': {
      'Class 9': {
        total: 7000,
        paid: 5000,
        deadline: '2025-06-30',
        penalties: [{ amount: 800, afterDate: '2025-05-31' }]
      }
    }
  };

  const availableYears = Object.keys(feeData);
  useEffect(() => {
    if (selectedYear && selectedClass) {
      const feeDetails = feeData[selectedYear][selectedClass];
      const progressPercentage = (feeDetails.paid / feeDetails.total) * 100;
      setPaymentProgress(progressPercentage);

      const deadlineDate = new Date(feeDetails.deadline);
      const today = new Date();
      const timeDiff = deadlineDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setRemainingDays(daysDiff);
    }
  }, [selectedYear, selectedClass, feeData]);

  const calculatePenalty = (): number => {
    if (selectedYear && selectedClass) {
      const feeDetails = feeData[selectedYear][selectedClass];
      const today = new Date();

      const applicablePenalty = feeDetails.penalties
        .filter(penalty => today > new Date(penalty.afterDate))
        .reduce((max, penalty) => 
          penalty.amount > max ? penalty.amount : max, 0
        );
      
      return applicablePenalty;
    }
    return 0;
  };

  const handleSendReminder = () => {
    setIsDialogOpen(true);
  };

  return (
    <Card className="w-[400px] p-4 bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="text-blue-600" />
          Payment Tracker
        </CardTitle>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Smart Reminder
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
              disabled={!selectedYear}
            >
              <SelectTrigger className="w-1/2">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {selectedYear 
                  ? Object.keys(feeData[selectedYear]).map(classItem => (
                    <SelectItem key={classItem} value={classItem}>
                      {classItem}
                    </SelectItem>
                  ))
                  : []
                }
              </SelectContent>
            </Select>
          </div>

          {selectedYear && selectedClass && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-500" />
                  <span>Deadline Countdown</span>
                </div>
                <span className="font-bold text-red-600">
                  {remainingDays} days left
                </span>
              </div>

              <Progress 
                value={paymentProgress} 
                className="h-2 bg-blue-100"
              />

              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-green-500" />
                    Total Fees: ₹{feeData[selectedYear][selectedClass].total}
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="text-yellow-500" />
                    Paid: ₹{feeData[selectedYear][selectedClass].paid}
                  </div>
                </div>
                
                <div>
                  {calculatePenalty() > 0 && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle />
                      Penalty: ₹{calculatePenalty()}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleSendReminder}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!selectedYear || !selectedClass}
              >
                <QrCode className="mr-2" /> Generate Payment Reminder
              </Button>
            </div>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Payment Reminder Form</DialogTitle>
              </DialogHeader>
              <DialogDescription className="overflow-y-auto max-h-[500px]">
                <StudentsReminderForm />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentReminder;