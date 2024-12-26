import React, { useState } from 'react';
import PieChartComponent from './PieChartComponent';

const ClickToSeeCall = ({ callData, salesRepDataWithNames }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return (
    <div className="container mt-3 mb-1 p-5 rounded shadow-md border border-grey card">
      <h3 className="text-center text-black-300 p-1 text-uppercase text-bold mb-3">
        Sales Reps Call performance report
      </h3>
      {callData.length > 0 &&
        salesRepDataWithNames.length > 0 &&
        salesRepDataWithNames.map((salesRepData, index) => (
          salesRepData.firstName !== "Unknown" && (
            <div className="card" key={index} onClick={() => handleClick(index)}>
              <div className="card-body">
                <h5 className="card-title">
                  Sales Rep:{' '}
                  <span className="text-black p-1  text-bold">
                    { `${salesRepData.firstName} ${salesRepData.lastName} `}
                    </span>
                  </h5>
                {selectedIndex === index && (
                  <div className="card-text p-1">
                    <p>• Have called leads: {salesRepData.callCount} times.</p>
                    <p>
                      {salesRepData.totalCallDurationMinutes === 0
                        ? '• Spent : 0 minutes and,'
                        : `• Spent : ${salesRepData.totalCallDurationMinutes} minutes and,`}
                    </p>
                    <p>
                      {salesRepData.totalCallDurationSeconds === 0
                        ? '• Spent : 0 seconds on call '
                        : `• Spent : ${salesRepData.totalCallDurationSeconds}seconds on call `}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        ))}
    </div>
  );
};

export default ClickToSeeCall;
