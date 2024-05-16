import React from "react";
import { Dropdown } from "react-bootstrap";

const Navigation = () => {
  return (
    <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
      <div className="navbar-container d-flex content">
        <div className="bookmark-wrapper d-flex align-items-center">
          <ul className="nav navbar-nav d-xl-none">
            <li className="nav-item">
              <a className="nav-link menu-toggle" href="javascript:void(0);">
                <i className="ficon" data-feather="menu"></i>
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav bookmark-icons">
            {/* Bookmark icons */}
          </ul>
          <ul className="nav navbar-nav">
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link bookmark-star">
                <i className="ficon text-warning" data-feather="star"></i>
              </a>
              <div className="bookmark-input search-input">
                <div className="bookmark-input-icon">
                  <i data-feather="search"></i>
                </div>
                <input
                  className="form-control input"
                  type="text"
                  placeholder="Bookmark"
                  tabIndex="0"
                  data-search="search"
                />
                <ul className="search-list search-list-bookmark"></ul>
              </div>
            </li>
          </ul>
        </div>
        <ul className="nav navbar-nav align-items-center ml-auto">
          <li className="nav-item dropdown dropdown-language">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-flag">
                <i className="flag-icon flag-icon-us"></i>
                <span className="selected-language">English</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#" data-language="en">
                  <i className="flag-icon flag-icon-us"></i> English
                </Dropdown.Item>
                {/* Other language options */}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link nav-link-style">
              <i className="ficon" data-feather="moon"></i>
            </a>
          </li>
          <li className="nav-item nav-search">
            <a className="nav-link nav-link-search">
              <i className="ficon" data-feather="search"></i>
            </a>
            <div className="search-input">
              <div className="search-input-icon">
                <i data-feather="search"></i>
              </div>
              <input
                className="form-control input"
                type="text"
                placeholder="Explore Vuexy..."
                tabIndex="-1"
                data-search="search"
              />
              <div className="search-input-close">
                <i data-feather="x"></i>
              </div>
              <ul className="search-list search-list-main"></ul>
            </div>
          </li>
          {/* Cart dropdown */}
          <li className="nav-item dropdown dropdown-cart mr-25">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-cart">
                <i className="ficon" data-feather="shopping-cart"></i>
                <span className="badge badge-pill badge-primary badge-up cart-item-count">
                  6
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>{/* Cart items */}</Dropdown.Item>
                <Dropdown.Item className="dropdown-menu-footer">
                  {/* Cart total and checkout button */}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {/* Notification dropdown */}
          <li className="nav-item dropdown dropdown-notification mr-25">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-notification">
                <i className="ficon" data-feather="bell"></i>
                <span className="badge badge-pill badge-danger badge-up">
                  5
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>{/* Notifications */}</Dropdown.Menu>
            </Dropdown>
          </li>
          {/* User profile dropdown */}
          <li className="nav-item dropdown dropdown-user">
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-user">
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name font-weight-bolder">John Doe</span>
                  <span className="user-status">Admin</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src="../../../app-assets/images/portrait/small/avatar-s-11.jpg"
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                  <span className="avatar-status-online"></span>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="page-profile.html">
                  <i className="mr-50" data-feather="user"></i> Profile
                </Dropdown.Item>
                <Dropdown.Item href="app-email.html">
                  <i className="mr-50" data-feather="mail"></i> Inbox
                </Dropdown.Item>
                <Dropdown.Item href="app-todo.html">
                  <i className="mr-50" data-feather="check-square"></i> Task
                </Dropdown.Item>
                <Dropdown.Item href="app-chat.html">
                  <i className="mr-50" data-feather="message-square"></i> Chats
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <Dropdown.Item href="page-account-settings.html">
                  <i className="mr-50" data-feather="settings"></i> Settings
                </Dropdown.Item>
                <Dropdown.Item href="page-pricing.html">
                  <i className="mr-50" data-feather="credit-card"></i> Pricing
                </Dropdown.Item>
                <Dropdown.Item href="page-faq.html">
                  <i className="mr-50" data-feather="help-circle"></i> FAQ
                </Dropdown.Item>
                <Dropdown.Item href="page-auth-login-v2.html">
                  <i className="mr-50" data-feather="power"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
