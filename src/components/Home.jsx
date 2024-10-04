// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function getUser() {
//   const user = localStorage.getItem('user');
//   return user && user !== 'undefined' ? JSON.parse(user) : null;
// }

// function Home() {
//   const [user, setUser] = useState(getUser());

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <div>
//       {user ? (
//         <> 
//           <h4>
//             Welcome, {user.email}! You have successfully{' '}
//             {user.isRegistered ? 'registered' : 'logged in'}.
//           </h4>
//           <button className='btn btn-secondary btn-md' onClick={handleLogout}>
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link to='/register' className='btn btn-info'>
//             Register
//           </Link>
//           <Link to='/login' className='btn btn-primary'>
//             Login
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import '../App.css'; // Import custom CSS

function getUser() {
  const user = localStorage.getItem('user');
  return user && user !== 'undefined' ? JSON.parse(user) : null;
}

function Home() {
  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Box className="background-container">
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" gutterBottom>
          Password Reset Flow
        </Typography>
      </Box>
      <Box className="form-side">
        <Box className="form-container">
          {user ? (
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Welcome, {user.email}! You have successfully{' '}
                {user.isRegistered ? 'registered' : 'logged in'}.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Button
                variant="contained"
                color="info"
                component={Link}
                to="/register"
                sx={{ mb: 2 }}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

