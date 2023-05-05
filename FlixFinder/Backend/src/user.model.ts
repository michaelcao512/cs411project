import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    }, 
    twitterId: {
        required: true,
        type: String
    },
    accessToken: {
        required: true,
        type: String,
    },
    refreshToken: {
        required: true,
        type: String,
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
      type: [Number],
      default: []
    }
});

export default mongoose.model('User', userSchema);