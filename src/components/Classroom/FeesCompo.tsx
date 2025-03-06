import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

const FeesDashboard = () => {
  // Sample data - replace with real data
  const pieData = [
    { name: 'Paid Fees', value: 75000 },
    { name: 'Outstanding Fees', value: 25000 }
  ];

  const trendData = [
    { month: 'Jan', paid: 12000, outstanding: 3000 },
    { month: 'Feb', paid: 15000, outstanding: 4000 },
    { month: 'Mar', paid: 18000, outstanding: 5000 },
    { month: 'Apr', paid: 20000, outstanding: 6000 },
    { month: 'May', paid: 22000, outstanding: 7000 }
  ];

  const COLORS = ['#4F46E5', '#EF4444'];

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalFees = pieData.reduce((sum, item) => sum + item.value, 0);
  const paidPercentage = (pieData[0].value / totalFees) * 100;
  const isPositiveTrend = paidPercentage > 70;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Fees Card */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFees)}</div>
            <div className="flex items-center pt-1">
              {isPositiveTrend ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
                {paidPercentage.toFixed(1)}% collection rate
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Paid Fees Card */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Paid Fees</CardTitle>
            <div className="h-4 w-4 rounded-full bg-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pieData[0].value)}</div>
            <div className="text-sm text-gray-500 pt-1">
              Last updated today
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Fees Card */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Outstanding Fees</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pieData[1].value)}</div>
            <div className="text-sm text-gray-500 pt-1">
              Requires attention
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Fees Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Line 
                  type="monotone" 
                  dataKey="paid" 
                  stroke={COLORS[0]} 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="outstanding" 
                  stroke={COLORS[1]} 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeesDashboard;
