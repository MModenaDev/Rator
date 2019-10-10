const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    reference: {
        type: String,
    },
    curator: {
        type: String,
        required: true
    },
    text: {
        type: String,
        minlength: 1,
        maxlength: 250
    },
    liked: {
        type: Boolean,
    },
    genre: {
        type: String,
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
        ]
    }
}, {
  timestamps: true
})

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;