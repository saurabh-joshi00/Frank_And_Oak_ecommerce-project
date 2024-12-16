const mongoose = require('mongoose');

//Schema declaration with Validation Methods
const colorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required.'],
        match: /^[a-z '&A-Z]{2,20}$/,
    },
    image : {
        type : String,
    },
    code : {
        type : String
    },
    root_Id : {
        type : String,
    },
    featured_Categories : {
        type : String,
    }, 
    status : {
        type : Boolean,
        default : 1
    },
    order : {
        type : Number,
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
const colorModel = mongoose.model('color', colorSchema);

module.exports = colorModel;