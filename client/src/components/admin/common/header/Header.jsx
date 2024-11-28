

// import React from 'react';
// import './header.css';
// import logo from '../../../../assets/logo/railway.png';
// import { Link, useHistory } from 'react-router-dom';

// const Header = ({ isLoggedIn, userRole, handleLogout, showLoginForm }) => {
//   const history = useHistory();

//   return (
//     <div className="header">
//       <div className="menu-icon">
//         <i className="fa fa-bars" />
//       </div>
//       <div className="logo-container">
//         <img src={logo} alt="logo"  height='60px' width='100px'  />
//         <h3>Ticket Reservation Office</h3>
//       </div>
//       <div className="menu-container">
//       <ul>
//           <li>
//             {isLoggedIn ? (
//               <p className="logout" onClick={handleLogout}>
//                 <i className="fa fa-sign-out logoutIcon" aria-hidden="true" />
//               </p>
//             ) : (
//               <p className="login" onClick={showLoginForm}>
//                 <i className="fa fa-sign-in loginIcon" aria-hidden="true" />
//                 <span>Login</span>
//               </p>
//             )}
//           </li>
//           <li>
//             <Link to="/">
//               <i className="fas fa-user" />
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import './header.css';
import logo from '../../../../assets/logo/railway.png';
import { Link, useHistory } from 'react-router-dom';

const Header = ({ isLoggedIn, userRole, handleLogout, showLoginForm }) => {
  const history = useHistory();
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
    <div className="header">
      <div className="menu-icon" onClick={toggleDashboard}>
        <i className={`fa ${showDashboard ? 'fa-times' : 'fa-bars'}`} />
      </div>
      <div className="logo-container">
        <img src={logo} alt="logo" height='60px' width='100px' />
        <h3>Ticket Reservation Office</h3>
      </div>
      <div className={`menu-container ${showDashboard ? 'menu-active' : ''}`}>
        <ul>
          <li>
            {isLoggedIn ? (
              <p className="logout" onClick={handleLogout}>
                <i className="fa fa-sign-out logoutIcon" aria-hidden="true" />
              </p>
            ) : (
              <p className="login" onClick={showLoginForm}>
                <i className="fa fa-sign-in loginIcon" aria-hidden="true" />
                <span>Login</span>
              </p>
            )}
          </li>
          <li>
            <Link to="/">
              <i className="fas fa-user" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
