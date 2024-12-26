import React from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import http, { baseUrl } from "../../../store/resources/http";

const ChnagePasswordDashboard = () => {
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
        
            history.push('/dashboard/', { replace: true });

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
      <div>
        <Row>
          <Col xl="9" lg="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Change Your Password</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="code">Old Password:</Form.Label>
                        <Form.Control
                           type="password"
                           className="form-control"
                           placeholder="Please Enter Your Old Password"
                           value={OldPasswordValue}
                           onChange={(e) => setOldPasswordValue(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="name">New Password:</Form.Label>
                        <Form.Control
                             type="password"
                             className="form-control"
                             placeholder="Please Enter Your New Password"
                             value={NewPasswordValue}
                             onChange={(e) => setNewPasswordValue(e.target.value)}
                        />
                      </Form.Group>
                      
                 
                    </div>
                    <Button
                      type="submit"
                      onClick={() => onSubmit()}
                      variant="btn btn-primary"
                    >
                      Change Password
                    </Button>
                    {showSuccess ? (
                                <div
                                  className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                                  role="alert"
                                >
                                  <span className="font-medium">
                                  Password Changed Succesfully!
                                  </span>{" "}
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
};

export default ChnagePasswordDashboard;
