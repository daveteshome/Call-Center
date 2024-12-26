import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/Card";
import shapes5 from "../../../assets/images/logo.png";
import auth2 from "../../../assets/images/dashboard/elitethree.png";
import { baseUrl } from "../../../store/resources/http";
import axios from "axios";
import http from "../../../store/resources/http";
const Reset = () => {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const submit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      http 
      .post(`${baseUrl}/api/user/update`, {
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
        .then(
          (response) => {
            alert("Password Changed Successfully! Please Login Again!");
            localStorage.clear();
            history.push("/");
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      alert("Confirm password does not match");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-36">
      <Form>
        <h2 className="mb-3">Reset Your Password</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Enter Old Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter New Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>

        <button
          className="flex mx-16  mt-10 bg-blue-900 text-white px-10 py-2 w-56 rounded button-signup justify-center items-center "
          type="submit"
          onClick={(e) => {
            submit(e);
            // submit();
          }}
        >
          Reset
        </button>
      </Form>
    </div>
  );
};

export default Reset;
