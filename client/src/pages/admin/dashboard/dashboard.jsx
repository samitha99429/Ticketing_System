
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { userRole } = useParams(); // Get the userRole from URL parameters
  const handleMenuItemClick = () => {
    alert('Please log in to access the dashboard.');
  };

  return (
    <div className="sidebar">
      <ul>

        <li>
          <Link to={`/${userRole}`}>
            <span className="icon"><i className="fa fa-dashboard" /></span>
            <span className="title">
              {userRole === 'backofficer' ? 'Hello Back Officer Dashboard' : 'Hello Travel Agent Dashboard'}
            </span>
          </Link>
        </li>
        <li>
          <Link to={`/${userRole}/profile`}>
            <span className="icon"><i className="fa fa-user" aria-hidden="true" /></span>
            <span className="title">Profile</span>
          </Link>
        </li>
        <li>
          <Link to={`/${userRole}/ticketbooking`}>
            <span className="icon"><i className="fa fa-user" aria-hidden="true" /></span>
            <span className="title">Ticket Booking</span>
          </Link>
        </li>
 
        {userRole === 'backofficer' && (
          <li>
            <Link to={`/${userRole}/train`}>
              <span className="icon"><i className="fa fa-train" aria-hidden="true" /></span>
              <span className="title">Train Management</span>
            </Link>
          </li>
        )}
        {/* Other navigation links */}
      </ul>
    </div>
  );
};

export default Dashboard;





