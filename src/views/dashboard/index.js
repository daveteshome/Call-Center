import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Table, Button, Container, Card } from "react-bootstrap";
import axios from "axios";

import { bindActionCreators } from "redux";

import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts

import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.scss";
// store
import {
  NavbarstyleAction,
  getDirMode,
  getcustomizerMode,
  getcustomizerprimaryMode,
  getcustomizerinfoMode,
  SchemeDirAction,
  ColorCustomizerAction,
  getNavbarStyleMode,
  getSidebarActiveMode,
  SidebarActiveStyleAction,
  getDarkMode,
  ModeAction,
  SidebarColorAction,
  getSidebarColorMode,
  getSidebarTypeMode,
} from "../../store/setting/setting";
import { connect } from "react-redux";
import SecondarySpinner from "../../components/SecondarySpinner.js";
import { useHistory } from "react-router-dom";
import { set } from "react-hook-form";
import EliteIndex from "./../Elite";
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
import ClickToSeeCall from "../../components/ClickToSeeCall";
import StatsCardOld from "./StatsCardOld";
import { baseUrl } from "../../store/resources/http";
import StatsCard from "./StatsCard";
import PerformanceCard from "./PerformanceCard";
// install Swiper modules
SwiperCore.use([Navigation]);

const mapStateToProps = (state) => {
  return {
    darkMode: getDarkMode(state),
    customizerMode: getcustomizerMode(state),
    cololrinfomode: getcustomizerinfoMode(state),
    colorprimarymode: getcustomizerprimaryMode(state),
    schemeDirMode: getDirMode(state),
    sidebarcolorMode: getSidebarColorMode(state),
    sidebarTypeMode: getSidebarTypeMode(state),
    sidebaractivestyleMode: getSidebarActiveMode(state),
    navbarstylemode: getNavbarStyleMode(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ModeAction,
      SchemeDirAction,
      SidebarColorAction,
      SidebarActiveStyleAction,
      NavbarstyleAction,
      ColorCustomizerAction,
    },
    dispatch
  ),
});

const COLORS = ["#FA8072", "#9575CD", "#89CFF0", "#FF0000", "#00C49F"];
// target constants

