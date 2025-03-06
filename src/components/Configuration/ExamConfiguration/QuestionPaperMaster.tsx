import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Search, Plus, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Link } from "react-router-dom";

interface QuestionPaper {
  id: number;
  year: string;
  class: string;
  subject: string;
  paperCode: string;
  testName: string;
  title: string;
  status: PaperStatus;
}

type PaperStatus = "Published" | "Draft" | "Archived";

const initialData: QuestionPaper[] = [
  {
    id: 1,
    year: "2024",
    class: "Grade 10",
    subject: "Mathematics",
    paperCode: "MATH24A",
    testName: "Mid Term",
    title: "Advanced Algebra",
    status: "Published",
  },
  {
    id: 2,
    year: "2024",
    class: "Grade 11",
    subject: "Physics",
    paperCode: "PHY24B",
    testName: "Final Term",
    title: "Mechanics",
    status: "Draft",
  },
];

const statusColors: Record<PaperStatus, string> = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Archived: "bg-gray-100 text-gray-800",
};

const QuestionPaperMaster = () => {
  const [papers] = useState<QuestionPaper[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPapers = papers.filter((paper) =>
    Object.values(paper).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
  const currentPageData = filteredPapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: PaperStatus) => {
    return <Badge className={statusColors[status]}>{status}</Badge>;
  };

  return (
    <div className="pl-8 pr-8">
      <Card className="w-full mt-12">
        <CardHeader>
          <CardTitle>Question Paper Master</CardTitle>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search question papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Link to="/configuration/exam/add-question-paper">
              <Button className="flex items-center gap-2 mt-6 bg-primary">
                <Plus className="h-4 w-4" /> Add New
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Paper Code</TableHead>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.map((paper) => (
                  <TableRow key={paper.id}>
                    <TableCell>{paper.year}</TableCell>
                    <TableCell>{paper.class}</TableCell>
                    <TableCell>{paper.subject}</TableCell>
                    <TableCell>
                      <code className="px-2 py-1 bg-gray-100 rounded-md">
                        {paper.paperCode}
                      </code>
                    </TableCell>
                    <TableCell>{paper.testName}</TableCell>
                    <TableCell>{paper.title}</TableCell>
                    <TableCell>{getStatusBadge(paper.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Paper</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredPapers.length)} of{" "}
              {filteredPapers.length} entries
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPaperMaster;