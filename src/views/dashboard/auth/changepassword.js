import React from "react";

import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/Card";
import shapes5 from "../../../assets/images/logo.png";
import http from '../../../store/resources/http';
import axios from 'axios';
import { baseUrl } from "../../../store/resources/http";
import { set_token, set_user_data, set_user_status } from '../../../store//store/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
// img
import auth2 from "../../../assets/images/dashboard/elitethree.png";
const ChangePassword = () => {
  const [OldPasswordValue, setOldPasswordValue] = useState('');
  const [NewPasswordValue, setNewPasswordValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const tokenn = JSON.parse(localStorage.getItem('elite-water'));
  const firstNamee = tokenn.user.user.firstName;
  const middleNamee = tokenn.user.user.middleName;
  const lastName = tokenn.user.user.lastName;
  const profileImagee = tokenn.user.user.profileImage;
  const dateOfBirthh = tokenn.user.user.dateOfBirth;
  const phoneNumberr = tokenn.user.user.phoneNumber;
  const onSubmit = async () => {
    http
    .post(`${baseUrl}/api/user/update`, {
        firstName: firstNamee,
        middleName: middleNamee,
        lastName: lastName,
        profileImage: profileImagee,
        dateOfBirth: dateOfBirthh,
        phoneNumber: phoneNumberr,
        oldPassword: OldPasswordValue,
        newPassword: NewPasswordValue,
      })
      .then((res) => {
        if (res.data.message === 'Old password incorrect') {
            setShowError(true);
        } else if(res.data.message === 'User data updated successfully'){
            history.push('/auth/sign-in', { replace: true });

        }
            else {
                setShowSuccess(true);
        }
      })
      .catch((err) => {
        setShowSuccess(true);
        console.log(err.data.message, 'error');
      });
  };
  let history = useHistory();
  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col
            md="6"
            className="d-md-block d-none p-0 mt-n1 vh-100 overflow-hidden"
          >
            <Image
              src={auth2}
              className="img-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </Col>
          <Col md="6" className="p-0">
            <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <Card.Body>
                <Link
                  
                  className="navbar-brand d-flex align-items-center mb-3"
                >
                  <img
                    src={shapes5}
                    className="img-fluid rounded-circle"
                    alt="user"
                    style={{ height: "40px", minWidth: "40px", width: "40px" }}
                  />
                  <h4 className="logo-title ms-3">Elilta Trading</h4>
                </Link>
                <h2 className="mb-2">Change Your Password</h2>
                <p>
                  Since It is your first access, chanhge your password for a better use 
                </p> 
                <Form>
                  <Row>
                    <Col lg="12" className="col-lg-12">
                      <Form.Group className="floating-label">
                        <Form.Label htmlFor="email" className="form-label">
                          Old Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          placeholder="Please Enter Your Old Password"
                          value={OldPasswordValue}
                          onChange={(e) => setOldPasswordValue(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Label htmlFor="email" className="form-label">
                          New Password
                        </Form.Label>
                      <Form.Control
                          type="password"
                          className="form-control"
                          placeholder="Please Enter Your New Password"
                          value={NewPasswordValue}
                          onChange={(e) => setNewPasswordValue(e.target.value)}
                        />
                    </Col>
                  </Row>
                  <br/>
                  {showError ? (
                              <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                              <span class="font-medium">Sorry, </span> Old Password is Incorrect
                            </div>
                              ) : null}
                                    {showSuccess ? (
                              <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                              <span class="font-medium">Sorry, </span> Error Happens
                            </div>
                              ) : null}
                  <Button
                    onClick={() => onSubmit()}
                    className="mt-3"
                    type="button"
                    variant="primary"
                  >
                    Change  Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="sign-bg sign-bg-right">
              <svg
                width="280"
                height="230"
                viewBox="0 0 431 398"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.05">
                  <rect
                    x="-157.085"
                    y="193.773"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 -157.085 193.773)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="7.46875"
                    y="358.327"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="61.9355"
                    y="138.545"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 61.9355 138.545)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="62.3154"
                    y="-190.173"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)"
                    fill="#3B8AFF"
                  />
                </g>
              </svg>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ChangePassword;