const Index = (props) => {
  const [loadingState, setLoadingState] = useState(false);
  const [totalMonthlyLeads, setTotalMonthlyLeads] = useState("");
  const [todayLeads, setTodayLeads] = useState("");
  const [weeklyLeads, setWeeklyLeads] = useState("");

  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;
  const role = tokenn.user.user.role;

  const dailyTargetNumbers = 100;
  const weeklyTargetNumbers = 600;
  const monthlyTargetNumbers = 2600;

  useEffect(() => {
    if (role === 8) {
      axios.get(
        `https://eliltatradingadmin.com/api/lead/getLeadsByUserWeekly?updatedBy=${user_id}`
      ).then(weeklyResponse => setWeeklyLeads(weeklyResponse.data.leads.length));

      axios.get(
        `https://eliltatradingadmin.com/api/lead/getLeadsByUserToday?updatedBy=${user_id}`
      ).then(dailyResponse => setTodayLeads(dailyResponse.data.leads.length))

      axios.get(
        `https://eliltatradingadmin.com/api/lead/getLeadsByUserMonthly?updatedBy=${user_id}`
      ).then(monthlyResponse => setTotalMonthlyLeads(monthlyResponse.data.leads.length))

    } else if (role === 2) {
      axios.post(
        "https://eliltatradingadmin.com/api/lead/getWeeklyLeads",
        { user_id }
      ).then(weeklyResponse => setWeeklyLeads(weeklyResponse.data.weeklyLeads));

      axios.post(
        "https://eliltatradingadmin.com/api/lead/getDailyLeads",
        { user_id }
      ).then(dailyResponse => setTodayLeads(dailyResponse.data.dailyLeads))

      axios.post(
        "https://eliltatradingadmin.com/api/lead/getMonthlyLeads",
        { user_id }
      ).then(monthlyResponse => setTotalMonthlyLeads(monthlyResponse.data.monthlyLeads))
    }
  }, []);
  const [userData, setUserData] = useState({});
  const [updateCount, setUpdateCount] = useState([]);
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
      .get("https://eliltatradingadmin.com/api/lead/getWeeklyUpdatesByRep")
      .then((response) => {
        setUpdateCount(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  const [callData, setCallData] = useState({});
  useEffect(() => {
    setLoadingState(true);
    axios
      .get("https://eliltatradingadmin.com/api/lead/getCallDurationBySalesRep")
      .then((response) => {
        setCallData(response.data.callDurationBySalesRep);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  const [salesRep, setSalesRep] = useState([]);
  let user = [];
  useEffect(() => {
    if (userData.length > 0 && updateCount.length > 0) {
      const usersWithNames = updateCount
        .map((update) => {
          const user = userData.find((user) => user._id === update.user_id);

          return user ? user : null;
        })
        .filter((user) => user !== null);

      setSalesRep(usersWithNames);
    }
  }, [userData, updateCount]);

  const [salesRepDataWithNames, setSalesRepDataWithNames] = useState({});
  useEffect(() => {
    if (salesRep.length > 0 && callData.length > 0) {
      const mergedData = callData.map((call) => {
        const salesRepWithName = salesRep.find(
          (rep) => rep._id === call.salesRepId
        );
        return {
          ...call,
          firstName: salesRepWithName ? salesRepWithName.firstName : "Unknown",
          lastName: salesRepWithName ? salesRepWithName.lastName : "Unknown",
        };
      });
      setSalesRepDataWithNames(mergedData);
    }
  }, [callData, salesRep]);

  const updatesCountMap = updateCount.reduce((acc, update) => {
    acc[update.user_id] = update.updates;
    return acc;
  }, {});

  const [lead, setLead] = useState([]);
  const [salesRepChartData, setSalesRepChartData] = useState([]);

  useEffect(() => {
    setLoadingState(true);
    axios
      .post("https://eliltatradingadmin.com/api/lead/getLeadsByStatusForSalesReps")
      .then((res) => {
        setLead(res.data.data);

      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  useEffect(() => {
    setLoadingState(true);
    if (lead) {
      const foundLead = Object.keys(lead).find((key) => key === user_id);

      if (foundLead) {
        setSalesRepChartData(lead[foundLead]);
        setLoadingState(false);
      } else {
        console.log("User not found");
      }
    }
  }, [lead]);

  const { outOfReach, wrongNumber, followUp, rejected, meetingSet } =
    salesRepChartData;

  let chartData = [];

  if (salesRepChartData.length !== 0) {
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
  // console.log("chartData: ", chartData);

  const [todayStats, setTodayStats] = useState()
  const [weeklyStats, setWeeklyStats] = useState()
  const [monthlyStats, setMonthlyStats] = useState()
  const [allTimeStats, setAllTimeStats] = useState()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("elite-water"));
    const baseQuery = `${baseUrl}/api/lead/getLeadsStats?` + (role !== 2 ? `updatedBy=${user_id}&` : '')
    axios.get(`${baseQuery}updatedAt=today`).then(res => setTodayStats(res.data.data))
    axios.get(`${baseQuery}updatedAt=weekly`).then(res => setWeeklyStats(res.data.data))
    axios.get(`${baseQuery}updatedAt=monthly`).then(res => setMonthlyStats(res.data.data))
    axios.get(baseQuery).then(res => setAllTimeStats(res.data.data))
  }, [])

  return (
    <>
      <Row>
        <Col md="4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Daily Lead Converted</h5>
              {loadingState ? (
                <SecondarySpinner />
              ) : (
                <p className="card-text">
                  Leads: {todayLeads}
                  {role === 8 && (
                    <>
                      /{dailyTargetNumbers} (
                      {((todayLeads / dailyTargetNumbers) * 100).toFixed(2)}
                      &#37;)
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </Col>

        <Col md="4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Weekly lead converted</h5>
              {loadingState ? (
                <SecondarySpinner />
              ) : (
                <p className="card-text">
                  Leads: {weeklyLeads}
                  {role === 8 && (
                    <>
                      /{weeklyTargetNumbers} (
                      {((weeklyLeads / weeklyTargetNumbers) * 100).toFixed(
                        2
                      )}
                      &#37;)
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </Col>
        <Col md="4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Monthly lead converted</h5>
              {loadingState ? (
                <SecondarySpinner />
              ) : (
                <p className="card-text">
                  Leads: {totalMonthlyLeads}
                  {role === 8 && (
                    <>
                      /{monthlyTargetNumbers} (
                      {(
                        (totalMonthlyLeads / monthlyTargetNumbers) *
                        100
                      ).toFixed(2)}
                      &#37;)
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
      <Col lg={12}>
          <PerformanceCard />
        </Col>
        <Col lg={12}>
          <StatsCard data={{ today: todayStats, weekly: weeklyStats, monthly: monthlyStats, allTime: allTimeStats }} />
        </Col>
       
      </Row>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

export function AppointmentsTable() {
  const [loadingState, setLoadingState] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();

  //fetch Appointment
  useEffect(() => {
    setLoadingState(true);

    axios
      .post("https://eliltatradingadmin.com/api/lead/getTodayAppointments")
      .then((response) => {
        setAppointments(response.data.appointments);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  const handleClick = () => {
    history.push({
      pathname: `/dashboard/app/appointments`,
    });
  };

  if (loadingState === false && appointments.length < 1)
    return (
      <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
        <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1">
          Appointments
        </h3>
        <Table
          striped
          bordered
          hover
          className="border border-grey rounded p-5 text-center mt-3 "
        >
          <p className="text-center p-5">
            Sorry, it looks like there are{" "}
            <strong className="text-black-50 text-bold text-uppercase">
              No recorded Appointments for today,
            </strong>{" "}
          </p>
          <div className="pt-3 ">
            <p>View All Appointments instead? </p>
            <Button onClick={handleClick}>View</Button>
          </div>
        </Table>
      </div>
    );

  return (
    <div className="container mt-3 mb-3 p-1  rounded shadow border border-grey card ">
      <h3 className="text-center mb-1 text-black-300 p-1 text-uppercase text-bold  mt-1">
        Appointments
      </h3>

      {loadingState ? (
        <div className="text-center mt-2 mb-2">
          <SecondarySpinner />
        </div>
      ) : (
        <Table
          striped
          bordered
          hover
          className="border border-grey rounded p-2"
        >
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Phone Number</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.businessName}</td>
                <td>{appointment.managerPhone}</td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
