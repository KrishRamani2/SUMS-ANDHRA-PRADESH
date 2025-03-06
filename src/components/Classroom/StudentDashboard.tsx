
import StudentHeader from './StudentHeader';
import AttendanceComponent from './Attendance';
import Subjects from './Subject';
import EventsContainer from './Events';
import FeesDashboard from './FeesCompo';
import Documents from './Documnet';
import Announcements from './Announcement';
import Examinations from './Examination';
import HomeworkDashboard from './Homework';
import EventsCalendar from './Event';
import LectureCalendar from './LectureTaken';

const StudentDashboard = () => {
  return (
    <div className='bg-white-100'>
        <StudentHeader />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pl-5'>
      <AttendanceComponent />
      {/* <Subjects /> */}
      <EventsContainer />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pl-5'><FeesDashboard /><Subjects /></div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pl-5'><Documents /> <Announcements /></div>
     <Examinations />
    
     <HomeworkDashboard />
     <div  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pl-5'>
     <LectureCalendar />
     <EventsCalendar /></div>
    </div>
  );
};

export default StudentDashboard;