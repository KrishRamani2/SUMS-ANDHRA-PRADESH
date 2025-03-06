
import Header from '../SchoolDashboard/Header';
import TeachersStats from './TeachersStats';
import TopTeachersTable from './TeachersRating';
import TeacherPerformanceCharts from './Charts';
import Achievements from './Achievements';

const TeachersDash = () => {
  return (
    <div className="bg-gray-100 p-4">
      {/* Header spans full width */}
      <Header />
      
      {/* Stats spans full width below header */}
      <div className="mb-6">
        <TeachersStats />
      </div>
      
      {/* Main content grid with adjusted right column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - takes 2/3 of the space */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TopTeachersTable />
          <Achievements />
        </div>
        
        {/* Right column - takes 1/3 of the space */}
        <div className="lg:col-span-1 mt-6">
          <TeacherPerformanceCharts />
        </div>
      </div>
    </div>
  );
};

export default TeachersDash;