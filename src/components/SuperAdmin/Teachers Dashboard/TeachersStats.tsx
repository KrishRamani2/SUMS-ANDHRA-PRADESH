import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../ui/card';
import { GraduationCap, ChartArea, Layout, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  total: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  total, 
  icon: Icon, 
  iconBgColor, 
  iconColor, 
  onClick 
}) => {
  return (
    <div className="mt-5">
      <Card
        className={`h-full ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
        onClick={onClick}
      >
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold">
              {value}/{total}
            </h3>
          </div>
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="h-6 w-6" color={iconColor} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatData {
  title: string;
  value: number;
  total: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

const TeachersStats: React.FC = () => {
  const navigate = useNavigate();

  // These values would typically come from your app's state or props
  const defaultState = "yourState";
  const defaultDistrict = "yourDistrict";
  const defaultYear = "2024";
  const defaultSchoolName = "yourSchool";

  const handleTeachersClick = () => {
    navigate(`/super-admin/teachers/dashboard/${defaultState}/${defaultDistrict}/${defaultYear}/${defaultSchoolName}`);
  };

  const stats: StatData[] = [
    {
      title: 'Out Of Teachers',
      value: 450,
      total: 550,
      icon: GraduationCap,
      iconBgColor: '#E6F7F1',
      iconColor: '#6898E8'
    },
    {
      title: 'Expert Teachers',
      value: 150,
      total: 550,
      icon: ChartArea,
      iconBgColor: '#EEF4FD',
      iconColor: '#6898E8',
      onClick: handleTeachersClick
    },
    {
      title: 'Best Teachers',
      value: 250,
      total: 550,
      icon: Layout,
      iconBgColor: '#EEF4FD',
      iconColor: '#6898E8'
    },
    {
      title: 'Good Teachers',
      value: 150,
      total: 550,
      icon: Layout,
      iconBgColor: '#EEF4FD',
      iconColor: '#6898E8'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default TeachersStats;