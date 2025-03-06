/* eslint-disable react-refresh/only-export-components */
 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { BarChart, ZoomIn, ZoomOut } from "lucide-react";
import Gujarat from "../Map/AndhraPradesh.png";
import { useSchoolStore } from "../../store/stateStore";
import { stateData } from "./Schooldata";

export const mapData: Record<string, string> = {
  "Andhra Pradesh": "/images/AndhraPradesh.png",
  "Arunachal Pradesh": "/images/ArunachalPradesh.png",
  "Assam": "/images/Assam.png",
  "Bihar": "/images/Bihar.png",
  "Chhattisgarh": "/images/Chhattisgarh.png",
  "Goa": "/images/Goa.png",
  "gujarat": Gujarat,
  "Haryana": "/images/Haryana.png",
  "Himachal Pradesh": "/images/HimachalPradesh.png",
  "Jharkhand": "/images/Jharkhand.png",
  "Karnataka": "/images/Karnataka.png",
  "Kerala": "/images/Kerala.png",
  "Madhya Pradesh": "/images/MadhyaPradesh.png",
  "Maharashtra": "/images/Maharashtra.png",
  "Manipur": "/images/Manipur.png",
  "Meghalaya": "/images/Meghalaya.png",
  "Mizoram": "/images/Mizoram.png",
  "Nagaland": "/images/Nagaland.png",
  "Odisha": "/images/Odisha.png",
  "Punjab": "/images/Punjab.png",
  "Rajasthan": "/images/Rajasthan.png",
  "Sikkim": "/images/Sikkim.png",
  "Tamil Nadu": "/images/TamilNadu.png",
  "Telangana": "/images/Telangana.png",
  "Tripura": "/images/Tripura.png",
  "Uttar Pradesh": "/images/UttarPradesh.png",
  "Uttarakhand": "/images/Uttarakhand.png",
  "West Bengal": "/images/WestBengal.png",
};

interface AttendanceData {
  name: string;
  ruralMale?: number;
  ruralFemale?: number;
  ruralTotal?: number;
  urbanMale?: number;
  urbanFemale?: number;
  urbanTotal?: number;
  total?: number;
}

const AttendanceReport = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(100);
  const { selectedState, selectedDistrict, setSelectedDistrict, selectedYear } = useSchoolStore();

  const stateInfo = stateData.states.find((state) => state.state === selectedState);
  const districts = stateInfo ? stateInfo.districts : [];
  const districtInfo = selectedDistrict ? districts.find((d) => d.name === selectedDistrict) : null;
  const attendanceData: AttendanceData[] = districtInfo ? districtInfo.topSchools || [] : stateInfo?.topSchools || [];

  const handleDashboardClick = () => {
    const formattedState = selectedState.toLowerCase().replace(/\s+/g, "-");
    const formattedDistrict = selectedDistrict ? selectedDistrict.toLowerCase().replace(/\s+/g, "-") : "all";
    navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}/attendance-dashboard`);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleDistrictChange = (value: string | null) => {
    setSelectedDistrict(value === "All" ? null : value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <Card className="p-6 h-[800px] overflow-hidden">
        <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Attendance Report</h2>
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
                <TableHead colSpan={3} className="text-center">Rural Areas</TableHead>
                <TableHead colSpan={3} className="text-center">Urban Areas</TableHead>
                <TableHead rowSpan={2} className="text-center">Total Areas</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="text-center">Male</TableHead>
                <TableHead className="text-center">Female</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Male</TableHead>
                <TableHead className="text-center">Female</TableHead>
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.length > 0 ? (
                attendanceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-center">{row.ruralMale ?? "N/A"}%</TableCell>
                    <TableCell className="text-center">{row.ruralFemale ?? "N/A"}%</TableCell>
                    <TableCell className="text-center">{row.ruralTotal ?? "N/A"}%</TableCell>
                    <TableCell className="text-center">{row.urbanMale ?? "N/A"}%</TableCell>
                    <TableCell className="text-center">{row.urbanFemale ?? "N/A"}%</TableCell>
                    <TableCell className="text-center">{row.urbanTotal ?? "N/A"}%</TableCell>
                    <TableCell className="text-center">{row.total ?? "N/A"}%</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">No data available</TableCell>
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
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
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

export default AttendanceReport;