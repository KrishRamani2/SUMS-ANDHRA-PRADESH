import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import Student from "../../images/student.jpg";

const StudentProfileCard = () => {
  const studentData = {
    name: 'Jill Anderson',
    imageUrl: 'https://via.placeholder.com/400x400',
    admissionNumber: 'null',
    gender: 'M',
    dateOfBirth: '2024-05-14',
    email: '-',
    mobileNo: '-',
    bloodGroup: '-',
    povertStatus: '-',
    aadharNo: '-',
    udisedNo: '-',
    saralStudentId: '-',
    nationality: '-',
    religion: '-',
    grNo: '-',
    admissionReceiptId: '-',
    admissionDate: '-',
    admissionClass: '-',
    lastInstitute: '-',
    placeOfBirth: 'pb',
    pwd: '-',
    busFacility: '*'
  };

  const classDetails = {
    discipline: 'Primary section',
    class: '2nd Standard',
    division: 'A',
    rollNo: '0',
    year: '-',
    concessionType: '-',
    feesCategory: '-',
    previousYearDues: '-',
    caste: '-',
    subCaste: '-',
    feesDefaulter: '-',
    biometrixId: '-',
    isLcTaken: '-',
    presentAddress: 'fgdfgfg',
    presentCountry: '-',
    presentState: '-',
    presentCity: '-',
    presentPin: '0',
    isRentalAddress: '-'
  };

  return (
    <Card className="max-w-md mx-auto h-[650px] flex flex-col">
      <CardHeader className="flex flex-col items-center pt-8 pb-4 flex-shrink-0">
        <div className="rounded-full w-32 h-32 overflow-hidden">
          <img src={Student} alt={studentData.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold mt-4">{studentData.name}</h3>
      </CardHeader>
      
      <CardContent className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-medium">Admission Number:</span>
              <span>{studentData.admissionNumber}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Gender:</span>
              <span>{studentData.gender}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Date of Birth:</span>
              <span>{studentData.dateOfBirth}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{studentData.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Mobile No.:</span>
              <span>{studentData.mobileNo}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Blood Group:</span>
              <span>{studentData.bloodGroup}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Poverty Status:</span>
              <span>{studentData.povertStatus}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Aadhar No.:</span>
              <span>{studentData.aadharNo}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">UDISED NO:</span>
              <span>{studentData.udisedNo}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Saral Student id:</span>
              <span>{studentData.saralStudentId}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Nationality:</span>
              <span>{studentData.nationality}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Religion:</span>
              <span>{studentData.religion}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">G.R.No.:</span>
              <span>{studentData.grNo}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Admission Receipt Id:</span>
              <span>{studentData.admissionReceiptId}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Admission Date:</span>
              <span>{studentData.admissionDate}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Admission taken in class:</span>
              <span>{studentData.admissionClass}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Last Institute Attended:</span>
              <span>{studentData.lastInstitute}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Place of Birth:</span>
              <span>{studentData.placeOfBirth}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Persons with Disability (PWD):</span>
              <span>{studentData.pwd}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Bus Facility:</span>
              <span>{studentData.busFacility}</span>
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-6">View Class Details</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Class Details</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="font-medium">Discipline:</span>
                    <span>{classDetails.discipline}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Class:</span>
                    <span>{classDetails.class}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Division:</span>
                    <span>{classDetails.division}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Roll No:</span>
                    <span>{classDetails.rollNo}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Year:</span>
                    <span>{classDetails.year}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Concession Type:</span>
                    <span>{classDetails.concessionType}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Fees Category:</span>
                    <span>{classDetails.feesCategory}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Previous Year Dues:</span>
                    <span>{classDetails.previousYearDues}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Caste:</span>
                    <span>{classDetails.caste}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Sub-Caste:</span>
                    <span>{classDetails.subCaste}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Fees Defaulter:</span>
                    <span>{classDetails.feesDefaulter}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">BioMetrix ID:</span>
                    <span>{classDetails.biometrixId}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Is LC Taken:</span>
                    <span>{classDetails.isLcTaken}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Present Address:</span>
                    <span>{classDetails.presentAddress}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Present Country:</span>
                    <span>{classDetails.presentCountry}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Present State:</span>
                    <span>{classDetails.presentState}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Present City:</span>
                    <span>{classDetails.presentCity}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Present Pin:</span>
                    <span>{classDetails.presentPin}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Is Rental Address:</span>
                    <span>{classDetails.isRentalAddress}</span>
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StudentProfileCard;