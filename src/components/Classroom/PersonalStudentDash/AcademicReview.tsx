/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import { Download, FileText, Calendar, Award } from 'lucide-react';
import { ScrollArea } from '../../../components/ui/scroll-area';
interface Subject {
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  status: string;
  details: {
    theory: number;
    practical: number;
    attendance: string;
    remarks: string;
    teacherComments: string;
  };
}

interface Exam {
  id: number;
  name: string;
  date: string;
  subjects: Subject[];
}

const AcademicReview = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const [showResult, setShowResult] = useState(false);
  
  const calculateOverallGrade = (subjects: Subject[]): string => {
    const avgMarks = subjects.reduce((sum, subj) => sum + subj.obtainedMarks, 0) / subjects.length;
    if (avgMarks >= 90) return 'A+';
    if (avgMarks >= 80) return 'A';
    if (avgMarks >= 70) return 'B+';
    if (avgMarks >= 60) return 'B';
    return 'C';
  };
  
  
  // Updated exam data structure with multiple subjects
  const examData = [
    {
      id: 1,
      name: "Mid-Term Examination",
      date: "2024-02-15",
      subjects: [
        {
          name: "Mathematics",
          totalMarks: 100,
          obtainedMarks: 85,
          grade: "A",
          status: "Pass",
          details: {
            theory: 45,
            practical: 40,
            attendance: "95%",
            remarks: "Excellent performance in algebra",
            teacherComments: "Shows strong problem-solving skills"
          }
        },
        {
          name: "Physics",
          totalMarks: 100,
          obtainedMarks: 78,
          grade: "B+",
          status: "Pass",
          details: {
            theory: 48,
            practical: 30,
            attendance: "90%",
            remarks: "Good understanding of concepts",
            teacherComments: "Need to improve practical skills"
          }
        },
        {
          name: "Chemistry",
          totalMarks: 100,
          obtainedMarks: 92,
          grade: "A+",
          status: "Pass",
          details: {
            theory: 52,
            practical: 40,
            attendance: "98%",
            remarks: "Outstanding performance in organic chemistry",
            teacherComments: "Excellent lab work"
          }
        }
      ]
    },
    {
      id: 2,
      name: "Final Examination",
      date: "2024-03-20",
      subjects: [
        {
          name: "Mathematics",
          totalMarks: 100,
          obtainedMarks: 88,
          grade: "A",
          status: "Pass",
          details: {
            theory: 50,
            practical: 38,
            attendance: "92%",
            remarks: "Strong performance overall",
            teacherComments: "Consistent improvement shown"
          }
        },
        {
          name: "Physics",
          totalMarks: 100,
          obtainedMarks: 82,
          grade: "A-",
          status: "Pass",
          details: {
            theory: 45,
            practical: 37,
            attendance: "88%",
            remarks: "Good improvement in practical work",
            teacherComments: "Better lab performance"
          }
        },
        {
          name: "Chemistry",
          totalMarks: 100,
          obtainedMarks: 85,
          grade: "A",
          status: "Pass",
          details: {
            theory: 48,
            practical: 37,
            attendance: "95%",
            remarks: "Consistent performance",
            teacherComments: "Good theoretical understanding"
          }
        }
      ]
    }
  ];


  const generatePDF = (exam:Exam) => {
    const content = `
    Academic Result Report
    ---------------------
    Exam: ${exam.name}
    Date: ${exam.date}
    
    Subject-wise Results
    -------------------
    ${exam.subjects.map(subject => `
    Subject: ${subject.name}
    Total Marks: ${subject.totalMarks}
    Obtained Marks: ${subject.obtainedMarks}
    Grade: ${subject.grade}
    Status: ${subject.status}
    
    Theory: ${subject.details.theory}
    Practical: ${subject.details.practical}
    Attendance: ${subject.details.attendance}
    Remarks: ${subject.details.remarks}
    Teacher Comments: ${subject.details.teacherComments}
    `).join('\n')}
    
    Overall Grade: ${calculateOverallGrade(exam.subjects)}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Result_${exam.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Academic Review</h1>
      
      {/* Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examData.map((exam:any) => (
          <Card 
            key={exam.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedExam(exam);
              setShowResult(true);
            }}
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex justify-between items-center">
                <span className="text-lg font-bold">{exam.name}</span>
                <Award className={`w-6 h-6 text-yellow-500`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{exam.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>{exam.subjects.length} Subjects</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                    Overall Grade: {calculateOverallGrade(exam.subjects)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Result Dialog */}
      <AlertDialog open={showResult} onOpenChange={setShowResult}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center">
              <span>{selectedExam?.name}</span>
              <span className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-800">
                Overall Grade: {selectedExam && calculateOverallGrade(selectedExam.subjects)}
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  {/* Exam Info */}
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{selectedExam?.date}</span>
                  </div>

                  {/* Subject-wise Results */}
                  {selectedExam?.subjects.map((subject, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-lg">{subject.name}</span>
                          <span className={`px-2 py-1 rounded text-sm ${
                            subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            Grade: {subject.grade}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Marks Breakdown */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="text-sm text-gray-500">Theory</label>
                              <p className="font-medium">{subject.details.theory}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500">Practical</label>
                              <p className="font-medium">{subject.details.practical}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500">Total</label>
                              <p className="font-medium">{subject.obtainedMarks}/{subject.totalMarks}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500">Attendance</label>
                              <p className="font-medium">{subject.details.attendance}</p>
                            </div>
                          </div>

                          {/* Remarks */}
                          <div className="border-t pt-3">
                            <div className="mb-2">
                              <label className="text-sm text-gray-500">Remarks</label>
                              <p className="font-medium">{subject.details.remarks}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-500">Teacher Comments</label>
                              <p className="font-medium">{subject.details.teacherComments}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => selectedExam && generatePDF(selectedExam)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Result
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AcademicReview;