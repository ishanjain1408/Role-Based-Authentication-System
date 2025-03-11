import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CustomerRegistration.css';

const CustomerRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                ...formData,
                role: 'customer'
            });
            alert(res.data.message);
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <div className="customer-registration">
        <h2>Customer Registration</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    </div>
    );
};

export default CustomerRegistration;