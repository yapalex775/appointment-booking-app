const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User, RefreshToken } = require('../models');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        
        const accessToken = jwt.sign({ userId: user.id, email: user.email, name: user.name }, ACCESS_SECRET, {
            expiresIn: '15m', // short-lived access token
        });
    
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
            expiresIn: '7d',
        });

        await RefreshToken.create({
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
    
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    try {
        const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!storedToken || new Date() > storedToken.expiresAt) {
            return res.status(403).json({ message: 'Refresh token not valid or expired' });
        }

        jwt.verify(refreshToken, REFRESH_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            const user = await User.findByPk(decoded.userId);

            const accessToken = jwt.sign({ userId: user.id, email: user.email, name: user.name }, ACCESS_SECRET, {
                expiresIn: '15m',
            });

            return res.json({ accessToken });
        });
    } catch (err) {
        console.error('Refresh error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
