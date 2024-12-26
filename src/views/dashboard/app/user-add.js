import React from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import Card from '../../../components/Card'

import {Link} from 'react-router-dom'
// img
import avatars1 from '../../../assets/images/avatars/01.png'
import avatars2 from '../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../assets/images/avatars/avtar_5.png'

const UserAdd =() =>{
  return(
      <>
        <div>
            <Row>
              
               <Col xl="9" lg="8">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">New Driver Information</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                           <form>
                              <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="fname">First Name:</Form.Label>
                                    <Form.Control type="text"  id="fname" placeholder="First Name"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="mname">Middle Name:</Form.Label>
                                    <Form.Control type="text"  id="mname" placeholder="Middle Name"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="lname">Last Name:</Form.Label>
                                    <Form.Control type="text"  id="lname" placeholder="Last Name"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="add1">Gender:</Form.Label>
                                    <Form.Control type="text"  id="add1" placeholder="Enter Your Gender"/>
                                 </Form.Group>
                                  <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                    <Form.Control type="email"  id="email" placeholder="Enter Your Email"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="add2">Phone Number:</Form.Label>
                                    <Form.Control type="text"  id="add2" placeholder="Enter Your Phone Number"/>
                                 </Form.Group>
                               
                            
                            
                            
                             
                             
                              </div>
                              <hr/>
                              <h5 className="mb-3">Address</h5>
                              <div className="row">
                                
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="nationalId">National IDNo:</Form.Label>
                                    <Form.Control type="text"  id="nationalId" placeholder="Enter Your National ID"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="region">Region:</Form.Label>
                                    <Form.Control type="text"  id="region" placeholder="Enter Your Region"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="city">City:</Form.Label>
                                    <Form.Control type="text"  id="city" placeholder="Enter Your City"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="street">Street:</Form.Label>
                                    <Form.Control type="text"  id="street" placeholder="Enter Your Street Address "/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="house_number">House Number:</Form.Label>
                                    <Form.Control type="text"  id="house_number" placeholder="Enter House Number "/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="po_box">P.O Box:</Form.Label>
                                    <Form.Control type="text"  id="po_box" placeholder="Enter Your PO Box "/>
                                 </Form.Group>
                              </div>
                            
                              <Button type="button" variant="btn btn-primary">Add New Driver</Button>
                           </form>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      </>
  )

}

export default UserAdd;