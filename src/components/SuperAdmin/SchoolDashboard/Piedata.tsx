import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/card';
import { Book, UserCheck, GraduationCap, ClipboardCheck, LucideIcon } from 'lucide-react';

interface CircularProgressProps {
  value: number;
  label: string;
  icon: LucideIcon;
  isVisible: boolean;
  trend: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, label, icon: Icon, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, isVisible]);

  return (
    <Card className="w-full bg-white hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
              <Icon className="w-4 h-4 text-green-700" />
            </div>
            <h3 className="font-medium text-sm text-gray-700">{label}</h3>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span className="font-medium">Target:</span>
            <span>100%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* SVG Progress Circle */}
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90 absolute"
              style={{ transform: 'rotate(-90deg)' }}
            >
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle
                stroke="#f3f4f6"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="opacity-50"
              />

              {/* Animated progress circle */}
              <circle
                stroke="url(#progressGradient)"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference + ' ' + circumference}
                style={{
                  strokeDashoffset,
                  transition: 'stroke-dashoffset 1s ease-in-out'
                }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-700 ease-out group-hover:stroke-width-8"
              />
            </svg>

            {/* Centered percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 group-hover:scale-110 transition-transform duration-300 translate-y-0">
                {Math.round(progress * 100) / 100}%
              </span>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Progress this semester
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricData {
  label: string;
  value: number;
  icon: LucideIcon;
  trend: string;
}

const MetricsGrid: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const metrics: MetricData[] = [
    {
      label: 'Syllabus Coverage',
      value: 88,
      icon: Book,
      trend: '+2.4%'
    },
    {
      label: 'Admission Rate',
      value: 94,
      icon: UserCheck,
      trend: '+1.8%'
    },
    {
      label: 'Passing Rate',
      value: 75,
      icon: GraduationCap,
      trend: '+3.2%'
    },
    {
      label: 'Exams/Projects Rate',
      value: 85,
      icon: ClipboardCheck,
      trend: '+4.5%'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="transform opacity-0 translate-y-4"
          style={{
            animation: `fadeIn 0.6s ease-out ${index * 0.2}s forwards`
          }}
        >
          <CircularProgress
            value={metric.value}
            label={metric.label}
            icon={metric.icon}
            isVisible={isVisible}
            trend={metric.trend}
          />
        </div>
      ))}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(1rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default MetricsGrid;