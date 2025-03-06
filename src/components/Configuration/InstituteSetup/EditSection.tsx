import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

interface ScheduleData {
  fromTime: string;
  toTime: string;
  day: string;
  lectures: number;
  timeSlots: number;
  recesses: number;
  recessSlots: string;
  recessTiming: number;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];

const ScheduleManagementTable = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([
    {
      fromTime: "08:00",
      toTime: "09:00",
      day: "Monday",
      lectures: 1,
      timeSlots: 1,
      recesses: 0,
      recessSlots: "0",
      recessTiming: 0,
    },
  ]);

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  const handleFieldChange = (
    index: number,
    field: keyof ScheduleData,
    value: string | number
  ) => {
    setScheduleData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddRow = () => {
    setScheduleData((prev) => [
      ...prev,
      {
        fromTime: "08:00",
        toTime: "09:00",
        day: "Monday",
        lectures: 1,
        timeSlots: 1,
        recesses: 0,
        recessSlots: "0",
        recessTiming: 0,
      },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    setScheduleData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!selectedClass) {
      alert("Please select a class first");
      return;
    }
    console.log("Saved schedule data:", { class: selectedClass, schedules: scheduleData });
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="mt-12">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-xl font-bold text-gray-800">
            Schedule Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <label
                htmlFor="class-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Class:
              </label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={handleClassChange}
                className="block w-60 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
              >
                <option value="">Select a class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleAddRow}
              className="flex items-center gap-2 bg-primary text-white"
            >
              <Plus className="h-4 w-4" /> Add Row
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">From Time</TableHead>
                  <TableHead className="text-center">To Time</TableHead>
                  <TableHead className="text-center">Day</TableHead>
                  <TableHead className="text-center">Lectures</TableHead>
                  <TableHead className="text-center">Time Slots</TableHead>
                  <TableHead className="text-center">Recesses</TableHead>
                  <TableHead className="text-center">Recess Slots</TableHead>
                  <TableHead className="text-center">Recess Time</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="p-2">
                      <Input
                        type="time"
                        value={row.fromTime}
                        className="w-full text-center"
                        onChange={(e) =>
                          handleFieldChange(index, "fromTime", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="time"
                        value={row.toTime}
                        className="w-full text-center"
                        onChange={(e) =>
                          handleFieldChange(index, "toTime", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <select
                        value={row.day}
                        className="w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 text-center"
                        onChange={(e) =>
                          handleFieldChange(index, "day", e.target.value)
                        }
                      >
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="number"
                        value={row.lectures}
                        className="w-full text-center"
                        min={0}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "lectures",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="number"
                        value={row.timeSlots}
                        className="w-full text-center"
                        min={0}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "timeSlots",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="number"
                        value={row.recesses}
                        className="w-full text-center"
                        min={0}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "recesses",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="text"
                        value={row.recessSlots}
                        className="w-full text-center"
                        onChange={(e) =>
                          handleFieldChange(index, "recessSlots", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="number"
                        value={row.recessTiming}
                        className="w-full text-center"
                        min={0}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "recessTiming",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteRow(index)}
                        disabled={scheduleData.length === 1}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 text-right">
            <Button
              onClick={handleSave}
              className="bg-primary text-white hover:bg-indigo-700"
            >
              Save Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManagementTable;