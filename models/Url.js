// models/Url.js
import mongoose from 'mongoose';

// Define the schema for URL
const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  urlCode: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the model
const Url = mongoose.model('Url', UrlSchema);
export default Url;
