const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const nodemailer = require('nodemailer');

const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        verificationToken
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the link: http://localhost:5000/verify-email?token=${verificationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.role === 'customer') {
        return res.status(403).json({ message: 'You are not allowed to login from here' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token });
};

module.exports = { register, login };