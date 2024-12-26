import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SecondarySpinner from "./SecondarySpinner";
import toast from 'react-hot-toast';

function AllLeadsRejected() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchDivision, setSearchDivision] = useState("");
  const [divisionCodes, setDivisionCodes] = useState([]); // State to hold division codes
  const [allLeads, setAllLeads] = useState([]);
  const [searchName, setSearchName] = useState("");
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

  useEffect(() => {
    // Fetch distinct division codes
    axios
      .get("https://eliltatradingadmin.com/api/lead/getDistinctDivisionCodes")
      .then((response) => {
        setDivisionCodes(response.data.divisionCodes);
      })
      .catch((error) => {
        console.error("Error fetching division codes:", error);
      });
  }, []);

  //leads
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        `https://eliltatradingadmin.com/api/lead/getAllLeadrejectedByUser/?limit=50&page=${pageNumber}`
      )
      .then((response) => {
        setAllLeads(response.data.leads);
        setTotalPages(response.data.pageInfo.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageNumber]);

  function searchBusinesses() {
    console.log(searchName, searchPhone, searchDivision, 'see here');
    setIsLoading(true);
    axios
      .post(
        `https://eliltatradingadmin.com/api/lead/getAllLeadrejectedByUser?limit=50&businessName=${searchName}&managerPhone=${searchPhone}&divisionCode=${searchDivision}`
      )
      .then((response) => {
        setAllLeads(response.data.leads);
        console.log(response.data.leads);
        console.log("in search");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function deleteBusiness(leadId) {
    const confirmDelete = window.confirm("Confirm delete?");
    if (confirmDelete) {
       setIsLoading(true);
       axios
         .post(`https://eliltatradingadmin.com/api/lead/deleteLead`, {
           leadId: leadId,
         })
         .then((response) => {
           setMessage(response.data.message);
           toast.success(`${response.data.message} successfully`);
         })
         .catch((error) => {
           console.error("Error fetching data:", error);
         })
         .finally(() => {
           setIsLoading(false);
         });
    } else {
       
       return;
    }
   }


  if (isLoading === false && allLeads.length < 1)
    return (
      <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
        <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1">
    You want to revisit them again        </h3>
        <Table
          striped
          bordered
          hover
          className="border border-grey rounded p-5 text-center mt-3 "
        >
          <p className="text-center p-5">
            Sorry, it looks like there are{" "}
            <strong className="text-black-50 text-bold text-uppercas e">
              No Leads
            </strong>{" "}
            at the momonet
          </p>
        </Table>
      </div>
    );

  return (
    <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
      <div>
        <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1 ">
          You want to revisit them again
        </h3>

        <div className="d-flex gap-1 ">
          <input
            type="text"
            className="form-control mb-3"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search By Name"
          />
          <input
            type="text"
            className="form-control mb-3"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Search By Phone Number"
          />
             <select
            className="form-control mb-3"
            value={searchDivision} // Assuming this should be searchPhone, adjust as needed
            onChange={(e) => setSearchDivision(e.target.value)}
          >
            Select
            {divisionCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <button className="btn btn-primary mb-3 " onClick={searchBusinesses}>
            Search
          </button>
        </div>
      </div>

      <Table striped bordered hover className="border border-grey rounded p-2">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Phone Number</th>
            <th>Division Type</th>
            <th>Appointment Date</th>
            <th>View Lead Page</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center vh-30 w-100 p-5 text-grey font-bold text-center gap-4 ml-5 pl-5">
            <SecondarySpinner />
          </div>
        ) : (
          <tbody>
            {allLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.businessName}</td>
                <td>{lead.bussinessTelephone}</td>
                <td>{lead.divisionCode}</td>

                <td>
                  {lead.appointmentDate
                    ? new Date(lead.appointmentDate).toLocaleDateString()
                    : "Not Set"}
                </td>
                <td>
                  <button
                    onClick={() => handleClick(lead._id)}
                    className="btn btn-outline-secondary "
                  >
                    View Lead
                  </button>
                </td>
                {/* <td>
                  <button
                    onClick={() => deleteBusiness(lead._id)}
                    className="btn btn-danger font-bold py-2 px-4 rounded text-center border border-grey shadow m-2 w-full bg-red-200 "
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-3 p-5  ">
        <button
          className="btn btn-primary mb-3 "
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className="text-center p-5">
          Page {pageNumber} of {totalPages}
        </p>
        <button
          className="btn btn-primary mb-3 "
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllLeadsRejected;
