import React from "react";

import { Col, Modal, Button } from "react-bootstrap";
import Card from "../components/Card";

import userImg from "../assets/images/ayat_real_estate.png";

import http from "../store/resources/http";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SecondarySpinner from "./SecondarySpinner";

function LeadView() {
  const [lead, setLead] = useState({});
  const location = useLocation();
  const leadId = location?.state?.leadId;
  const [isLoading, setIsLoading] = useState(false);
  // const [followUp, setFollowUp] = React.useState("");
  // const [remark, setRemark] = React.useState("");
  const history = useHistory();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [showCompletion, setShowCompletion] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [userData, setUserData] = useState({});
  const [timer, setTimer] = useState(0); // State variable to store the timer
  const [timerRunning, setTimerRunning] = useState(false); // State variable to track if the timer is running

  console.log("userData", userData);
  // const [status, setStatus] = React.useState("");
  // const [appoitmentDate, setAppointmentDate] = React.useState("");
  // const [assignedTo, setAssignedTo] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  let [validInput, setValidInput] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  
  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;
  const [form, setForm] = React.useState({
    status: "",
    date: undefined,
    remark: "",
    appoitmentDate: undefined,
    followUp: undefined,
    assignedTo: "",
  });


  const { remark, status, appoitmentDate, followUp, assignedTo } = form;
  console.log("here is the status after form ", status);
  const [isMeetingSet, setIsMeetingSet] = useState(false);
  const [isFollowUp, setIsFollowUp] = useState(false);
  
  
  const handleStartButtonClick = () => {
    setShowButton(true);
    setTimerRunning(true); // Start the timer
  };

  const handleStopButtonClick = () => {
    setShowButton(false);
    setTimerRunning(false); // Stop the timer
  
    const callDuration = timer;
  
    setShowButton(`Call Ended - Duration: ${callDuration} sec`);  
    handleUpdate();
  };
  

  // Effect to update the timer every second when the timer is running
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);


  console.log("here is the status", status);
  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setShowStatus(true);
    // setStatus(selectedStatus);
    setField(event);

    // Check if "Meeting Set" is selected
    if (selectedStatus === "Meeting Set") {
      setIsMeetingSet(true);
    } else if(selectedStatus === "followUp") {
      setIsFollowUp(true);
    }
    else{
      setIsMeetingSet(false);
    }
  };
  const setField = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "please select status" }));
    setSelectedOption(e.target.value);
    validInput = setValidInput(valid(e));
    if (validInput) return;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const valid = (e) => {
    console.log(typeof e.target.value, e.target.name);
    if (e.target.value === "") return false;
    if (form.status === e.target.value) return false;
    if (
      form.status === "Meeting Set" &&
      ((e.target.name === "date") === undefined || "")
    )
      return false;
    return true;
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    http
      .get(`https://eliltatradingadmin.com/api/user/listLeadReps`)
      .then((res) => {
        // Assuming response data is in res.data
        setUserData(res.data.sales);
        console.log("here", res.data.sales);
      })
      .catch((err) => {
        console.error("Error fetching lead status:", err);
      });
  }, []);

  // const handleButtonClick = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await http.post(
  //       `https://eliltatradingadmin.com/api/lead/updateLeadSelectStatus`,
  //       {
  //         leadId: lead,
  //       }
  //     );

  //     if (response.status === 200) {
  //       setShowButton(true);
  //       setShowCompletion(true);
  //       console.log("Uploaded");
  //       setTimeout(() => {
  //         history.push("add-status"); //TODO: need to change to lead-list
  //       }, 3000);
  //     } else {
  //       console.error("Failed to upload");
  //     }
  //   } catch (error) {
  //     console.error("Error while uploading:", error);
  //   }
  // };
  const handleUpdate = async () => {
    try {
      const response = await http.post(
        `https://eliltatradingadmin.com/api/lead/updateLeadSelectStatus`,
        {
          leadId: lead._id,
          lastContactTimeInSeconds:timer
        }
      );

      if (response.status === 200) {
        setShowButton(true);
        setShowCompletion(true);
        console.log("Uploaded");
       
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error while uploading:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post(
        `https://eliltatradingadmin.com/api/lead/updateLeadStatus`,
        {
          leadId: lead,
          newStatus: status,
          appointmentDate: appoitmentDate,
          updatedBy: user_id,
          assignedTo: assignedTo,
          expectFollowUp:followUp,
          remark:remark
        }
      );

      if (response.status === 200) {
        setShowCompletion(true);
        console.log("Uploaded");
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 3000);
      } else {
        console.error("Failed to upload:", response.statusText);
      }
    } catch (error) {
      console.error("Error while uploading:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`https://eliltatradingadmin.com/api/lead/getLeadById`, {
        leadId: leadId,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLead(response.data.lead);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setIsLoading(false));
  }, [leadId]);

  if (isLoading === false && lead.length < 1)
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center text-center ">
        <Col xl="6" lg="10">
          <Card>
            <Card.Header className="d-flex align-content-center align-items-center text-center ">
              <div className="header-title text-center d-flex align-items-center ">
                <h4 className="card-title mb-0 text-center text-uppercase ">
                  Lead
                </h4>
              </div>
            </Card.Header>
            <p className="text-center p-5">
              Sorry, it looks like this lead{" "}
              <strong className="text-black-50 text-bold text-uppercase">
                Doesn't exist
              </strong>{" "}
              at the momonet
            </p>
          </Card>
        </Col>
      </div>
    );

    return (
      <>
        <div className="page-wrapper d-flex align-items-center justify-content-center">
          <Col xl="6" lg="10">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="header-title">
                  <h4 className="card-title mb-0 text-center text-uppercase">
                    Company Profile
                  </h4>
                </div>
                
          <Button variant="primary" onClick={handleStartButtonClick}>
            {showButton ? `Call Started ${timer} sec` : "Start Call"}
          </Button>
          {showButton && (
            <Button variant="danger" onClick={handleStopButtonClick}>
              End Call
            </Button>
          )}
  
       
              </Card.Header>
  
              <Card.Body>
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center my-5 p-5">
                    <SecondarySpinner />
                  </div>
                ) : (
                  <div className="new-user-info">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="user-img mb-3 ">
                        <img
                          src={userImg}
                          className="img-fluid rounded-circle"
                          alt="user"
                          style={{
                            height: "210px",
                            minWidth: "40px",
                            width: "200px",
                          }}
                        />
                      </div>
                      <div>
                        <p>
                          Company Manager Or Owner:{" "}
                          <span className="fw-bold text-dark">
                            {lead.businessName}
                          </span>
                        </p>
                        <p className="mb-0">
                          Office Phone Number:{" "}
                          <span className="fw-bold text-dark">
                            {lead.bussinessTelephone}
                          </span>
                        </p>
                        <p className="mb-0">
                          Manager Phone Number:{" "}
                          <span className="fw-bold text-dark">
                            {lead.managerPhone}
                          </span>
                        </p>
                        <p>
                          Description:{" "}
                          <span className="mb-2 fw-bold text-dark">
                            {lead.subGroupEnglishDescription}{" "}
                          </span>
                        </p>
  
                        {status && (
                          <p className="mx-0 my-2">
                            Status:{" "}
                            <span className="fw-semibold text-dark">
                              {status}
                            </span>
                          </p>
                        )}
  
                        {appoitmentDate && (
                          <p className="mx-0 my-2">
                            Meeting is set for:{" "}
                            <span className="fw-semibold text-dark">
                              {appoitmentDate}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    {showCompletion ? (
                      <p className="text-success">Status Changed Successfully</p>
                    ) : null}
                    <Button
                      variant="primary"
                      className="mt-3 w-100"
                      onClick={showStatus ? handleSubmit : handleShow}
                    >
                      {showStatus ? "Complete This Lead" : "Change Status"}
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </div>
  
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="form-control"
                >
                  <option value="">Select Status</option>
                  <option value="Meeting Set">Meeting Set</option>
                  <option value="outOfReach">Out Of Reach</option>
                  <option value="wrongNumer">Wrong Numer</option>
                  <option value="followUp">Follow Up </option>
                  <option value="rejected">Rejected Or Not Interested</option>
                </select>
                {isMeetingSet && (
                  <div className="mt-3">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="datetime-local"
                      name="appoitmentDate"
                      onChange={(event) => setField(event)}
                      value={appoitmentDate}
                      className="form-control mt-2"
                    />
  
                    <label htmlFor="statusAfterMeeting">
                      Client Assigned To:
                    </label>
                    <select
                      name="assignedTo"
                      value={assignedTo}
                      onChange={(event) => setField(event)}
                      className="form-control mt-2"
                    >
                      <option value="">Assign To: </option>
                      {userData.map((user) => (
                        <option key={user._id} value={user._id}>
                          {`${user.firstName} ${user.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
  
                {isFollowUp && (
                  <div className="mt-3">
                    <label htmlFor="date">Preffered Next Time:</label>
                    <input
                      type="datetime-local"
                      name="followUp"
                      onChange={(event) => setField(event)}
                      value={followUp}
                      className="form-control mt-2"
                    />
  
                    <label htmlFor="statusAfterMeeting">Remark:</label>
                    <input
                      type="text"
                      name="remark"
                      value={remark}
                      // onChange={(event) => setRemark(event.target.value)}
                      onChange={(e) => setField(e)}
                      className="form-control mt-2"
                      placeholder="Enter Remark"
                    />
                  </div>
                )}
              </div>
  
              <Button variant="primary" type="submit" onClick={handleClose}>
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
    </>
  );
}

export default LeadView;
