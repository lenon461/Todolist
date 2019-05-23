const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId} } = Schema;
const jobSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        default: Date.now,
    },
    complete: {
        type: Boolean,
        default: 0,
    },
    priority: {
        type: Number,
    },
});
module.exports = mongoose.model('Job', jobSchema);
