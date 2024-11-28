import React from 'react';
import './dummy.css';
import { Link } from 'react-router-dom';

const DummySidebar = ({ userRole }) => {
  const handleMenuItemClick = () => {
    alert('Please log in to access the dashboard.');
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/backofficer" onClick={handleMenuItemClick}>
            <span className="icon"><i className="fa fa-dashboard" /></span>
            <span className="title">Dashboard</span>
          </Link>
        </li>
        {(
          <>
            <li>
              <Link to="" onClick={handleMenuItemClick}>
                <span className="icon"><i className="fa fa-ticket" aria-hidden="true"></i></span>
                <span className="title">Ticket-Booking</span>
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleMenuItemClick}>
                <span className="icon"><i className="fa fa-female" aria-hidden="true" /></span>
                <span className="title">Traveler</span>
              </Link>
            </li>
          </>
        )}
       (
          <li>
            <Link to="" onClick={handleMenuItemClick}>
              <span className="icon"><i className="fa fa-train" aria-hidden="true" /></span>
              <span className="title">Train</span>
            </Link>
          </li>
        )
        <li>
          <Link to="" onClick={handleMenuItemClick}>
            <span className="icon"><i className="fa fa-user" aria-hidden="true" /></span>
            <span className="title">Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DummySidebar;
