import mongoose from 'mongoose';
import { IUser } from '../types/Interfaces';
import Club from './clubModel';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'club', 'boxer'],
    default: 'boxer',
  },
  contactNumber: {
    type: Number,
    required: [true, 'Please enter a contact number'],
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
});

UserSchema.pre('save', async function (next) {
  const club = await Club.findOne({ club: this.club });
  if (!club) {
    return next(new Error('Club does not exist'));
  }
  this.club = club;
  next();
});

UserSchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

export default mongoose.model('User', UserSchema);
