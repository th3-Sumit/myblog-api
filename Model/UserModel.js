const mongoose = require('mongoose');

const userSchemas = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,

    },
    blog: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

module.exports = mongoose.model("Users", userSchemas)