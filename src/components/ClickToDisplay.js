import React, { useState } from 'react';
import PieChartComponent from './PieChartComponent';


const ClickToDisplay = ({ chartData, userData }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div>
      {chartData.map((data, index) => (
        <div
        className='mt-2 mb-2 p-2  bg-grey border border-white card text-gray-600  bg-body rounded bg-white rounded border border-gray-200 shadow-lg space-y-2' 
          key={index}
          onClick={() => handleClick(index)}
          style={{ cursor: 'pointer' }}
        >
          <h3 className="text-center text-sm mb-3 text-gray-600 p-2 pb-3 text-sm font-light  ">
            {`Sales Rep: ${userData[index]?.firstName || 'Unknown'} ${
              userData[index]?.lastName || ''
            }`}
          </h3>
          {selectedIndex === index && <PieChartComponent chartData={data} />}
        </div>
      ))}
    </div>
  );
};

export default ClickToDisplay;