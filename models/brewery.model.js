import mongoose from 'mongoose';

var brewerySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
});

export default mongoose.model('Brewery', brewerySchema);
