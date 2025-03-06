 
import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Minus } from 'lucide-react';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([17.8464, 82.0419], 8);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      const districtBoundary: [number, number][] = [
        [17.4464, 81.6419],
        [18.2464, 81.6419],
        [18.2464, 82.4419],
        [17.4464, 82.4419]
      ];

      L.polygon(districtBoundary, {
        color: '#4338ca',
        fillOpacity: 0.2,
        weight: 2
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Map View</h2>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                  <SelectItem value="urban">Urban</SelectItem>
                </SelectContent>
              </Select>
              <button className="p-2 border rounded hover:bg-gray-100" onClick={handleZoomIn}>
                <Plus className="h-4 w-4" />
              </button>
              <button className="p-2 border rounded hover:bg-gray-100" onClick={handleZoomOut}>
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div ref={mapRef} className="h-[500px] w-full rounded-lg" />
        </Card>
      </div>
    </div>
  );
};

export default MapComponent;
