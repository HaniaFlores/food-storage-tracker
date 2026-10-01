import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    householdSize: {
      type: Number,
      min: 1,
      default: 1,
    },

    location: {
      type: String,
      trim: true,
      default: '',
    },

    preferredAlertDays: {
      type: Number,
      min: 1,
      max: 365,
      default: 30,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  'User',
  userSchema
);

export default User;