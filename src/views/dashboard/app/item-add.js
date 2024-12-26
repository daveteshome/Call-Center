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

const ItemAdd = () => {
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
      name="",
      category="",
      quantity="",
      manufacturer="",
      itemsPerPack="",
      pricePerPack="",
      minimumQuantity="",
      pricePerUnit="",
    } = form;
    const newErrors = {};

   
    if (!name || name === "") newErrors.name = "Item Name Can't be blank";
    if (name.length < 5) newErrors.name = " Name is Too Short.";
    if (!manufacturer || manufacturer === "") newErrors.name = "manufacturer value Can't be blank";
    if (manufacturer.length > 13) newErrors.manufacturer = " Invalid manufacturer .";
    if (!manufacturer || manufacturer === "") newErrors.manufacturer = "manufacturer value Can't be blank";
    if (quantity.length > 10) newErrors.quantity = " Invalid manufacturer .";
    if (!quantity || quantity === "") newErrors.quantity = "manufacturer value Can't be blank";
    if (category.length > 10) newErrors.category = " Invalid manufacturer .";
    if (!category || category === "")
      newErrors.itemsPerPack = "Items Per Pack value Can't be blank";
     if (!pricePerPack || pricePerPack === "")
      newErrors.pricePerPack = "Price Per Pack value Can't be blank";
     if (!minimumQuantity || minimumQuantity === "")
      newErrors.minimumQuantity = "minimum Quantity value Can't be blank";
      if (minimumQuantity.length > 4) newErrors.minimumQuantity = " Invalid Entry.";
    if (!pricePerUnit || pricePerUnit === "")
      newErrors.pricePerUnit = "Price Per Unit value Can't be blank";
       return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      http
        .post(`${baseUrl}/api/item/create`, {
          item: {
            //code: form.code,
            itemName: form.name,
            //image: baseImage,
            quantity:form.quantity,
            category:form.category,
            manufacturer:form.manufacturer,
            itemsPerPack: form.itemsPerPack,
            pricePerPack: form.pricePerPack,
            pricePerItem: form.pricePerUnit,
            minimumPurchaseAmount: form.minimumQuantity,
          },
        })
        .then((res) => {
          setShowSuccess(true);
          setTimeout(() =>{(history.push("item-list"))}, 3000)
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
                        <Form.Label htmlFor="name">Item Name:</Form.Label>
                        <Form.Control
                          type="text"
                          id="name"
                          required
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          placeholder="Enter Item Name"
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="itemsPerPack">
                          Items Per Pack:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          value={form.itemsPerPack}
                          onChange={(e) =>
                            setField("itemsPerPack", e.target.value)
                          }
                          id="itemsPerPack"
                          placeholder="Enter Items Per Pack"
                          isInvalid={!!errors.itemsPerPack}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.itemsPerPack}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="pricePerPack">
                          Price Per Pack:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          id="pricePerPack"
                          value={form.pricePerPack}
                          onChange={(e) =>
                            setField("pricePerPack", e.target.value)
                          }
                          placeholder="Enter Price Per Pack"
                          isInvalid={!!errors.pricePerPack}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.pricePerPack}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="quantity">
                          Price Per Item:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          value={form.pricePerUnit}
                          onChange={(e) =>
                            setField("pricePerUnit", e.target.value)
                          }
                          id="pricePerUnit"
                          placeholder="Enter Price Per Unit"
                          isInvalid={!!errors.pricePerUnit}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.pricePerUnit}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="minimumPurchaseAmount">
                          Minimum Purchace Amount:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          value={form.minimumQuantity}
                          onChange={(e) =>
                            setField("minimumQuantity", e.target.value)
                          }
                          id="minimumQuantity"
                          placeholder="Enter Minimum Purchace Amount"
                          isInvalid={!!errors.minimumQuantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.minimumQuantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                     
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="category">
                          Category:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          value={form.category}
                          onChange={(e) =>
                            setField("category", e.target.value)
                          }
                          id="category"
                          placeholder="Enter Category of the Product"
                          isInvalid={!!errors.category}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.category}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="manufacturer">
                         Manufacturer:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={form.manufacturer}
                          onChange={(e) =>
                            setField("manufacturer", e.target.value)
                          }
                          id="manufacturer"
                          placeholder="Enter manufacturer of the Product"
                          isInvalid={!!errors.manufacturer}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.manufacturer}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="quantity">
                         Quantity:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          value={form.quantity}
                          onChange={(e) =>
                            setField("quantity", e.target.value)
                          }
                          id="quantity"
                          placeholder="Enter Quantity of the Product"
                          isInvalid={!!errors.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.quantity}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="col-md-6 form-group">
                        <Form.Label htmlFor="pricePerUnit">
                          Image of an Item:
                        </Form.Label>
                        <Form.Control
                          type="file"
                          required
                          id="pricePerUnit"
                          placeholder="Enter Price Per Unit"
                          onChange={(e) => {
                            uploadImage(e);
                          }}
                        />
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
                      Add New Item
                    </Button>
                    {showSuccess ? (
                      <div
                        className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                        role="alert"
                      >
                        <span className="font-medium">Item Succesfully Registered!</span>{" "}
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

export default ItemAdd;