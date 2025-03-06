
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';

const EventsContainer = () => {
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      date: 'March 15, 2025',
      description: 'Annual technology conference featuring keynote speakers, workshops, and networking opportunities.',
      location: 'San Francisco Convention Center'
    },
    {
      id: 2,
      title: 'Art Exhibition Opening',
      date: 'March 20, 2025',
      description: 'Opening night of contemporary art exhibition featuring local and international artists.',
      location: 'Downtown Art Gallery'
    },
    {
      id: 3,
      title: 'Music Festival',
      date: 'April 5-7, 2025',
      description: 'Three-day music festival featuring indie bands and established artists.',
      location: 'Central Park'
    },
    {
      id: 4,
      title: 'Food & Wine Tasting',
      date: 'April 15, 2025',
      description: 'Exclusive food and wine pairing event with renowned local chefs.',
      location: 'Grand Hotel'
    },
    {
      id: 5,
      title: 'Charity Marathon',
      date: 'May 1, 2025',
      description: 'Annual charity run supporting local community initiatives.',
      location: 'City Center'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 " >
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      
      {/* Scrollable container with fixed height */}
      <div className="h-96 overflow-y-auto pr-2 rounded-md" style={{height:"510px"}}>
        {events.map(event => (
          <Card key={event.id} className="mb-4 ">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{event.title}</span>
                <span className="text-sm text-gray-500">{event.date}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{event.description}</p>
              <p className="text-sm text-gray-600">
                📍 {event.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsContainer;