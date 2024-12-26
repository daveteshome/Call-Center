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
const Verify = () => {
  const [passwordValue, setPasswordValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const onSubmit = async () => {
    http
    .post(`${baseUrl}/api/user/verify`, {
        verificationCode: passwordValue,
      })
      .then((res) => {
        if (res.data.message === 'Account Verified') {    
   
      
          history.push('/dashboard', { replace: true });
        } 
        else {
          setShowError(true);
        }
      })
      .catch((err) => {
        setShowError(true);
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
                <h2 className="mb-2">Verify Your Account</h2>
                <p>
                  Enter the verification code you have received in your email
                  address
                </p>
                <Form>
                  <Row>
                    <Col lg="12" className="col-lg-12">
                      <Form.Group className="floating-label">
                        <Form.Label htmlFor="email" className="form-label">
                          Verification Code
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Verification Code"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {showError ? (
                              <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                              <span class="font-medium">Sorry, </span> Invalid Verification Code
                            </div>
                              ) : null}
                  <Button
                    onClick={() => onSubmit()}
                    className="mt-3"
                    type="button"
                    variant="primary"
                  >
                    Verify
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

export default Verify;
