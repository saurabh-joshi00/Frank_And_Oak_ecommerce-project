const mongoose = require('mongoose');

//Schema declaration with Validation Methods
const defaultSchema = new mongoose.Schema({
    name : {
        type : String,
        match: /^[a-z A-Z]{2,20}$/,
        required : [true, 'Name is required.'],
    },
    image : {
        type : String,
        required : [true, 'Image is required.'],
    },
    status : {
        type : Boolean,
        default : 1
    },
    order : {
        type : Number,
        default : 0
    },
    created_At : {
        type : Date,
        default : Date.now()
    },
    updated_At : {
        type : Date,
        default : Date.now()
    },
    deleted_At : {
        type : Date,
        default : ''
    },
});

//Model declaration by declaring collection-name and schema
const defaultModel = mongoose.model('categories', defaultSchema);

module.exports = defaultModel;