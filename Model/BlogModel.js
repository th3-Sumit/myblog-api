const mongoose = require('mongoose');

const tagOptions = ["Fictional", "Funny", "Story"]
const blogSchemas = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        // enum: tagOptions,
        required: true
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "Users"
    }]
},
    { timestamps: true }
)

module.exports = mongoose.model("Blog", blogSchemas)