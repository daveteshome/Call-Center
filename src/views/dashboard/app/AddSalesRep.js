import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useHistory , useNavigate } from "react-router-dom";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import http, { baseUrl } from "../../../store/resources/http";
import { codes } from "../../../data/data";
import swal from 'sweetalert';


function AddSalesRep() {
    const history = useHistory();
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState();
    const [isFilePicked, setIsFilePicked] = React.useState(false);
  
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
    };
    const [form, setForrm] = useState({});
    const [errors, setErrors] = useState({});
    const setField = (field, value) => {
      setForrm({
        ...form,
        [field]: value,
      });
      if (!!errors[field])
        setErrors({
          ...errors,
          [field]: null,
        });
    };
    const emailValidationRegx =
      /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const phoneRegExp =
    //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const phoneRegExp = /^[79][0-9]{8}$/;
    const validateForm = () => {
      const {
        pcode="",
        firstName="",
        middleName="",
        lastName="",
        email="",
        phone="",
        password="",
        nationalId="",
      } = form;
      const newErrors = {};
  
      if (!emailValidationRegx.test(email)) newErrors.email = "Email is Invalid"; //email validation
      if (!email || email === "") newErrors.email = "Email cannot be blank.";
      if (!pcode || pcode === "") newErrors.pcode = "Select code";
      if (!phone || phone === "")
      newErrors.phone = "Phone number cannot be blank.";
      if (!phoneRegExp.test(phone)) newErrors.phone = "Phone number need to be 9 digits and start with 7 or 9"; //phone validation
   
  
  
        if (phone.length < 9)
        newErrors.phone = "Invalid Phone Number can't be less 9 digits";
  
        if (phone.length > 9)
        newErrors.phone = "Invalid Input, Phone Number can't be more 9 digits";
  
      if (!firstName || firstName === "")
        newErrors.firstName = "First Name Can't be blank.";
  
  
        
      if (!middleName || middleName === "")
        newErrors.middleName = "Middle Name Can't be blank";
  
        
  
      if (!lastName || lastName === "")
        newErrors.lastName = "Last Name Can't be blank";
  
        
      if (!password || password === "")
        newErrors.password = "Password value Can't be blank";
        if (password.length < 8)
        newErrors.password = "Password  Can't be less than 8";
      if (!nationalId || nationalId === "")
        newErrors.nationalId = "National ID value Can't be blank";
        if (nationalId.length > 13)
        newErrors.nationalId = "National ID Can't be more than 13";
        if (nationalId.length < 13)
        newErrors.nationalId = "National ID Can't be less than 13";
      return newErrors;
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
      } else {

        // .post(`${baseUrl}/api/user/createSalesRep`, {
        http
          .post(`https://eliltatradingadmin.com/api/user/createSalesRep`, {
            user: {
              firstName: form.firstName,
              middleName: form.middleName,
              lastName: form.lastName,
              email: form.email,
              phoneNumber: form.pcode + form.phone,
              password: form.password,
              nationalId: form.nationalId,
            },
          })
          .then((res) => {
            setShowSuccess(true);
            setTimeout(() =>{(history.push("dashboard"))}, 3000)
           
          })
          .catch((err) => {
            swal("Error!", "Error Happens!", "error");
            
          });
      }
    };
    return (
      <>
        <div>
          <Row>
            <Col xl="9" lg="8">
              <Card>
                <Card.Header className="d-flex justify-content-center align-item-center">
                  <div className="header-title">
                    <h4 className="card-title text-center">Add New Sales Rep </h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="new-user-info">
                    <form>
                      <div className="row">
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="code">First Name:</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={form.firstName}
                            onChange={(e) =>
                              setField("firstName", e.target.value)
                            }
                            id="name"
                            isInvalid={!!errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="name">Middle Name:</Form.Label>
                          <Form.Control
                            type="text"
                            id="name"
                            required
                            value={form.middleName}
                            onChange={(e) =>
                              setField("middleName", e.target.value)
                            }
                            isInvalid={!!errors.middleName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.middleName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="itemsPerPack">
                            Last Name:
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(e) => setField("lastName", e.target.value)}
                            id="lastName"
                            isInvalid={!!errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="pricePerUnit">
                            Email Address
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={form.email}
                            onChange={(e) => setField("email", e.target.value)}
                            id="pricePerUnit"
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="pricePerPack">
                            Password:
                          </Form.Label>
                          <Form.Control
                            type="password"
                            required
                            id="password"
                            value={form.password}
                            onChange={(e) => setField("password", e.target.value)}
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
  
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="minimumPurchaseAmount">
                            National ID:
                          </Form.Label>
                          <Form.Control
                            type="number"
                            required
                            value={form.nationalId}
                            onChange={(e) =>
                              setField("nationalId", e.target.value)
                            }
                            id="nationalId"
                            isInvalid={!!errors.nationalId}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nationalId}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="flex space-x-6">
                          <Form.Group className="col-md-2 form-group">
                            <Form.Label htmlFor="pricePerUnit">
                              Country Code
                            </Form.Label>
  
                            <Form.Select
                              value={form.pcode}
                              onChange={(e) => setField("pcode", e.target.value)}
                              id="pricePerUnit"
                              isInvalid={!!errors.pcode}
                              aria-label="Default select example"
                            >
                              {codes?.map((x, y) => (
                                <option value={x.code}>{x.name}</option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.pcode}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="col-md-3 form-group">
                            <Form.Label htmlFor="pricePerUnit">
                              Phone Number
                            </Form.Label>
                            <Form.Control
                              type="number"
                              required
                              value={form.phone}
                              onChange={(e) => setField("phone", e.target.value)}
                              id="pricePerUnit"
                              isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        
                        {/*  <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="pricePerUnit">email</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={form.email}
                            onChange={(e) => setField("email", e.target.value)}
                            id="pricePerUnit"
                            placeholder="Enter Price Per Unit"
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <Form.Label htmlFor="pricePerUnit">Phone</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={form.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            id="pricePerUnit"
                            placeholder="Enter Price Per Unit"
                            isInvalid={!!errors.phone}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>
                      */}
                      </div>
                      <Button
                        type="button"
                        onClick={(e) => onSubmit(e)}
                        variant="btn btn-primary"
                      >
                        Add New Sales Rep
                      </Button>
                      {showSuccess ? (
                        <div
                          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                          role="alert"
                        >
                          <span className="font-medium">Sales Rep Registered Succesfully!</span>{" "}
                          Completed,
                        </div>
                      ) : null}
                    </form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}

export default AddSalesRep
