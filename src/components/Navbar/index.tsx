 
import React, { useRef, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { navItems } from '../../data/index';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ScrollArea } from '../ui/scroll-area';
import useNavbarStore from '../../store/navbarStore';
import Dashboard from '../Dashboard/Dashboard';
import InstituteProfileForm from '../Configuration/InstituteSetup/InstitueProfile';
import SectionTiming from '../Configuration/InstituteSetup/SectionTiming';
import ScheduleManagementTable from '../Configuration/InstituteSetup/EditSection';
import DVRConfigTable from '../Configuration/CCTV/DVRConfig';
import CamerList from '../Configuration/CCTV/CameraList';
import AllocateCamera from '../Configuration/CCTV/AllocateCamera';
import AllocateTeacher from '../Configuration/Teaching/AllocateTeacher';
import AllocateRollNumber from '../Configuration/Teaching/AllocateRollNumber';
import StudentTimetable from '../Configuration/Teaching/StudentTimetable';
import TeacherTimetable from '../Configuration/Teaching/TeacherTimetable';
import ProxyTeacherMaster from '../Configuration/Teaching/ProxyMaster';
import RoleMaster from '../Configuration/Teaching/RoleMaster';
import ExamSchedule from '../Configuration/ExamConfiguration/ExamSchedule';
import TestType from '../Configuration/ExamConfiguration/TestTypeConfiguration';
import GradingStructure from '../Configuration/ExamConfiguration/GradingStructure';
import QuestionPaperMaster from '../Configuration/ExamConfiguration/QuestionPaperMaster';
import AddQuestionPaper from '../Configuration/ExamConfiguration/QuestionPaperAddMaster';
import TestTakenPage from '../Configuration/ExamConfiguration/TestTaken';
import GenerateResultPage from '../Configuration/ExamConfiguration/Generateresult';
import ClassRoomDash from '../Classroom/ClassRoomDash';
import SectionDashboard from '../Classroom/Section';
import Classes from '../Classroom/Classes';
import Calendar from '../Classroom/Calendar';
 
import StudentDashboard from '../Classroom/StudentDashboard';
import StudentPage from '../Classroom/StudentPage';
import PersonalStudentDash from '../Classroom/PersonalStudentDash/PersonalStudentDash';

interface OpenState {
  main: string | null;
  sub: string | null;
}

