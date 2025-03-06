import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Volume2, Grid, Camera, Activity, Compass, Mic } from 'lucide-react';

const MainRoomCamera = () => {
  // Camera controls with their icons and labels
  const cameraControls = [
    { icon: Volume2, label: 'Sound On' },
    { icon: Grid, label: 'Intercom' },
    { icon: Camera, label: 'Screenshot' },
    { icon: Activity, label: 'Motion Detect' },
    { icon: Compass, label: '360 View' },
    { icon: Mic, label: 'Infrared' }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Main Room Camera</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {cameraControls.map((control, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-2 bg-blue-400 text-white p-4 rounded-full">
                <control.icon className="h-6 w-6" />
              </div>
              <span className="text-sm text-gray-600">{control.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MainRoomCamera;