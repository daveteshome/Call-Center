import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SecondarySpinner from "./SecondarySpinner";
import toast from 'react-hot-toast';
import { baseUrl } from "../store/resources/http";
import { FaEye, FaSearch } from "react-icons/fa";

function UpdatedLeads() {

  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;
  const [isLoading, setIsLoading] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [activeStatus, setActiveStatus] = useState(""); // Track active status
  const [statuses, setStatuses] = useState([]); // Store unique statuses
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleClick = (id) => {
    history.push({
      pathname: `/dashboard/app/leads/${id}`,
      state: { leadId: id },
    });
  };

  function searchBusinesses() {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem("elite-water"));
    const updatedBy = token.user.user._id;
    axios
      .get(
        `${baseUrl}/api/lead/getAllUpdatedLeads?limit=50&businessName=${searchName}&managerPhone=${searchPhone}&status=${activeStatus}&page=${pageNumber}&updatedBy=${updatedBy}`
      )
      .then((response) => {
        console.log("search", response.data)
        setAllLeads(response.data.leads);
        setTotalPages(response.data.pageInfo.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    searchBusinesses();

  }, [pageNumber]);

  function deleteBusiness(leadId) {
    const confirmDelete = window.confirm("Confirm delete?");
    if (confirmDelete) {
      setIsLoading(true);
      axios
        .post(`${baseUrl}/api/lead/deleteLead`, {
          leadId: leadId,
        })
        .then((response) => {
          setMessage(response.data.message);
          toast.success(`${response.data.message} successfully`);
          searchBusinesses(); // Refresh the list after deletion
        })
        .catch((error) => {
          console.error("Error deleting lead:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      return;
    }
  }

  function handleStatusClick(status) {
    setActiveStatus(status === activeStatus ? "" : status);
    setPageNumber(1);
    searchBusinesses();
  }

  if (!isLoading && allLeads.length < 1)
    return (
      <div className="container p-5 rounded shadow border border-grey card">
        <h3 className="text-center text-black-300 text-uppercase text-bold mt-4">
          Your Leads
        </h3>
        <p className="text-center p-5">
          Sorry, it looks like there are{" "}
          <strong className="text-black-50 text-bold text-uppercase">No Leads</strong> at the moment
        </p>
      </div>
    );

  return (
    <div className="container  p-5 rounded shadow border border-grey card">
      <div>
        <h3 className="text-center text-black-300 text-uppercase text-bold mt-4 ">
          Your Leads
        </h3>

        <div className="d-flex gap-1 mt-3">
          <input
            type="text"
            className="form-control"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search By Name"
          />
          <input
            type="text"
            className="form-control ms-3"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Search By Phone Number"
          />
          <button className="btn btn-primary ms-3" onClick={searchBusinesses}>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="mt-3">
        {statuses.map((status) => (
          <button
            key={status}
            className={`btn me-2 mb-2 ${activeStatus === status ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleStatusClick(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-30 w-100 p-5 text-grey font-bold text-center gap-4 mt-3">
          <SecondarySpinner />
        </div>
      ) : <>
        <div className="d-flex flex-wrap gap-4 justify-content-stretch align-items-stretch mt-3">
          {allLeads.map((lead) => (
            <div key={lead._id} className="card d-flex flex-column p-4 mh-64 flex-grow-1 m-0">
              <h5 className="text-lg fw-bold overflow-hidden text-nowrap">{lead.businessName}</h5>
              <p className="text-gray-600 overflow-hidden text-nowrap">
                Phone: {lead.bussinessTelephone}
                <br />
                Status: {lead.status}
              </p>

              <div className="d-flex justify-content-end mt-2">
                <button
                  onClick={() => handleClick(lead._id)}
                  className="btn btn-outline-secondary"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3 p-5">
          <button
            className="btn btn-primary mb-3"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <p className="text-center p-5">
            Page {pageNumber} of {totalPages}
          </p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= totalPages}
          >
            Next
          </button>
        </div>
      </>
      }
    </div >
  );
}

export default UpdatedLeads;
