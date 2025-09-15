import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import "./Sidebar.css";
import { ArrowRight } from 'lucide-react';

export const Sidebar = () => {

  const navigate = useNavigate();
  return (
    <>

    <style>{`
        /* Base nav link */
        .nav-link {
          color: #495057;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 6px;
          transition: all 0.3s ease-in-out;
        }

        /* Hover effect */
        .nav-link:hover {
          color: #0d6efd; /* Bootstrap primary */
          background-color: #dee1e5; /* light gray-blue */
        }

        /* Active (selected) link */
        .nav-link.active {
          color: #fff !important;
          background: linear-gradient(90deg, #0d6efd, #0b5ed7);
          font-weight: 600;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(13, 110, 253, 0.25);
        }
      `}</style>

      {/* Toggle Button for Mobile */}
      <div className="d-md-none bg-light p-2 border-bottom">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Sidebar for large screens (always visible) */}
      <nav className="col-md-3 col-lg-2 d-none d-md-block bg-white vh-100 p-3 border-end">

        <ul className="nav flex-column">
          <li className="nav-item mt-4">
            <img src="/CRM-Mag-Logo.png" alt="CRM Logo" height={60} width={150} className="nav-link"/>
          </li>
          <li className="nav-item mt-5">
            <NavLink to="/" className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/leads" className="nav-link">
              Leads
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/create-lead" className="nav-link">
              Create Lead
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/sales" className="nav-link">
              Sales
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/create-sale" className="nav-link">
              Create Sale
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/agents" className="nav-link">
              Agents Reports
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/reports-closed" className="nav-link">
              Reports Closed
            </NavLink>
          </li>
          <li className="nav-item mt-2">
            <NavLink to="/reports-pipeline" className="nav-link">
              Reports Pipeline
            </NavLink>
          </li>
          {/* <li className="nav-item mt-2">
            <NavLink to="/settings" className="nav-link">
              Settings
            </NavLink>
          </li> */}
        </ul>
      </nav>

      {/* Sidebar for mobile (offcanvas) */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column">

            <li className="nav-item ">
              <img src="/CRM-Mag-Logo.png" alt="CRM Logo" height={60} width={150} className="nav-link" />
            </li>

            <li className="nav-item mt-5">
              <NavLink to="/" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/leads" className="nav-link">
                Leads
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink to="/create-lead" className="nav-link">
                Create Lead
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sales" className="nav-link">
                Sales
              </NavLink>
            </li>
             <li className="nav-item">
              <NavLink to="/create-sale" className="nav-link">
                Create Sale
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/agents" className="nav-link">
                Agents Reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reports-closed" className="nav-link">
                Reports Closed
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reports-pipeline" className="nav-link">
                Reports Pipeline
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/settings" className="nav-link">
                Settings
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
