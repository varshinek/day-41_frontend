import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../App.css'; // Import custom CSS

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams(); // Get token from URL params
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            // Send POST request to reset password with the token
            const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, { password });
            setMessage(response.data.message);

            // Redirect to login page after 3 seconds if password reset is successful
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <Box className="background-container">
            <Box className="form-side">
                <Box className="form-container">
                    <Typography variant="h4" gutterBottom>
                        Reset Your Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="New Password"
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
                            sx={{ mt: 2 }}
                        >
                            Reset Password
                        </Button>
                        {message && (
                            <Alert severity={message.includes('Error') ? 'error' : 'info'} sx={{ mt: 2 }}>
                                {message}
                            </Alert>
                        )}
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

export default ResetPassword;

