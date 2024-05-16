import React from "react";

import "../app-assets/css/bootstrap.css";
import "../app-assets/css/bootstrap-extended.css";
import "../app-assets/css/colors.css";
import "../app-assets/css/components.css";
import "../app-assets/css/themes/dark-layout.css";
import "../app-assets/css/themes/bordered-layout.css";
import "../app-assets/css/themes/semi-dark-layout.css";
import "../app-assets/css/core/menu/menu-types/vertical-menu.css";
import "../app-assets/css/plugins/forms/form-validation.css";
import "../app-assets/css/pages/page-auth.css";
import "../app-assets/css/style.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static">
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
