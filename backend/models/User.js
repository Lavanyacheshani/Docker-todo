const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter Name Field!!"],
        },
        email: {
            type: String,
            required: [true, "Enter Email Field!!"],
            unique: true,
        },
        pw: {
            type: String,
            required: [true, "Enter Password Field!!"],
        }
    },
    {
        timestamp: true,
    }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;