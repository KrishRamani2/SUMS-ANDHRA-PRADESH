import * as React from "react";
import { Download } from "lucide-react";
import { Label, Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

// Define types for chart data and component props
interface ChartDataItem {
  group: string;
  count: number;
  fill: string;
  percentageChange: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
  }>;
}

// Updated ViewBox type to match Recharts
interface ViewBox {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  width: number;
  height: number;
}

interface CustomLabelProps {
  viewBox?: ViewBox;
  totalCount: number;
  totalChange: string;
}

const chartData: ChartDataItem[] = [
  { 
    group: "Boys", 
    count: 420, 
    fill: "#0EA5E9",
    percentageChange: "+5.2%"
  },
  { 
    group: "Girls", 
    count: 380, 
    fill: "#F59E0B",
    percentageChange: "+3.8%"
  }
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-900">{payload[0].payload.group}</p>
        <p className="text-gray-600 mt-1">
          Count: {payload[0].payload.count.toLocaleString()}
        </p>
        <p className="text-green-600 text-sm mt-1">
          {payload[0].payload.percentageChange} from last year
        </p>
      </div>
    );
  }
  return null;
};

const CustomLabel: React.FC<CustomLabelProps> = ({ viewBox, totalCount, totalChange }) => {
  // Add null check for viewBox
  if (!viewBox) return null;
  
  const { cx, cy } = viewBox;
  return (
    <g>
      <text 
        x={cx} 
        y={cy - 15} 
        textAnchor="middle" 
        dominantBaseline="central"
        className="fill-gray-900 text-2xl font-bold"
      >
        {totalCount.toLocaleString()}
      </text>
      <text 
        x={cx} 
        y={cy + 15} 
        textAnchor="middle" 
        dominantBaseline="central"
        className="fill-gray-500 text-sm"
      >
        Total Students
      </text>
      <text 
        x={cx} 
        y={cy + 35} 
        textAnchor="middle" 
        dominantBaseline="central"
        className="fill-green-600 text-sm font-medium"
      >
        {totalChange} ↑
      </text>
    </g>
  );
};

export function Component() {
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  const totalChange = "+4.5%";

  return (
    <Card className="flex flex-col bg-white border mt-10 border-gray-100 shadow-lg" style={{ height: "400px" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">Student Distribution</CardTitle>
            <CardDescription className="text-gray-500 mt-1">Academic Year 2024-25</CardDescription>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="flex justify-center gap-4 mb-4">
          {chartData.map((data, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }} />
              <span className="text-sm text-gray-600">{data.group}</span>
              <Badge variant="secondary" className="bg-gray-50 text-gray-600">
                {data.count.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="group"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              strokeWidth={2}
              stroke="#fff"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={index} 
                  fill={entry.fill} 
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
              <Label
                content={<CustomLabel 
                  totalCount={totalCount} 
                  totalChange={totalChange}
                />}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default Component;