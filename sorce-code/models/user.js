const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "CURATOR"],
        default: "USER"
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 250
    },
    rate: {
        type: Number,
        default: 0
    },
    favoriteGenres: {
        type: [String],
        enum: [
            "comedy",
            "sci-fi",
            "horror",
            "romance",
            "action",
            "thriller",
            "drama",
            "mystery",
            "crime",
            "animation",
            "adventure",
            "fantasy"
        ],
        minlength: 1,
        maxlength: 3,
    }
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;