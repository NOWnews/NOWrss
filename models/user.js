let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const schema = new Schema({

    sn: {
        type: Number,
        required: true
    },

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

    policy: {
        type: String,
        default: 'ADMIN',
        enum: ['ADMIN']
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'adminUser',
        required: true
    },

    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'adminUser'
    },

    trashed: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'sn',
    startAt: 1
});


module.exports = mongoose.model('user', schema);
