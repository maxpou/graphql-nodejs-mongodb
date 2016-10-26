import mongoose from 'mongoose';

var beerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brewery: {
    type: String,
    ref: 'Brewery',
    required: true
  },
  alcohol: {
    type: Number,
    min: [4, 'Provide real beer please (too few degree)'],
    max: [25, 'Provide real beer please (too few degree)'],
    required: true
  },
  description: {
    type: String,
    required: false
  },
});

export default mongoose.model('Beer', beerSchema);
