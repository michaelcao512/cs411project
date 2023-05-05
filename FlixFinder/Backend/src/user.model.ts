import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    twitterId: {
        required: true,
        type: String
    },
    username: {
        required: true,
<<<<<<< HEAD
        type: String
=======
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
>>>>>>> main
    }
});

export default mongoose.model('User', userSchema);