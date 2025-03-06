import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Activity, Camera, Clock, Grid, Settings, Shield, Video } from 'lucide-react';
import Header from '../Header';
import ClassRoom from "../../video/classroom.mp4"; // Ensure this path is correct

// Define the Camera type
interface Camera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  recording: boolean;
}

// Define the Cameras type with specific keys
type Cameras = {
  cam1: Camera;
  cam2: Camera;
  cam3: Camera;
  cam4: Camera;
  cam5: Camera;
  cam6: Camera;
};

// Define the allowed camera IDs
type CameraId = keyof Cameras;

const CCtvDashboard = () => {
  const [activeCamera, setActiveCamera] = useState<CameraId>('cam1');
  const [cameras, setCameras] = useState<Cameras>({
    cam1: { id: 'cam1', name: 'Main Entrance', location: 'Front Door', status: 'online', recording: true },
    cam2: { id: 'cam2', name: 'Parking Lot', location: 'North Side', status: 'online', recording: true },
    cam3: { id: 'cam3', name: 'Back Exit', location: 'Rear Door', status: 'online', recording: true },
    cam4: { id: 'cam4', name: 'Warehouse', location: 'Building B', status: 'offline', recording: false },
    cam5: { id: 'cam5', name: 'Reception', location: 'Main Building', status: 'online', recording: true },
    cam6: { id: 'cam6', name: 'Server Room', location: 'Basement', status: 'online', recording: true },
  });

  // Use the imported MP4 file directly
  const videoSrc = ClassRoom;
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleRecording = (camId: CameraId) => {
    setCameras({
      ...cameras,
      [camId]: {
        ...cameras[camId],
        recording: !cameras[camId].recording
      }
    });
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a link to download the snapshot
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${cameras[activeCamera].name}_snapshot_${new Date().toISOString()}.png`;
      link.click();
    }
  };

  const events = [
    { id: 1, camera: 'Main Entrance', type: 'Motion Detected', time: '14:32:45', date: 'Today' },
    { id: 2, camera: 'Parking Lot', type: 'Person Detected', time: '13:21:10', date: 'Today' },
    { id: 3, camera: 'Server Room', type: 'Door Opened', time: '11:15:22', date: 'Today' },
    { id: 4, camera: 'Back Exit', type: 'Motion Detected', time: '09:45:38', date: 'Today' },
    { id: 5, camera: 'Warehouse', type: 'Connection Lost', time: '08:10:15', date: 'Today' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-6 gap-6 grid grid-cols-12">
        {/* Left sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                Camera List
              </CardTitle>
              <CardDescription>6 cameras configured</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {Object.values(cameras).map((camera) => (
                  <button
                    key={camera.id}
                    onClick={() => setActiveCamera(camera.id as CameraId)}
                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 text-left ${activeCamera === camera.id ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                  >
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium">{camera.name}</div>
                        <div className="text-xs text-slate-500">{camera.location}</div>
                      </div>
                    </div>
                    <Badge variant={camera.status === 'online' ? 'outline' : 'destructive'} className="text-xs">
                      {camera.status}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Storage</span>
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-3/4" />
                  </div>
                  <span className="text-sm">75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>CPU Usage</span>
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-1/4" />
                  </div>
                  <span className="text-sm">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Network</span>
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-2/5" />
                  </div>
                  <span className="text-sm">40%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="col-span-12 lg:col-span-6 space-y-4">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle>{cameras[activeCamera].name}</CardTitle>
                <CardDescription>{cameras[activeCamera].location}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={cameras[activeCamera].recording ? 'destructive' : 'outline'} className={cameras[activeCamera].recording ? 'bg-red-500 animate-pulse' : ''}>
                  {cameras[activeCamera].recording ? 'Recording' : 'Standby'}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={cameras[activeCamera].status !== 'online'} 
                  onClick={takeSnapshot}
                >
                  <Video className="h-4 w-4 mr-1" />
                  Snapshot
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 aspect-video bg-slate-900 flex items-center justify-center">
              {cameras[activeCamera].status === 'online' ? (
                <div className="relative w-full h-full">
                  <div className="absolute top-4 left-4 flex items-center bg-black/50 text-white px-2 py-1 rounded text-xs">
                    <Clock className="h-3 w-3 mr-1" /> 
                    Live: {new Date().toLocaleTimeString()}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {cameras[activeCamera].name} • HD 1080p
                  </div>
                  {/* Local MP4 video */}
                  <video
                    ref={videoRef}
                    controls
                    autoPlay
                    muted // Muted to avoid autoplay issues in some browsers
                    className="w-full h-full object-cover"
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="text-white text-center">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Camera Offline</p>
                  <Button variant="outline" size="sm" className="mt-4 text-white border-white/20">
                    Attempt Reconnect
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 bg-slate-50 dark:bg-slate-800 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    id="recording"
                    checked={cameras[activeCamera].recording}
                    disabled={cameras[activeCamera].status !== 'online'}
                    onCheckedChange={() => toggleRecording(activeCamera)}
                  />
                  <label htmlFor="recording" className="text-sm">Recording</label>
                </div>
                <div className="text-xs text-slate-500">
                  Last motion: 14:32:45
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Grid className="h-4 w-4 mr-1" />
                  Grid View
                </Button>
                <Button size="sm" variant="default">
                  <Settings className="h-4 w-4 mr-1" />
                  Camera Settings
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Camera Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="day">
                <TabsList className="mb-4">
                  <TabsTrigger value="day">24 Hours</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
                <TabsContent value="day" className="mt-0">
                  <div className="h-48 flex">
                    <div className="flex flex-col justify-between text-xs text-slate-500 pr-2">
                      <div>100</div>
                      <div>75</div>
                      <div>50</div>
                      <div>25</div>
                      <div>0</div>
                    </div>
                    <div className="flex-1 flex items-end">
                      {[40, 65, 30, 70, 85, 50, 45, 60, 75, 35, 55, 45, 60, 75, 45, 25, 35, 55, 70, 85, 95, 65, 50, 40].map((value, i) => (
                        <div key={i} className="flex-1 mx-px">
                          <div 
                            className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-t"
                            style={{ height: `${value}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <div>00:00</div>
                    <div>06:00</div>
                    <div>12:00</div>
                    <div>18:00</div>
                    <div>24:00</div>
                  </div>
                </TabsContent>
                <TabsContent value="week" className="mt-0">
                  <div className="h-48 flex items-center justify-center text-slate-500">
                    Weekly analytics data
                  </div>
                </TabsContent>
                <TabsContent value="month" className="mt-0">
                  <div className="h-48 flex items-center justify-center text-slate-500">
                    Monthly analytics data
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Events
              </CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {events.map(event => (
                  <div key={event.id} className="px-4 py-3">
                    <div className="flex justify-between">
                      <div className="font-medium">{event.type}</div>
                      <div className="text-xs">{event.time}</div>
                    </div>
                    <div className="text-sm text-slate-500">{event.camera}</div>
                    <div className="text-xs text-slate-400 mt-1">{event.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-slate-50 dark:bg-slate-800 p-4">
              <Button variant="outline" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" /> System Lockdown
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Camera className="mr-2 h-4 w-4" /> Toggle All Cameras
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4" /> Stop All Recordings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" /> Run Diagnostics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CCtvDashboard;