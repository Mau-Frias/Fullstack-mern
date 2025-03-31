import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import COOKIE_OPTIONS from '../utils/cookieOptions.js';
import { loginSchema, registerSchema } from '../schemas/authSchemas.js';
import { z } from 'zod';

// This function handles user login
const loginUser = async (req, res) => {
    try {
        console.log('Login request received:', req.body); // Debug log

        // Validate input
        const { email, password } = loginSchema.parse(req.body);
        console.log('Validated login input:', { email }); // Debug log

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found for email:', email); // Debug log
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }
        console.log('User found:', user._id); // Debug log

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.error('Invalid credentials for email:', email); // Debug log
            return res
                .status(401)
                .json({ success: false, message: 'Invalid credentials' });
        }
        console.log('Password verified for user:', user._id); // Debug log

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined'); // Debug log
            return res
                .status(500)
                .json({
                    success: false,
                    message: 'Server configuration error'
                });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('Generated token for user:', user._id); // Debug log

        // Set the token as a cookie
        res.cookie('token', token, COOKIE_OPTIONS);
        console.log('Token set as cookie for user:', user._id); // Debug log

        // Return the user data in the response
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
        console.log('Login response sent for user:', user._id); // Debug log
    } catch (error) {
        console.error('Error during login:', error.message); // Debug log
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ success: false, errors: error.errors });
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    }
};

// This function handles user registration
const registerUser = async (req, res) => {
    try {
        console.log('Registration request received:', req.body); // Debug log

        // Validate input
        const { name, email, password, isAdmin } = registerSchema.parse(req.body);
        console.log('Validated registration input:', { name, email }); // Debug log

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password for email:', email); // Debug log

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin
        });
        const newUser = await user.save();
        console.log('New user created:', newUser._id); // Debug log

        res.status(201).json({ success: true, data: newUser });
        console.log('Registration response sent for user:', newUser._id); // Debug log
    } catch (error) {
        console.error('Error during registration:', error.message); // Debug log
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ success: false, errors: error.errors });
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    }
};

// Add a logout function to clear the cookie
const logoutUser = (req, res) => {
    try {
        console.log('Logout request received'); // Debug log
        res.clearCookie('token', COOKIE_OPTIONS);
        console.log('Token cleared from cookies'); // Debug log
        res.status(200).json({ success: true, message: 'Logged out successfully' });
        console.log('Logout response sent'); // Debug log
    } catch (error) {
        console.error('Error during logout:', error.message); // Debug log
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong'
        });
    }
};

export { loginUser, registerUser, logoutUser };
