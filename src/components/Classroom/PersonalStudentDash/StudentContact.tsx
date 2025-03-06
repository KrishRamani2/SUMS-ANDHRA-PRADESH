import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Phone, Mail, MapPin, User, Users } from 'lucide-react';

const StudentContactInfo = () => {
  const contactDetails = {
    student: {
      phone: '+1 (555) 123-4567',
      email: 'student@school.com',
      address: '123 Home Street, City, State 12345'
    },
    father: {
      name: 'John Doe',
      phone: '+1 (555) 234-5678',
      email: 'father@email.com',
      occupation: 'Engineer',
      officeAddress: '456 Work Street, City, State 12345'
    },
    mother: {
      name: 'Jane Doe',
      phone: '+1 (555) 345-6789',
      email: 'mother@email.com',
      occupation: 'Doctor',
      officeAddress: '789 Hospital Street, City, State 12345'
    },
    guardian: {
      name: 'Robert Smith',
      phone: '+1 (555) 456-7890',
      email: 'guardian@email.com',
      relation: 'Uncle',
      address: '321 Guardian Street, City, State 12345'
    },
    emergencyContact: {
      name: 'Mary Johnson',
      phone: '+1 (555) 567-8901',
      relation: 'Aunt'
    }
  };

  return (
    <div className='pr-8'>
    <Card className="max-w-2xl mx-auto h-[650px] flex flex-col bg-white text-black ">
      <CardHeader className="flex-shrink-0 border-b">
        <h2 className="text-2xl font-bold text-center">Contact Information</h2>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 bg-white">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-8">
            {/* Student's Contact Details */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
                <User className="h-5 w-5 text-gray-600" />
                Student's Contact Details
              </h3>
              <div className="space-y-3 ml-7">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Phone:</span> {contactDetails.student.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Email:</span> {contactDetails.student.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Address:</span> {contactDetails.student.address}
                </p>
              </div>
            </div>

            {/* Father's Details */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
                <User className="h-5 w-5 text-gray-600" />
                Father's Details
              </h3>
              <div className="space-y-3 ml-7">
                <p><span className="font-medium">Name:</span> {contactDetails.father.name}</p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Phone:</span> {contactDetails.father.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Email:</span> {contactDetails.father.email}
                </p>
                <p><span className="font-medium">Occupation:</span> {contactDetails.father.occupation}</p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Office Address:</span> {contactDetails.father.officeAddress}
                </p>
              </div>
            </div>

            {/* Mother's Details */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
                <User className="h-5 w-5 text-gray-600" />
                Mother's Details
              </h3>
              <div className="space-y-3 ml-7">
                <p><span className="font-medium">Name:</span> {contactDetails.mother.name}</p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Phone:</span> {contactDetails.mother.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Email:</span> {contactDetails.mother.email}
                </p>
                <p><span className="font-medium">Occupation:</span> {contactDetails.mother.occupation}</p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Office Address:</span> {contactDetails.mother.officeAddress}
                </p>
              </div>
            </div>

            {/* Guardian's Details */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
                <User className="h-5 w-5 text-gray-600" />
                Guardian's Details
              </h3>
              <div className="space-y-3 ml-7">
                <p><span className="font-medium">Name:</span> {contactDetails.guardian.name}</p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Phone:</span> {contactDetails.guardian.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Email:</span> {contactDetails.guardian.email}
                </p>
                <p><span className="font-medium">Relation:</span> {contactDetails.guardian.relation}</p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Address:</span> {contactDetails.guardian.address}
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white border-2 border-red-200 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
                <Users className="h-5 w-5 text-red-500" />
                Emergency Contact
              </h3>
              <div className="space-y-3 ml-7">
                <p><span className="font-medium">Name:</span> {contactDetails.emergencyContact.name}</p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-500" />
                  <span className="font-medium">Phone:</span> {contactDetails.emergencyContact.phone}
                </p>
                <p><span className="font-medium">Relation:</span> {contactDetails.emergencyContact.relation}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card></div>
  );
};

export default StudentContactInfo;