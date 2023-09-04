const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');

const router = express.Router();

const secretKey = crypto.randomBytes(64).toString('hex');

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new User({
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
      }
});

module.exports = router;
