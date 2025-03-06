// import React, { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardHeader } from "../../components/ui/card";
// import { MapPin, ArrowUpDown } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../components/ui/select";
// import { stateData } from './Schooldata';
// import { useSchoolStore } from '../../store/stateStore';

// interface School {
//   name: string;
//   attendance: number;
// }

// interface DisplayData {
//   title: string;
//   image: string;
//   totalSchools: number;
//   schools: School[];
// }

// const SchoolStats: React.FC = () => {
//   const navigate = useNavigate();
//   const { 
//     selectedYear, 
//     selectedState, 
//     sortOrder,
//     selectedDistrict,
//     setSelectedYear,
//     setSelectedState,
//     setSortOrder,
//     setSelectedDistrict 
//   } = useSchoolStore();

//   const years = ["2025", "2024", "2023", "2022", "2021"];

//   const displayData = useMemo<DisplayData[]>(() => {
//     if (selectedState === "All") {
//       return stateData.states
//         .map(state => ({
//           title: state.state,
//           image: state.image,
//           totalSchools: state.totalSchools,
//           schools: state.topSchools, // Use state-level topSchools
//         }))
//         .sort((a, b) => {
//           return sortOrder === "asc" 
//             ? a.title.localeCompare(b.title)
//             : b.title.localeCompare(a.title);
//         });
//     }
    
//     const state = stateData.states.find(s => s.state === selectedState);
//     if (!state) return [];

//     return state.districts.map(district => ({
//       title: district.name,
//       image: district.image,
//       totalSchools: district.totalSchools,
//       schools: district.topSchools, // Use district-level topSchools
//     }));
//   }, [selectedState, sortOrder]);

//   const handleCardClick = (districtTitle: string): void => {
//     if (selectedState !== "All") {
//       setSelectedDistrict(districtTitle);
//       const formattedDistrict = districtTitle.toLowerCase().replace(/\s+/g, '-');
//       const formattedState = selectedState.toLowerCase();
//       navigate(`/super-admin/${formattedState}/${formattedDistrict}/${selectedYear}`);
//     }
//   };

//   const handleYearChange = (year: string): void => {
//     setSelectedYear(year);
//     if (selectedState !== "All" && selectedDistrict) {
//       const formattedDistrict = selectedDistrict.toLowerCase().replace(/\s+/g, '-');
//       const formattedState = selectedState.toLowerCase();
//       navigate(`/super-admin/${formattedState}/${formattedDistrict}/${year}`);
//     }
//   };

//   const handleSortOrderChange = (): void => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl">
//       <div className="flex justify-between items-center mb-6 gap-4">
//         <div className="flex gap-4">
//           <Select value={selectedState} onValueChange={setSelectedState}>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Select State" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All States</SelectItem>
//               {stateData.states.map((state) => (
//                 <SelectItem key={state.state} value={state.state}>
//                   {state.state}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {selectedState === "All" && (
//             <button 
//               onClick={handleSortOrderChange}
//               className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
//             >
//               Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
//               <ArrowUpDown className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//         <MapPin className="text-gray-500" />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {displayData.map((data) => (
//           <Card 
//             key={data.title} 
//             className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//             onClick={() => handleCardClick(data.title)}
//           >
//             <img 
//               src={data.image} 
//               alt={`${data.title} schools`}
//               className="w-full h-48 object-cover"
//             />
//             <CardHeader className="bg-green-800 text-white p-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="font-bold">{data.title}</h3>
//                 <Select 
//                   value={selectedYear} 
//                   onValueChange={handleYearChange}
//                 >
//                   <SelectTrigger className="w-24 bg-white/20 border-0 text-white">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {years.map(year => (
//                       <SelectItem key={year} value={year}>
//                         {year}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardHeader>
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm font-medium">Total Schools</span>
//                 <span className="font-bold">{data.totalSchools}</span>
//               </div>
              
//               <div className="space-y-3">
//                 <div className="grid grid-cols-2 text-sm font-medium">
//                   <span>School Name</span>
//                   <span className="text-right">Attendance %</span>
//                 </div>
//                 {data.schools.map((school, idx) => (
//                   <div key={idx} className="grid grid-cols-2 text-sm border-b pb-2">
//                     <span className="text-gray-600 pr-2">{school.name}</span>
//                     <span className="text-right">{school.attendance}%</span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SchoolStats;
import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useSchoolStore } from '../../store/stateStore';

