
import { Star } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';

const TopTeachersTable = () => {
  const teachers = [
    {
      name: "Mrs. Anjali Sharma",
      subject: "Math",
      experience: "Best",
      improvement: "91.1%",
      feedback: 9,
      awards: 8,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Mrs. Kavita Mehta",
      subject: "Eng",
      experience: "Expert",
      improvement: "88.6%",
      feedback: 9,
      awards: 6,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Prof. Arvind Joshi",
      subject: "Bio",
      experience: "Expert",
      improvement: "91.1%",
      feedback: 8,
      awards: 6,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Prof. Aryan Sheikh",
      subject: "Phy",
      experience: "Best",
      improvement: "91.1%",
      feedback: 8,
      awards: 6,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Prof. Suresh Bansal",
      subject: "Hindi",
      experience: "Best",
      improvement: "91.1%",
      feedback: 8,
      awards: 5,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Mrs. Priya Iyer",
      subject: "Chem",
      experience: "Best",
      improvement: "91.1%",
      feedback: 8,
      awards: 5,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Prof. Vikram Singh",
      subject: "Chem",
      experience: "Good",
      improvement: "91.1%",
      feedback: 8,
      awards: 4,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Prof. Kiran Chopra",
      subject: "Phy",
      experience: "Good",
      improvement: "91.1%",
      feedback: 7,
      awards: 4,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Ms. Shivani Rao",
      subject: "Phy",
      experience: "Good",
      improvement: "91.1%",
      feedback: 7,
      awards: 4,
      avatar: "/api/placeholder/32/32"
    },
    {
      name: "Prof. Samir Das",
      subject: "Eng",
      experience: "Good",
      improvement: "91.1%",
      feedback: 7,
      awards: 4,
      avatar: "/api/placeholder/32/32"
    }
  ];

  const renderStars = (score: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < score/2 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg mt-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Top Teachers</h2>
        <div className="w-full">
          <table className="w-full">
            <thead className="bg-white sticky top-0">
              <tr className="text-sm text-gray-500">
                <th className="text-left pb-4">Teacher Name</th>
                <th className="text-left pb-4">Subject</th>
                <th className="text-left pb-4">Years of Experience</th>
                <th className="text-left pb-4">Avg Student Score Improvement</th>
                <th className="text-left pb-4">Feedback Score out of 10</th>
                <th className="text-left pb-4">Awards</th>
              </tr>
            </thead>
          </table>
          <ScrollArea className="h-[400px]">
            <table className="w-full">
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="py-4">{teacher.subject}</td>
                    <td className="py-4">{teacher.experience}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {teacher.improvement}
                        {renderStars(teacher.feedback)}
                      </div>
                    </td>
                    <td className="py-4">{teacher.feedback}</td>
                    <td className="py-4">{teacher.awards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TopTeachersTable;