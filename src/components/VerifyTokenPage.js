import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import '../App.css'; // Import the CSS file for styling

function VerifyTokenPage() {
  const [token, setToken] = useState(''); // State for user-entered token
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false); // Track token validity
  const navigate = useNavigate(); // For navigation to reset password page

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call to verify the token
      const response = await axios.get(`http://localhost:3000/api/verify-token/${token}`);

      if (response.data.valid) {
        setMessage('Token is valid!');
        setIsValid(true);
        // Redirect to reset password page with the token
        navigate(`/reset-password/${token}`);
      } else {
        setMessage('Invalid or expired token');
        setIsValid(false);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error verifying the token');
      setIsValid(false);
    }
  };

  return (
    <Box className="background-container">
      <Box className="form-side">
        <Box className="form-container">
          <Typography variant="h4" gutterBottom>
            Verify Your Token
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter the Token"
              variant="outlined"
              fullWidth
              margin="normal"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Verify Token
            </Button>
            {message && (
              <Alert severity={isValid ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default VerifyTokenPage;
