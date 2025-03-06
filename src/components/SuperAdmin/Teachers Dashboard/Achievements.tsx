import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import School1 from "../../images/school5.jpg"
import School2 from "../../images/School12.jpg"

const Achievements = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Achievments</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="overflow-hidden rounded-md">
            <img 
              src={School1}
              alt="Science lab stream"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-md">
            <img 
              src={School2}
              alt="Classroom stream"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;