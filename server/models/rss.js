import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;
const schema = new Schema({

    name: {
        type: String,
        required: true
    },

    catogry: {
        type: String,
        required: true
    },

    confirmIP: {
        type: String
    },

    contactPerson: {
        type: String
    },

    channelId: {
        type: String,
        required: true
    },

    template: {
        type: String,
        default: 'DEFAULT',
        enum: ['DEFAULT', 'YAHOO', 'FACEBOOK', 'TAIWANMOBILE', 'SOCIAL', 'LINE', 'DEFAULTDESC', 'SINATW']
    },

    simplifiedChinese: {
        type: Boolean,
        default: false
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
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
    model: 'rss',
    field: 'sn',
    startAt: 1
});

schema.statics.findBySn = function (sn) {
    return this.findOne().where('sn').equals(sn);
};

module.exports = mongoose.model('rss', schema);
