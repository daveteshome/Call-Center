import React, { useEffect, useState } from "react";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import { Link, useHistory } from "react-router-dom";
import Card from "../../../components/Card";


// img
import shap1 from "../../../assets/images/shapes/01.png";
import shap2 from "../../../assets/images/shapes/02.png";
import shap3 from "../../../assets/images/shapes/03.png";
import shap4 from "../../../assets/images/shapes/04.png";
import shap5 from "../../../assets/images/shapes/05.png";
import shap6 from "../../../assets/images/shapes/06.png";
import deletesvg from "../../../assets/1icons8-delete-64.png"
import addsvg from "../../../assets/icons8-add-property-64.png"
import http, { baseUrl } from "../../../store/resources/http";
import swal from 'sweetalert';

const userlist = [
  {
    code: "I1",
    name: "P1",
    litre: "P1",
    ItemPerStack: "24",
    PricePerStack: "100",
    MiniumumOrderAmount: "100",
    color: "bg-primary",
  },
  {
    code: "I1",
    name: "P1",
    litre: "P1",
    ItemPerStack: "24",
    PricePerStack: "100",
    MiniumumOrderAmount: "100",
    color: "bg-primary",
  },
];

const ItemList = () => {
  let history = useHistory();
  const [deletedcode, setDeletedcode] = React.useState("");
  const [code, setCode] = React.useState("");
  const [name, setName] = React.useState("");
  const [itemName, setItemName] = React.useState("");
  const [litre, setLitre] = React.useState("");

  const [manufacturer, setManufacturer] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [itemsPerPack, setItemsPerPack] = React.useState("");
  const [pricePerPack, setPricePerPack] = React.useState("");
  const [pricePerItem, setpricePerItem]=React.useState("");
  const [minimumQuantity, setminimumQuantity]=React.useState("");

  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = React.useState("");
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  const [william, setWilliam] = useState(false);
  const toggle = () => setHide(!hide);

  const [hideother, setHideOther] = useState(false);
  const toggleother = () => setWilliam(!william);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data?.items?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const onSubmit = async () => {
    http
      .post(`${baseUrl}/api/item/update`, {
       
          code: code,
          itemName: name,
          itemsPerPack:itemsPerPack,
          pricePerPack: pricePerPack,
          pricePerItem: pricePerItem,
          minimumQuantity: minimumQuantity,
        
      })
      .then((res) => {
        swal("Success!", "Information Updated Succesfully!", "success");
        fetchData();
      })
      .catch((err) => {
        console.log(err, "error");
        swal("Error!", "Error Happen updating information!", "error happens");
      });
  };

  const onDelete = async () => {
    http
      .post(`${baseUrl}/api/item/delete`, 
      {
        itemCode: code,
      }
      )
      .then((res) => {
        swal("Success!", "Information Deleted Succesfully!", "success");
        history.push('/dashboard/app/item-list', { replace: true });
      })
      .catch((err) => {
        swal("Error!", "Error Happen Deleting information!", "error");
      });
  };
  const fetchData = () => {
    http
      .get(`${baseUrl}/api/item/getAll`, {})
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    http
      .get(`${baseUrl}/api/item/getAll`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const DisplayData = Array.isArray(data)
  ? data
      .filter((row) => row?.code?.match(new RegExp(searchValue, "i")))
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((items) => {
        return (
          <>
            <tr key={items.code}>
              <td>{items.code}</td>
              <td>{items.itemName}</td>
              <td>{items.manufacturer}{" "}</td>
              <td>{items.itemsPerPack}{" "}</td>
              
              <td>{items.quantity}{" "}</td>
              <td>{items.pricePerPack}{" "} Birr</td>
              <td>
                <div className="flex align-items-center list-user-action">
                  <Link
                    className="btn btn-sm btn-icon btn-success btn-fixed"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Add"
                    to="/dashboard/app/item-add"
                  >
                    <span title="Add Item" className="btn-inner  ">
                    <svg fill="white" class="svg-icon" viewBox="0 0 20 20">
                <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
              </svg>
                      
                    </span>
                  </Link>{" "}
                  <div
                    className="btn btn-sm btn-icon btn-warning"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Edit"
                    onClick={() => {
                      setCode(items.code);
                      setName(items.itemName);
                      setCategory(items.category);
                      setQuantity(items.quantity);
                      setManufacturer(items.manufacturer);
                      setItemName(items.itemName);
                     // setLitre(items.litre);
                      setItemsPerPack(items.itemsPerPack);
                      setPricePerPack(items.pricePerPack);
                      setpricePerItem(items.pricePerItem)
                      setminimumQuantity(items.minimumPurchaseAmount);
                      toggle();
                    }}
                  >
                    <span title="Edit Item" className="btn-inner">
                      <svg
                        width="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/200/svg"
                      >
                        <path
                          d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M15.1655 4.60254L19.7315 9.16854"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>{" "}
                  <div
                    className="btn btn-sm btn-icon btn-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Delete"
                    onClick={() => {
                      setItemName(items.itemName)
                      setCode(items.code);
                      toggleother();
                    }}
                  >
                    <span title="Delete Item" className="btn-inner  flex-item fluid">
                    <svg fill="white" class="svg-icon" viewBox="0 0 20 20">
                <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
              </svg>
                    </span>
                  </div>{" "}
                </div>
              </td>
            </tr>
          </>
        );
      })
  : [];


  return (
    <>
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
                      placeholder="Search Item by Name"
                    />
                  </div>
                </div>
                <div className="header-title">
                  <h4 className="card-title">Item List</h4>
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
                        <th>Code</th>
                        <th>Item Name</th>
                        <th>Manufacturer</th>
                        <th>Items Per Pack</th>
                        <th>Quantity</th>
                        <th>Price</th>
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

      {hideother ? (
                           <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                           <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                               <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                   <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                       <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                       <span class="sr-only">Close modal</span>
                                   </button>
                                   <div class="p-6 text-center">
                                       <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                       <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                       <button data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                           Yes, I'm sure
                                       </button>
                                       <button data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                              ) : null}
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
                      <h4 className="card-title">Update Product Information</h4>
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
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              id="code"
                              placeholder="Enter Item Code"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter Item Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="itemsPerPack">
                              Items Per Pack:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={itemsPerPack}
                              onChange={(e) => setItemsPerPack(e.target.value)}
                              id="itemsPerPack"
                              placeholder="Enter Items per Pack"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pricePerPack">
                              Price Per Pack:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="pricePerPack"
                              value={pricePerPack}
                              onChange={(e) => setPricePerPack(e.target.value)}
                              placeholder="Enter Price Per Pack"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pricePerPack">
                              Price Per Item:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="pricePerPack"
                              value={pricePerItem}
                              onChange={(e) => setpricePerItem(e.target.value)}
                              placeholder="Enter Price Per Pack"
                            />
                          </Form.Group>

                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="category">
                              Category
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              id="category"
                              placeholder="Enter category"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="minimumPurchaseAmount">
                              Minimum Purchace Amount:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={minimumQuantity}
                              onChange={(e) =>
                                setminimumQuantity(e.target.value)
                              }
                              id="minimumPurchaseAmount"
                              placeholder="Enter Minimum Purchace Amount"
                            />
                          </Form.Group>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button
                            type="button"
                            onClick={() => onSubmit()}
                            variant="btn btn-primary"
                          >
                            Update Item
                          </Button>
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

{william ? (
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
                      <h4 className="card-title">Delete Product Information</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="">
                      <form>
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="code">Code:</Form.Label>
                            <Form.Control
                              disabled
                              type="text"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              id="code"
                              placeholder="Enter Item Code"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <Form.Control
                              type="text"
                              disabled
                              id="name"
                              value={itemName}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter Item Name"
                            />
                          </Form.Group>
                           </div>
                        <div className="flex justify-between items-center">
                          <Button
                            type="button"
                            onClick={() => toggleother()}
                            variant="btn btn-primary"
                          >
                            Close
                          </Button>
                          <Button
                            type="button"
                            onClick={() => onDelete()}
                            variant="btn btn-danger"
                          >
                            Remove Item
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
    </>
  );
};

export default ItemList;
