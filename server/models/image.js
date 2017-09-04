import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const Schema = mongoose.Schema;
const schema = new Schema({

    sn: {
        type: Number,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

schema.index({
    createdAt: -1,
    sn: 1,
});

schema.plugin(autoIncrement.plugin, {
    model: 'image',
    field: 'sn',
    startAt: 1
});

schema.statics.findBySn = function (sn) {
    return this.findOne().where('sn').equals(sn);
};

module.exports = mongoose.model('image', schema);
