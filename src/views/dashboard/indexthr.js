import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { bindActionCreators } from "redux";
//circular
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.scss";
import BarChart from './BarChart';
//progressbar
import Progress from "../../components/progress.js";
//img
import shapes1 from "../../assets/images/shapes/01.png";
import shapes2 from "../../assets/images/shapes/02.png";
import shapes3 from "../../assets/images/shapes/03.png";
import shapes4 from "../../assets/images/shapes/04.png";
import shapes5 from "../../assets/images/shapes/05.png";

//Count-up
import CountUp from "react-countup";
// store
import {
  NavbarstyleAction,
  getDirMode,
  getcustomizerMode,
  getcustomizerprimaryMode,
  getcustomizerinfoMode,
  SchemeDirAction,
  ColorCustomizerAction,
  getNavbarStyleMode,
  getSidebarActiveMode,
  SidebarActiveStyleAction,
  getDarkMode,
  ModeAction,
  SidebarColorAction,
  getSidebarColorMode,
  getSidebarTypeMode,
} from "../../store/setting/setting";
import { connect } from "react-redux";
import http, { baseUrl } from "../../store/resources/http.js";

// install Swiper modules
SwiperCore.use([Navigation]);

const mapStateToProps = (state) => {
  return {
    darkMode: getDarkMode(state),
    customizerMode: getcustomizerMode(state),
    cololrinfomode: getcustomizerinfoMode(state),
    colorprimarymode: getcustomizerprimaryMode(state),
    schemeDirMode: getDirMode(state),
    sidebarcolorMode: getSidebarColorMode(state),
    sidebarTypeMode: getSidebarTypeMode(state),
    sidebaractivestyleMode: getSidebarActiveMode(state),
    navbarstylemode: getNavbarStyleMode(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ModeAction,
      SchemeDirAction,
      SidebarColorAction,
      SidebarActiveStyleAction,
      NavbarstyleAction,
      ColorCustomizerAction,
    },
    dispatch
  ),
});

