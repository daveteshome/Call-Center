import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaEye, FaSearch } from "react-icons/fa";
import SecondarySpinner from "./SecondarySpinner";
import toast from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { baseUrl } from "../store/resources/http";

function AllLeads() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchDivision, setSearchDivision] = useState("");
  const [activeStatus, setActiveStatus] = useState(""); // Track a single active status
  const [divisionCodes, setDivisionCodes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [allLeads, setAllLeads] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Fetch division codes on component mount
    axios
      .get(`${baseUrl}/api/lead/getDistinctDivisionCodes`)
      .then((response) => {
        setDivisionCodes(response.data.divisionCodes);
      })
      .catch((error) => {
        console.error("Error fetching division codes:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch leads based on search parameters whenever they change
    setIsLoading(true);

    // Build the query string
    const query = new URLSearchParams({
      limit: 50,
      businessName: searchName,
      managerPhone: searchPhone,
      divisionCode: searchDivision,
      status: activeStatus, // Single status
      page: pageNumber,
    }).toString();

    axios
      .post(`${baseUrl}/api/lead/getAllLeads?${query}`)
      .then((response) => {
        setAllLeads(response.data.leads);
        setTotalPages(response.data.pageInfo.totalPages); // Ensure totalPages is updated
        setStatuses([...new Set(response.data.leads.map((lead) => lead.status))]); // Update statuses
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchName, searchPhone, searchDivision, activeStatus, pageNumber]);

  const handleClick = (id) => {
    history.push({
      pathname: `/dashboard/app/leads/${id}`,
      state: { leadId: id },
    });
  };

  function handleStatusClick(status) {
    setActiveStatus(status === activeStatus ? "" : status); // Toggle selection
  }

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
          setPageNumber(1); // Refetch leads after successful deletion
        })
        .catch((error) => {
          console.error("Error deleting lead:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  if (isLoading === false && allLeads.length < 1) {
    return (
      <div className="container p-5 rounded shadow border border-grey card">
        <h3 className="text-center text-black-300 text-uppercase text-bold mt-4">
          All Leads
        </h3>
        <p className="text-center p-5">
          Sorry, it looks like there are{" "}
          <strong className="text-black-50 text-bold text-uppercase">No Leads</strong> at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="container p-5 rounded shadow border border-grey card">
      <div>
        <h3 className="text-center text-black-300 text-uppercase text-bold mt-4">
          All Leads
        </h3>

        <div className="d-flex gap-1 mt-4">
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
          <select
            className="form-control ms-3"
            value={searchDivision}
            onChange={(e) => setSearchDivision(e.target.value)}
          >
            <option value="">All</option>
            {divisionCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <button className="btn btn-primary ms-3" onClick={() => setPageNumber(1)}>
            <FaSearch/>
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
        <div className="d-flex justify-content-center align-items-center vh-30 w-100 p-5 text-grey font-bold text-center gap-4">
          <SecondarySpinner />
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-4 justify-content-stretch align-items-stretch mt-3">
          {allLeads.map((lead) => (
            <div key={lead._id} className="card d-flex flex-column p-4 mh-64 flex-grow-1 m-0">
              <h5 className="text-lg fw-bold overflow-hidden text-nowrap">{lead.businessName}</h5>
              <p className="text-gray-600 overflow-hidden text-nowrap">
                Phone: {lead.bussinessTelephone}
                <br />
                Division: {lead.divisionCode}
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
  )
}

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
    </div >
  );
}

export default AllLeads;