function Sidebar() {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { activeTab, isExpanded, setActiveTab, toggleNavbar } = useNavbarStore();
  const [openMenus, setOpenMenus] = useState<OpenState>({ main: null, sub: null });

  const handleMainMenuClick = (label: string, path: string) => {
    setOpenMenus(prev => ({
      main: prev.main === label ? null : label,
      sub: null
    }));
    
    // If no dropdown, navigate directly
    if (!navItems.find(item => item.label === label)?.hasDropdown) {
      navigate(path);
      setActiveTab(path);
    }
  };

  const handleOptionClick = (path: string) => {
    navigate(path);
    setActiveTab(path);
  };

  return (
    <div
      ref={navRef}
      className={`h-screen bg-white flex flex-col border-r  transition-all duration-300 ease-in-out fixed top-0 left-0 ${
        isExpanded ? 'w-64' : 'w-20'
      } z-20`}
    >
      <button
        onClick={toggleNavbar}
        className="absolute -right-3 top-20 transform bg-white rounded-full p-1 border border-gray-300 z-20  hover:bg-gray-100 transition-colors duration-200"
      >
        {isExpanded ? (
          <ChevronLeft size={20} strokeWidth={1.5} className="text-gray-600" />
        ) : (
          <ChevronRight size={20} strokeWidth={1.5} className="text-gray-600" />
        )}
      </button>

      <div className="flex-shrink-0 flex items-center justify-center h-16 border-b border-gray-200">
        <span className="text-gray-800 font-semibold text-xl">
          {isExpanded ? 'Your Logo' : 'Logo'}
        </span>
      </div>

      <ScrollArea className="flex-grow">
        <nav className="flex flex-col items-center space-y-1 p-4">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && index % 3 === 0 && (
                <div className={`my-2 h-px bg-gray-200 ${isExpanded ? 'w-52' : 'w-10'}`} />
              )}
              
              <div 
                className="relative w-full flex flex-col items-center group"
                onClick={() => handleMainMenuClick(item.label, item.path)}
              >
                <div
                  className={`relative flex items-center hover:bg-gray-100 transition-all duration-200 rounded-lg cursor-pointer w-full
                    ${isExpanded ? 'justify-start px-4' : 'justify-center'}
                    ${activeTab === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                    py-3`}
                >
                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className={activeTab === item.path ? "text-blue-600" : "text-gray-600"}
                  />
                  {isExpanded && (
                    <>
                      <span className="ml-4 text-sm font-medium whitespace-nowrap overflow-hidden">
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDown 
                          size={16} 
                          className={`ml-auto transition-transform duration-500 ${
                            openMenus.main === item.label ? 'rotate-180' : ''
                          } text-gray-500`}
                        />
                      )}
                    </>
                  )}
                </div>

                {isExpanded && item.hasDropdown && item.dropdownOptions && (
                  <div 
                    className={`w-full overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${
                      openMenus.main === item.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{
                      transitionProperty: 'all',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className="mt-1 bg-gray-50 rounded-lg ">
                      {item.dropdownOptions.map((dropdownItem, i) => (
                        <div key={i} className="relative">
                          {dropdownItem.children ? (
                            <>
                              <div
                                className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 
                                  transition-colors duration-200 cursor-pointer flex items-center justify-between"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenus(prev => ({
                                    ...prev,
                                    sub: prev.sub === dropdownItem.label ? null : dropdownItem.label
                                  }));
                                }}
                              >
                                <span>{dropdownItem.label}</span>
                                <ChevronRight 
                                  size={14} 
                                  className={`transition-transform duration-300 ${
                                    openMenus.sub === dropdownItem.label ? 'rotate-90' : ''
                                  }`}
                                />
                              </div>
                              
                              <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                  openMenus.sub === dropdownItem.label ? 'max-h-96' : 'max-h-0'
                                }`}
                              >
                                <div 
                                  className="bg-gray-100 rounded-md mx-2 my-1 max-h-48 overflow-y-auto 
                                  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 
                                  hover:scrollbar-thumb-gray-400 transition-all duration-300"
                                >
                                  {dropdownItem.children.map((child, j) => (
                                    <div
                                      key={j}
                                      className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-blue-600 
                                        transition-all duration-200 cursor-pointer pl-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOptionClick(child.path);
                                      }}
                                    >
                                      {child.label}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div
                              className="px-6 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-blue-600 
                                transition-all duration-200 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOptionClick(dropdownItem.path);
                              }}
                            >
                              {dropdownItem.label}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}

function Navbar() {
  const { isExpanded } = useNavbarStore();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ScrollArea className={`flex-1 overflow-y-hidden transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/configuration/institute-setup/profile" element={<InstituteProfileForm />} />
            <Route path="/configuration/institute-setup/section-timing-details" element={<SectionTiming />} />
            <Route path="/configuration/institute-setup/section-timing-details/edit" element={<ScheduleManagementTable />} />
            <Route path="/configuration/cctv/dvr" element={<DVRConfigTable />}  />
            <Route path="/configuration/cctv/camera-list" element={<CamerList />} />
            <Route path="/configuration/cctv/allocate" element={<AllocateCamera />} />
            <Route path="/configuration/teaching/allocate-teacher" element={<AllocateTeacher />} />
            <Route path="/configuration/teaching/allocate-rollnumber" element={<AllocateRollNumber />} />
            <Route path="/configuration/teaching/student-timetable" element={<StudentTimetable />} />
            <Route path="/configuration/teaching/teacher-timetable" element={<TeacherTimetable />} />
            <Route path="/configuration/teaching/proxy-teacher" element={<ProxyTeacherMaster />} />
            <Route path="/configuration/admin/role-master" element={<RoleMaster />} />
            <Route path="/configuration/exam/schedule" element={<ExamSchedule />} />
            <Route path="/configuration/exam/test-type" element={<TestType />} />
            <Route path="/configuration/exam/grading-structure" element={<GradingStructure />} />
            <Route path="/configuration/exam/question-paper" element={<QuestionPaperMaster />} />
            <Route path="/configuration/exam/add-question-paper" element={<AddQuestionPaper />} />
            <Route path="/configuration/exam/test-taken" element={<TestTakenPage />} />
            <Route path="/configuration/exam/generate-result" element={<GenerateResultPage />} /> 
            <Route path="/classroom" element={<ClassRoomDash />} />
            <Route path="/classroom/:classroomId" element={<SectionDashboard />} />
            <Route path="/section/:sectionId" element={<Classes />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="/student-dash/:studentId" element={<StudentDashboard />} />
            <Route path="/student-list" element={<StudentPage />} />
            <Route path="/student-list/student-dashboard/:studentId" element={<PersonalStudentDash />} />
           
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </ScrollArea>
    </div>
  );
}

export default Navbar;