// Import images (assuming these are imported elsewhere in your project)
import School1 from "../images/school.jpg"; // Assuming School1 for Andhra Pradesh
import School15 from "../images/School15.jpg";
import School4 from "../images/school4.jpg";
import School13 from "../images/School13.jpg";
import School12 from "../images/School12.jpg";
import School11 from "../images/School11.jpg";

interface School {
  name: string;
  attendance: number;
  ruralMale?: number;
  ruralFemale?: number;
  ruralTotal?: number;
  urbanMale?: number;
  urbanFemale?: number;
  urbanTotal?: number;
  total?: number;
}

interface District {
  name: string;
  totalSchools: number;
  image: string;
  topSchools: School[];
}

interface State {
  state: string;
  image: string;
  totalSchools: number;
  topSchools: School[];
  districts: District[];
}

// Andhra Pradesh data
const andhraPradeshData: State = {
  state: "ANDHRA PRADESH",
  image: School1,
  totalSchools: 500,
  topSchools: [
    { name: "JNV(Mrs) (Boys) G.Madugula", attendance: 90.2 },
    { name: "JNV Anantpur School (Girls) Teerthada", attendance: 80 },
    { name: "JNV Anantpur School (Boys) Rayalpadu", attendance: 78 },
    { name: "JNV(Mrs) (Boys) Peddaboddur", attendance: 77 },
    { name: "Jawahar Navodaya Vidyalaya, Pochampally", attendance: 76 },
  ],
  districts: [
    {
      name: "Visakhapatnam",
      totalSchools: 120,
      image: School15,
      topSchools: [
        { 
          name: "Visakha Valley School", 
          attendance: 92.5,
          ruralMale: 91.5,
          ruralFemale: 89.8,
          ruralTotal: 90.6,
          urbanMale: 93.8,
          urbanFemale: 92.4,
          urbanTotal: 93.1,
          total: 92.5
        },
        { 
          name: "Navy Children School", 
          attendance: 89.7,
          ruralMale: 88.5,
          ruralFemale: 86.9,
          ruralTotal: 87.7,
          urbanMale: 91.2,
          urbanFemale: 89.8,
          urbanTotal: 90.5,
          total: 89.7
        },
        { 
          name: "Kendriya Vidyalaya", 
          attendance: 88.3,
          ruralMale: 87.2,
          ruralFemale: 85.6,
          ruralTotal: 86.4,
          urbanMale: 89.9,
          urbanFemale: 88.5,
          urbanTotal: 89.2,
          total: 88.3
        },
        { 
          name: "Sri Prakash Vidyaniketan", 
          attendance: 87.6,
          ruralMale: 86.4,
          ruralFemale: 84.8,
          ruralTotal: 85.6,
          urbanMale: 89.2,
          urbanFemale: 87.8,
          urbanTotal: 88.5,
          total: 87.6
        },
        { 
          name: "Little Angels School", 
          attendance: 86.9,
          ruralMale: 85.7,
          ruralFemale: 84.1,
          ruralTotal: 84.9,
          urbanMale: 88.5,
          urbanFemale: 87.1,
          urbanTotal: 87.8,
          total: 86.9
        },
      ],
    },
    {
      name: "Guntur",
      totalSchools: 85,
      image: School4,
      topSchools: [
        { 
          name: "Bhashyam Public School", 
          attendance: 91.2,
          ruralMale: 90.2,
          ruralFemale: 88.5,
          ruralTotal: 89.3,
          urbanMale: 92.5,
          urbanFemale: 91.1,
          urbanTotal: 91.8,
          total: 91.2
        },
        { 
          name: "Nalanda Vidyalaya", 
          attendance: 88.5,
          ruralMale: 87.5,
          ruralFemale: 85.8,
          ruralTotal: 86.6,
          urbanMale: 89.8,
          urbanFemale: 88.4,
          urbanTotal: 89.1,
          total: 88.5
        },
        { 
          name: "Sri Venkateswara School", 
          attendance: 87.8,
          ruralMale: 86.8,
          ruralFemale: 85.1,
          ruralTotal: 85.9,
          urbanMale: 89.1,
          urbanFemale: 87.7,
          urbanTotal: 88.4,
          total: 87.8
        },
        { 
          name: "St. Ann's School", 
          attendance: 86.4,
          ruralMale: 85.4,
          ruralFemale: 83.7,
          ruralTotal: 84.5,
          urbanMale: 87.7,
          urbanFemale: 86.3,
          urbanTotal: 87.0,
          total: 86.4
        },
        { 
          name: "Oxford High School", 
          attendance: 85.9,
          ruralMale: 84.9,
          ruralFemale: 83.2,
          ruralTotal: 84.0,
          urbanMale: 87.2,
          urbanFemale: 85.8,
          urbanTotal: 86.5,
          total: 85.9
        },
      ],
    },
    {
      name: "Krishna",
      totalSchools: 95,
      image: School13,
      topSchools: [
        { 
          name: "NSM Public School", 
          attendance: 90.8,
          ruralMale: 89.8,
          ruralFemale: 88.1,
          ruralTotal: 88.9,
          urbanMale: 92.1,
          urbanFemale: 90.7,
          urbanTotal: 91.4,
          total: 90.8
        },
        { 
          name: "Sri Chaitanya School", 
          attendance: 89.1,
          ruralMale: 88.1,
          ruralFemale: 86.4,
          ruralTotal: 87.2,
          urbanMale: 90.4,
          urbanFemale: 89.0,
          urbanTotal: 89.7,
          total: 89.1
        },
        { 
          name: "Delhi Public School", 
          attendance: 87.5,
          ruralMale: 86.5,
          ruralFemale: 84.8,
          ruralTotal: 85.6,
          urbanMale: 88.8,
          urbanFemale: 87.4,
          urbanTotal: 88.1,
          total: 87.5
        },
        { 
          name: "Kennedy High School", 
          attendance: 86.8,
          ruralMale: 85.8,
          ruralFemale: 84.1,
          ruralTotal: 84.9,
          urbanMale: 88.1,
          urbanFemale: 86.7,
          urbanTotal: 87.4,
          total: 86.8
        },
        { 
          name: "Atkinson School", 
          attendance: 85.3,
          ruralMale: 84.3,
          ruralFemale: 82.6,
          ruralTotal: 83.4,
          urbanMale: 86.6,
          urbanFemale: 85.2,
          urbanTotal: 85.9,
          total: 85.3
        },
      ],
    },
    {
      name: "East Godavari",
      totalSchools: 110,
      image: School12,
      topSchools: [
        { 
          name: "Aditya Public School", 
          attendance: 91.5,
          ruralMale: 90.5,
          ruralFemale: 88.8,
          ruralTotal: 89.6,
          urbanMale: 92.8,
          urbanFemale: 91.4,
          urbanTotal: 92.1,
          total: 91.5
        },
        { 
          name: "Bharatiya Vidya Bhavan", 
          attendance: 89.9,
          ruralMale: 88.9,
          ruralFemale: 87.2,
          ruralTotal: 88.0,
          urbanMale: 91.2,
          urbanFemale: 89.8,
          urbanTotal: 90.5,
          total: 89.9
        },
        { 
          name: "SFS School", 
          attendance: 88.2,
          ruralMale: 87.2,
          ruralFemale: 85.5,
          ruralTotal: 86.3,
          urbanMale: 89.5,
          urbanFemale: 88.1,
          urbanTotal: 88.8,
          total: 88.2
        },
        { 
          name: "St. John's School", 
          attendance: 87.4,
          ruralMale: 86.4,
          ruralFemale: 84.7,
          ruralTotal: 85.5,
          urbanMale: 88.7,
          urbanFemale: 87.3,
          urbanTotal: 88.0,
          total: 87.4
        },
        { 
          name: "Pragathi Vidyalaya", 
          attendance: 86.7,
          ruralMale: 85.7,
          ruralFemale: 84.0,
          ruralTotal: 84.8,
          urbanMale: 88.0,
          urbanFemale: 86.6,
          urbanTotal: 87.3,
          total: 86.7
        },
      ],
    },
    {
      name: "West Godavari",
      totalSchools: 90,
      image: School11,
      topSchools: [
        { 
          name: "Sir C.R. Reddy Public School", 
          attendance: 90.3,
          ruralMale: 89.3,
          ruralFemale: 87.6,
          ruralTotal: 88.4,
          urbanMale: 91.6,
          urbanFemale: 90.2,
          urbanTotal: 90.9,
          total: 90.3
        },
        { 
          name: "Montessori School", 
          attendance: 88.6,
          ruralMale: 87.6,
          ruralFemale: 85.9,
          ruralTotal: 86.7,
          urbanMale: 89.9,
          urbanFemale: 88.5,
          urbanTotal: 89.2,
          total: 88.6
        },
        { 
          name: "Sri Rama School", 
          attendance: 87.9,
          ruralMale: 86.9,
          ruralFemale: 85.2,
          ruralTotal: 86.0,
          urbanMale: 89.2,
          urbanFemale: 87.8,
          urbanTotal: 88.5,
          total: 87.9
        },
        { 
          name: "Vivekananda School", 
          attendance: 86.5,
          ruralMale: 85.5,
          ruralFemale: 83.8,
          ruralTotal: 84.6,
          urbanMale: 87.8,
          urbanFemale: 86.4,
          urbanTotal: 87.1,
          total: 86.5
        },
        { 
          name: "Sasi English Medium School", 
          attendance: 85.8,
          ruralMale: 84.8,
          ruralFemale: 83.1,
          ruralTotal: 83.9,
          urbanMale: 87.1,
          urbanFemale: 85.7,
          urbanTotal: 86.4,
          total: 85.8
        },
      ],
    },
  ],
};

