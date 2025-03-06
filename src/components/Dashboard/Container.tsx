 
import { ArrowUp, ArrowDown, HandCoins } from 'lucide-react';
import {useFeatureStore} from '../../store/featuresStore'; // Import the store

// Define TypeScript interface for feature




const FeatureInfo = () => {
  // Fixed type assertion to work with zustand's store typing
  const {selectedFeatures} = useFeatureStore();

  return (
    <div className="grid grid-cols-4 gap-6 w-auto mt-7 p-5">
      {selectedFeatures.map((feature,index) => {
        const isPositiveChange = feature.percentageChange >= 0;
        return (
          <div key={index} className="relative bg-white rounded-lg p-8 cursor-pointer border border-gray-200">
            <div className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              {feature.icon || <HandCoins size={20} />}
            </div>
            <div>
              <span className="text-sm font-medium flex items-center">
                <span
                  className={`flex items-center px-2 py-1 rounded-full text-white ${
                    isPositiveChange ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                >
                  {isPositiveChange ? (
                    <ArrowUp size={16} className="inline-block mr-1" />
                  ) : (
                    <ArrowDown size={16} className="inline-block mr-1" />
                  )}
                  {feature.percentageChange}%
                </span>
              </span>
              <span className="text-4xl font-semibold text-gray-800 mt-4 block">{feature.value}</span>
            </div>
            <h3 className="text-gray-700 font-semibold text-lg mt-4">{feature.label}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureInfo;