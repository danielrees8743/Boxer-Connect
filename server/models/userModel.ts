import mongoose from 'mongoose';
import { ICoach } from '../types/Interfaces';
import Club from './clubModel';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validator from 'validator';

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
    required: [true, 'Please enter your email address'],
    lowercase: true,
    unique: true,
    validate: [
      validator.isEmail,
      'The email entered is not valid, Please enter a valid email',
    ],
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
    enum: ['Head-Coach', 'Assistant-Coach'],
    default: 'Assistant-Coach',
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
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
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

CoachSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  //note -1000 is set to ensure that changedAt is always before the token is issued, this prevents any issues with being automatically logged in after changing password
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

CoachSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//info instance method - available on all documents and instance's of a collection
CoachSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

CoachSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseFloat(
      Number(this.passwordChangedAt.getTime() / 1000).toFixed(10)
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

CoachSchema.methods.createRandomPasswordToken = function (): string {
  const resetToken: string = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
export default mongoose.model<ICoach>('Coach', CoachSchema);
