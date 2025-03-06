import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from "../../lib/utils";
import { useYearStore } from '../../store/yearStore';

interface YearSelectorProps {
  startYear?: number;
  endYear?: number;
}

const YearSelector: React.FC<YearSelectorProps> = ({ 
  startYear = 2000, 
  endYear = new Date().getFullYear() 
}) => {
  const { selectedYear, setSelectedYear } = useYearStore();
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: endYear - startYear + 1 }, 
    (_, i) => startYear + i
  ).reverse(); // Reverse to show newest years first

  return (
    <div className="relative w-full max-w-xs">
      {/* Dropdown Button */}
      <button
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 bg-white",
          "border border-gray-200 rounded-lg",
          "text-gray-800 font-semibold transition-all duration-300"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedYear}
        <ChevronDown size={18} className="text-gray-500" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-10 mt-2 w-full bg-white border border-gray-200",
            "rounded-lg max-h-60 overflow-y-auto"
          )}
        >
          <ul className="py-2">
            {years.map((year) => (
              <li
                key={year}
                className={cn(
                  "px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200",
                  "hover:bg-gray-100 hover:text-gray-900",
                  year === selectedYear ? "bg-gray-100 text-gray-900 font-semibold" : "text-gray-800"
                )}
                onClick={() => {
                  setSelectedYear(year);
                  setIsOpen(false);
                }}
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default YearSelector;