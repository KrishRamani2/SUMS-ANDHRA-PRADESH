 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Plus, Minus, BarChart } from "lucide-react";
import { useSchoolStore } from "../../store/stateStore"; // Adjust the import path
import { stateData } from "./Schooldata"; // Adjust the import path
import Gujarat from "../Map/AndhraPradesh.png";
// Define the interface for a school object
interface School {
  name: string;
  attendance: number;
  ruralMale?: number;    // Optional for state-level topSchools
  ruralFemale?: number;  // Optional for state-level topSchools
  ruralTotal?: number;   // Optional for state-level topSchools
  urbanMale?: number;    // Optional for state-level topSchools
  urbanFemale?: number;  // Optional for state-level topSchools
  urbanTotal?: number;   // Optional for state-level topSchools
  total?: number;        // Optional for state-level topSchools
}

// Define the interface for a district
interface District {
  name: string;
  totalSchools: number;
  image: string;
  topSchools: School[];
}

// Define the interface for a state
interface State {
  state: string;
  image: string;
  totalSchools: number;
  topSchools: School[];
  districts: District[];
}

// Define the overall data structure
interface StateData {
  states: State[];
}

const AcademicProgressDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);

  // Get state and district from Zustand store (persisted)
  const { selectedState, selectedDistrict, setSelectedDistrict, selectedYear } = useSchoolStore();

  // Find the selected state data
  const stateInfo = (stateData as StateData).states.find((state) => state.state === selectedState);

  // Get districts for the selected state or all districts if "All" is selected
  const districts = stateInfo ? stateInfo.districts : [];
  const districtInfo = selectedDistrict ? districts.find((d) => d.name === selectedDistrict) : null;

  // Get academic progress data based on selection
  const academicData = districtInfo ? districtInfo.topSchools : stateInfo ? stateInfo.topSchools : [];

  // Determine the map image based on the selected state

  const handleDashboardClick = () => {
    const formattedState = selectedState.toLowerCase().replace(/\s+/g, "-");
    const formattedDistrict = selectedDistrict ? selectedDistrict.toLowerCase().replace(/\s+/g, "-") : "all";
    navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}/academic-dashboard`);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value === "All" ? null : value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <Card className="p-6 h-[800px] overflow-hidden">
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Academic Progress</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              className="flex items-center bg-white text-black border hover:bg-white"
              onClick={handleDashboardClick}
            >
              <BarChart className="h-4 w-4" />
              View Dashboard
            </Button>
            {selectedState !== "All" && (
              <Select value={selectedDistrict || "All"} onValueChange={handleDistrictChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Districts</SelectItem>
                  {districts.map((district) => (
                    <SelectItem key={district.name} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2}>School</TableHead>
                <TableHead colSpan={3} className="text-center border-x">Rural Areas</TableHead>
                <TableHead colSpan={3} className="text-center border-x">Urban Areas</TableHead>
                <TableHead rowSpan={2} className="text-center">Total Areas</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="text-center border-x">Male</TableHead>
                <TableHead className="text-center">Female</TableHead>
                <TableHead className="text-center border-x">Total</TableHead>
                <TableHead className="text-center">Male</TableHead>
                <TableHead className="text-center">Female</TableHead>
                <TableHead className="text-center border-x">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {academicData.length > 0 ? (
                academicData.map((row, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-center">{row.ruralMale !== undefined ? `${row.ruralMale}%` : "-"}</TableCell>
                    <TableCell className="text-center">{row.ruralFemale !== undefined ? `${row.ruralFemale}%` : "-"}</TableCell>
                    <TableCell className="text-center">{row.ruralTotal !== undefined ? `${row.ruralTotal}%` : "-"}</TableCell>
                    <TableCell className="text-center">{row.urbanMale !== undefined ? `${row.urbanMale}%` : "-"}</TableCell>
                    <TableCell className="text-center">{row.urbanFemale !== undefined ? `${row.urbanFemale}%` : "-"}</TableCell>
                    <TableCell className="text-center">{row.urbanTotal !== undefined ? `${row.urbanTotal}%` : "-"}</TableCell>
                    <TableCell className="text-center">{row.total !== undefined ? `${row.total}%` : `${row.attendance}%`}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No data available for the selected state and district
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-6 h-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Map View</h2>
          <div className="flex gap-2">
            <Select defaultValue="all" onValueChange={() => {/* Add logic for area filtering if needed */}}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
                <SelectItem value="urban">Urban</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleZoomIn} className="h-10 w-10">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut} className="h-10 w-10">
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative h-[calc(100%-4rem)] w-full rounded-lg overflow-hidden bg-gray-100">
          <img
            src={Gujarat}
            alt={`${selectedState || "State"} Map`}
            className="w-full h-full object-contain transition-transform duration-300 ease-in-out"
            style={{ transform: `scale(${zoom / 100})` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default AcademicProgressDashboard;