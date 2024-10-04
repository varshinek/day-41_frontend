import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import '../App.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userCredentials = { email, password };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload && result.payload.user) {
        setEmail('');
        setPassword('');
        localStorage.setItem('user', JSON.stringify({ email, isRegistered: true }));
        navigate('/');
      } else {
        setErrorMessage('Login failed. Please check your credentials or register.');
      }
    });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box className="background-container">
      <Box className="form-side">
        <Box className="form-container">
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
            {error || errorMessage ? (
              <Alert severity="error" className="alert-error">
                {errorMessage || error}
              </Alert>
            ) : null}
            <Button
              variant="text"
              fullWidth
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={handleRegister}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
