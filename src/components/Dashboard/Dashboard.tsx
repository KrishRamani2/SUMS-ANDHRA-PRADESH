import Header from './SchoolHubNavbar';
import FeatureInfo from './Container';
import YearSelector from './YearSelector';
import { Component } from './PieChart';
import { AttendanceChart } from './AttendanceChart';
import { FeesGraph } from './FeesChart';
import Calendar from './Calendar';
import MessageFeed from './MessageFeed';
import SchoolAnnouncements from './Announcements';
import FacultyLeaveManagement from './Faculty';
import PaymentReminderDialog from './PaymentReminderDialog';
import LecturePlanner from './LecturePlanner';
import FeatureSelector from './SelectFeatures';
import ViewPaymentReminders from './ViewPaymentReminder';
import { useThemeStore } from '../../store/themeStore';

const Dashboard = () => {
  const { theme } = useThemeStore() as {theme:string};

  return (
    <div className="min-h-screen " style={{ backgroundColor: theme }}>
      {/* Header */}
      <Header />

      {/* Dashboard Title and Year Selector */}
      <div className="flex justify-between items-center px-5 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <FeatureSelector />
          <ViewPaymentReminders />
          <PaymentReminderDialog />
          <YearSelector />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-row gap-8 px-5">
        {/* Left Side: Components */}
        <div className="flex-1 space-y-6">
          <div className='pr-6'><FeatureInfo /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pl-5">
          <MessageFeed />
          <SchoolAnnouncements />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 pl-5 pr-9">
            <FeesGraph />
          </div>
          <div className='grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-2 gap-4 pl-5 pr-8'>
            <AttendanceChart />
            <FacultyLeaveManagement />
          </div>
          <div className='pl-5 pr-8'> <LecturePlanner /> </div>
        </div>
        <div className="w-1/5 mt-12">
          <Calendar />
         <Component />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;