import mongoose from 'mongoose';
import { IClub } from '../types/Interfaces';

const ClubSchema = new mongoose.Schema<IClub>({
  name: {
    type: String,
    required: [true, 'Please enter your club name'],
  },
  division: {
    type: String,
    required: [true, 'Please enter your division'],
    unique: true,
  },
  clubId: {
    type: String,
    required: [true, 'Please enter your club ID'],
    unique: true,
  },
  contactEmail: {
    type: String,
    required: [true, 'Please enter your contact email'],
    unique: true,
  },
  contactName: {
    type: String,
    required: [true, 'Please enter your contact name'],
  },
});

ClubSchema.pre('save', function (next) {
  this.clubId = this.clubId.toUpperCase();
  next();
});

export default mongoose.model('Club', ClubSchema);
