import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyTokenPage from './components/VerifyTokenPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/verify-token/:token' element={<VerifyTokenPage />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
