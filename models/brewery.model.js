import mongoose from 'mongoose';

var brewerySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    indexed: true
  },
  location: {
    type: String,
    required: true
  },
  beers: [{
    type: String,
    ref: 'Beer'
  }]
});

export default mongoose.model('Brewery', brewerySchema);
