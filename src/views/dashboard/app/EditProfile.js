import http, { baseUrl } from "../../../store/resources/http";
import React, { useEffect, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/Card";
import swal from "sweetalert";

import axios from "axios";
import Table from "react-bootstrap/Table";

import SecondarySpinner from "../../../components/SecondarySpinner";

function EditProfile() {
  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;
  const role = tokenn.user.user.role;

  let history = useHistory();
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        //   const response = await axios.get(`${baseUrl}/api/user/${user_id}`);
        const response = await axios.get(`${baseUrl}/api/user/${user_id}`);
        setData(response.data.data);
        setEmail(response.data.data.email);
        setPhoneNumber(response.data.data.phoneNumber);
        setNationalId(response.data.data.nationalId);
        setLastName(response.data.data.lastName);
        setMiddleName(response.data.data.middleName);
        setFirstName(response.data.data.firstName);
        setUserId(response.data.data._id);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log(data, "data");

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
          history.push({
            pathname: "/dashboard",
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err, "error");
        swal("Error!", "Error Happen updating information!", "error happens");
      });
  };

  if (isLoading === false && data.length < 1)
    return (
      <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
        <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1">
          Profile Update Page
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
              No Data
            </strong>{" "}
            at the momonet
          </p>
        </Table>
      </div>
    );
  return (
    <div
      id="popup-modal"
      tabindex="-1"
      class="grid w-screen  place-items-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
    >
      {isLoading || !data ? (
        <div className="text-center mt-2 mb-2">
          <SecondarySpinner />
        </div>
      ) : (
        <div className="grid place-items-center mx-96">
          <Row>
            <Col xl="12" lg="8">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">
                      Update Your Profile Information
                    </h4>
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
                            placeholder="Natanel ..."
                          />
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="name">Middle Name:</Form.Label>
                          <Form.Control
                            type="text"
                            id="name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            placeholder="Lemma ..."
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
                            placeholder="Natanel@elilita.com"
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
                            placeholder="939032312"
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
                        {/* <Form.Group className="col-md-6 form-group">
                                <Form.Label htmlFor="minimumPurchaseAmount">
                                  User ID:
                                </Form.Label>
                                <Form.Control
                                  disabled
                                  type="text"
                                  value={userId}
                                  onChange={(e) => setUserId(e.target.value)}
                                  id="minimumPurchaseAmount"
                                  placeholder="your system ID"
                                />
                              </Form.Group> */}
                      </div>
                      <div className="flex justify-between space-x-2 items-center m-1">
                        <Button
                          type="button"
                          onClick={() => onSubmit()}
                          variant="btn btn-primary"
                          className="mx-2"
                        >
                          Update Information
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
