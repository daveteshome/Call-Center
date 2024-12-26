import axios from "axios";
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Table,
  ProgressBar,
  ProgressBarProps,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";

import {
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import SecondarySpinner from "./SecondarySpinner";

const COLORS = ["#FA8072", "#9575CD", "#89CFF0", "#FF0000", "#00C49F"];

export default function StatusReview() {
  const [lead, setLead] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { outOfReach, wrongNumber, followUp, rejected, meetingSet } = lead;

  const handleClick = (id) => {
    history.push({
      pathname: `/dashboard/app/leads/${id}`,
      state: { leadId: id },
    });
  };

  console.log("leads", lead);
  console.log(outOfReach);
  useEffect(() => {
    setIsLoading(true);
    axios
      .post("https://eliltatradingadmin.com/api/lead/statusReview")
      .then((res) => {
        console.log(res.data["data"]);
        setLead(res.data["data"]);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  let chartData = [];
  console.log(wrongNumber);

  if (lead.length === 0) {
    return (
      <div className="text-center mt-2 mb-2">
        <SecondarySpinner />
      </div>
    );
  } else {
    chartData = [
      {
        name: "Out Of Reach",
        value: outOfReach.length,
      },
      {
        name: "Wrong Number",
        value: wrongNumber.length,
      },
      {
        name: "Follow Up",
        value: followUp.length,
      },
      {
        name: "Rejected",
        value: rejected.length,
      },
      {
        name: "Meeting Set",
        value: meetingSet.length,
      },
    ];
  }

  if (
    isLoading === false &&
    outOfReach.length === 0 &&
    wrongNumber.length === 0 &&
    followUp.length === 0 &&
    rejected.length === 0 &&
    meetingSet.length === 0
  )
    return (
      <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
        <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1">
          Status Review
        </h3>
        <Table
          striped
          bordered
          hover
          className="border border-grey rounded p-5 text-center mt-3 "
        >
          <p className="text-center p-5">
            Sorry, it looks like there are{" "}
            <strong className="text-black-50 text-bold text-uppercas e">
              No current Status to Review
            </strong>{" "}
            at the momonet
          </p>
        </Table>
      </div>
    );

  return (
    <>
      <Row>
        <Col md="12" lg="12">
          <div className="container mt-6 mb-6  p-8 pt-5 pb-4 bg-white border border-grey card shadow bg-body rounded  ">
            <h3 className="text-center font-bold text-2xl mb-3 text-black/70 p-1 pb-3 text-uppercase text-bold">
            Status Chart for All Sales
            </h3>
            {isLoading ? (
              <div className="text-center mt-2 mb-2">
                <SecondarySpinner />
              </div>
            ) : (
              //bar chart
              // <div>
              //   <ResponsiveContainer width="100%" height={400}>
              //     <BarChart data={chartData}>
              //       <CartesianGrid strokeDasharray="3 3" />
              //       <XAxis dataKey="name" />
              //       <YAxis />
              //       <Tooltip />
              //       <Legend />
              //       <Bar dataKey="value" fill="#318CE7" />
              //     </BarChart>
              //   </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#318CE7"
                    stroke="#fff"
                    strokeWidth={2}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <Row>
            {isLoading ? (
              <div className="text-center mt-2 mb-2">
                <SecondarySpinner />
              </div>
            ) : (
              <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
                <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-4">
                  View Status
                </h3>
                <Table bordered className="border border-grey rounded p-2 ">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Phone Number</th>
                      <th>Current Status</th>
                      <th>View lead Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outOfReach.map((outOfReach, index) => (
                      <tr key={index}>
                        <td>{outOfReach.businessName}</td>
                        <td>{outOfReach.bussinessTelephone}</td>
                        <td className="d-flex align-items-center justify-content-center m-4  badge table-warning rounded-3 text-center">
                          {outOfReach.status === "outOfReach" ? (
                            <span>Out Of Reach</span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleClick(outOfReach._id)}
                            className="btn btn-outline-secondary "
                          >
                            View Lead
                          </button>
                        </td>
                      </tr>
                    ))}
                    {wrongNumber.map((wrongNumber, index) => (
                      <tr key={index}>
                        <td>{wrongNumber.businessName}</td>
                        <td>{wrongNumber.bussinessTelephone}</td>
                        <td className="d-flex align-items-center justify-content-center m-4  badge table-info rounded-3 ">
                          {wrongNumber.status === "wrongNumber" ? (
                            <span>Wrong Number</span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleClick(wrongNumber._id)}
                            className="btn btn-outline-secondary "
                          >
                            View Lead
                          </button>
                        </td>
                      </tr>
                    ))}

                    {followUp.map((followUp, index) => (
                      <tr key={index}>
                        <td>{followUp.businessName}</td>
                        <td>{followUp.bussinessTelephone}</td>
                        <td className="d-flex align-items-center justify-content-center m-4  badge table-primary rounded-3 ">
                          {followUp.status === "followUp" ? (
                            <span>Follow Up</span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleClick(followUp._id)}
                            className="btn btn-outline-secondary"
                          >
                            View Lead
                          </button>
                        </td>
                      </tr>
                    ))}

                    {rejected.map((rejected, index) => (
                      <tr key={index}>
                        <td>{rejected.businessName}</td>
                        <td>{rejected.bussinessTelephone}</td>
                        <td className="d-flex align-items-center justify-content-center m-4 badge bg-danger text-white rounded-3 ">
                          {rejected.status === "rejected" ? (
                            <span>Rejected</span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleClick(rejected._id)}
                            className="btn btn-outline-secondary "
                          >
                            View Lead
                          </button>
                        </td>
                      </tr>
                    ))}

                    {meetingSet.map((meetingSet, index) => (
                      <tr key={index}>
                        <td>{meetingSet.businessName}</td>
                        <td>{meetingSet.bussinessTelephone}</td>
                        <td className="d-flex align-items-center justify-content-center m-4  badge table-success rounded-3 ">
                          {meetingSet.status === "Meeting Set" ? (
                            <span>Meeting Set</span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleClick(meetingSet._id)}
                            className="btn btn-outline-secondary "
                          >
                            View Lead
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}
