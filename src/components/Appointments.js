import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import SecondarySpinner from "./SecondarySpinner";
import { useHistory } from "react-router-dom";


export default function Appointments() {
  const [loadingState, setLoadingState] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();


  const handleClick = (id) => {
    history.push({
      pathname: `/dashboard/app/leads/${id}`,
      state: { leadId: id },
    });
  };

  //fetch Appointment
  // useEffect(() => {
  //   setLoadingState(true);

  //   axios
  //     .post("https://eliltatradingadmin.com/api/lead/getTodayAppointments")
  //     .then((response) => {
  //       setAppointments(response.data.appointments);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     })
  //     .finally(() => {
  //       setLoadingState(false);
  //     });
  // }, []);

  useEffect(() => {
    setLoadingState(true);

    axios
      .post("https://eliltatradingadmin.com/api/lead/getAllAppointments")
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
              <th>View lead Page</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.businessName}</td>
                <td>{appointment.bussinessTelephone}</td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td>
                  <button
                    onClick={() => handleClick(appointment._id)}
                    className="btn btn-outline-secondary "
                  >
                    View Lead
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
