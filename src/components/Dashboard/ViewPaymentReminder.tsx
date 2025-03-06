/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useReminderFormStore } from "../../store/reminderStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns";

const ViewPaymentReminders: React.FC = () => {
  const { reminders } = useReminderFormStore();
  const [isReminderPopupOpen, setIsReminderPopupOpen] = useState(false);

  return (
    <Dialog
      open={isReminderPopupOpen}
      onOpenChange={setIsReminderPopupOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">View Payment Reminders</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Payment Reminders</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {reminders.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No reminders sent yet.
            </p>
          ) : (
            reminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {reminder.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sent on: {format(reminder.sentDate, "PPP")}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <strong>Message:</strong> {reminder.message}
                      </p>
                      <p className="text-sm">
                        <strong>Sent To:</strong>{" "}
                        {Object.entries(reminder.sentTo)
                          .filter(([_, value]) => value)
                          .map(([key]) => key)
                          .join(", ")}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Students:</h4>
                      <ul className="list-disc list-inside">
                        {reminder.students.map((student) => (
                          <li key={student.id}>{student.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPaymentReminders;