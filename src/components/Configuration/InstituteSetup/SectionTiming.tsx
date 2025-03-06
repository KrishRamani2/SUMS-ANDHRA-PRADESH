import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Pagination } from "../../ui/pagination";
import { Edit2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../ui/dialog";
import { Link } from "react-router-dom";

interface Column {
  label: string;
  accessor: string;
}

interface DataItem {
  [key: string]: string;
}

interface SortConfig {
  key: string;
  direction: 'ascending' | 'descending';
}

interface DataTableProps {
  data: DataItem[];
  columns: Column[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const itemsPerPage = 5;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column: string) => {
    let direction: 'ascending' | 'descending' = "ascending";
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    columns.some((column) =>
      String(item[column.accessor])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Section Timing and Details</h1>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>

      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.accessor}
                onClick={() => handleSort(column.accessor)}
                className="cursor-pointer"
              >
                {column.label}
              </TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.accessor}>{row[column.accessor]}</TableCell>
              ))}
              <TableCell>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Edit</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to edit this item?</p>
                    <DialogFooter>
                      <Button onClick={() => setIsDialogOpen(false)} variant="outline">
                        Cancel
                      </Button>
                      <Link to="/configuration/institute-setup/section-timing-details/edit">
                        <Button>Confirm</Button>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          className="mt-4"
        />
      </div>
    </div>
  );
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  return (
    <div className={className}>
      <Pagination>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Pagination>
    </div>
  );
};

const columns: Column[] = [
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
];

const sampleData: DataItem[] = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
  { name: "Alice Johnson", email: "alice@example.com", role: "Moderator" },
  { name: "Bob Brown", email: "bob@example.com", role: "User" },
  { name: "Charlie Davis", email: "charlie@example.com", role: "Admin" },
  { name: "Diana Evans", email: "diana@example.com", role: "User" },
  { name: "Eve Foster", email: "eve@example.com", role: "Moderator" },
  { name: "Frank Green", email: "frank@example.com", role: "Admin" },
];

const SectionTiming: React.FC = () => {
  return <DataTable data={sampleData} columns={columns} />;
};

export default SectionTiming;