const Index = (props) => {
    const [today, setToday] = React.useState([]);
    const [weekly, setWeekly] = React.useState([]);
    const [monthly, setMonthly] = React.useState([]);
    const [userss, setUserss] = React.useState([]);
    const [drivers,setDrivers]=React.useState([]);
    const [items,setItems]=React.useState([]);
    const fetchData = () => {
        http
          .get('128.140.42.236:4023/api/item/getAll', {
            
          })
          .then((response) => {
            setItems(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchData();
      }, []);
   


      const fetchOrders = () => {
        http
          .get('128.140.42.236:4023/api/order/getAll', {
            
          })
          .then((response) => {
            setUserss(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchOrders();
      }, []);



      const fetchTodayOrders = () => {
        http
          .get('128.140.42.236:4023/api/order/getAllToday', {
            
          })
          .then((response) => {
            setToday(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchTodayOrders();
      }, []);



      const fetchWeeklyOrders = () => {
        http
          .get('128.140.42.236:4023/api/order/getAllWeekly', {
            
          })
          .then((response) => {
            setWeekly(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchWeeklyOrders();
      }, []);


      const fetchMonthlyOrders = () => {
        http
          .get('128.140.42.236:4023/api/order/getAllWeekly', {
            
          })
          .then((response) => {
            setMonthly(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchMonthlyOrders();
      }, []);
    
      const DisplayData = userss?.orders?.map((items) => {
        return (
            <div className="card-body">
            <div className="mb-2 d-flex profile-media align-items-top">
                <div className="mt-1 profile-dots-pills border-primary"></div>
                <div className="ms-4">
                <h6 className="mb-1 ">New Order {items.orderId}</h6>
                    <span className="mb-0">Status {items.status}</span>
                </div>
            </div>
       
      
       
    
        </div>
            
        );
      });

      const [chart, setChart] = useState({})

    
      const fetchOrderCount = () => {
        http
          .get('128.140.42.236:4023/api/order/getAllOrdersCount', {
            
          })
          .then((response) => {
            setChart(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchOrderCount();
      }, []);
 

      const DisplayDataTable = chart?.ordersCount?.map((items) => {
        return (

     
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes5}
                                alt="profile"
                              />
                              <h6>{items._id}</h6>
                            </div>
                          </td>
                          <td>{items.count}</td>
                          <td>On Market</td>
                        </tr>
                     
        
            
        );
      });



      const fetchDrivers = () => {
        http
          .get('128.140.42.236:4023/api/user/listDrivers', {
            
          })
          .then((response) => {
            setDrivers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      useEffect(() => {
        fetchDrivers();
      }, []);
 
    



  const [datas, setDatas] = useState([]);
  useEffect(() => {
    http.get(`${baseUrl}/api/order/getAll`).then((res) => {
      setDatas(res.data);
    });
  }, []);

  const orders = datas?.orders?.reduce((p, c) => {
    const month = new Date(Date.parse(c?.createdAt)).toLocaleString("default", {
      month: "short",
    });
    p[month] = (p[month] || 0) + 1;
    return p;
  }, {});


  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
    //   customizer
    const colorcustomizerMode = sessionStorage.getItem("color-customizer-mode");
    const colorcustomizerinfoMode = sessionStorage.getItem(
      "colorcustominfo-mode"
    );
    const colorcustomizerprimaryMode = sessionStorage.getItem(
      "colorcustomprimary-mode"
    );
    if (colorcustomizerMode === null) {
      props.ColorCustomizerAction(
        props.customizerMode,
        props.cololrinfomode,
        props.colorprimarymode
      );
      document.documentElement.style.setProperty(
        "--bs-info",
        props.cololrinfomode
      );
    } else {
      props.ColorCustomizerAction(
        colorcustomizerMode,
        colorcustomizerinfoMode,
        colorcustomizerprimaryMode
      );
      document.documentElement.style.setProperty(
        "--bs-info",
        colorcustomizerinfoMode
      );
    }
  });

  const chart0 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: [props.colorprimarymode, props.cololrinfomode],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept.",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: [props.colorprimarymode, props.cololrinfomode],
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Total Orders",
        data: [
          orders?.Jan ? orders?.Jan : 0,
          orders?.Feb ? orders?.Feb : 0,
          orders?.Mar ? orders?.Mar : 0,
          orders?.Apr ? orders?.Apr : 0,
          orders?.May ? orders?.May : 0,
          orders?.Jun ? orders?.Jun : 0,
          orders?.Jul ? orders?.Jul : 0,
          orders?.Aug ? orders?.Aug : 0,
          orders?.Sep ? orders?.Sep : 0,
          orders?.Oct ? orders?.Oct : 0,
          orders?.Nov ? orders?.Nov : 0,
          orders?.Dec ? orders?.Dec : 0,
        ],
      },
    ],
  };


  const chart1 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: [props.colorprimarymode, props.cololrinfomode],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept.",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: [props.colorprimarymode, props.cololrinfomode],
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Total Orders",
        data: [
          orders?.Jan ? orders?.Jan : 0,
          orders?.Feb ? orders?.Feb : 0,
          orders?.Mar ? orders?.Mar : 0,
          orders?.Apr ? orders?.Apr : 0,
          orders?.May ? orders?.May : 0,
          orders?.Jun ? orders?.Jun : 0,
          orders?.Jul ? orders?.Jul : 0,
          orders?.Aug ? orders?.Aug : 0,
          orders?.Sep ? orders?.Sep : 0,
          orders?.Oct ? orders?.Oct : 0,
          orders?.Nov ? orders?.Nov : 0,
          orders?.Dec ? orders?.Dec : 0,
        ],
      },
    ],
  };

  //chart2
  const chart2 = {
    options: {
      colors: [props.colorprimarymode, props.cololrinfomode],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: false,
          },
        },
      },
      labels: ["Apples", "Oranges"],
    },
    series: [55, 75],
  };
  const chart3 = {
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: [props.colorprimarymode, props.cololrinfomode],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "28%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["S", "M", "T", "W", "T", "F", "S", "M", "T", "W"],
        labels: {
          minHeight: 20,
          maxHeight: 20,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
    series: [
      {
        name: "Delivered Orders",
        data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35],
      },
      {
        name: "Pending Orders",
        data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
      },
    ],
  };
  return (
    <>
      <Row>
        <Col md="12" lg="12">
          <Row className="row-cols-1">
            <div className="overflow-hidden d-slider1 ">
              <Swiper
                className="p-0 m-0 mb-2 list-inline "
                slidesPerView={5}
                spaceBetween={32}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 },
                  1500: { slidesPerView: 5 },
                  1920: { slidesPerView: 6 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 },
                }}
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <SwiperSlide className="card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.colorprimarymode}
                        width="60px"
                        height="60px"
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        style={{ width: 60, height: 60 }}
                        value={90}
                        id="circle-progress-01"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Today Sales</p>
                        <h4 className="counter">{today?.orders}</h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.colorprimarymode}
                        width="60px"
                        height="60px"
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        style={{ width: 60, height: 60 }}
                        value={90}
                        id="circle-progress-01"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Weekly Sales</p>
                        <h4 className="counter">
                          <CountUp start={0} end={weekly?.orders} duration={3} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.cololrinfomode}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={60}
                        id="circle-progress-02"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">This Month Sale</p>
                        <h4 className="counter">
                         <CountUp start={0} end={userss?.orders?.length} duration={3} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.colorprimarymode}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={70}
                        id="circle-progress-03"
                      >
                        <svg className="" width="24" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Total Cost</p>
                        <h4 className="counter">
                          SSP <CountUp start={120} end={278} duration={3} />K
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={props.cololrinfomode}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={60}
                        id="circle-progress-04"
                      >
                        <svg
                          className=""
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Revenue</p>
                        <h4 className="counter">
                          SSP <CountUp start={212} end={342} duration={3} />K
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            </div>
          </Row>
        </Col>
        <Col md="12" lg="8">
          <Row>
            <Col md="12">
              <div className="card" data-aos="fade-up" data-aos-delay="800">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Total Order {userss?.orders?.length}</h4>
                    <p className="mb-0">Orders in Months</p>
                  </div>
                  <div className="d-flex align-items-center align-self-center">
                    <div className="d-flex align-items-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <g>
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            fill="currentColor"
                          ></circle>
                        </g>
                      </svg>
                      <div className="ms-2">
                        <span className="text-secondary">Orders</span>
                      </div>
                    </div>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      href="#"
                      variant=" text-secondary dropdown-toggle"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Order Chart
                    </Dropdown.Toggle>
                  
                  </Dropdown>
                </div>
                <div className="card-body">
                  <Chart
                    options={chart1.options}
                    series={chart1.series}
                    type="area"
                    height="245"
                  />
                </div>
              </div>
            </Col>

            <Col md="12" xl="12">
            <div className="card" data-aos="fade-up" data-aos-delay="1000">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Weekly order Requests</h4>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      href="#"
                      variant=" text-secondary"
                      id="dropdownMenuButton3"
                      aria-expanded="false"
                    >
                      This Week
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton3"
                    >
                      <li>
                        <Dropdown.Item href="#">This Week</Dropdown.Item>
                      </li>
                      <li>
                        <Dropdown.Item href="#">This Month</Dropdown.Item>
                      </li>
                      <li>
                        <Dropdown.Item href="#">This Year</Dropdown.Item>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <Chart
                    className="d-activity"
                    options={chart3.options}
                    series={chart3.series}
                    type="bar"
                    height="230"
                  />
                </div>
              </div>
           
             </Col>
            <Col md="12" lg="12">
              <div
                className="overflow-hidden card"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Top Items on the Market</h4>
              
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table
                      id="basic-table"
                      className="table mb-0 table-striped"
                      role="grid"
                    >
                      <thead>
                        <tr>
                          <th>Product Code</th>
                          <th>Quantity sold</th>
                          <th>Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        {DisplayDataTable}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md="12" lg="4">
          <Row>
            <Col md="12" lg="12">
              <div
                className="card credit-card-widget"
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <div className="pb-4 border-0 card-header">
                  <div className="p-4 border border-white rounded primary-gradient-card">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="font-weight-bold">Support Contact </h5>
                        <p className="mb-0">Elilta Trading</p>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="card-number">
                        <span className="fs-5 me-2">+254</span>
                        <span className="fs-5 me-2">****</span>
                        <span className="fs-5 me-2">****</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="flex-wrap mb-4 d-flex align-itmes-center">
                    <div className="d-flex align-itmes-center me-0 me-md-4">
                      <div>
                        <div className="p-3 mb-2 rounded bg-soft-primary">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.9303 7C16.9621 6.92913 16.977 6.85189 16.9739 6.77432H17C16.8882 4.10591 14.6849 2 12.0049 2C9.325 2 7.12172 4.10591 7.00989 6.77432C6.9967 6.84898 6.9967 6.92535 7.00989 7H6.93171C5.65022 7 4.28034 7.84597 3.88264 10.1201L3.1049 16.3147C2.46858 20.8629 4.81062 22 7.86853 22H16.1585C19.2075 22 21.4789 20.3535 20.9133 16.3147L20.1444 10.1201C19.676 7.90964 18.3503 7 17.0865 7H16.9303ZM15.4932 7C15.4654 6.92794 15.4506 6.85153 15.4497 6.77432C15.4497 4.85682 13.8899 3.30238 11.9657 3.30238C10.0416 3.30238 8.48184 4.85682 8.48184 6.77432C8.49502 6.84898 8.49502 6.92535 8.48184 7H15.4932ZM9.097 12.1486C8.60889 12.1486 8.21321 11.7413 8.21321 11.2389C8.21321 10.7366 8.60889 10.3293 9.097 10.3293C9.5851 10.3293 9.98079 10.7366 9.98079 11.2389C9.98079 11.7413 9.5851 12.1486 9.097 12.1486ZM14.002 11.2389C14.002 11.7413 14.3977 12.1486 14.8858 12.1486C15.3739 12.1486 15.7696 11.7413 15.7696 11.2389C15.7696 10.7366 15.3739 10.3293 14.8858 10.3293C14.3977 10.3293 14.002 10.7366 14.002 11.2389Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ms-3">
                        <h5>{items?.items?.length}</h5>
                        <small className="mb-0">Products</small>
                      </div>
                    </div>
                    <div className="d-flex align-itmes-center">
                      <div>
                        <div className="p-3 mb-2 rounded bg-soft-info">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ms-3">
                        <h5>{userss?.orders?.length}</h5>
                        <small className="mb-0">Order Served</small>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex-wrap d-flex justify-content-between">
                      <h2 className="mb-2">$560,300</h2>
                    </div>
                    <p className="text-info">Total sales</p>
                  </div>
                </div>
              </div>
              <div className="card" data-aos="fade-up" data-aos-delay="500">
                                    <div className="text-center card-body d-flex justify-content-around">
                                        <div>
                                            <h2 className="mb-2">{userss?.orders?.length}<small></small></h2>
                                            <p className="mb-0 text-secondary">Orders</p>
                                        </div>
                                        <hr className="hr-vertial"/>
                                        <div>
                                            <h2 className="mb-2">{drivers?.drivers?.length}</h2>
                                            <p className="mb-0 text-secondary">Drivers</p>
                                        </div>
                                        <hr className="hr-vertial"/>
                                        <div>
                                            <h2 className="mb-2">{items?.items?.length}</h2>
                                            <p className="mb-0 text-secondary">Items</p>
                                        </div>
                                    </div>
                                </div> 
            </Col>
            <Col md="12">
                          <div className="card" data-aos="fade-up" data-aos-delay="600">
            <div className="flex-wrap card-header d-flex justify-content-between">
                <div className="header-title">
                    <h4 className="mb-2 card-title">Recent Orders</h4>
                    <p className="mb-0">
                    Orders
                   
                    </p>
                </div>
                {DisplayData}
            </div>
           
           
        </div>
                            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
