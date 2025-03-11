import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegistration from './components/CustomerRegistration';
import AdminRegistration from './components/AdminRegistration';
import AdminLogin from './components/AdminLogin';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/customer-register" element={<CustomerRegistration />} />
                <Route path="/admin-register" element={<AdminRegistration />} />
                <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>
        </Router>
    );
};

export default App;