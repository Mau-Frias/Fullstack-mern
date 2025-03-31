import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import userSchema from '../schemas/user.schema.js';

// This function creates a new user in the database
const createUser = async (req, res) => {
    try {
        // Validate request body with Zod
        const validatedData = userSchema.parse(req.body);

        // Hash the user's password before saving
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        // Create a new user instance and save it to the database
        const user = new User({
            ...validatedData
        });
        const newUser = await user.save();

        // Respond with the newly created user
        res.status(201).json(newUser.name, newUser.email, newUser.isAdmin);
    } catch (error) {
        // Handle validation errors or other exceptions
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function retrieves all users from the database
// and returns them in a JSON format
const getUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Map the user data to exclude sensitive information
        const result = users.map((user) => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            };
        });

        // Respond with the list of users
        res.status(200).json(result);
    } catch (error) {
        // Handle errors during the fetch operation
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function retrieves a user by ID from the database
// and returns it in a JSON format
const getUserById = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        // If the user is not found, respond with a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user's data
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        // Handle errors during the fetch operation
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function updates a user by ID in the database
const updateUser = async (req, res) => {
    try {
        // Validate request body with Zod (partial validation for updates)
        const validatedData = userSchema.partial().parse(req.body);

        // Hash the password if it is being updated
        let hashedPassword;
        if (validatedData.password) {
            hashedPassword = await bcrypt.hash(validatedData.password, 10);
        }

        // Find the user by ID and update their data
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                ...validatedData,
                ...(hashedPassword && { password: hashedPassword })
            },
            { new: true }
        );

        // If the user is not found, respond with a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the updated user's data
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        // Handle validation errors or other exceptions
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function deletes a user by ID in the database
const deleteUser = async (req, res) => {
    try {
        // Find the user by ID and delete them
        const user = await User.findByIdAndDelete(req.params.id);

        // If the user is not found, respond with a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle errors during the delete operation
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// Export all the functions as an object
export { createUser, getUsers, getUserById, updateUser, deleteUser };
