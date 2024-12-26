import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SecondarySpinner from "./SecondarySpinner";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../store/resources/http";
import { FaEye } from "react-icons/fa";

export default function FollowUp() {
  const [loadingState, setLoadingState] = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const history = useHistory();

  const handleClick = (id) => {
    history.push({
      pathname: `/dashboard/app/leads/${id}`,
      state: { leadId: id },
    });
  };

  useEffect(() => {
    fetchFollowUps();
  }, [urgencyFilter]);

  const fetchFollowUps = () => {
    setLoadingState(true);
    axios
      .post(`${baseUrl}/api/lead/getAllFollowUps`, { urgency: urgencyFilter })
      .then((response) => {
        const sortedFollowUps = sortFollowUps(response.data.followUps);
        setFollowUps(sortedFollowUps);
      })
      .catch((error) => {
        console.error("Error fetching Follow up data:", error);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  const sortFollowUps = (followUps) => {
    const urgencyOrder = { High: 1, Medium: 2, Low: 3 };
    return [...followUps].sort((a, b) => {
      return (urgencyOrder[a.urgency] || 4) - (urgencyOrder[b.urgency] || 4);
    });
  };

  const getUrgencyButtonClass = (urgency) => {
    switch (urgency) {
      case 'High':
        return 'btn-danger'; // Red button
      case 'Medium':
        return 'btn-warning'; // Yellow button
      case 'Low':
        return 'btn-success'; // Green button
      default:
        return 'btn-primary'; // Default color (blue)
    }
  };

  const handleUrgencyFilterChange = (urgency) => {
    setUrgencyFilter(urgency);
  };

  if (loadingState === false && followUps.length < 1)
    return (
      <div className="container p-5 rounded shadow border border-grey card">
        <h3 className="text-center text-black-300  text-uppercase text-bold mt-4">
          Follow Up List
        </h3>
        <div className="mt-3 text-center">
          <button
            className="btn btn-primary"
            onClick={() => handleUrgencyFilterChange("")}
          >
            All
          </button>
          <button
            className="btn btn-danger ms-3"
            onClick={() => handleUrgencyFilterChange("High")}
          >
            High
          </button>
          <button
            className="btn btn-warning ms-3"
            onClick={() => handleUrgencyFilterChange("Medium")}
          >
            Medium
          </button>
          <button
            className="btn btn-success ms-3"
            onClick={() => handleUrgencyFilterChange("Low")}
          >
            Low
          </button>
        </div>
        <div className="container p-5 rounded shadow border border-grey card">
          <p className="text-center p-5">
            Sorry, it looks like there are{" "}
            <strong className="text-black-50 text-bold text-uppercase">No Leads</strong> at the moment
          </p>
        </div>
      </div>
    );

  return (
    <div className="container p-5 rounded shadow border border-grey card">
      <h3 className="text-center mb-1 text-black-300 text-uppercase text-bold mt-4">
        Follow Up List
      </h3>
      <div className="mt-3 text-center">
        <button
          className="btn btn-primary"
          onClick={() => handleUrgencyFilterChange("")}
        >
          All
        </button>
        <button
          className="btn btn-danger ms-3"
          onClick={() => handleUrgencyFilterChange("High")}
        >
          High
        </button>
        <button
          className="btn btn-warning ms-3"
          onClick={() => handleUrgencyFilterChange("Medium")}
        >
          Medium
        </button>
        <button
          className="btn btn-success ms-3"
          onClick={() => handleUrgencyFilterChange("Low")}
        >
          Low
        </button>
      </div>
      {loadingState ? (
        <div className="text-center mt-3 p-5">
          <SecondarySpinner />
        </div>
      ) :
        <div className="d-flex flex-wrap gap-4 justify-content-stretch align-items-stretch mt-3">
          {followUps.map((followUp) => (
            <div key={followUp._id} className="card d-flex flex-column p-4 mh-64 flex-grow-1 m-0">
              <h5 className="text-lg fw-bold overflow-hidden text-nowrap">{followUp.businessName}</h5>
              <p className="text-gray-600 overflow-hidden text-nowrap">
                Date: {followUp.expectFollowUp ? new Date(followUp.expectFollowUp).toLocaleDateString() : "Not Set"}
                <br />
                <span className="d-inline-flex align-items-center my-1">Urgency: <span className={`${getUrgencyButtonClass(followUp.urgency)} px-2 py-1 ms-2 rounded d-inline-block`}>{followUp.urgency ? followUp.urgency : "-"}</span></span>
                <br />
                Remark: {followUp.remark}
              </p>

              <div className="d-flex justify-content-end mt-2">
                <button
                  onClick={() => handleClick(followUp._id)}
                  className="btn btn-outline-secondary"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
