// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Initialize navigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/reset-password', { email });
//       setMessage(response.data.message);

//       // Navigate to the Verify Token page after a successful response
//       if (response.status === 200) {
//         const token = response.data.token;  // Assuming the token is returned in the response
//         navigate(`/verify-token/${token}`); // Redirect with the token
//       }
//     } catch (error) {
//       setMessage('Error sending reset password request');
//     }
//   };

//   return (
//     <div>
//       <form className='form-group custom-form' onSubmit={handleSubmit}>
//         <label>Email</label>
//         <input
//           type='email'
//           required
//           className='form-control'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <button type='submit' className='btn btn-info btn-md'>
//           Request Reset Token
//         </button>
//       </form>
//       {message && <div className='alert alert-info'>{message}</div>}
//     </div>
//   );
// }

// export default ForgotPassword;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import '../App.css'; // Import the CSS file

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/reset-password', { email });
      setMessage(response.data.message);

      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is returned in the response
        navigate(`/verify-token/${token}`); // Redirect with the token
      }
    } catch (error) {
      setError('Error sending reset password request. Please check the email and try again.');
    }
  };

  return (
    <Box className="background-container">
      <Box className="form-side">
        <Box className="form-container">
          <Typography variant="h4" gutterBottom>
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Request Reset Token
            </Button>
            {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
