import React, { useEffect, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/Card";

// img
import shap1 from "../../../assets/images/shapes/01.png";
import shap2 from "../../../assets/images/shapes/02.png";
import shap3 from "../../../assets/images/shapes/03.png";
import shap4 from "../../../assets/images/shapes/04.png";
import shap5 from "../../../assets/images/shapes/05.png";
import shap6 from "../../../assets/images/shapes/06.png";
import deletesvg from "../../../assets/1icons8-delete-64.png"
import addsvg from "../../../assets/icons8-add-property-64.png"
import http, { baseUrl } from "../../../store/resources/http";
import swal from 'sweetalert';
import { set } from "react-hook-form";

const userlist = [
  {
    code: "I1",
    name: "P1",
    litre: "P1",
    ItemPerStack: "24",
    PricePerStack: "100",
    MiniumumOrderAmount: "100",
    color: "bg-primary",
  },
  {
    code: "I1",
    name: "P1",
    litre: "P1",
    ItemPerStack: "24",
    PricePerStack: "100",
    MiniumumOrderAmount: "100",
    color: "bg-primary",
  },
];

const UserList = () => {
  let history = useHistory();
  const [deletedcode, setDeletedcode] = React.useState("");
  
  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nationalId, setNationalId] = React.useState("");
  const [userId, setUserId]=React.useState("");
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = React.useState("");
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);

  const [william, setWilliam] = useState(false);
  const toggle = () => setHide(!hide);

  const [hideother, setHideOther] = useState(false);
  const toggleother = () => setWilliam(!william);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data?.drivers?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const onSubmit = async () => {
    http
      .post(`${baseUrl}/api/user/update`, {
        userId:userId,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        nationalId:nationalId, 
      })
      .then((res) => {
        swal("Success!", "Sales Information Updated Succesfully!", "success");
      })
      .catch((err) => {
        console.log(err, "error");
        swal("Error!", "Error Happen updating information!", "error happens");
      });
  };

  const onDelete = async () => {
    http
      .post(`${baseUrl}/api/user/deleteDriver`, 
      {
        email: email,
      }
      )
      .then((res) => {
        swal("Success!", "Information Deleted Succesfully!", "success");
        history.push('/dashboard/app/user-list', { replace: true });
      })
      .catch((err) => {
        swal("Error!", "Error Happen Deleting information!", "error");
      });
  };
  useEffect(() => {
    http
      .get(`${baseUrl}/api/user/listDrivers`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const DisplayData = data?.drivers
    

    ?.filter((row) => row?.firstName?.match(new RegExp(searchValue, "i")))
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((items) => {
      return (
        <>
          <tr key={items._id}>
            <td>{items.firstName}{" "}{items.lastName}</td>
         
            <td>{items.phoneNumber}</td>
            <td>{items.email}</td>
            <td>{items.nationalId}</td>
            <td>
              <div className="flex align-items-center list-user-action">
                <Link
                  className="btn btn-sm btn-icon btn-success"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Add"
                  to="/dashboard/app/driver-add"
                >
                  <span title="Add Driver" className="btn-inner">
                  <svg
                      width="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19.2036 8.66919V12.6792"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M21.2497 10.6741H17.1597"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </Link>{" "}
                <div
                  className="btn btn-sm btn-icon btn-warning"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Edit"
                  onClick={() => {

            



                    setFirstName(items.firstName);
                    setMiddleName(items.middleName);
                    setLastName(items.lastName);
                    setEmail(items.email);
                    setPhoneNumber(items.phoneNumber);
                    setPassword(items.password)
                    setNationalId(items.nationalId);
                    setUserId(items._id);
                    toggle();
                  }}
                >
                  <span title="Edit Driver" className="btn-inner">
                    <svg
                      width="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/200/svg"
                    >
                      <path
                        d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15.1655 4.60254L19.7315 9.16854"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>
                </div>{" "}
                <div
                  className="btn btn-sm btn-icon btn-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Delete"
                  onClick={() => {
                    setFirstName(items.firstName)
                    setUserId(items._id)
                    setEmail(items.email);
                    toggleother();
                  }}
                >
                  <span title="Delete Driver" className="btn-inner">
                  <svg fill="white"  class="svg-icon" viewBox="0 0 20 20">
							<path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
						</svg>
                  </span>
                </div>{" "}
              </div>
            </td>
          </tr>
        </>
      );
    });
 return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className=" py-3 pl-2">
                  <div className="relative max-w-xs">
                    <label htmlFor="hs-table-search" className="sr-only">
                      Search
                    </label>
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      name="hs-table-search"
                      id="hs-table-search"
                      className="block border w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Search by Name"
                    />
                  </div>
                </div>
                <div className="header-title">
                  <h4 className="card-title">Driver List</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>Full Name</th>
             
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>ID</th>

                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>{DisplayData}</tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
        />
      </div>

      {hideother ? (
                           <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                           <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                               <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                   <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                       <span class="sr-only">Close modal</span>
                                   </button>
                                   <div class="p-6 text-center">
                                       <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                       <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                       <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                           Yes, I'm sure
                                       </button>
                                       <button data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                              ) : null}
      {hide ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="grid w-screen  place-items-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
        >
          <div className="grid place-items-center mx-96">
            <Row>
              <Col xl="12" lg="8">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Update Driver Information</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="">
                      <form>
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="code">First Name:</Form.Label>
                            <Form.Control
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              id="code"
                              placeholder="Enter Item Code"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Middle Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              value={middleName}
                              onChange={(e) => setMiddleName(e.target.value)}
                              placeholder="Enter Item Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="itemsPerPack">
                              Last Name:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              id="itemsPerPack"
                              placeholder="Enter Items per Pack"
                            />
                         
                   
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pricePerPack">
                              Email Address:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="pricePerPack"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Price Per Pack"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pricePerPack">
                              Phone Number:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="pricePerPack"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="Enter Price Per Pack"
                            />
                          </Form.Group>


                    
             
                
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="minimumPurchaseAmount">
                              National ID:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={nationalId}
                              onChange={(e) =>
                                setNationalId(e.target.value)
                              }
                              id="minimumPurchaseAmount"
                              placeholder="Enter Minimum Purchace Amount"
                            />
                          </Form.Group>

                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="minimumPurchaseAmount">
                              User ID :
                            </Form.Label>
                            <Form.Control
                            disabled
                              type="text"
                              value={userId}
                              onChange={(e) =>
                                setUserId(e.target.value)
                              }
                              id="minimumPurchaseAmount"
                              placeholder="Enter Minimum Purchace Amount"
                            />
                          </Form.Group>
                         
                        </div>
                        <div className="flex justify-between items-center">
                          <Button
                            type="button"
                            onClick={() => onSubmit()}
                            variant="btn btn-primary"
                          >
                            Update Driver
                          </Button>
                          <Button
                            type="button"
                            onClick={() => toggle()}
                            variant="btn btn-danger"
                          >
                            Close
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
      {william ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="grid w-screen  place-items-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
        >
          <div className="grid place-items-center mx-96">
            <Row>
              <Col xl="12" lg="8">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Remove Information about {firstName}</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="">
                      <form>
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="code">User ID:</Form.Label>
                            <Form.Control
                              disabled
                              type="text"
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
                              id="code"
                          
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Email:</Form.Label>
                            <Form.Control
                              type="text"
                              disabled
                              id="name"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Item Name"
                            />
                          </Form.Group>
                           </div>
                        <div className="flex justify-between items-center">
                          <Button
                            type="button"
                            onClick={() => toggleother()}
                            variant="btn btn-primary"
                          >
                            Close
                          </Button>
                          <Button
                            type="button"
                            onClick={() => onDelete()}
                            variant="btn btn-danger"
                          >
                            Remove Driver
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}

    </>
  );
};

export default UserList;
