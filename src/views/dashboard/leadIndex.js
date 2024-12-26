import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
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

// target constants
const dailyTargetNumbers = 100;
const weeklyTargetNumbers = 600;
const monthlyTargetNumbers = 2600;

const Index = (props) => {
  const [loadingState, setLoadingState] = useState(false);
  const [totalMonthlyLeads, setTotalMonthlyLeads] = useState("");
  const [todayLeads, setTodayLeads] = useState("");
  const [weeklyLeads, setWeeklyLeads] = useState("");

  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://eliltatradingadmin.com/api/lead/getLeadsByUserWeekly?updatedBy=66092c6ffc9f56450b77727a",
     
        );
        setWeeklyLeads(response.data.leads.length);
        console.log(response.data.weeklySales); // Log the fetched totalSales value
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://eliltatradingadmin.com/api/lead/getLeadsByUserToday?updatedBy=66092c6ffc9f56450b77727a"
        );
        setTodayLeads(response.data.leads.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(true);
      try {
        const response = await axios.get(
          "https://eliltatradingadmin.com/api/lead/getLeadsByUserMonthly?updatedBy=66092c6ffc9f56450b77727a",
         
        );
        setTotalMonthlyLeads(response.data.leads.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingState(false);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <>
      <Row>
        <Col md="12" lg="12">
          <Row>
            <Col md="4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Daily lead converted</h5>
                  {loadingState ? (
                    <SecondarySpinner />
                  ) : (
                    <p className="card-text">
                      Leads: {todayLeads}/{dailyTargetNumbers} (
                      {((todayLeads / dailyTargetNumbers) * 100).toFixed(2)}
                      &#37;)
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
                      Leads: {weeklyLeads}/{weeklyTargetNumbers} (
                      {((weeklyLeads / weeklyTargetNumbers) * 100).toFixed(2)}
                      &#37;)
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
                      Leads: {totalMonthlyLeads}/{monthlyTargetNumbers} (
                      {(
                        (totalMonthlyLeads / monthlyTargetNumbers) *
                        100
                      ).toFixed(2)}
                      &#37;)
                    </p>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <AppointmentsTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

export function AppointmentsTable() {
  const [loadingState, setLoadingState] = useState(false);
  const [appointments, setAppointments] = useState([]);

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
          <strong className="text-black-50 text-bold text-uppercas e">
            No recorded Appointments
          </strong>{" "}
          at the momonet
        </p>
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
