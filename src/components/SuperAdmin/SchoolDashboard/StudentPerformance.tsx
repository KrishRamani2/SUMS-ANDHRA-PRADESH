import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Play } from 'lucide-react';

const subjects = [
  { name: 'Science', pass: 75, fail: 25 },
  { name: 'Physics', pass: 92, fail: 8 },
  { name: 'Math', pass: 72.44, fail: 27.77 },
  { name: 'English', pass: 75.55, fail: 22.33 },
  { name: 'Arts', pass: 82.34, fail: 16.44 }
];

const PerformanceChart = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Student Performance By Subject</CardTitle>
        <Play className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{subject.name}</span>
              </div>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-green-800"
                  style={{ width: `${subject.pass}%` }}
                />
                <div
                  className="bg-red-500"
                  style={{ width: `${subject.fail}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>{subject.pass}%</span>
                <span>{subject.fail}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-800" />
            <span className="text-sm">Pass</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-sm">Fail</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;