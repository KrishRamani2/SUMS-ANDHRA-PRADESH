import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip, TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, Calendar, Download, DollarSign } from "lucide-react";

// Define data structure types
interface ChartDataPoint {
  month: string;
  FC: number;
  FR: number;
}

// Define custom tooltip props
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

const chartData2024: ChartDataPoint[] = [
  { month: "January", FC: 186, FR: 80 },
  { month: "February", FC: 305, FR: 200 },
  { month: "March", FC: 237, FR: 120 },
  { month: "April", FC: 73, FR: 190 },
  { month: "May", FC: 209, FR: 130 },
  { month: "June", FC: 214, FR: 140 },
  { month: "July", FC: 120, FR: 100 },
  { month: "August", FC: 180, FR: 150 },
  { month: "September", FC: 190, FR: 170 },
  { month: "October", FC: 210, FR: 180 },
  { month: "November", FC: 240, FR: 200 },
  { month: "December", FC: 300, FR: 250 },
];

const chartData2023: ChartDataPoint[] = [
  { month: "January", FC: 150, FR: 70 },
  { month: "February", FC: 270, FR: 180 },
  { month: "March", FC: 220, FR: 100 },
  { month: "April", FC: 60, FR: 160 },
  { month: "May", FC: 190, FR: 110 },
  { month: "June", FC: 200, FR: 130 },
  { month: "July", FC: 110, FR: 90 },
  { month: "August", FC: 160, FR: 140 },
  { month: "September", FC: 180, FR: 150 },
  { month: "October", FC: 200, FR: 160 },
  { month: "November", FC: 220, FR: 180 },
  { month: "December", FC: 280, FR: 230 },
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-semibold text-gray-900">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function FeesGraph() {
  const [selectedYear, setSelectedYear] = useState<"2023" | "2024">("2024");
  const chartData = selectedYear === "2024" ? chartData2024 : chartData2023;

  const getTotalFees = (data: ChartDataPoint[]): number => {
    return data.reduce((acc, curr) => acc + curr.FC, 0);
  };

  const getYearOverYearGrowth = (): string => {
    const currentTotal = getTotalFees(chartData2024);
    const previousTotal = getTotalFees(chartData2023);
    const growth = ((currentTotal - previousTotal) / previousTotal) * 100;
    return growth.toFixed(1);
  };

  return (
    <Card className="w-full bg-white border border-gray-100 shadow-lg" style={{ height: "550px" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold text-gray-900">Fees Collection</CardTitle>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                +{getYearOverYearGrowth()}% YoY
              </Badge>
            </div>
            <p className="text-gray-500 text-sm mt-1">Monthly collection overview</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value as "2023" | "2024")}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Total Collection</span>
            </div>
            <div className="text-xl font-bold text-gray-900">
              ${getTotalFees(chartData).toLocaleString()}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Highest Month</span>
            </div>
            <div className="text-xl font-bold text-blue-700">
              ${Math.max(...chartData.map(item => item.FC)).toLocaleString()}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Collection Rate</span>
            </div>
            <div className="text-xl font-bold text-green-700">
              {((chartData.reduce((acc, curr) => acc + curr.FC, 0) / 
                chartData.reduce((acc, curr) => acc + curr.FR, 0)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-gray-600"
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              className="text-gray-600"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => {
                return <span className="text-gray-600">{value === 'FC' ? 'Fees Collected' : 'Fees Required'}</span>;
              }}
            />
            <Line
              type="monotone"
              dataKey="FC"
              stroke="#2563EB"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="FR"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default FeesGraph;