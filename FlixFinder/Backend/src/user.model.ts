import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export default mongoose.model('User', userSchema);