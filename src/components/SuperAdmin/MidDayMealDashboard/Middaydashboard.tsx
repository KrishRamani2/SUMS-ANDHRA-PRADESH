import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { School, Cctv, LayoutGrid, List, Utensils, Users, AlertTriangle, Check } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Progress } from "../../ui/progress";

// Define interfaces for type safety
interface School {
  name: string;
  district: string;
  address: string;
  mealServed: string;
  mealQuality: 'Excellent' | 'Good' | 'Average' | 'Poor';
  studentCoverage: string;
  nutritionCompliance: string;
  lastInspection: string;
  issue: string | null;
}

const SchoolDashboard = () => {
  const [viewMode, setViewMode] = useState<'tile' | 'table'>('tile');
  const [selectedMonth, setSelectedMonth] = useState('february');
  const navigate = useNavigate();
  const state = "Andhra Pradesh";
  const year = 2025;

  const handleMealDetailsClick = (school: School): void => {
    navigate(`/super-admin/${state}/${school.district}/${year}/meal-details`);
  };

  const handleCctvClick = (school: School): void => {
    navigate(`/super-admin/cctv/dashboard/${state}/${school.district}/${year}/${encodeURIComponent(school.name)}`);
  };

  const handleNutritionDashboardClick = (): void => {
    navigate(`/nutrition-dashboard`);
  };

  const schools: School[] = [
    {
      "name": "Delhi Public School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Steel Plant Township, Visakhapatnam, Andhra Pradesh 530032",
      "mealServed": "98.2%",
      "mealQuality": "Excellent",
      "studentCoverage": "97%",
      "nutritionCompliance": "99%",
      "lastInspection": "15 Feb 2025",
      "issue": null
    },
    {
      "name": "Sri Chaitanya School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Gajuwaka, Visakhapatnam, Andhra Pradesh 530026",
      "mealServed": "96.5%",
      "mealQuality": "Good",
      "studentCoverage": "94%",
      "nutritionCompliance": "98%",
      "lastInspection": "14 Feb 2025",
      "issue": null
    },
    {
      "name": "Narayana e-Techno School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "MVP Colony, Visakhapatnam, Andhra Pradesh 530017",
      "mealServed": "95.0%",
      "mealQuality": "Good",
      "studentCoverage": "93%",
      "nutritionCompliance": "96%",
      "lastInspection": "13 Feb 2025",
      "issue": "Slight shortage of fresh fruits"
    },
    {
      "name": "Bhashyam School, Visakhapatnam",
      "district": "Visakhapatnam",
      "address": "Seethammadhara, Visakhapatnam, Andhra Pradesh 530013",
      "mealServed": "97.8%",
      "mealQuality": "Good",
      "studentCoverage": "95%",
      "nutritionCompliance": "97%",
      "lastInspection": "12 Feb 2025",
      "issue": null
    }
  ];
  
  const nutritionData = [
    { name: 'Protein', value: 82 },
    { name: 'Carbs', value: 95 },
    { name: 'Fats', value: 88 },
    { name: 'Vitamins', value: 75 }
  ];

  const mealServedData = [
    { day: 'Mon', percentage: 98 },
    { day: 'Tue', percentage: 97 },
    { day: 'Wed', percentage: 99 },
    { day: 'Thu', percentage: 96 },
    { day: 'Fri', percentage: 98 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getStatusColor = (quality: School['mealQuality']) => {
    switch(quality) {
      case 'Excellent': return 'bg-green-600 hover:bg-green-700';
      case 'Good': return 'bg-blue-600 hover:bg-blue-700';
      case 'Average': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Poor': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const TableView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>School Name</TableHead>
          <TableHead>District</TableHead>
          <TableHead className="text-center">Meals Served</TableHead>
          <TableHead className="text-center">Meal Quality</TableHead>
          <TableHead className="text-center">Student Coverage</TableHead>
          <TableHead className="text-center">Nutrition</TableHead>
          <TableHead className="text-center">Last Inspection</TableHead>
          <TableHead className="text-center">Kitchen View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schools.map((school, index) => (
          <TableRow key={index} className={school.issue ? "bg-amber-50" : ""}>
            <TableCell className="flex items-center gap-2">
              <School className="h-4 w-4" />
              <div>
                {school.name}
                {school.issue && (
                  <div className="flex items-center text-amber-600 text-xs mt-1 gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {school.issue}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>{school.district}</TableCell>
            <TableCell 
              className="text-center cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handleMealDetailsClick(school)}
            >
              {school.mealServed}
            </TableCell>
            <TableCell className="text-center">
              <Badge 
                variant="secondary" 
                className={`${getStatusColor(school.mealQuality)} text-white cursor-pointer transition-colors`}
                onClick={() => handleMealDetailsClick(school)}
              >
                {school.mealQuality}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              {school.studentCoverage}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center items-center gap-2">
                <Progress value={parseInt(school.nutritionCompliance)} className="h-2 w-16" />
                <span>{school.nutritionCompliance}</span>
              </div>
            </TableCell>
            <TableCell className="text-center text-sm">
              {school.lastInspection}
            </TableCell>
            <TableCell className="text-center">
              <Cctv 
                className="h-4 w-4 mx-auto cursor-pointer hover:text-blue-600 transition-colors" 
                onClick={() => handleCctvClick(school)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const TileView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {schools.map((school, index) => (
        <Card key={index} className={`flex flex-col ${school.issue ? "border-amber-300" : ""}`}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <School className="h-4 w-4" />
              <CardTitle className="text-sm font-medium">{school.name}</CardTitle>
            </div>
            <Cctv 
              className="h-4 w-4 cursor-pointer hover:text-blue-600 transition-colors" 
              onClick={() => handleCctvClick(school)}
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">District</p>
                <p className="text-sm">{school.district}</p>
              </div>
              
              {school.issue && (
                <div className="flex items-center gap-2 bg-amber-50 p-2 rounded text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-amber-700">{school.issue}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleMealDetailsClick(school)}
                >
                  <p className="text-sm font-medium text-gray-500">Meals Served</p>
                  <p className="text-sm font-medium">{school.mealServed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Coverage</p>
                  <p className="text-sm font-medium">{school.studentCoverage}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Meal Quality</p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-1 ${getStatusColor(school.mealQuality)} text-white cursor-pointer transition-colors`}
                    onClick={() => handleMealDetailsClick(school)}
                  >
                    {school.mealQuality}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nutrition</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={parseInt(school.nutritionCompliance)} className="h-2 w-12" />
                    <span className="text-sm">{school.nutritionCompliance}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Last Inspection</p>
                <p className="text-sm">{school.lastInspection}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-4 lg:space-y-0 lg:flex lg:gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Daily Meal Coverage</CardTitle>
          <CardDescription>Week of February 19-23, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mealServedData}>
                <XAxis dataKey="day" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Bar 
                  name="Meals Served (%)"
                  dataKey="percentage" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:w-96">
        <CardHeader>
          <CardTitle>Nutrition Compliance</CardTitle>
          <CardDescription>February 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {nutritionData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Meals Served Today</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Check className="h-3 w-3 mr-1" /> 2,458 / 2,500
              </Badge>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Coverage Rate</span>
                <span className="font-medium">98.3%</span>
              </div>
              <Progress value={98.3} className="h-2 mt-1" />
            </div>
            
            <button 
              className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleNutritionDashboardClick}
            >
              View Complete Nutrition Report
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SummaryCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Schools</p>
              <p className="text-2xl font-bold">248</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <School className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
              <span className="flex items-center">
                <Check className="h-3 w-3 mr-1" /> 100% Compliance
              </span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Students Covered</p>
              <p className="text-2xl font-bold">56,482</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-green-600 font-medium">+3.2%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Meal Quality</p>
              <p className="text-2xl font-bold">94.8%</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Utensils className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-green-600 font-medium">+1.5%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Issues Reported</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            <span className="text-green-600 font-medium">-2</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Utensils className="h-6 w-6 text-blue-600" />
          Mid-Day Meal Dashboard
        </h2>
        
        <div className="flex items-center gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January 2025</SelectItem>
              <SelectItem value="february">February 2025</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="District" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              <SelectItem value="narsipatnam">Narsipatnam</SelectItem>
              <SelectItem value="koyyuru">Koyyuru</SelectItem>
              <SelectItem value="kakinada">Kakinada</SelectItem>
              <SelectItem value="vijayawada">Vijayawada</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-1 border rounded-md">
            <Button
              variant={viewMode === 'tile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tile')}
              className="px-3"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <SummaryCards />

      {viewMode === 'tile' ? (
        <div className="space-y-6">
          <TileView />
          <AnalyticsView />
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <TableView />
              </div>
            </CardContent>
          </Card>
          <AnalyticsView />
        </div>
      )}
    </div>
  );
};

export default SchoolDashboard;