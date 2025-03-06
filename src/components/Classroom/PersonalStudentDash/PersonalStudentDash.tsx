import { useState, useEffect, Suspense, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import StudentHeader from '../StudentHeader';
import StudentProfileCard from './StudentProfileCard';
import StudentContactInfo from './StudentContact';
import AddressDetails from './AddressDetail';
import FeesDashboard from './FeesDetails';
import AcademicReview from './AcademicReview';
import Documents from './Documents';
import Announcements from './Annoucements';
import StudentReportDashboard from './Reports';

interface GlobalLoaderProps {
  progress: number;
  componentsLoaded: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ progress, componentsLoaded }) => (
  <div
    className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
    style={{
      opacity: !componentsLoaded ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
      pointerEvents: !componentsLoaded ? 'auto' : 'none',
    }}
  >
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0">
          <div className="w-full h-full border-8 border-blue-500/20 rounded-full" />
          <div
            className="w-full h-full border-8 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"
            style={{ animationDuration: '2s' }}
          />
        </div>
        <div className="absolute inset-4">
          <div className="w-full h-full bg-blue-500/10 rounded-full animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      </div>

      <div className="w-64 flex flex-col items-center gap-3">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between w-full text-sm text-gray-500">
          <span>Loading components</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  </div>
);

interface ComponentTrackerProps {
  onLoad: () => void;
  children: ReactNode;
}

const ComponentTracker: React.FC<ComponentTrackerProps> = ({ onLoad, children }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return <>{children}</>;
};

const PersonalStudentDash: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());
  const totalComponents = 9; // Total number of major components

  const handleComponentLoad = (componentName: string) => {
    setLoadedComponents((prev) => {
      const newSet = new Set(prev);
      newSet.add(componentName);
      const newProgress = (newSet.size / totalComponents) * 100;
      setProgress(newProgress);
      return newSet;
    });
  };

  const allComponentsLoaded = loadedComponents.size === totalComponents;

  return (
    <>
      <GlobalLoader progress={progress} componentsLoaded={allComponentsLoaded} />
      
      {!allComponentsLoaded ? null : (
        <div style={{ opacity: allComponentsLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
          <Suspense fallback={null}>
            <ComponentTracker onLoad={() => handleComponentLoad('header')}>
              <StudentHeader />
            </ComponentTracker>
          </Suspense>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-5">
            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('profile')}>
                <StudentProfileCard />
              </ComponentTracker>
            </Suspense>

            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('contact')}>
                <StudentContactInfo />
              </ComponentTracker>
            </Suspense>

            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('address')}>
                <AddressDetails />
              </ComponentTracker>
            </Suspense>
          </div>

          <div className="pl-9">
            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('fees')}>
                <FeesDashboard />
              </ComponentTracker>
            </Suspense>

            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('academic')}>
                <AcademicReview />
              </ComponentTracker>
            </Suspense>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pr-8 pl-11">
            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('documents')}>
                <Documents />
              </ComponentTracker>
            </Suspense>

            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('announcements')}>
                <Announcements />
              </ComponentTracker>
            </Suspense>
          </div>

          <div className="pl-11 rounded-md pr-11">
            <Suspense fallback={null}>
              <ComponentTracker onLoad={() => handleComponentLoad('reports')}>
                <StudentReportDashboard />
              </ComponentTracker>
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalStudentDash;
