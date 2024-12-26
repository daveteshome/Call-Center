import React from "react";

import { Col, Modal, Button } from "react-bootstrap";
import Card from "../components/Card";

import userImg from "../assets/images/ayat_real_estate.png";
import { FaPhoneAlt, FaUser } from 'react-icons/fa'; 
import { FaPhone, FaStopwatch } from 'react-icons/fa'; // Import icons
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa'; // Import mail-related icons




import http from "../store/resources/http";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import SecondarySpinner from "./SecondarySpinner";

export default function AddStatus() {
  return (
    <>
      <StatusForm />
    </>
  );
}

export function StatusForm() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [showButton, setShowButton] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [showCompletion, setShowCompletion] = React.useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedLeadID, setSelectedLeadID] = useState("");

  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;

  const [errors, setErrors] = React.useState({});
  const [leadData, setLeadData] = useState({});
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContent, setEmailContent] = useState(`
    Dear ,
    
    We hope this message finds you well.
    
    We are reaching out to inform you of an important update from Elilta Trading System.
    
    
    For any inquiries or further assistance, please do not hesitate to contact us at our customer support phone number: **+251-921-951-592**.
    
    Thank you for your attention to this matter and for your continued support.
    
    Best regards,   
    Elilta Trading   

    `);
    console.log(leadData, 'leadData');
    
  const [userData, setUserData] = useState({});
  const [timer, setTimer] = useState(0); 
  const [timerRunning, setTimerRunning] = useState(false);
  console.log("userData", userData);
  // const [status, setStatus] = React.useState("");
  // const [appoitmentDate, setAppointmentDate] = React.useState("");

  // const [assignedTo, setAssignedTo] = React.useState("");
  // const [followUp, setFollowUp] = React.useState("");
  // const [remark, setRemark] = React.useState("");
  const [showCallOptionModal, setShowCallOptionModal] = useState(false);

  const [showModal, setShowModal] = React.useState(false);
  let [validInput, setValidInput] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [urgency, setUrgency] = useState('');
  const divisionCodes = ["High", "Medium", "Low"];
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
  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual email sending logic
      const response = await http.post(
        `https://eliltatradingadmin.com/api/lead/sendEmail`,
        {
          leadId: leadData._id,
          to: emailAddress,
          subject: emailSubject,
          content: emailContent
        }
      );
  
      if (response.status === 200) {
        alert("Email sent successfully");
        setShowEmailModal(false);
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error while sending email:", error);
    }
  };
  
  


  const handleButtonClick = () => {
    setShowCallOptionModal(true);
  };
  const handleCallOption = (phoneType) => {
    setShowCallOptionModal(false);
    setShowButton(true);
    setTimerRunning(true);
    const phoneNumber = phoneType === 'business' ? leadData.bussinessTelephone : leadData.managerPhone;
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleStopButtonClick = () => {
    setShowButton(false);
    setTimerRunning(false);
  
    const callDuration = timer;
  
    setShowButton(`Call Ended - Duration: ${callDuration} sec`);  
    handleUpdate();
  };
  

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


  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setShowStatus(true);
    setField(event);
    // setStatus(selectedStatus);

    // Check if "Meeting Set" is selected
    if (selectedStatus === "Meeting Set") {
      setIsMeetingSet(true);
    } else if (selectedStatus === "followUp") {
      setIsFollowUp(true);
    } else {
      setIsMeetingSet(false);
    }
  };
  useEffect(() => {
    console.log("in Sales user effect");
    http
      .get(`https://eliltatradingadmin.com/api/user/listLeadReps`)
      .then((res) => {
        setUserData(res.data.sales);
        console.log("in Sales user effect", res.data.sales);
      })
      .catch((err) => {
        console.error("Error fetching lead status:", err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    http
      .get(`https://eliltatradingadmin.com/api/lead/status`)
      .then((res) => {
        setLeadData(res.data.lead);
        setSelectedLeadID(res.data.lead._id)
        console.log(res.data.lead._id, 'Selected');
        
      })
      .catch((err) => {
        console.error("Error fetching lead status:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
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

 const handleUpdate = async () => {
  console.log(leadData._id, 'HERE Please');
  
    try {
      const response = await http.post(
        `https://eliltatradingadmin.com/api/lead/updateLeadSelectStatus`,
        {
          leadId: selectedLeadID,
          lastContactTimeInSeconds:timer
        }
      );

      if (response.status === 200) {
        setShowButton(true);
        setShowCompletion(true);
        console.log("Uploaded in  the background");
        setTimeout(() => {
          history.push("add-status"); //TODO: need to change to lead-list
        }, 3000);
      } else {
        console.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error while uploading:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the body of the request
    const requestBody = {
      leadId: leadData._id, // Make sure this is defined correctly
      newStatus: status,
      appointmentDate: appoitmentDate,
      updatedBy: user_id,
      assignedTo: assignedTo,
      expectFollowUp: followUp,
      urgency: urgency,
      remark: remark,
    };
  
    console.log("Request Body:", requestBody); // Log the body here
    
    try {
      const response = await http.post(
        `https://eliltatradingadmin.com/api/lead/updateLeadStatus`,
        requestBody // Use the logged requestBody here
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
  

  if (isLoading === false && leadData.length < 1)
    return (
      <div className="page-wrapper d-flex align-items-center justify-content-center text-center ">
        <Col xl="6" lg="10">
          <Card>
            <Card.Header className="d-flex align-content-center align-items-center text-center ">
              <div className="header-title text-center d-flex align-items-center ">
                <h4 className="card-title mb-0 text-center text-uppercase ">
                  Company Profile
                </h4>
              </div>
            </Card.Header>
            <p className="text-center p-5">
              Sorry, we have{" "}
              <strong className="text-black-50 text-bold text-uppercase">
                no leads
              </strong>{" "}
              for you at the momonet
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
              
              <Button
      variant={showButton ? "success" : "primary"}
      onClick={handleButtonClick}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {showButton ? (
        <>
          <FaStopwatch style={{ marginRight: '10px' }} />
        {timer} sec
        </>
      ) : (
        <>
          <FaPhone style={{ marginRight: '10px' }} />
        </>
      )}
    </Button>
    <Button
  variant="primary"
  onClick={() => setShowEmailModal(true)}
>
  <FaEnvelope style={{ marginRight: '10px' }} />
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
                          {leadData.businessName}
                        </span>
                      </p>
                      <p className="mb-0">
                        Office Phone Number:{" "}
                        <span className="fw-bold text-dark">
                          {leadData.bussinessTelephone}
                        </span>
                      </p>
                      <p className="mb-0">
                        Manager Phone Number:{" "}
                        <span className="fw-bold text-dark">
                          {leadData.managerPhone}
                        </span>
                        <span className="fw-bold text-dark">
                          {leadData.bussinessTelephone}
                        </span>
                      </p>
                      <p>
                        Description:{" "}
                        <span className="mb-2 fw-bold text-dark">
                          {leadData.subGroupEnglishDescription}{" "}
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

<select
      className="form-control mb-3"
      value={urgency}
      onChange={(e) => setUrgency(e.target.value)}
    >
      <option value="" disabled>Select</option>
      {divisionCodes.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>

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

      <Modal show={showCallOptionModal} onHide={() => setShowCallOptionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Call Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button 
            variant="primary" 
            onClick={() => handleCallOption('business')} 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FaPhoneAlt style={{ marginRight: '10px' }} />
            Business Telephone
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleCallOption('manager')} 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}
          >
            <FaUser style={{ marginRight: '10px' }} />
            Manager's Phone
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Draft Email</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleSendEmail}>
      <div className="form-group">
        <label htmlFor="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          className="form-control"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
        />
        <label htmlFor="emailSubject">Subject:</label>
        <input
          type="text"
          id="emailSubject"
          className="form-control"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          required
        />
        <label htmlFor="emailContent">Email Content:</label>
        <textarea
          id="emailContent"
          className="form-control"
          disabled
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          rows="4"
          required
        />
      </div>
      <Button variant="primary" type="submit">Send Email</Button>
    </form>
  </Modal.Body>
</Modal>


    </>
  );
}
