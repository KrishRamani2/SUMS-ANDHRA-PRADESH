
import { Bell, Users} from 'lucide-react';

const StudentHeader = () => {

  return (
    <>
    <div className="p-7">
      {/* Header */}
      <div className="mb-5 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Academic Year 2024-25</h1>
            <p className="text-gray-500">Standard: 10th | Division: A</p>
          </div>
          <div className="flex gap-4">
            <Bell className="w-6 h-6 text-gray-500 stroke-1" />
            <Users className="w-6 h-6 text-gray-500 stroke-1" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentHeader;