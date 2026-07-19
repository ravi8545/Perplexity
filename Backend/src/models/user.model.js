import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() { return !this.googleId; },
        minlength: 6
    },
    googleId: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    verified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

//Middleware
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;