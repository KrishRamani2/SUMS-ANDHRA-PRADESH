import DashboardMetrics from './DashComponent';
import AttendanceReport from './AttendanceReport';
import AcademicProgressDashboard from './AcademicReport';
import MidDayMeal from './MiddayMeal';
import Header from './DistrictDashHeader';

const DistrictDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 ">
        <Header />
        <DashboardMetrics />
        <AttendanceReport />
        <AcademicProgressDashboard />
        <MidDayMeal />
    </div>
  );
};

export default DistrictDashboard;