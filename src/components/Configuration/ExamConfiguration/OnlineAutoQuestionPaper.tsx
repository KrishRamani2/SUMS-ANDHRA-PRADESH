
import { useState } from "react";
import { CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

export default function OnlineAuto() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addNewOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  return (
    <>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">Create a Question</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-grow pr-2">
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
                <div className="space-y-2 mt-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`option-${index}`} />
                      <div className="flex-grow flex items-center space-x-2">
                        <Input
                          className="bg-white text-black border-black flex-grow"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        {options.length > 2 && (
                          <Button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="bg-red-500 hover:bg-red-600 h-8 w-8 p-0 flex items-center justify-center"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={addNewOption}
                  className="mt-2 bg-green-600 hover:bg-green-700"
                >
                  Add Option
                </Button>
              </div>

              <div className="flex space-x-4 mt-4">
                <Button className="bg-black text-white hover:bg-gray-800">Save and Close</Button>
                <Button className="bg-black text-white hover:bg-gray-800">Save and Next</Button>
              </div>
            </div>
          </CardContent>
        </div></>
  );
}