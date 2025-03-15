import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import pool from '../config/db';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { username, email, password, fullName } = req.body;
  try {
    console.log('Received data:', { username, email, password, fullName });
    const user = await authService.register(username, email, password, fullName);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await authService.login(username, password);
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const userResult = await pool.query('SELECT id FROM Users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = userResult.rows[0].id;
    const token = 'random_token_' + Math.random().toString(36).substring(2); // Token mẫu
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Hết hạn sau 1 giờ
    await authService.createPasswordReset(userId, token, expiresAt);
    res.json({ message: 'Password reset token created', token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reset token', error });
  }
};