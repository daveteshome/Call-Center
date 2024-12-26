import React, { useEffect, useState } from "react";
import http, { baseUrl } from "../../../store/resources/http";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';

export default function Requests() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    http.get(`${baseUrl}/api/sale/getAllSales`).then((res) => {
      setData(res.data);
    });
  }, []);

  const pageCount = Math.ceil(data.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const DisplayData = data
    ?.filter((sale) =>
      sale.shopInfo.shopName.toLowerCase().includes(searchValue.toLowerCase())
    )
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    .map((sale) => {
      return (
        <tr key={sale._id}>
          <td className="px-6 py-3">{sale.saleCode}</td>
          <td className="px-6 py-3">{sale.shopInfo.shopName}</td>
          <td className="px-6 py-3">
            <ul>
              {sale.products.map((product) => (
                <li key={product._id}>
                  {product.productName} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </td>
          <td className="px-6 py-3">{sale.totalPrice}</td>
        </tr>
      );
    });

  return (
    <div>
      <Card>
        <h2 className="mb-3">Sold</h2>
        
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by Shop Name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
        </Row>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sale Code</th>
                <th>Shop Name</th>
                <th>Products</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center">
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
      </Card>
    </div>
  );
}
