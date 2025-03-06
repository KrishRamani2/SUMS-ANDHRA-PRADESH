// Ensure the path to GJ.jpg is correct relative to this file
import Gujarat from "../images/AndhraPradesh.png"; // Adjust path based on your structure

export const mapData: Record<string, string> = {
  "Andhra Pradesh": "/images/AndhraPradesh.png",
  "Arunachal Pradesh": "/images/ArunachalPradesh.png",
  "Assam": "/images/Assam.png",
  "Bihar": "/images/Bihar.png",
  "Chhattisgarh": "/images/Chhattisgarh.png",
  "Goa": "/images/Goa.png",
  "gujarat": Gujarat, // This should be the imported module reference
  "Haryana": "/images/Haryana.png",
  "Himachal Pradesh": "/images/HimachalPradesh.png",
  "Jharkhand": "/images/Jharkhand.png",
  "Karnataka": "/images/Karnataka.png",
  "Kerala": "/images/Kerala.png",
  "Madhya Pradesh": "/images/MadhyaPradesh.png",
  "Maharashtra": "/images/Maharashtra.png",
  "Manipur": "/images/Manipur.png",
  "Meghalaya": "/images/Meghalaya.png",
  "Mizoram": "/images/Mizoram.png",
  "Nagaland": "/images/Nagaland.png",
  "Odisha": "/images/Odisha.png",
  "Punjab": "/images/Punjab.png",
  "Rajasthan": "/images/Rajasthan.png",
  "Sikkim": "/images/Sikkim.png",
  "Tamil Nadu": "/images/TamilNadu.png",
  "Telangana": "/images/Telangana.png",
  "Tripura": "/images/Tripura.png",
  "Uttar Pradesh": "/images/UttarPradesh.png",
  "Uttarakhand": "/images/Uttarakhand.png",
  "West Bengal": "/images/WestBengal.png",
};

// Debugging: Log the Gujarat value to verify the import
console.log("Gujarat Image:", Gujarat);