import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

import {
  requireAuth,
} from '../middleware/authMiddleware.js';

const router = express.Router();

function setAuthCookie(
  res,
  userId
) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );

  res.cookie(
    'token',
    token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        'production',

      sameSite: 'lax',

      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    }
  );
}

function safeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    householdSize:
      user.householdSize,
    location: user.location,
    preferredAlertDays:
      user.preferredAlertDays,
  };
}

/* REGISTER */

router.post(
  '/register',
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res
          .status(400)
          .json({
            message:
              'Name, email, and password are required.',
          });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({
            message:
              'Password must contain at least 8 characters.',
          });
      }

      const normalizedEmail =
        email
          .trim()
          .toLowerCase();

      const existingUser =
        await User.findOne({
          email:
            normalizedEmail,
        });

      if (existingUser) {
        return res
          .status(409)
          .json({
            message:
              'An account already exists with this email.',
          });
      }

      const passwordHash =
        await bcrypt.hash(
          password,
          12
        );

      const user =
        await User.create({
          name: name.trim(),

          email:
            normalizedEmail,

          passwordHash,
        });

      setAuthCookie(
        res,
        user._id
      );

      res.status(201).json({
        user:
          safeUser(user),
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          'Could not create account.',
      });
    }
  }
);

/* LOGIN */

router.post(
  '/login',
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const normalizedEmail =
        email
          ?.trim()
          .toLowerCase();

      const user =
        await User
          .findOne({
            email:
              normalizedEmail,
          })
          .select(
            '+passwordHash'
          );

      if (!user) {
        return res
          .status(401)
          .json({
            message:
              'Invalid email or password.',
          });
      }

      const passwordMatches =
        await bcrypt.compare(
          password,
          user.passwordHash
        );

      if (!passwordMatches) {
        return res
          .status(401)
          .json({
            message:
              'Invalid email or password.',
          });
      }

      setAuthCookie(
        res,
        user._id
      );

      res.json({
        user:
          safeUser(user),
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          'Could not log in.',
      });
    }
  }
);

/* CURRENT USER */

router.get(
  '/me',
  requireAuth,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.userId
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              'User not found.',
          });
      }

      res.json({
        user:
          safeUser(user),
      });
    } catch (error) {
      res.status(500).json({
        message:
          'Could not load profile.',
      });
    }
  }
);

/* UPDATE PROFILE */

router.put(
  '/profile',
  requireAuth,
  async (req, res) => {
    try {
      const {
        name,
        householdSize,
        location,
        preferredAlertDays,
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.userId,
          {
            name,
            householdSize,
            location,
            preferredAlertDays,
          },
          {
            new: true,
            runValidators: true,
          }
        );

      res.json({
        user:
          safeUser(user),
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        message:
          'Could not update profile.',
      });
    }
  }
);

/* LOGOUT */

router.post(
  '/logout',
  (req, res) => {
    res.clearCookie(
      'token',
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          'production',

        sameSite: 'lax',
      }
    );

    res.json({
      message:
        'Logged out successfully.',
    });
  }
);

export default router;