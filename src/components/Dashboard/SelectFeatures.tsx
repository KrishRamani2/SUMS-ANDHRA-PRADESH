import React from 'react';
import { useFeatureStore } from '../../store/featuresStore';
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

interface FeatureOption {
  id: number;
  label: string;
  value: number;
  percentageChange: number;
  icon: string;
}

const FeatureSelector: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const setSelectedFeatures = useFeatureStore(state => state.setSelectedFeatures);

  const options: FeatureOption[] = [
    { id: 1, label: 'Students', value: 1200, percentageChange: 5, icon: '🎓' },
    { id: 2, label: 'Staff', value: 200, percentageChange: 2, icon: '🧑‍🏫' },
    { id: 3, label: 'New Admission', value: 150, percentageChange: 10, icon: '📝' },
    { id: 4, label: 'Fees Collected', value: 50000, percentageChange: 15, icon: '💰' },
    { id: 5, label: 'Fees Pending', value: 10000, percentageChange: -5, icon: '⚠️' },
  ];

  const [selectedOptions, setSelectedOptions] = React.useState<FeatureOption[]>(options.slice(0, 4));

  const handleConfirm = React.useCallback(() => {
    const selectedFeatureData = selectedOptions.map((option) => ({
      label: option.label,
      value: option.value,
      percentageChange: option.percentageChange,
      icon: option.icon,
    }));
    setSelectedFeatures(selectedFeatureData);
    setOpen(false);
  }, [selectedOptions, setSelectedFeatures]);

  React.useEffect(() => {
    handleConfirm(); // Ensure the default features are set in the store
  }, [handleConfirm]);

  const handleOptionChange = (checked: boolean, option: FeatureOption) => {
    setSelectedOptions((prevOptions) => {
      if (checked) {
        return prevOptions.length < 4 ? [...prevOptions, option] : prevOptions;
      }
      return prevOptions.filter((selected) => selected.id !== option.id);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Select Features</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Features</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-4">
            {options.map((option) => {
              const isSelected = selectedOptions.some(
                (selected) => selected.id === option.id
              );
              const isDisabled =
                selectedOptions.length >= 4 && !isSelected;

              return (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${option.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleOptionChange(checked as boolean, option)
                    }
                    disabled={isDisabled}
                  />
                  <Label
                    htmlFor={`feature-${option.id}`}
                    className={`text-sm font-medium leading-none ${
                      isDisabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    {option.icon} {option.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={selectedOptions.length !== 4}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureSelector;