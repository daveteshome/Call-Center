import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import shapes5 from "../../../assets/images/logo.png";
// img
import auth2 from "../../../assets/images/dashboard/elitethree.png";

const CheckShop = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityOne, setQuantityOne]=useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductTwo, setSelectedProductTwo] = useState('');
  const [selectedProductThree, setSelectedProductThree] = useState('');
  const [shopAlreadyExist, setShopAlreadyExist] = useState(true);
  const [quantityTwo,setQuantityTwo] =useState('')
  const [quantityThree,setQuantityThree] =useState('')
  const [shopName,setShopName] =useState('')
  const [shopPhoneNumber,setshopPhoneNumber] =useState('')
  const [shopEmail,setShopEmail] =useState('')
  const [latitude,setLatitude]=useState('')
  const [longitude,setLongitude]=useState('')

  const [products, setProducts] = useState({});
  const [productsTwo, setProductsTwo] = useState([]);
  const [productsThree, setProductsThree] = useState([]); // State to store the fetched products

  const [totalAmount1, setTotalAmount1] = useState(0)



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://nodewithsql.onrender.com/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const calculateTotalPrice = () => {
    const selectedProductData = products.find(
      (product) => product.productId === selectedProduct
    );
    if (selectedProductData) {
      const totalPrice = selectedProductData.price * quantityTwo;
      console.log('Selected Product Price:', selectedProductData.price);
      console.log('Total Amount:', totalPrice);
      setTotalAmount1(totalPrice);
    }
  };


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude.toFixed(6));
        setLatitude(position.coords.latitude.toFixed(6));
      }, (error) => {
        console.error("Error getting geolocation:", error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  
    const onSubmit = async () => {
      if (shopAlreadyExist=true) {
        alert('Shop already exists.'); // Display alert if shopAlreadyExist is true
      } else {
        alert('Shop does not exist.'); // Display alert if shopAlreadyExist is false
      }
    
    
    // Add your logic for form submission here
  };
  const onWilliam = async () => {
    if (shopAlreadyExist=true) {
      alert('Shop already exists.'); // Display alert if shopAlreadyExist is true
    } else {
      alert('Shop does not exist.'); // Display alert if shopAlreadyExist is false
    }
  
  
  // Add your logic for form submission here
};

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          {/* Left Side */}
          <Col md="6" className="p-0">
            <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <Card.Body>
                <Link className="navbar-brand d-flex align-items-center mb-3">
                  <img
                    src={shapes5}
                    className="img-fluid rounded-circle"
                    alt="user"
                    style={{ height: "40px", minWidth: "40px", width: "40px" }}
                  />
                  <h4 className="logo-title ms-3">Elilta Trading</h4>
                </Link>
                <h2 className="mb-2">Regiser Phone Number</h2>
                <p>
                  Enter Customer Phone Number and You Will get Information in the Left Side If the Customer is Registered
                </p>
                <Form>
                  <Row>
                    <Col lg="6" className="col-lg-6">
                      <Form.Group className="floating-label">
                        <Form.Label htmlFor="phoneNumber" className="form-label">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone Number 9*********"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                      onClick={() => onSubmit()}
                      className="mt-3"
                      type="button"
                      variant="primary"
                    >
                      {shopAlreadyExist ? 'Sell to the Shop' : 'Register New Shop'}
                    </Button> 
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side */}
          <Col md="6" className="p-0">
            <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <Card.Body>
                <h2 className="mb-2">
                  {shopAlreadyExist ? 'The Shop is already there,You can Sell Easily' : 'New Customer is Here'}
                </h2>
                <p>
                  {shopAlreadyExist
                    ? 'The Shop is already Registered, you can just sell to them easily'
                    : 'Fill required Information and Register the Shop to sell'}
                </p>
                <Form>
                  {shopAlreadyExist ? (
                    <>
                      
                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="shopCode" className="form-label">
                              Shop Code
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter Shop Code"
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>
                        <Row>
                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="phoneNumber" className="form-label">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>
                        </Row>
                    
                      
                      <Row>
                        <Col lg="8" className="col-lg-8">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="existingProduct" className="form-label">
                              Select Product One 
                            </Form.Label>
                            <Form.Select
                              className="form-control"
                              aria-label="Select Product"
                              value={selectedProduct}
                              onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                               <option value="">Select Product from here</option>
                  {/* Populating dropdown options with fetched product names */}
                
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col lg="4" className="col-lg-4">
                        <Form.Group className="floating-label">
                            <Form.Label htmlFor="quantityTwo" className="form-label">
                              Enter Quantity
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="quantityTwo"
                              className="form-control"
                              placeholder="Enter Quantity"
                              value={quantityTwo}
                              onChange={(e) => setQuantityTwo(e.target.value)}
                            />
                          </Form.Group>
                    

                        </Col>
                      </Row>
                         </>
                  ) : (
                    <>
                      <Row>
                      <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="shopName" className="form-label">
                              Shop Owner Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter Shop Name"
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>
                        <Row>
                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="phoneNumber" className="form-label">
                              Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>

                        </Row>
                        
                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="shopEmail" className="form-label">
                              Shop Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Enter Shop Email"
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="longitude" className="form-label">
                              Longitude
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Longitude"
                              value={longitude}
                              onChange={(e) => setLongitude(e.target.value)}
                              readOnly 
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>

                        <Col lg="12" className="col-lg-12">
                          <Form.Group className="floating-label">
                            <Form.Label htmlFor="latitude" className="form-label">
                              Latitude
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="latitude"
                              value={latitude}
                              onChange={(e) => setLatitude(e.target.value)}
                              readOnly 
                              // Add value and onChange
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="3" className="col-lg-3">
                          {/* Add other text boxes */}
                        </Col>
                      </Row>
                    </>
                  )}
             <Button
                  onClick={() => {
                    if (shopAlreadyExist) {
                      alert('The shop is already registered.'); // Alert if shopAlreadyExist is true
                    } else {
                      alert('New shop registration.'); // Alert if shopAlreadyExist is false
                    }
                  }}
                  className="mt-3"
                  type="button"
                  variant="primary"
                >
                  {shopAlreadyExist ? 'Sell to the Shop' : 'Register New Shop'}
                </Button>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default CheckShop;
