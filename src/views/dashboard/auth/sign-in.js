import React, { useState } from "react";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/Card";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// img

import facebook from "../../../assets/images/brands/fb.svg";
import google from "../../../assets/images/brands/gm.svg";
import instagram from "../../../assets/images/brands/im.svg";
import linkedin from "../../../assets/images/brands/li.svg";
import auth1 from "../../../assets/images/dashboard/elitethree.png";
import { useDispatch } from "react-redux";
import { set_user_data, set_user_status } from "../../../store/store/actions";
import shapes5 from "../../../assets/images/logo.png";
import axios from "axios";
import { baseUrl } from "../../../store/resources/http";

const SignIn = () => {
  const [show, setShow] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [loading, setLoading] = useState(false); // New loading state
  const toggle = () => setShow(true);
  const onSubmit = async () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/api/user/login`, {
        email: emailValue,
        phoneNumber: emailValue,
        password: passwordValue,
      })
      .then((res) => {
        localStorage.setItem("role", JSON.stringify(res.data.user.role));
        if (
          res.data.message === "User not found" ||
          res.data.message === "Incorrect password"
        ) {
          setShowSuccess(true);
        } else {
          dispatch(set_user_data(res?.data));
          dispatch(
            set_user_status({
              loggedIn: true,
              token: res.data.token,
            })
          );
          if (res.data.user.role === 0 && res.data.user.isVerified === true) {
            setShowError(true);
          } else if (
            res.data.user.role === 5 &&
            res.data.user.isVerified === false
          ) {
            setShowError(true);
          } else if (
            res.data.user.role === 1 &&
            res.data.user.isVerified === true
          ) {
            setShowError(true);
          } else if (
            res.data.user.role === 1 &&
            res.data.user.isVerified === false
          ) {
            setShowError(true);
          } else if (
            res.data.user.role === 8 &&
            res.data.user.isVerified === true
          ) {
            history.push("/dashboard", { replace: true });
            //replaces the route with the new feature route
            // history.push("/add-status", { replace: true });
          } else if (
            res.data.user.role === 2 &&
            res.data.user.isVerified === true
          ) {
            history.push("/dashboard", { replace: true });
            //replaces the route with the new feature route
            // history.push("/add-status", { replace: true });
          } else {
          }
        }
      })
      .catch((err) => {
        setShowError(true);
        console.log(err, "error");
      })
      .finally(() => {
        setLoading(false); // Set loading back to false regardless of success or failure
      });
  };

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="6">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <Link
                      to=""
                      className="navbar-brand d-flex align-items-center mb-3"
                    >
                      <img
                        src={shapes5}
                        className="img-fluid rounded-circle"
                        alt="user"
                        style={{
                          height: "40px",
                          minWidth: "40px",
                          width: "40px",
                        }}
                      />
                      <h4 className="logo-title ms-3">Elilta Trading</h4>
                    </Link>
                    <h2 className="mb-2 text-center">Sign In</h2>
                    <p className="text-center">Login and Manage Deliveries.</p>
                    <Form>
                      <Row>
                        <Col lg="12">
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="email" className="">
                              Email or Phone
                            </Form.Label>
                            <Form.Control
                              type="email"
                              className=""
                              id="email"
                              aria-describedby="email"
                              value={emailValue}
                              onChange={(e) => setEmailValue(e.target.value)}
                              placeholder=" "
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12" className="">
                          <Form.Label htmlFor="password" className="">
                            Password
                          </Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              type={show ? "text" : "password"}
                              value={passwordValue}
                              onChange={(e) => setPasswordValue(e.target.value)}
                              className=""
                              id="password"
                            />
                            <InputGroup.Text
                              id="basic-addon1"
                              onClick={() => {
                                setShow(!show);
                              }}
                            >
                              {show ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </InputGroup.Text>
                          </InputGroup>
                        </Col>
                        ,
                        <Col lg="12" className="d-flex justify-content-between">
                          <Form.Check className="form-check mb-3">
                            <Form.Check.Input
                              type="checkbox"
                              id="customCheck1"
                            />
                            <Form.Check.Label htmlFor="customCheck1">
                              Remember Me
                            </Form.Check.Label>
                          </Form.Check>
                          <Link to="/auth/recoverpw">Forgot Password?</Link>
                        </Col>
                      </Row>
                      {showError ? (
                        <div
                          class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span class="font-medium">Sorry, </span> You're Not
                          Authorized to use this!
                        </div>
                      ) : null}

                      {showSuccess ? (
                        <div
                          class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                          role="alert"
                        >
                          <span class="font-medium">
                            Invalid User Name and Password!{" "}
                          </span>{" "}
                          Error Happens
                        </div>
                      ) : null}
                      <div className="d-flex justify-content-center">
                        <Button
                          onClick={() => onSubmit()}
                          type="button"
                          variant="btn btn-primary"
                          disabled={loading} // Disable the button when loading is true
                        >
                          {loading ? "Signing In..." : "Sign In"}{" "}
                          {/* Show loading text when loading is true */}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg">
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
          <Col
            md="6"
            className="d-md-block d-none p-0 mt-n1 vh-100 overflow-hidden"
          >
            <Image
              src={auth1}
              className="Image-fluid gradient-main animated-scaleX"
              alt="images"
            />
          </Col>
        </Row>
      </section>
    </>
  );
};

export default SignIn;
