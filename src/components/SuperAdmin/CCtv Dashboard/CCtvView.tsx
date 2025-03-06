import  { useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { MoreVertical } from 'lucide-react';
import School from "../../images/School11.jpg"
import School2 from "../../images/School12.jpg"
import School3 from "../../images/School13.jpg"
const CameraClassrooms = () => {
  const [activeFilter, setActiveFilter] = useState('All Rooms');
  
  const rooms = [
    { id: 1, name: 'Computer Hall', image: School },
    { id: 2, name: 'Science Lab', image: School2 },
    { id: 3, name: 'Classroom 237', image: School3 }
  ];
  
  const filters = ['All Rooms', 'Project Hall', 'Science Lab', 'Library', 'Computer Hall', 'Seminar Hall'];

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-medium mb-4">Camera Classrooms</h2>
      
      {/* Filter buttons */}
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className={`rounded-md whitespace-nowrap ${
              activeFilter === filter ? "bg-blue-500 hover:bg-blue-600" : "bg-white"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      
      {/* Room cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="flex justify-between items-center p-4">
              <h3 className="font-medium">{room.name}</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="px-4">
              <img 
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            
            <CardContent className="p-4">
              <Button 
                variant={room.name === 'Computer Hall' ? "default" : "outline"}
                className={`w-full ${
                  room.name === 'Computer Hall' ? "bg-green-700 hover:bg-green-800" : "border-gray-200"
                }`}
              >
                Enlarge View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CameraClassrooms;