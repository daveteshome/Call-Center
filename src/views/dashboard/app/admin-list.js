import React, { useCallback, useEffect, useState, useEffectEvent, useLayoutEffect, useMemo } from "react";
import { Row, Col, Image, Form, Button, ModalDialog, Modal, Pagination } from "react-bootstrap";
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
import http, { baseUrl } from "../../../store/resources/http";
import swal from "sweetalert";

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

const ItemList = () => {
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
  const [userId, setUserId] = React.useState("");
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = React.useState("");
  const [data, setData] = useState([]);

  const [showEditUser, setShowEditUser] = useState(false);

  const [william, setWilliam] = useState(false); // todo: yoni: ???
  const toggleWilliam = () => setWilliam(!william);
  const [hideother, setHideOther] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const filteredUsers = useMemo(() => data?.drivers
    ?.filter((row) => row?.firstName?.match(new RegExp(searchValue, "i"))), [searchValue, data]);
  const usersPerPage = 5;
  const usersVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(filteredUsers?.length / usersPerPage) || 1;
  
  console.log("page count:", pageCount)

  const updateUsersList = useCallback(() => {
    http
      .get(`${baseUrl}/api/user/listLeadUsers`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const onSubmit = async () => {
    http
      .post(`${baseUrl}/api/user/update`, {
        userId: userId,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        nationalId: nationalId,
      })
      .then((res) => {
        swal("Success!", "Information Updated Succesfully!", "success");
        setTimeout(() => {
          history.push("adminlist");
        }, 1000);
        updateUsersList();
      })
      .catch((err) => {
        console.log(err, "error");
        swal("Error!", "Error Happen updating information!", "error happens");
      });
  };

  const onDelete = async () => {
    http
      .post(`${baseUrl}/api/item/delete`, {
        _id: userId,
      })
      .then((res) => {
        swal("Success!", "Information Deleted Succesfully!", "success");
        history.push("/dashboard/app/item-list", { replace: true });
      })
      .catch((err) => {
        swal("Error!", "Error Happen Deleting information!", "error");
      });
  };

  useEffect(() => {
    updateUsersList();
  }, [useCallback]);

  useLayoutEffect(() => {
    setPageNumber(0);
  }, [filteredUsers])

  const displayData = filteredUsers?.slice(usersVisited, usersVisited + usersPerPage).map((items) =>
    <>
      <tr key={items._id}>
        <td>
          {items.firstName} {items.lastName}
        </td>
        <td>{items.phoneNumber}</td>
        <td>{items.email}</td>
        <td>
          {items.role === 2 ? 'admin' : items.role === 8 ? 'leadExpert' : 'other'}
        </td>
        <td>
          <div className="flex align-items-center list-user-action">
            <i
              className=""
              data-toggle="tooltip"
              data-placement="top"
              title=""
              data-original-title="Edit"
              onClick={() => {
                setFirstName(items.firstName);
                setMiddleName(items.middleName);
                setLastName(items.lastName);
                setEmail(items.email);
                setUserId(items._id);
                setPhoneNumber(items.phoneNumber);
                setPassword(items.password);
                setNationalId(items.nationalId);
                setShowEditUser(true);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </i>
          </div>
        </td>
      </tr>
    </>);

  return (
    <>
      <Col sm="12" className="d-flex flex-column align-items-center">
        <Card className="w-100">
          <Card.Header className="d-block">
            <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1 w-100">
              Users list
            </h3>
          </Card.Header>
          <Card.Body className="px-0">
            <div className="p-4 d-flex align-items-stretch justify-space-between w-100" >
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <Form.Control
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                name="hs-table-search"
                id="hs-table-search"
                className="rounded flex-grow-1"
                placeholder="Search User By Name"
              />
              <i style={{ aspectRatio: 1 }} onClick={updateUsersList} className="p-2 border border-grey rounded d-flex align-items-center justify-content-center ms-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </i>
            </div>
            <div className="table-responsive">
              <table
                id="user-list-table"
                className="table"
                role="grid"
                data-toggle="data-table"
              >
                <thead>
                  <tr className="ligth">
                    <th>Full Name</th>

                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Roles</th>

                    <th min-width="100px">Action</th>
                  </tr>
                </thead>
                <tbody  >{displayData}</tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        <Pagination>
          <Pagination.Prev disabled={pageNumber == 0} onClick={() => setPageNumber(pageNumber > 0 ? pageNumber - 1 : 0)} />
          {[...Array(pageCount).keys()].map(page =>
            <Pagination.Item size="md" key={page} active={pageNumber == page} onClick={() => setPageNumber(page)}>
              {page + 1}
            </Pagination.Item>
          )}
          <Pagination.Next disabled={pageNumber == pageCount - 1} onClick={() => setPageNumber(pageNumber < pageCount - 1 ? pageNumber + 1 : pageCount - 1)} />
        </Pagination>
        <Link
          data-toggle="tooltip"
          data-placement="top"
          title=""
          data-original-title="Add"
          to="/dashboard/app/admin-add"
        >
          <Button variant="primary" className="mt-4 d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            <span className="ms-2">Add User</span>
          </Button>
        </Link>
      </Col>

      {hideother ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
        >
          <div class="relative p-4 w-full max-w-md h-full md:h-auto">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-6 text-center">
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Modal className="bg-transparent"show={showEditUser} centered onHide={() => setShowEditUser(false)}>
        <Modal.Header closeButton >
          <h4 className="card-title p-0 m-0 text-center w-100">Update Admin Information</h4>
        </Modal.Header>
        <Card>
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
                      onChange={(e) => setNationalId(e.target.value)}
                      id="minimumPurchaseAmount"
                      placeholder="National ID number"
                    />
                  </Form.Group>
                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="minimumPurchaseAmount">
                      User ID:
                    </Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      id="minimumPurchaseAmount"
                      placeholder="Enter Litre Amount"
                    />
                  </Form.Group>
                </div>
                <div className="d-flex align-items-center  width-100">
                  <Button
                    type="button"
                    onClick={() => onSubmit()}
                    variant="btn btn-primary"
                    className="mx-2"
                  >
                    Update User
                  </Button>
                </div>
              </form>
            </div>
          </Card.Body>
        </Card>
      </Modal >

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
                      <h4 className="card-title">
                        Remove Information about {firstName}
                      </h4>
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
                            onClick={() => toggleWilliam()}
                            variant="btn btn-primary"
                          >
                            Close
                          </Button>
                          <Button
                            type="button"
                            onClick={() => onDelete()}
                            variant="btn btn-danger"
                          >
                            Remove Admin
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div >
      ) : null}
    </>
  );
};

export default ItemList;
