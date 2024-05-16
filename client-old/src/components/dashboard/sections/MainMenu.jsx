import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImage from "../../../assets/logo.png"; // Import your logo image
const MainMenu = () => {
  const [isInvoiceSubMenuOpen, setIsInvoiceSubMenuOpen] = useState(false);

  const toggleInvoiceSubMenu = () => {
    setIsInvoiceSubMenuOpen(!isInvoiceSubMenuOpen);
  };

  return (
    <div
      className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
      data-scroll-to-active="true"
    >
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mr-auto">
            <NavLink className="navbar-brand" to="/dashboard/home">
              <span className="brand-logo">
                <svg
                  viewBox="0 0 139 95"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  height="24"
                >
                  {/* SVG content */}
                </svg>
              </span>
              <a href="#" className="brand-logo">
                <img src={logoImage} alt="Logo" />
              </a>
            </NavLink>
          </li>
          <li className="nav-item nav-toggle">
            <a
              className="nav-link modern-nav-toggle pr-0"
              data-toggle="collapse"
            >
              <i
                className="d-block d-xl-none text-primary toggle-icon font-medium-4"
                data-feather="x"
              ></i>
              <i
                className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary"
                data-feather="disc"
                data-ticon="disc"
              ></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="shadow-bottom"></div>
      <div className="main-menu-content">
        <ul
          className="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          <li className="nav-item">
            <NavLink
              to="/dashboard/home"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="home"></i>
              <span className="menu-title text-truncate" data-i18n="Dashboards">
                Dashboards
              </span>
            </NavLink>
            <ul className="menu-content">
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className="d-flex align-items-center"
                  activeClassName="active"
                >
                  <i data-feather="circle"></i>
                  <span
                    className="menu-item text-truncate"
                    data-i18n="Analytics"
                  >
                    Analytics
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/ecommerce"
                  className="d-flex align-items-center"
                  activeClassName="active"
                >
                  <i data-feather="circle"></i>
                  <span
                    className="menu-item text-truncate"
                    data-i18n="eCommerce"
                  >
                    eCommerce
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="navigation-header">
            <span data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
            <i data-feather="more-horizontal"></i>
          </li>
          <li className="nav-item">
            <NavLink
              to="/app-email"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="mail"></i>
              <span className="menu-title text-truncate" data-i18n="Email">
                Email
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/app-chat"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="message-square"></i>
              <span className="menu-title text-truncate" data-i18n="Chat">
                Chat
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/app-todo"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="check-square"></i>
              <span className="menu-title text-truncate" data-i18n="Todo">
                Todo
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/app-calendar"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="calendar"></i>
              <span className="menu-title text-truncate" data-i18n="Calendar">
                Calendar
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/app-kanban"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="grid"></i>
              <span className="menu-title text-truncate" data-i18n="Kanban">
                Kanban
              </span>
            </NavLink>
          </li>
          <li
            className={`nav-item has-sub ${isInvoiceSubMenuOpen ? "open" : ""}`}
          >
            <a
              className="d-flex align-items-center"
              onClick={toggleInvoiceSubMenu}
            >
              <i data-feather="file-text"></i>
              <span className="menu-title text-truncate" data-i18n="Invoice">
                Invoice
              </span>
              <i
                className="fa fa-chevron-right ml-auto"
                style={{ fontSize: "0.9rem", alignContent: "center" }}
              ></i>
            </a>
            <ul
              className={`menu-content ${isInvoiceSubMenuOpen ? "show" : ""}`}
            >
              <li>
                <NavLink
                  to="/app-invoice-list"
                  className="d-flex align-items-center"
                  activeClassName="active"
                >
                  <i data-feather="circle"></i>
                  <span className="menu-item text-truncate" data-i18n="List">
                    List
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app-invoice-preview"
                  className="d-flex align-items-center"
                  activeClassName="active"
                >
                  <i data-feather="circle"></i>
                  <span className="menu-item text-truncate" data-i18n="Preview">
                    Preview
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app-invoice-edit"
                  className="d-flex align-items-center"
                  activeClassName="active"
                >
                  <i data-feather="circle"></i>
                  <span className="menu-item text-truncate" data-i18n="Edit">
                    Edit
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/app-invoice-add"
                  className="d-flex align-items-center"
                  activeClassName="active"
                >
                  <i data-feather="circle"></i>
                  <span className="menu-item text-truncate" data-i18n="Add">
                    Add
                  </span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink
              to="/app-file-manager"
              className="d-flex align-items-center"
              activeClassName="active"
            >
              <i data-feather="save"></i>
              <span
                className="menu-title text-truncate"
                data-i18n="File Manager"
              >
                File Manager
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;
