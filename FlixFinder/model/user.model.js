
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    accesstoken: {
      type: String,
      default: "<missing>"
    },
    refreshtoken: {
      type: String,
      default: "<missing>"
    },
    emotion: {
      sadness: {
        type: Number,
        default: 0
      },
      joy: {
        type: Number,
        default: 0
      },
      fear: {
        type: Number,
        default: 0
      },
      disgust: {
        type: Number,
        default: 0
      },
      anger: {
        type: Number,
        default: 0
      }
    },
    genres: {
      type: [String],
      default: []
    }
  });
  
const User = mongoose.model('User', userSchema);
module.exports = User; 