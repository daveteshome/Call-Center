import React, { useEffect, useState } from "react";
import http, { baseUrl } from "../../../store/resources/http";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
export default function Pending() {
  const [code, setCode] = React.useState("");
  const [orderId, setOrderId] = React.useState("");
  const [statusd, setStatusd] = React.useState("requesteds");
  const [litre, setLitre] = React.useState("");
  const [itemsPerPack, setItemsPerPack] = React.useState("");
  const [pricePerPack, setPricePerPack] = React.useState("");
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = React.useState("");
  const [hide, showHide] = useState(false);
  const toggle = () => showHide(!hide);
  const [data, setData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driverID, setDriverID] = useState("");
  const[status, setStatus]=useState("");
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);


  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data?.orders?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const fetchData = () => {
    http
    .post(`${baseUrl}/api/order/getByStatus`, {
        status: 'requested',
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
console.log(data,'data');
console.log(statusd);
  useEffect(() => {
    http.get(`${baseUrl}/api/user/listDrivers`).then((res) => {
      setDrivers(res.data);
    });
  }, []);
  
  const onChangeDriver =  () => {
    http
      .post(`${baseUrl}/api/order/assignDriver`, {
        driverId: driverID,
        orderId: orderId,
      })
      .then((res) => {
        swal("Changing Driver Complete!", "Driver Assigned!", "success");
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "error");
        swal("Assigning Failed!", "Driver Not Assigned!", "error");
      });
  };
  const onSubmit = async () => {
    http
      .post(`${baseUrl}/api/order/assignDriver`, {
        driverId: driverID,
        orderId: orderId,
      })
      .then((res) => {
        swal("Assigning Complete!", "Driver Assigned!", "success");
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "error");
        swal("Assigning Failed!", "Driver Not Assigned!", "error");
      });
  };


  const DisplayData = data?.orders

    ?.filter((row) => row?.status?.match(new RegExp(searchValue, "i")))
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((items) => {
      return (
        <>
          <tr key={items.orderId}>
            <td className="px-6 py-3">{items.orderId}</td>
            <td className="px-6 py-3">
              <Form.Select aria-label="Default select example">
                {items?.orders?.map((x, y) => (
                  <option value={x._id}>
                    Item Code: {x.itemCode} Quantity: {x.quantity}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td className="px-6 py-3">{items?.status}</td>
           { // <td className="px-6 py-3">{items?.driverInfo?.firstName}{" "}{items?.driverInfo?.lastName}</td> 
    }
            <td className="px-6 py-3 text-sm font-medium  whitespace-nowrap">
              <span
                onClick={() => {
                  setStatus(items.status)
                  setOrderId(items.orderId);
                  toggle();
                }}
                className="text-green-500 hover:text-green-700"
              >
                Assign
              </span>
            </td>
          </tr>
        </>
      );
    });
  return (
    <div className="">
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className=" py-3 pl-2">
                  <div className="relative max-w-xs">
                    <label htmlFor="hs-table-search" className="sr-only">
                      Search
                    </label>
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      name="hs-table-search"
                      id="hs-table-search"
                      className="block border w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Search Item by Status"
                    />
                  </div>
                </div>
                <div className="header-title">
                  <h4 className="card-title">Order List</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>Order Code</th>
                        <th>Ordered Items</th>
                        <th>Status</th>
                     

                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>{DisplayData}</tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
        />
      </div>
      {hide ? (
        <div
          id="popup-modal"
          tabindex="-1"
          class="grid w-screen  place-items-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
        >
          <div className="grid place-items-center mx-96">
            <Row>
              <Col xl="12" lg="8">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Assign a Driver</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="">
                      <form>
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="code">Code:</Form.Label>
                            <Form.Control
                              type="text"
                              value={orderId}
                              onChange={(e) => setOrderId(e.target.value)}
                              id="code"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="code">Driver Name:</Form.Label>
                            <Form.Select
                              value={driverID}
                              onChange={(e) => setDriverID(e.target.value)}
                              aria-label="Default select example"
                            >
                              {drivers?.drivers?.map((x, y) => (
                                <option value={x._id}>{x.firstName}{" "}{x.lastName}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <div className="flex justify-between items-center">

                        {(() => {
              if (status == 'requested'){
                  return (
                    <Button
                    type="button"
                    onClick={() => onSubmit()}
                    variant="btn btn-primary"
                  >
                    Assign Driver
                  </Button>
                  )
              }
             if(status == 'delivered')
              return (
                <Button
                type="button"
                onClick={() => toggle()}
                variant="btn btn-danger"
              >
                Completed Orders 
              </Button>
              );
              if(status == 'driver_assigned')
              return (
                <Button
                type="button"
                onClick={() => onChangeDriver()}
                variant="btn btn-danger"
              >
                Change Driver
              </Button>
              );
            })()}
                          
                          <Button
                            type="button"
                            onClick={() => toggle()}
                            variant="btn btn-danger"
                          >
                            Close
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : null}
    </div>
  );
}
