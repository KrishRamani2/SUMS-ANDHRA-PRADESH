import  { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeesDashboard = () => {
  // Sample data - replace with your actual data
  const [monthlyData] = useState([
    { month: 'Jan', paid: 5000, pending: 2000 },
    { month: 'Feb', paid: 6000, pending: 1500 },
    { month: 'Mar', paid: 4500, pending: 2500 },
    { month: 'Apr', paid: 7000, pending: 1000 },
    { month: 'May', paid: 5500, pending: 1800 },
    { month: 'Jun', paid: 6500, pending: 1200 }
  ]);

  const pieData = [
    { name: 'Paid Fees', value: 34500, color: '#4ade80' },
    { name: 'Pending Fees', value: 10000, color: '#f87171' }
  ];

  const totalPaid = monthlyData.reduce((sum, item) => sum + item.paid, 0);
  const totalPending = monthlyData.reduce((sum, item) => sum + item.pending, 0);
  const totalFees = totalPaid + totalPending;

  return (
    <div className="p-12 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            <p className="text-sm text-green-700 mt-1">Total Fees Paid</p>
            <div className="text-xs text-green-600 mt-2">
              {((totalPaid / totalFees) * 100).toFixed(1)}% of total fees
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</div>
            <p className="text-sm text-red-700 mt-1">Total Fees Pending</p>
            <div className="text-xs text-red-600 mt-2">
              {((totalPending / totalFees) * 100).toFixed(1)}% of total fees
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">₹{totalFees.toLocaleString()}</div>
            <p className="text-sm text-blue-700 mt-1">Total Fees</p>
            <div className="text-xs text-blue-600 mt-2">
              {monthlyData.length} months tracked
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Fees Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="paid" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                    name="Fees Paid"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#f87171" 
                    strokeWidth={2}
                    name="Fees Pending"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fees Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="paid" fill="#4ade80" name="Fees Paid" />
                  <Bar dataKey="pending" fill="#f87171" name="Fees Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeesDashboard;