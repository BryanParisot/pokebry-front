export const Charts = () => {
  return <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Collection Growth & Value
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Collection Value Over Time
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* This is a mock chart - in real implementation, use a charting library */}
            <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
              <div className="w-1/12 h-20 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-24 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-28 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-32 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-30 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-36 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-40 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-44 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-48 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-52 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-56 bg-blue-400 mx-1"></div>
              <div className="w-1/12 h-60 bg-blue-400 mx-1"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-end">
              <div className="w-1/12 h-16 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-18 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-22 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-26 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-24 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-30 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-32 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-36 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-40 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-42 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-44 bg-yellow-400 mx-1 opacity-70"></div>
              <div className="w-1/12 h-46 bg-yellow-400 mx-1 opacity-70"></div>
            </div>
            <div className="z-10 text-center text-gray-400">
              In a real implementation, this would be a proper chart
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
          <div className="flex mt-2 justify-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-blue-400 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Market Value</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Purchase Cost</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Collection Distribution
          </h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="w-48 h-48 relative">
              {/* Pie chart segments */}
              <div className="absolute inset-0 border-8 border-transparent border-t-red-500 border-r-red-500 rounded-full transform rotate-0"></div>
              <div className="absolute inset-0 border-8 border-transparent border-b-blue-500 border-l-blue-500 rounded-full transform rotate-0"></div>
              <div className="absolute inset-0 border-8 border-transparent border-t-yellow-400 border-r-yellow-400 border-b-yellow-400 rounded-full transform rotate-180"></div>
              {/* Center circle */}
              <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Total</div>
                  <div className="font-bold text-gray-800">387 cards</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex items-center mx-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Rare (35%)</span>
            </div>
            <div className="flex items-center mx-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Uncommon (25%)</span>
            </div>
            <div className="flex items-center mx-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Common (40%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};