interface DisplayData {
  title: string;
  image: string;
  totalSchools: number;
  schools: School[];
}

const SchoolStats: React.FC = () => {
  const navigate = useNavigate();
  const { 
    selectedYear, 
    selectedDistrict,
    setSelectedYear,
    setSelectedState,
    setSelectedDistrict 
  } = useSchoolStore();

  const years = ["2025", "2024", "2023", "2022", "2021"];
  
  // Set state to Andhra Pradesh on component mount
  useEffect(() => {
    setSelectedState("ANDHRA PRADESH");
  }, [setSelectedState]);

  const displayData = useMemo<DisplayData[]>(() => {
    // Map Andhra Pradesh's districts to the display format
    return andhraPradeshData.districts.map(district => ({
      title: district.name,
      image: district.image,
      totalSchools: district.totalSchools,
      schools: district.topSchools,
    }));
  }, []);

  const handleCardClick = (districtTitle: string): void => {
    setSelectedDistrict(districtTitle);
    const formattedDistrict = districtTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/super-admin/andhra-pradesh/${formattedDistrict}/${selectedYear}`);
  };

  const handleYearChange = (year: string): void => {
    setSelectedYear(year);
    if (selectedDistrict) {
      const formattedDistrict = selectedDistrict.toLowerCase().replace(/\s+/g, '-');
      navigate(`/super-admin/andhra-pradesh/${formattedDistrict}/${year}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg text-gray-600">Districts ({andhraPradeshData.districts.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Total Schools:</span>
          <span className="font-bold">{andhraPradeshData.totalSchools}</span>
          <MapPin className="text-green-600 ml-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayData.map((data) => (
          <Card 
            key={data.title} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(data.title)}
          >
            <img 
              src={data.image} 
              alt={`${data.title} schools`}
              className="w-full h-48 object-cover"
            />
            <CardHeader className="bg-green-800 text-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{data.title}</h3>
                <Select 
                  value={selectedYear} 
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-24 bg-white/20 border-0 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Total Schools</span>
                <span className="font-bold">{data.totalSchools}</span>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 text-sm font-medium">
                  <span>School Name</span>
                  <span className="text-right">Attendance %</span>
                </div>
                {data.schools.map((school, idx) => (
                  <div key={idx} className="grid grid-cols-2 text-sm border-b pb-2">
                    <span className="text-gray-600 pr-2 truncate" title={school.name}>{school.name}</span>
                    <span className="text-right">{school.attendance}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchoolStats;