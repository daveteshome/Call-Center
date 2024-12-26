import React, { useState } from "react";
import { Row, Col, Form, Button, Card, Modal, Spinner } from "react-bootstrap"; // Import Spinner
import http from "../store/resources/http"; // Assuming http is your configured Axios instance
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const today = new Date();
const formattedDate = `${today.getMonth() + 1}-${today.getDate()}-${today
  .getFullYear()
  .toString()
  .substr(-2)} 00:00`;

function AddLeads() {
  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const user_id = tokenn.user.user._id;
  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to track loading

  const [form, setForm] = useState({
    regDate: formattedDate,
    liceNumber: " ",
    createdBy: "created",
    businessName: " ",
    managerFName: " ",
    managerLName: " ",
    managerPhone: " ",
    businessTelephone: " ",
    selectStatus: "off",
  });

  const validField = (name, value) => {
    switch (name) {
      case "managerPhone":
        return value.length === 9;
      case "liceNumber":
        return value.length >= 5;
      case "businessName":
        return value.length >= 5;
      case "managerFName":
        return value.length >= 3;
      case "managerLName":
        return value.length >= 3;
      case "businessTelephone":
        return value.length >= 8 && value.length <= 12;
      default:
        return true; // Assume valid if not specified
    }
  };

  const setField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (validField(name, value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const valid = () => {
    let hasErrors = false;
    if (form.managerPhone.length !== 9) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        managerPhone: "Invalid Input, Phone Number needs to be 9 digits",
      }));
      hasErrors = true;
    }
    if (form.liceNumber.length < 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        liceNumber: "Invalid Input, Licence Number is not correct",
      }));
      hasErrors = true;
    }
    if (form.businessName.length < 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        businessName: "Invalid Input, Business Name is not correct",
      }));
      hasErrors = true;
    }
    if (form.managerFName.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        managerFName: "Invalid Input, Manager First Name is not correct",
      }));
      hasErrors = true;
    }
    if (form.managerLName.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        managerLName: "Invalid Input, Manager Last Name is not correct",
      }));
      hasErrors = true;
    }
    if (
      form.businessTelephone.length < 8 ||
      form.businessTelephone.length > 12
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        businessTelephone: "Invalid Input, Business Telephone is not correct",
      }));
      hasErrors = true;
    }
    return !hasErrors;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (valid()) {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append("regDate", form.regDate);
      formData.append("liceNumber", form.liceNumber);
      formData.append("businessName", form.businessName);
      formData.append("managerFName", form.managerFName);
      formData.append("managerLName", form.managerLName);
      formData.append("managerPhone", form.managerPhone);
      formData.append("businessTelephone", form.businessTelephone);
      formData.append("createdBy", user_id);

      // Append file to FormData if it exists
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      try {
        const response = await http.post(
          `https://eliltatradingadmin.com/api/lead/createLeadWeb`, // Update with the correct endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );

        if (response.status === 200) {
          swal("Success!", "Lead Added Successfully!", "success");
          setTimeout(() => {
            history.push({
              pathname: "/dashboard",
            });
          }, 1000);
        } else {
          console.error("Failed to submit:", response.statusText);
          swal("Error!", "Failed to submit the lead.", "error");
        }
      } catch (error) {
        console.error("Error while submitting the lead:", error);
        swal("Error!", "Error while submitting the lead.", "error");
      }
    }
  };

  const handleModalSubmit = async () => {
    // Check if the file is selected
    if (!selectedFile) {
      setErrors({ fileUpload: "Please select a file before submitting." });
      return;
    }

    // Check if the selected file is a CSV
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (fileExtension !== "csv") {
      setErrors({ fileUpload: "Please upload a valid CSV file." });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    
    // Start loading
    setLoading(true);

    try {
      const response = await http.post(
        `https://eliltatradingadmin.com/api/lead/upload`, // API endpoint for file upload
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        swal("Success!", "CSV file uploaded successfully!", "success");
      } else {
        swal("Error!", "Failed to upload the CSV file.", "error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      swal("Error!", "There was an error uploading the file.", "error");
    } finally {
      // Stop loading
      setLoading(false);
      // Close modal after successful upload
      setShowModal(false);
    }
  };

  return (
    <div className="container mt-3 mb-3 p-1 rounded card">
      <h3 className="text-center m-2 text-black-300 p-1 text-uppercase text-bold p-2">
        Add a New Lead{" "}
      </h3>

      <div className="grid place-items-center mx-96">
        <Row>
          <Col xl="12" lg="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Add Lead Information</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Form.Group className="col-md-6 form-group">
                  {/* Button to open the modal */}
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Upload Document
                  </Button>
                </Form.Group>

                <div className="">
                  <form>
                    <div className="row">
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="liceNumber">
                          License Number:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={setField}
                          value={form.liceNumber}
                          id="liceNumber"
                          name="liceNumber"
                          placeholder="KK/AA/14/706/2770865/2010"
                          isInvalid={!!errors.liceNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.liceNumber}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="businessName">
                          Legal Business Name:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={setField}
                          value={form.businessName}
                          id="businessName"
                          name="businessName"
                          placeholder="Elilta Trading"
                          isInvalid={!!errors.businessName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.businessName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="managerFName">
                          Manager First Name:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={setField}
                          value={form.managerFName}
                          id="managerFName"
                          name="managerFName"
                          placeholder="Ali"
                          isInvalid={!!errors.managerFName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.managerFName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="managerLName">
                          Manager Last Name:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={setField}
                          value={form.managerLName}
                          id="managerLName"
                          name="managerLName"
                          placeholder="Musa"
                          isInvalid={!!errors.managerLName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.managerLName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="managerPhone">
                          Manager Phone:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={setField}
                          value={form.managerPhone}
                          id="managerPhone"
                          name="managerPhone"
                          placeholder="999999999"
                          isInvalid={!!errors.managerPhone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.managerPhone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="businessTelephone">
                          Business Telephone:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={setField}
                          value={form.businessTelephone}
                          id="businessTelephone"
                          name="businessTelephone"
                          placeholder="04444444"
                          isInvalid={!!errors.businessTelephone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.businessTelephone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="form-group">
            <Form.Label htmlFor="fileUpload">Select File:</Form.Label>
            <Form.Control
              type="file"
              id="fileUpload"
              name="fileUpload"
              onChange={handleFileChange}
              isInvalid={!!errors.fileUpload}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fileUpload}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Show loading spinner when uploading */}
          {loading && (
            <div className="text-center my-2">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit} disabled={loading}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddLeads;
