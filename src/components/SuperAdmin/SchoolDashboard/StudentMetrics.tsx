
import { Card, CardContent } from '../../ui/card';

const metrics = [
  { label: 'Student Retention', value: '91.32%' },
  { label: 'Student Attrition rate', value: '20%' },
  { label: 'Faculty To Student Ratio', value: '1:120' }
];

const Arrow = ({ className = "" }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MetricsDisplay = () => {
  return (
    <div className="space-y-4 w-full max-w-4xl">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">{metric.label}</span>
                <span className="text-2xl font-bold">{metric.value}</span>
              </div>
              <Arrow className="text-gray-400 hover:text-gray-600 transition-colors" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsDisplay;