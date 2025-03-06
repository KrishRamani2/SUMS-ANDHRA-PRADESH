/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Book, Calendar, ChevronDown, FilePieChart, TrendingUp, 
  Users, Utensils, Salad, Apple, HeartPulse, Medal 
} from 'lucide-react';
import Header from './Header';

// Sample data
const mealData = [
  { name: 'Monday', calories: 720, protein: 28, carbs: 90, fat: 12 },
  { name: 'Tuesday', calories: 680, protein: 32, carbs: 85, fat: 10 },
  { name: 'Wednesday', calories: 750, protein: 30, carbs: 95, fat: 15 },
  { name: 'Thursday', calories: 700, protein: 35, carbs: 80, fat: 11 },
  { name: 'Friday', calories: 730, protein: 33, carbs: 88, fat: 14 }
];

const nutritionStandards = [
  { name: 'Calories', current: 716, target: 750, unit: 'kcal' },
  { name: 'Protein', current: 31.6, target: 35, unit: 'g' },
  { name: 'Carbs', current: 87.6, target: 90, unit: 'g' },
  { name: 'Fat', current: 12.4, target: 15, unit: 'g' },
  { name: 'Fiber', current: 8.8, target: 12, unit: 'g' },
  { name: 'Calcium', current: 320, target: 400, unit: 'mg' },
];

const schools = [
  { id: 1, name: 'Andhra University High School', students: 500, compliance: 93 },
  { id: 2, name: 'Dr. K.K.R. Gowtham School', students: 720, compliance: 89 },
  { id: 3, name: 'Narayana e-Techno School', students: 1300, compliance: 86 },
  { id: 4, name: 'Sri Chaitanya School', students: 540, compliance: 95 },
  { id: 5, name: 'Bhashyam Public School', students: 800, compliance: 91 },
];


const attendanceData = [
  { name: 'Sep', attendance: 92 },
  { name: 'Oct', attendance: 94 },
  { name: 'Nov', attendance: 95 },
  { name: 'Dec', attendance: 93 },
  { name: 'Jan', attendance: 94 },
  { name: 'Feb', attendance: 96 }
];

const mealDistribution = [
  { name: 'Breakfast', value: 30 },
  { name: 'Lunch', value: 55 },
  { name: 'Snack', value: 15 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const NutritionDashboard = () => {
  const [selectedSchool, _setSelectedSchool] = useState('All Schools');
  
  // Calculate compliance percentages
  const overallCompliance = Math.round(
    nutritionStandards.reduce((sum, item) => sum + (item.current / item.target) * 100, 0) / 
    nutritionStandards.length
  );
  
  return (
    <>        <Header />
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">School Nutrition Dashboard</h1>
            <p className="text-slate-500">Monitoring nutrition standards across government schools</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="flex items-center gap-2 bg-white border border-slate-300 rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                {selectedSchool}
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-medium">March 2025</span>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Students</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">3,680</h3>
              </div>
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp size={14} className="text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+3.2%</span>
              <span className="text-slate-500 ml-1">since last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Meals Served (Daily)</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">7,250</h3>
              </div>
              <div className="bg-emerald-100 h-12 w-12 rounded-full flex items-center justify-center">
                <Utensils size={20} className="text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp size={14} className="text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+5.8%</span>
              <span className="text-slate-500 ml-1">since last month</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Nutrition Compliance</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{overallCompliance}%</h3>
              </div>
              <div className="bg-amber-100 h-12 w-12 rounded-full flex items-center justify-center">
                <Medal size={20} className="text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp size={14} className="text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2.4%</span>
              <span className="text-slate-500 ml-1">since last quarter</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Attendance Rate</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">96%</h3>
              </div>
              <div className="bg-indigo-100 h-12 w-12 rounded-full flex items-center justify-center">
                <Book size={20} className="text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp size={14} className="text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+1.2%</span>
              <span className="text-slate-500 ml-1">since last month</span>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Salad size={18} className="text-emerald-500" />
                Weekly Meal Nutrition
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mealData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="protein" fill="#8884d8" name="Protein (g)" />
                  <Bar dataKey="carbs" fill="#82ca9d" name="Carbs (g)" />
                  <Bar dataKey="fat" fill="#ffc658" name="Fat (g)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <HeartPulse size={18} className="text-rose-500" />
                Nutrition Standards Compliance
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={nutritionStandards}
                  margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value, name) => [`${value}${name === 'current' ? ' (current)' : ' (target)'}`, '']} />
                  <Legend />
                  <Bar dataKey="current" fill="#82ca9d" name="Current" />
                  <Bar dataKey="target" fill="#8884d8" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Second row of charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FilePieChart size={18} className="text-blue-500" />
                Meal Distribution
              </h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mealDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mealDistribution.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Apple size={18} className="text-red-500" />
                Attendance vs. Nutrition Program
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Attendance Rate (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* School Performance Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-indigo-500" />
              School Nutrition Compliance
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-medium text-slate-500">School Name</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Students</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Compliance</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-slate-700">{school.name}</td>
                    <td className="px-4 py-3 text-slate-700">{school.students}</td>
                    <td className="px-4 py-3 text-slate-700">{school.compliance}%</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        school.compliance >= 90 
                          ? 'bg-green-100 text-green-800' 
                          : school.compliance >= 85 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {school.compliance >= 90 
                          ? 'Excellent' 
                          : school.compliance >= 85 
                            ? 'Good' 
                            : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-slate-500 text-sm">
          <p>© 2025 Government School Nutrition Program | Updated March 2025</p>
        </div>
      </div>
    </div></>
  );
};

export default NutritionDashboard;