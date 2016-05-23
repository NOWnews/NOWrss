let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const schema = new Schema({

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    expiry: {
        type: Date,
        required: true
    },

    apis: {
        type: Array
    },

    continued: {
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
    },

    trashed: {
        type: Boolean,
        default: false
    }
});

schema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'sn',
    startAt: 1
});


module.exports = mongoose.model('rss', schema);
