import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// This function creates a new user in the database
async function createUser(req, res) {
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
}

// This function retrieves all users from the data                                                                base
// and returns them in a JSON format
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const result = users.map((user) => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
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

const getUserById = async (req, res) => {
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
const updateUser = async (req, res) => {
    // Check if the user exists
    // and update the user information
    try {
        // Hash the new password if provided
        let hashedPassword;
        if (req.body.password) {
            hashedPassword = await bcrypt.hash(req.body.password, 10);
        }   

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
const deleteUser = async (req, res) => {
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

// Export all the functions as an object

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
