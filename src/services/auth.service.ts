import pool from '../config/db';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import Redis from 'redis';
import jwt from 'jsonwebtoken';

const redis = new Redis({
  host: 'localhost', 
  port: 6379, 
});

export class AuthService {
  async register(
    username: string,
    email: string,
    password: string,
    fullName: string,
  ): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO Users (username, email, password, full_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, fullName],
    );
    return result.rows[0] as User;
  }

  async login(username: string, password: string): Promise<User | null> {

    const result = await pool.query(
      'SELECT * FROM Users WHERE username = $1', 
      [username]
    );

    const user = result.rows[0] as User | undefined;

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, 'tytututug', { expiresIn: '1h' });
      await redis.setex(`token:${user.id}`, 3600, token);
      return user;
    }

    return null;

  }

  async createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<void> {
    await pool.query(
      'INSERT INTO Password_Resets (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [userId, token, expiresAt],
    );
  }
}