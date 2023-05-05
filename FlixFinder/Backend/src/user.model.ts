import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    twitterId: {
        required: true,
        type: String
    },
    username: {
        required: true,
    }
});

export default mongoose.model('User', userSchema);
