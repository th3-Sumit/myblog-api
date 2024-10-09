const mongoose = require('mongoose');

const blogSchemas = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
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