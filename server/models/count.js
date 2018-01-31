import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;
const schema = new Schema({

    channelId: {
        type: String,
        required: true
    },

    ip: {
        type: String,
        required: true
    },

    news: [{
        title: {
            type: String,
            required: true
        },
        id:{
            type: String,
            required: true
        },
        startedAt: {
            type: String
        }
    }],

    userAgent: {
        type: String
    },

    startDate: {
        type: Date,
        default: Date.now
    },

    trashed: {
        type: Boolean,
        default: false
    }
});

schema.index({
    trashed: -1,
    startDate: 1,
    channelId: 1
});

schema.index({
    trashed: -1,
    startDate: 1
});

schema.plugin(autoIncrement.plugin, {
    model: 'count',
    field: 'sn',
    startAt: 1
});

schema.statics.findBySn = function (sn) {
    return this.findOne().where('sn').equals(sn);
};

module.exports = mongoose.model('count', schema);
