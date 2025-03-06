import { useState } from "react";
import { CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function OfflineAuto() {
  const [questionHeading, setQuestionHeading] = useState("");
  const [description, setDescription] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [optionalQuestions, setOptionalQuestions] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[800px]">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-6 border-b">
        <h2 className="text-2xl font-semibold">Create a Question Form</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question-heading" className="text-black">
                Question Heading
              </Label>
              <Input
                id="question-heading"
                className="bg-white text-black"
                value={questionHeading}
                onChange={(e) => setQuestionHeading(e.target.value)}
                placeholder="Enter your question heading"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-black">
                Description
              </Label>
              <Input
                id="description"
                className="bg-white text-black"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-number" className="text-black">
                Question Number
              </Label>
              <Input
                id="question-number"
                className="bg-white text-black"
                value={questionNumber}
                onChange={(e) => setQuestionNumber(e.target.value)}
                placeholder="Enter question number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks-per-question" className="text-black">
                Marks Per Question
              </Label>
              <Input
                id="marks-per-question"
                className="bg-white text-black"
                value={marksPerQuestion}
                onChange={(e) => setMarksPerQuestion(e.target.value)}
                placeholder="Enter marks per question"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-questions" className="text-black">
                Total Number of Questions
              </Label>
              <Input
                id="total-questions"
                className="bg-white text-black"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(e.target.value)}
                placeholder="Enter total number of questions"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="optional-questions" className="text-black">
                Number of Optional Questions
              </Label>
              <Input
                id="optional-questions"
                className="bg-white text-black"
                value={optionalQuestions}
                onChange={(e) => setOptionalQuestions(e.target.value)}
                placeholder="Enter number of optional questions"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty-level" className="text-black">
                Difficulty Level
              </Label>
              <select
                id="difficulty-level"
                className="w-full p-2 border rounded-md bg-white text-black"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Fixed Footer */}
      <div className="flex-shrink-0 p-6 border-t bg-gray-50">
        <div className="flex justify-end space-x-4">
          <Button className="bg-black text-white hover:bg-gray-800">
            Save and Close
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            Save and Next
          </Button>
        </div>
      </div>
    </div>
  );
}