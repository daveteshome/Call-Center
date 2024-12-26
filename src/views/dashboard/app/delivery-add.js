import React, { useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";

import { Link, useHistory } from "react-router-dom";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import http, { baseUrl } from "../../../store/resources/http";

const DeliveryAdd = () => {
  const history = useHistory();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [base64Value, setBase64Value] = React.useState("");
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [litre, setLitre] = React.useState("");
  const [itemsPerPack, setItemsPerPack] = React.useState("");
  const [pricePerPack, setPricePerPack] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const [minimumQuantity, setminimumQuantity] = React.useState("");
  const [pricePerUnit, setpricePerUnit] = React.useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const [baseImage, setBaseImage] = React.useState("");

  const ClearContent = () => {
    setCode("");
    setName("");
    setLitre("");
    setItemsPerPack("");
    setPricePerPack("");
    setminimumQuantity("");
    setpricePerUnit("");
    setBaseImage("");
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
  const validateForm = () => {
    const {
      email="",
      phone="",
      code="",
      name="",
      time,
      price,
      litre="",
      itemsPerPack="",
      pricePerPack="",
      minimumQuantity="",
      pricePerUnit="",
    } = form;
    const newErrors = {};

   
    if (!code || code === "") newErrors.code = "Delivery Code cannot be blank.";
    if (code.length < 3) newErrors.code = "Delivery  Code Too Short.";
    if (!name || name === "") newErrors.name = "Delivery Name Can't be blank";
    if (!time || time === "") newErrors.time = "Time value Can't be blank";
    if (!price || price === "") newErrors.price = "Price value Can't be blank";

       return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      http
        .post(`${baseUrl}/api/deliveryTime/create`, {
          deliveryTime: {
            code: form.code,
            name: form.name,
            time: form.time,
            price: form.price,
          },
        })
        .then((res) => {
          setShowSuccess(true);
          setTimeout(() =>{(history.push("deliveryList"))}, 3000)
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };
  return (
    <>
      <div>
        <Row>
          <Col xl="9" lg="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Add New Product Information</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="code">Code:</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={form.code}
                          onChange={(e) => setField("code", e.target.value)}
                          id="code"
                     
                          isInvalid={!!errors.code}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.code}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="name">Name:</Form.Label>
                        <Form.Control
                          type="text"
                          id="name"
                          required
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="name">Time:</Form.Label>
                        <Form.Control
                          type="text"
                          id="time"
                          required
                          value={form.time}
                          onChange={(e) => setField("time", e.target.value)}
                          placeholder=""
                          isInvalid={!!errors.time}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.time}
                        </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="name">Price:</Form.Label>
                        <Form.Control
                          type="text"
                          id="price"
                          required
                          value={form.price}
                          onChange={(e) => setField("price", e.target.value)}
                          placeholder=""
                          isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </Form.Group>
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
                      Add New Delivery Type
                    </Button>
                    {showSuccess ? (
                      <div
                        className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                        role="alert"
                      >
                        <span className="font-medium">Delivery Type Succesfully Registered!</span>{" "}
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

export default DeliveryAdd;