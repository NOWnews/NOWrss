let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');
let co = require('co');
let is = require('is_js');
let Promise = require('bluebird');

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

schema.plugin(autoIncrement.plugin, {
    model: 'count',
    field: 'sn',
    startAt: 1
});

/*
 * sn: [String, Number], 要查詢的編號
 * populates: [Array]，要 relation 的欄位
 * lean: [Boolean]， true 則會去掉 mongoose doc 自己的屬性
 */
schema.statics.findBySn = co.wrap(function*(sn, populates, lean) {

    let self = this;
    let thisSn = parseInt(sn, 10);

    if(lean !== undefined && !is.boolean(lean)) {
        return yield Promise.reject(new Error('lean must boolean'));
    }

    if(!is.number(thisSn)){
        return yield Promise.reject(new Error('sn must number'));
    }

    if(populates !== undefined && !is.array(populates)) {
        return yield Promise.reject(new Error('populates must array'));
    }

    let query = self
        .findOne()
        .where('sn').equals(thisSn);

    if(populates) {
        query.populate(populates);
    }

    if(lean) {
        query.lean();
    }

    return yield query.execAsync();
});

module.exports = mongoose.model('count', schema);
