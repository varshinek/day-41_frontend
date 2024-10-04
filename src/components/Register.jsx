// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../Store/UserSlice';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Container, Alert, Box } from '@mui/material';
// import '../App.css'; // Import the CSS file

// function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error } = useSelector((state) => state.user);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     const userCredentials = { email, password };
//     dispatch(registerUser(userCredentials)).then((result) => {
//       if (result.payload) {
//         setEmail('');
//         setPassword('');
//         localStorage.setItem('user', JSON.stringify({ email, isRegistered: true }));
//         navigate('/');
//       } else {
//         console.error('Registration failed:', result.error);
//       }
//     });
//   };

//   return (
//     <Box className="background-container">
//       <Container className="container-style">
//         <Typography variant="h4" gutterBottom align="center" color="#2196F3">
//           Register
//         </Typography>
//         <form onSubmit={handleRegister}>
//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//             sx={{ mt: 2 }}
//           >
//             {loading ? 'Loading...' : 'Register'}
//           </Button>
//           {error && (
//             <Alert severity="error" className="alert-error">
//               {error}
//             </Alert>
//           )}
//         </form>
//       </Container>
//     </Box>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import '../App.css'; // Import the CSS file

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }
    const userCredentials = { email, password };
    dispatch(registerUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        localStorage.setItem('user', JSON.stringify({ email, isRegistered: true }));
        navigate('/');
      } else {
        setErrorMessage('Registration failed.');
      }
    });
  };

  return (
    <Box className="background-container">
      <Box className="form-side">
        <Box className="form-container">
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </Button>
            {error || errorMessage ? (
              <Alert severity="error" className="alert-error">
                {errorMessage || error}
              </Alert>
            ) : null}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
