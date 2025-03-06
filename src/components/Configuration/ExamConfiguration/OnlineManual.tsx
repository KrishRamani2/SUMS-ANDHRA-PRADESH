import { useState } from "react";
import { CardContent} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

export default function OnlineManual() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a Question</DialogTitle>
        </DialogHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question-heading" className="text-black">
                Question Heading
              </Label>
              <Input
                id="question-heading"
                className="bg-white text-black border-black mt-2"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
              />
            </div>

            <div>
              <Label className="text-black">Question Type (MCQ - Not Selectable)</Label>
              <Input
                value="Multiple Choice Question (MCQ)"
                readOnly
                className="bg-white text-black border-black mt-2 cursor-not-allowed"
              />
            </div>

            <div>
              <Label className="text-black">Select All Applicable Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Checkbox />
                  <Input
                    className="bg-white text-black border-black"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex space-x-4 mt-4">
              <Button className="bg-black text-white hover:bg-gray-800">Save and Close</Button>
              <Button className="bg-black text-white hover:bg-gray-800">Save and Next</Button>
            </div>
          </div>
        </CardContent></>
  );
}