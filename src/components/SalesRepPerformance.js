import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

import SecondarySpinner from "./SecondarySpinner";
import PieChartComponent from "./PieChartComponent";
import ClickToDisplay from "./ClickToDisplay";

const COLORS = ["#FA8072", "#9575CD", "#89CFF0", "#FF0000", "#00C49F"];
function SalesRepPerformance() {
  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;
  const role = tokenn.user.user.role;

  const [loadingState, setLoadingState] = useState(false);
  const [lead, setLead] = useState([]);
  const [salesRepChartData, setSalesRepChartData] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get(`https://eliltatradingadmin.com/api/user/listLeadReps`)
      .then((res) => {
        setUserData(res.data.sales);
      })
      .catch((err) => {
        console.error("Error fetching lead status:", err);
      });
  }, []);
  useEffect(() => {
    setLoadingState(true);
    axios
      .post(
        "https://eliltatradingadmin.com/api/lead/getLeadsByStatusForSalesReps"
      )
      .then((res) => {
        const transformedData = Object.keys(res.data.data).reduce(
          (acc, userId) => {
            acc[userId] = {
              outOfReach: res.data.data[userId].outOfReach,
              wrongNumber: res.data.data[userId].wrongNumber,
              followUp: res.data.data[userId].followUp,
              rejected: res.data.data[userId].rejected,
              meetingSet: res.data.data[userId].meetingSet,
            };
            return acc;
          },
          {}
        );
        setSalesRepChartData(transformedData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  let chartData = [];

  if (Object.keys(salesRepChartData).length !== 0) {
    chartData = Object.entries(salesRepChartData).map(([userId, userData]) => [
      {
        name: `Out Of Reach`,
        value: userData.outOfReach.length,
      },
      {
        name: `Wrong Number`,
        value: userData.wrongNumber.length,
      },
      {
        name: `Follow Up`,
        value: userData.followUp.length,
      },
      {
        name: `Rejected`,
        value: userData.rejected.length,
      },
      {
        name: `Meeting Set`,
        value: userData.meetingSet.length,
      },
    ]);
  }

  return (
    <Row  >
      <Col md="12" lg="12" className=" bg-gray-100 " >
        {role === 2 && (
          <div className="container mt-6 mb-6  p-8 pt-5 pb-4  border border-grey-200  shadow-md  bg-body rounded card ">
            <h3 className="text-center font-bold text-2xl mb-3 text-black/70 p-1 pb-3 text-uppercase text-bold">
              Performance Of Sales Reps
            </h3>
            {loadingState ? (
              <div className="text-center mt-2 mb-2">
                <SecondarySpinner />
              </div>
            ) : (
              chartData.length > 0 && (
                <ClickToDisplay chartData={chartData} userData={userData} />
              )
            )}
          </div>
        )}
      </Col>
    </Row>
  );
}

export default SalesRepPerformance;
