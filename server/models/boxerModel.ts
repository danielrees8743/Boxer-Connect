import mongoose, { Schema } from 'mongoose';
import { IBoxer } from '../types/Interfaces';
import shortid from 'shortid';
import Club from './clubModel';

const BoxerSchema = new Schema<IBoxer>({
  club: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Please enter your club'],
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  nickname: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true, 'Please enter your date of birth'],
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  weight: {
    type: Number,
    required: [true, 'Please enter your weight in kg'],
  },
  height: {
    type: Number,
    required: [true, 'Please enter your height in cm'],
  },
  stance: {
    type: String,
    required: [true, 'Please enter your stance, either orthodox or southpaw'],
  },
  picture: {
    type: String,
  },
  id: {
    type: String,
  },
  fights: {
    type: Schema.Types.ObjectId,
    ref: 'Fights',
    required: false,
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please enter your license number'],
  },
  fitToFight: {
    type: Boolean,
    required: [true, 'Please enter if you are fit to fight'],
  },
});

BoxerSchema.pre('save', async function (next): Promise<void> {
  const age = new Date().getFullYear() - this.dob.getFullYear();
  this.age = age;
  next();
});

BoxerSchema.pre('save', async function (next) {
  const club = await Club.findOne({ club: this.club });
  if (!club) {
    throw new Error('Club does not exist');
  }
  this.club = club;

  next();
});

BoxerSchema.pre('save', async function (next): Promise<void> {
  this.id = shortid.generate();
  next();
});

export default mongoose.model<IBoxer>('Boxer', BoxerSchema);
