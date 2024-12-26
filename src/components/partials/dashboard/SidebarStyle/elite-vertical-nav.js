import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const EliteVerticalNav = () => {
  const tokenn = JSON.parse(localStorage.getItem("elite-water"));
  const [isAdmin, setIsAdmin] = useState(false);
  const role = tokenn.user.user.role;

  //location
  let location = useLocation();
  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Menu</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className={`${location.pathname === "/dashboard" ? "active" : ""
              } nav-link `}
            aria-current="page"
            to="/dashboard"
            onClick={() => { }}
          >
            <i className="icon">
              <svg
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill="currentColor"
                ></path>
              </svg>
            </i>
            <span className="item-name">Home</span>
          </Link>
        </li>

        {role === 8 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/add-status"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/add-status"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.05078 14.0117C4.64078 13.6017 4.64078 13.0317 5.05078 12.6217L11.0508 7.6217C11.4608 7.2117 12.0908 7.2117 12.5008 7.6217L18.5008 13.6217C18.9108 14.0317 18.9108 14.6017 18.5008 15.0117L13.5008 20.0117C13.0908 20.4217 12.4608 20.4217 12.0508 20.0117L5.05078 14.0117Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.5 4.5C15.5 4.11 15.19 3.8 14.8 3.8L9.8 3.8C9.41 3.8 9.1 4.11 9.1 4.5V8.5C9.1 8.89 9.41 9.2 9.8 9.2L14.8 9.2C15.19 9.2 15.5 8.89 15.5 8.5V4.5Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              <span className="item-name">Connect to Leads</span>
            </Link>
          </li>
        )}
        {role === 8 && (

          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/all-leads" ? "active" : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/all-leads"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM10 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM16 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    fill="currentColor"
                  />
                </svg>
              </i>
              <span className="item-name">All Lead</span>
            </Link>
          </li>
        )}

        {role === 8 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/add-leads"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/add-leads"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="24"
                  height="24"
                >
                  <path d="M12 2a5 5 0 0 1 5 5c0 2.576-2.044 4.936-3.934 5.694a8.997 8.997 0 0 1-1.066 5.198c-.274.458-.75.458-1.024 0a9 9 0 0 1-1.066-5.198C9.044 11.936 7 9.576 7 7a5 5 0 0 1 5-5z"></path>
                </svg>
              </i>
              <span className="item-name">Add Leads</span>
            </Link>
          </li>
        )}

        {role === 8 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/updated-leads"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/updated-leads"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="24"
                  height="24"
                >
                  <path d="M16 22H8c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4z"></path>
                  <circle cx="12" cy="6" r="3"></circle>
                </svg>
              </i>
              <span className="item-name">Updated Leads</span>
            </Link>
          </li>
        )}
        {role === 0 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/appointments"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/appointments"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 11.5V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22H12.5M21 10H3M16 2V6M8 2V6M18 21V15M15 18H21"
                    stroke="#101828"
                    stroke-width="2"
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              <span className="item-name">Appointments</span>
            </Link>
          </li>
        )}

        {role == 8 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/daily-report"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/daily-report"
            >
              <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
                  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1" />
                </svg>
              </i>
              <span className="item-name">Daily Report</span>
            </Link>
          </li>
        )}

        {role == 2 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/reports-history"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/reports-history"
            >
              <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                </svg>
              </i>
              <span className="item-name">Reports History</span>
            </Link>
          </li>
        )}
        {role === 2 && <li className="nav-item">
          <Link
            className={`${location.pathname === "/dashboard/app/sales-rep-performance"
              ? "active"
              : ""
              } nav-link `}
            aria-current="page"
            to="/dashboard/app/sales-rep-performance"
            onClick={() => { }}
          >
            <i className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
              >
                <path d="M12 2a5 5 0 0 1 5 5c0 2.576-2.044 4.936-3.934 5.694a8.997 8.997 0 0 1-1.066 5.198c-.274.458-.75.458-1.024 0a9 9 0 0 1-1.066-5.198C9.044 11.936 7 9.576 7 7a5 5 0 0 1 5-5z"></path>
              </svg>
            </i>
            <span className="item-name"> Sales Reps </span>
          </Link>
        </li>}

        {role === 8 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/follow-up" ? "active" : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/follow-up"
              onClick={() => { }}
            >
              <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
                  <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z" />
                </svg>
              </i>
              <span className="item-name">Follow Ups</span>
            </Link>
          </li>
        )}
        {role === 2 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/status-review"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/status-review"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </i>
              <span className="item-name">Status Review</span>
            </Link>
          </li>
        )}
        {role === 2 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/adminlist" ? "active" : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/adminlist"
              onClick={() => { }}
            >
              <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
              </i>
              <span className="item-name">Admin Access</span>
            </Link>
          </li>
        )}


        {role === 8 && (
          <li className="nav-item">
            <Link
              className={`${location.pathname === "/dashboard/app/update-profile"
                ? "active"
                : ""
                } nav-link `}
              aria-current="page"
              to="/dashboard/app/update-profile"
              onClick={() => { }}
            >
              <i className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  width="24"
                  height="24"
                >
                  <path d="M12 2a5 5 0 0 1 5 5c0 2.576-2.044 4.936-3.934 5.694a8.997 8.997 0 0 1-1.066 5.198c-.274.458-.75.458-1.024 0a9 9 0 0 1-1.066-5.198C9.044 11.936 7 9.576 7 7a5 5 0 0 1 5-5z"></path>
                </svg>
              </i>
              <span className="item-name">Edit Profile</span>
            </Link>
          </li>
        )}
      </Accordion>
    </>
  );
};

export default EliteVerticalNav;
