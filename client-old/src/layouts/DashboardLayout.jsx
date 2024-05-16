import React from "react";
import "../app-assets/vendors/css/charts/apexcharts.css";
import "../app-assets/vendors/css/extensions/toastr.min.css";
import "../app-assets/css/bootstrap.css";
import "../app-assets/css/bootstrap-extended.css";
import "../app-assets/css/colors.css";
import "../app-assets/css/components.css";
import "../app-assets/css/themes/dark-layout.css";
import "../app-assets/css/themes/bordered-layout.css";
import "../app-assets/css/themes/semi-dark-layout.css";
import "../app-assets/css/core/menu/menu-types/vertical-menu.css";
import "../app-assets/css/pages/dashboard-ecommerce.css";
import "../app-assets/css/plugins/charts/chart-apex.css";
import "../app-assets/css/plugins/extensions/ext-component-toastr.css";
import "../app-assets/css/style.css";

import Navigation from "../components/dashboard/sections/Navigation";
import MainMenu from "../components/dashboard/sections/MainMenu";

const DashboardLayout = () => {
  return (
    <div className="vertical-layout vertical-menu-modern  navbar-floating footer-static">
      <Navigation />
      <MainMenu />
    </div>
  );
};

export default DashboardLayout;
