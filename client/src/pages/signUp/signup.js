// import React, { useState } from 'react';
// import './signup.css'; // Import your CSS file
// import axios from 'axios';

// const Signup = ({ history }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [userRole, setUserRole] = useState('backofficer'); // Default role

//   const handleSignup = async () => {
//     try {
//       // Create a user object with the provided username, password, and userRole
//       const user = {
//         username,
//         password,
//         userRole,
//       };

//       // Make a POST request to the backend for user signup
//       const response = await axios.post('https://localhost:44304/api/auth/register', user);

//       if (response.status === 200) {
//         // Signup successful, you can handle it accordingly
//         console.log('Signup successful');
//         history.push('/login'); // Redirect to the login page
//       } else {
//         // Handle signup errors (e.g., display an error message)
//         console.error('Signup failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error during signup:', error);
//     }
//   };

//   return (
//     <div className="signup-container"> {/* Apply the new design container class */}
//       <div className="signup-form">
//         <h2>Sign Up</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <select onChange={(e) => setUserRole(e.target.value)} value={userRole}>
//           <option value="backofficer">Back Officer</option>
//           <option value="travelagent">Travel Agent</option>
//         </select>
//         <button onClick={handleSignup}>Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import './signup.css'; // Import your CSS file
import axios from 'axios';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('backofficer'); // Default role
  const [usernameError, setUsernameError] = useState(''); // Add state for username validation error

  const handleSignup = async () => {
    // Reset username error before making a new signup attempt
    setUsernameError('');

    // Validate the username before sending the request
    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    try {
      // Create a user object with the provided username, password, and userRole
      const user = {
        username,
        password,
        userRole,
      };

      // Make a POST request to the backend for user signup
      const response = await axios.post('https://localhost:44304/api/auth/register', user);

      if (response.status === 200) {
        // Signup successful, you can handle it accordingly
        console.log('Signup successful');
        history.push('/login'); // Redirect to the login page
      } else {
        // Handle signup errors (e.g., display an error message)
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {usernameError && <div className="error-message">{usernameError}</div>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setUserRole(e.target.value)} value={userRole}>
        <option value="backofficer">Back Officer</option>
        <option value="travelagent">Travel Agent</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  </div>
  );
};

export default Signup;
