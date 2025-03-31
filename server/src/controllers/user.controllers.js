import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import userSchema from '../schemas/user.schema.js';

// This function creates a new user in the database
const createUser = async (req, res) => {
    try {
        console.log('createUser: Received request body:', req.body); // Debug log
        const validatedData = userSchema.parse(req.body);
        console.log('createUser: Validated data:', validatedData); // Debug log

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        console.log('createUser: Hashed password generated'); // Debug log

        const user = new User({
            ...validatedData,
            password: hashedPassword
        });
        const newUser = await user.save();
        console.log('createUser: New user saved:', newUser); // Debug log

        res.status(201).json(newUser.name, newUser.email, newUser.isAdmin);
    } catch (error) {
        console.error('createUser: Error occurred:', error); // Debug log
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
        console.log('getUsers: Fetching all users'); // Debug log
        const users = await User.find();
        console.log('getUsers: Users fetched:', users); // Debug log

        const result = users.map((user) => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            };
        });
        console.log('getUsers: Mapped user data:', result); // Debug log

        // Respond with the list of users
        res.status(200).json(result);
    } catch (error) {
        console.error('getUsers: Error occurred:', error); // Debug log
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function retrieves a user by ID from the database
// and returns it in a JSON format
const getUserById = async (req, res) => {
    try {
        console.log('getUserById: Fetching user with ID:', req.params.id); // Debug log
        const user = await User.findById(req.params.id);

        // If the user is not found, respond with a 404 error
        if (!user) {
            console.warn('getUserById: User not found'); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('getUserById: User found:', user); // Debug log
        // Respond with the user's data
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        console.error('getUserById: Error occurred:', error); // Debug log
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// This function updates a user by ID in the database
const updateUser = async (req, res) => {
    try {
        console.log('updateUser: Received request body:', req.body); // Debug log
        const validatedData = userSchema.partial().parse(req.body);
        console.log('updateUser: Validated data:', validatedData); // Debug log

        // Hash the password if it is being updated
        let hashedPassword;
        if (validatedData.password) {
            hashedPassword = await bcrypt.hash(validatedData.password, 10);
            console.log('updateUser: Hashed password generated'); // Debug log
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
            console.warn('updateUser: User not found'); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('updateUser: User updated:', user); // Debug log
        // Respond with the updated user's data
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        console.error('updateUser: Error occurred:', error); // Debug log
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
        console.log('deleteUser: Deleting user with ID:', req.params.id); // Debug log
        const user = await User.findByIdAndDelete(req.params.id);

        // If the user is not found, respond with a 404 error
        if (!user) {
            console.warn('deleteUser: User not found'); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('deleteUser: User deleted successfully'); // Debug log
        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('deleteUser: Error occurred:', error); // Debug log
        res.status(500).json({
            message: error.message || 'Something went wrong'
        });
    }
};

// Export all the functions as an object
export { createUser, getUsers, getUserById, updateUser, deleteUser };
