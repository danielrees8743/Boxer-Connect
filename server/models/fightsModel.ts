import mongoose from 'mongoose';
import { IFights } from '../types/Interfaces';
import Boxer from './boxerModel';

const FightsSchema = new mongoose.Schema<IFights>({
  fighter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boxer',
  },
  wins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boxer',
    },
  ],
  draws: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boxer',
    },
  ],
  losses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boxer',
    },
  ],
  opponent: {
    boxer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boxer',
    },
    date: {
      type: Date,
      required: [true, 'Please enter a date'],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
    },
    result: {
      type: String,
      enum: ['win', 'loss', 'draw'],
      required: [true, 'Please enter a result'],
    },
  },
});

FightsSchema.pre('save', async function (next) {
  const boxer = await Boxer.findOne({ boxer: this.fighter });
  if (!boxer) {
    return next(new Error('Boxer does not exist'));
  }
  this.fighter = boxer;
  next();
});

export default mongoose.model('Fights', FightsSchema);
