import React, { useState } from 'react';
import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "../ui/dialog";
import PaymentReminder from './PaymentReminder';

const PaymentReminderDialog: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        Payment Reminder
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[450px] max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Reminder</DialogTitle>
          </DialogHeader>
          <PaymentReminder />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentReminderDialog;