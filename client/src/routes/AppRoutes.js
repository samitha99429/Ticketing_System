import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import ClientLayout from "../layout/ClientLayout";
import BackofficerLayout from '../layout/Backofficerlayout'
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import ClientHeader from "../components/client/common/header/ClientHeader";
import TicketBooking from "../pages/backofficer/TicketBookingManagement/ticketBooking";
import Traveler from "../pages/backofficer/travelerManagement/traveler";
import Train from "../pages/backofficer/trainManagement/train";
import Profile from "../pages/travelAgent/profileManagement/profile";


const BackofficerRoutes = () => {
    return (
      <BackofficerLayout class="wrapper">
        <Header />
        <Sidebar />
        <Switch>
          <Route path="/backofficer" component={Dashboard} exact />
          <Route path="/backofficer/ticketbooking" component={TicketBooking} />
          <Route path="/backofficer/traveler" component={Traveler} />
          <Route path="/backofficer/train" component={Train} />
        </Switch>
      </BackofficerLayout>
    );
  };
  
  const AppRoutes = () => {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/backofficer" component={BackofficerRoutes} />
            <Route path="/travelagent/profile" component={Profile} />
            {/* Other routes */}
          </Switch>
        </Router>
      </div>
    );
  };
  
  export default AppRoutes;
