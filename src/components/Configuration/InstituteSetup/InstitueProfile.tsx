import { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import { Switch } from "../../ui/switch";

interface UploadComponentProps {
  label: string;
  onUpload: (file: File) => void;
  required?: boolean;
}

interface Field {
  label: string;
  type: string;
  required?: boolean;
}

interface UploadField {
  label: string;
  required?: boolean;
}

interface Section {
  title: string;
  fields?: Field[];
  uploadFields?: UploadField[];
}

interface FormData {
  [key: string]: string | boolean | number;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ label, onUpload, required }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
      onUpload(file);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input border border-gray-300 rounded-md p-1.5"
        required={required}
      />
      {preview && (
        <img
          src={preview}
          alt={`${label} preview`}
          className="w-32 h-32 mt-2 object-cover border rounded"
        />
      )}
    </div>
  );
};

const InstituteProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sections: Section[] = [
    {
      title: "Institute Details",
      fields: [
        { label: "Institute Group", type: "text", required: true },
        { label: "Institute Board", type: "text", required: true },
        { label: "Institute Name", type: "text", required: true },
        { label: "Minority", type: "text" },
        { label: "About Institute", type: "textarea" },
        { label: "Address", type: "textarea", required: true },
        { label: "City", type: "text", required: true },
        { label: "State", type: "text", required: true },
        { label: "Country", type: "text", required: true },
        { label: "Pincode", type: "number", required: true },
        { label: "Website", type: "url" },
        { label: "Facebook", type: "text" },
        { label: "Phone", type: "tel", required: true },
        { label: "Alternate Phone", type: "tel" },
        { label: "Fax", type: "text" },
        { label: "Domain Name", type: "text", required: true },
        { label: "Admin Email", type: "email", required: true },
        { label: "Principal Email", type: "email", required: true },
        { label: "Accounts Email", type: "email" },
        { label: "Enquiry Email", type: "email" },
        { label: "Remark", type: "textarea" },
        { label: "Background Color", type: "color" },
        { label: "Top Wrapper Color", type: "color" },
        { label: "Google API Key For Bus Module", type: "text" },
        { label: "Restrict Back Date Fees Entry", type: "switch" },
      ],
    },
    {
      title: "Institute Logo & Photo",
      uploadFields: [
        { label: "Upload Institute Logo", required: true },
        { label: "Upload Institute Photo", required: true },
        { label: "Upload Live Stream Logo" },
      ],
    },
    {
      title: "Email Configuration",
      fields: [
        { label: "Email", type: "email", required: true },
        { label: "Password", type: "password", required: true },
        { label: "SMTP Host", type: "text", required: true },
        { label: "Port Number", type: "number", required: true },
        { label: "Enable SSL", type: "switch" },
      ],
    },
    {
      title: "Additional Details",
      fields: [
        { label: "Annual Budget", type: "number" },
        { label: "Funding Sources", type: "textarea" },
        { label: "Scholarship Programs", type: "textarea" },
        { label: "Vision Statement", type: "textarea" },
        { label: "Mission Statement", type: "textarea" },
      ],
    },
  ];

  const handleSubmit = (sectionTitle: string, event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Submitting ${sectionTitle}:`, formData);
    // Add your API call here
  };

  const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file);
    // Add your file upload logic here
  };

  const renderField = (field: Field) => {
    const id = field.label.replace(/\s+/g, "-").toLowerCase();
    
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={id}
            placeholder={`Enter ${field.label}`}
            value={formData[id]?.toString() || ""}
            onChange={(e) => handleInputChange(id, e.target.value)}
            required={field.required}
            className="min-h-[100px]"
          />
        );
      case "switch":
        return (
          <Switch
            id={id}
            checked={Boolean(formData[id])}
            onCheckedChange={(checked) => handleInputChange(id, checked)}
          />
        );
      default:
        return (
          <Input
            type={field.type}
            id={id}
            placeholder={`Enter ${field.label}`}
            value={formData[id]?.toString() || ""}
            onChange={(e) => handleInputChange(id, e.target.value)}
            required={field.required}
            className="w-full"
          />
        );
    }
  };

  const renderSection = (section: Section) => (
    <Card className="w-full max-w-3xl mt-4">
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(section.title, e)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields?.map((field, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={field.label.replace(/\s+/g, "-").toLowerCase()}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {renderField(field)}
              </div>
            ))}
          </div>
          
          {section.uploadFields?.map((uploadField, index) => (
            <div key={index} className="mt-4">
              <UploadComponent 
                label={uploadField.label} 
                onUpload={handleFileUpload}
                required={uploadField.required}
              />
            </div>
          ))}
          
          <Button type="submit" className="w-full mt-6">
            Save {section.title}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Institute Profile</h1>
      
      <div className="flex flex-col items-center">
        {/* Always render Institute Details section */}
        {renderSection(sections[0])}
        
        {/* Navigation buttons for other sections */}
        <div className="flex flex-wrap justify-center gap-4 my-6">
          {sections.slice(1).map((section, index) => (
            <Button
              key={index + 1}
              onClick={() => setActiveSection(activeSection === index + 1 ? null : index + 1)}
              variant={activeSection === index + 1 ? "default" : "outline"}
              className="min-w-[150px]"
            >
              {section.title}
            </Button>
          ))}
        </div>

        {/* Render additional selected section */}
        {activeSection !== null && activeSection !== 0 && 
          renderSection(sections[activeSection])}
      </div>
    </div>
  );
};

export default InstituteProfileForm;