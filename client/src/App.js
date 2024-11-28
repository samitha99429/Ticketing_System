
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/admin/common/header/Header'; // Import the Header component
import DummySidebar from './components/admin/common/dummySidebar/dummySidebar';
import Login from './pages/login/login';
import Signup from './pages/signUp/signup';
import TicketBooking from './pages/backofficer/TicketBookingManagement/ticketBooking';
import Dashboard from './pages/admin/dashboard/dashboard';
import Profile from './pages/travelAgent/profileManagement/profile';
import Train from './pages/backofficer/trainManagement/train';


const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  }, []);

  const onLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <Router>
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        handleLogout={handleLogout}
        showLoginForm={() => setShowLoginForm(true)} // Function to show the login form
      />
      {/* <DummySidebar /> */}
     
      <main className="App-main">
        {isLoggedIn ? (
          
            <Switch>
              <Route path="/:userRole/profile">
              <Profile userRole={userRole} />
              </Route>
          <Route path="/:userRole/profile">
                 <Profile userRole={userRole} />
               </Route>
               <Route path="/:userRole/ticketbooking">
                 <TicketBooking userRole={userRole} />
               </Route>
               <Route path="/:userRole/train">
                 <Train userRole={userRole} />
               </Route>
               
               <Route path="/:userRole">
               <Dashboard /> 
               </Route>
             </Switch>
         
        ) : (
          showLoginForm ? (
            <Login
              onLogin={onLogin}
              showSignupForm={() => setShowSignup(true)}
            />
          ) : (
            <div className="ticket-booking-container">
  <div style={{ background: 'linear-gradient(to right, #61dafb, #0d898d)', display: 'inline' }}>
    <h1 style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: '' }}>
      Welcome to Train Ticket Reservation System
    </h1>
    <p style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: '' }}>
      Please login to continue
    </p>
  </div>
  <div className="card-deck">
    <div className="card">
      <img src="https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/030/141/original/fe384124897b207f2e24b34c6d92f784/article-italy-milan-train-ticket.jpg" className="card-img-top" alt="Train 2" />
      <div className="card-body">
        {/* Card content */}
      </div>
    </div>
  </div>
</div>

          )
        )}
        {showSignup && <Signup />}
      </main>
    </div>
  </Router>


  );
};

export default App;
