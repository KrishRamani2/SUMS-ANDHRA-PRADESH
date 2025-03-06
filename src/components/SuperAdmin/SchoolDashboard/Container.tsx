import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { Card, CardContent } from "../../ui/card";
import { GraduationCap, Users } from "lucide-react";

const AcademicStatsHeader = () => {
  const years = ["2024-2025", "2023-2024", "2022-2023"];
  const grades = ["All", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 ">
      {/* Year Selector */}
      <Card className="bg-white rounded-lg border border-gray-100">
        <CardContent className="p-4">
          <div className="space-y-1.5">
            <h3 className="text-base font-medium text-gray-900">Year</h3>
            <Select defaultValue={years[0]}>
              <SelectTrigger className="w-full border-0 bg-transparent focus:ring-0">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grade Selector */}
      <Card className="bg-white rounded-lg border border-gray-100">
        <CardContent className="p-4">
          <div className="space-y-1.5">
            <h3 className="text-base font-medium text-gray-900">Grade</h3>
            <Select defaultValue={grades[0]}>
              <SelectTrigger className="w-full border-0 bg-transparent focus:ring-0">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Total Students */}
      <Card className="bg-white rounded-lg border border-gray-100">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-3xl font-semibold mt-1">3500</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-800 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Total Teachers */}
      <Card className="bg-white rounded-lg border border-gray-100">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Teacher</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold mt-1">420</p>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                Achievement
              </span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicStatsHeader;