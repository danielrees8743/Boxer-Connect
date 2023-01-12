import mongoose from 'mongoose';
import { ICoach } from '../types/Interfaces';
import Club from './clubModel';
import bcrypt from 'bcrypt';

const CoachSchema = new mongoose.Schema<ICoach>({
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
    minlength: [8, 'You Password need to be 8 characters or more'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //note this will only work on CREATE and SAVE, not on UPDATE!!
      validator: function (el: string) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
    select: false,
  },
  role: {
    type: String,
    enum: ['Head-Coach', 'Assistant-coach'],
    default: 'Head-Coach',
  },
  contactNumber: {
    type: String,
    required: [true, 'Please enter a contact number'],
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
  accountConfirmed: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: Date,
});

//info pre save middleware
CoachSchema.pre('save', async function (next) {
  const club = await Club.findOne({ club: this.club });
  if (!club) {
    return next(new Error('Club does not exist'));
  }
  this.club = club;
  next();
});

CoachSchema.pre('save', async function (next): Promise<void> {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
  next();
});

//info instance method - available on all documents and instance's of a collection
CoachSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

CoachSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseFloat(
      Number(this.passwordChangedAt.getTime() / 1000).toFixed(10)
    );

    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export default mongoose.model<ICoach>('Coach', CoachSchema);
