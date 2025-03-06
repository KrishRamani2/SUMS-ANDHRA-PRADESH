
import { useState } from "react";
import { CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

export default function OfflineManual() {
  const [questionHeading, setQuestionHeading] = useState("");
  const [description, setDescription] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [optionalQuestions, setOptionalQuestions] = useState("");

  return (
    <>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl">Create a Question Form</DialogTitle>
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
                  className="bg-white text-black mt-2"
                  value={questionHeading}
                  onChange={(e) => setQuestionHeading(e.target.value)}
                  placeholder="Enter your question heading"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-black">
                  Description
                </Label>
                <Input
                  id="description"
                  className="bg-white text-black mt-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description"
                />
              </div>

              <div>
                <Label htmlFor="question-number" className="text-black">
                  Question Number
                </Label>
                <Input
                  id="question-number"
                  className="bg-white text-black mt-2"
                  value={questionNumber}
                  onChange={(e) => setQuestionNumber(e.target.value)}
                  placeholder="Enter question number"
                />
              </div>

              <div>
                <Label htmlFor="marks-per-question" className="text-black">
                  Marks Per Question
                </Label>
                <Input
                  id="marks-per-question"
                  className="bg-white text-black mt-2"
                  value={marksPerQuestion}
                  onChange={(e) => setMarksPerQuestion(e.target.value)}
                  placeholder="Enter marks per question"
                />
              </div>

              <div>
                <Label htmlFor="total-questions" className="text-black">
                  Total Number of Questions
                </Label>
                <Input
                  id="total-questions"
                  className="bg-white text-black mt-2"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(e.target.value)}
                  placeholder="Enter total number of questions"
                />
              </div>

              <div>
                <Label htmlFor="optional-questions" className="text-black">
                  Number of Optional Questions
                </Label>
                <Input
                  id="optional-questions"
                  className="bg-white text-black mt-2"
                  value={optionalQuestions}
                  onChange={(e) => setOptionalQuestions(e.target.value)}
                  placeholder="Enter number of optional questions"
                />
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