import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../../components/ui/card';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Checkbox } from '../../../components/ui/checkbox';
import { Input } from '../../../components/ui/input';
import { MapPin, Home } from 'lucide-react';


const AddressDetails = () => {
  const [sameAsPresent, setSameAsPresent] = useState(false);
  const [addressData, setAddressData] = useState({
    present: {
      address: '',
      country: '',
      state: '',
      city: '',
      pin: '',
      isRental: 'No'
    },
    permanent: {
      address: '',
      country: '',
      state: '',
      city: '',
      pin: ''
    }
  });

  const handlePresentAddressChange = (field: keyof typeof addressData.present, value: string) => {
    setAddressData(prev => ({
      ...prev,
      present: {
        ...prev.present,
        [field]: value
      },
      permanent: sameAsPresent ? {
        ...prev.permanent,
        [field]: value
      } : prev.permanent
    }));
  };
  
  const handlePermanentAddressChange = (field: keyof typeof addressData.permanent, value: string) => {
    if (!sameAsPresent) {
      setAddressData(prev => ({
        ...prev,
        permanent: {
          ...prev.permanent,
          [field]: value
        }
      }));
    }
  };
  
  const handleSameAddressChange = (checked: boolean) => {
    setSameAsPresent(checked);
    if (checked) {
      setAddressData(prev => ({
        ...prev,
        permanent: {
          ...prev.present
        }
      }));
    }
  };
  

  return (
    <div className="max-w-md mx-auto space-y-4 pr-5">
      {/* Present Address Card */}
      <Card className="bg-white h-[300px] flex flex-col">
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-bold">Present Address Details</h2>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <label className="font-medium block mb-1">Present Address</label>
                <Input
                  value={addressData.present.address}
                  onChange={(e) => handlePresentAddressChange('address', e.target.value)}
                  placeholder="Enter present address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium block mb-1">Present Country</label>
                  <Input
                    value={addressData.present.country}
                    onChange={(e) => handlePresentAddressChange('country', e.target.value)}
                    placeholder="Enter country"
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1">Present State</label>
                  <Input
                    value={addressData.present.state}
                    onChange={(e) => handlePresentAddressChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium block mb-1">Present City</label>
                  <Input
                    value={addressData.present.city}
                    onChange={(e) => handlePresentAddressChange('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1">Present Pin</label>
                  <Input
                    value={addressData.present.pin}
                    onChange={(e) => handlePresentAddressChange('pin', e.target.value)}
                    placeholder="Enter PIN"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium block mb-1">Is Rental Address</label>
                <select
                  className="w-full border rounded p-2"
                  value={addressData.present.isRental}
                  onChange={(e) => handlePresentAddressChange('isRental', e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Same as Present Address Checkbox */}
      <div className="flex items-center space-x-2 px-1">
        <Checkbox 
          id="sameAddress" 
          checked={sameAsPresent}
          onCheckedChange={handleSameAddressChange}
        />
        <label 
          htmlFor="sameAddress" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Permanent Address Same as Present Address
        </label>
      </div>

      {/* Permanent Address Card */}
      <Card className="bg-white h-[300px] flex flex-col">
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-bold">Permanent Address Details</h2>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <label className="font-medium block mb-1">Permanent Address</label>
                <Input
                  value={sameAsPresent ? addressData.present.address : addressData.permanent.address}
                  onChange={(e) => handlePermanentAddressChange('address', e.target.value)}
                  placeholder="Enter permanent address"
                  disabled={sameAsPresent}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium block mb-1">Permanent Country</label>
                  <Input
                    value={sameAsPresent ? addressData.present.country : addressData.permanent.country}
                    onChange={(e) => handlePermanentAddressChange('country', e.target.value)}
                    placeholder="Enter country"
                    disabled={sameAsPresent}
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1">Permanent State</label>
                  <Input
                    value={sameAsPresent ? addressData.present.state : addressData.permanent.state}
                    onChange={(e) => handlePermanentAddressChange('state', e.target.value)}
                    placeholder="Enter state"
                    disabled={sameAsPresent}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium block mb-1">Permanent City</label>
                  <Input
                    value={sameAsPresent ? addressData.present.city : addressData.permanent.city}
                    onChange={(e) => handlePermanentAddressChange('city', e.target.value)}
                    placeholder="Enter city"
                    disabled={sameAsPresent}
                  />
                </div>
                <div>
                  <label className="font-medium block mb-1">Permanent Pin</label>
                  <Input
                    value={sameAsPresent ? addressData.present.pin : addressData.permanent.pin}
                    onChange={(e) => handlePermanentAddressChange('pin', e.target.value)}
                    placeholder="Enter PIN"
                    disabled={sameAsPresent}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressDetails;