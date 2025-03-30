import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// This function creates a new user in the database
createUser = async (req, res) => {
    // Check if the user already exists
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function retrieves all users from the database
// and returns them in a JSON format
getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const result = users.map((user) => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                password: user.password
            };
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function retrieves a user by ID from the database
// and returns it in a JSON format

getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function updates a user by ID in the database
updateUser = async (req, res) => {
    // Check if the user exists
    // and update the user information
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function delete a user by ID in the database
deleteUser = async (req, res) => {
    // Check if the user exists
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function handles user login
loginUser = async (req, res) => {
    try {
        //find user by email
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        // The token contains the user's ID and admin status
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the user data and token in the response

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token
        });
    } catch (error) {
        // Handle errors and return a 500 status code with an error message
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

export default {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};
