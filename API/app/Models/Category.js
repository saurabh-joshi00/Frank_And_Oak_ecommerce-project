const mongoose = require('mongoose');

//Schema declaration with Validation Methods same for parent and sub category
const categorySchema = new mongoose.Schema({
    name : { 
        type : String,
        required : [true, 'Name is required.'],
        match: /^[a-z '&A-Z]{2,20}$/,
    },
    image : {
        type : String,
    },
    root_Id : {
        type : String,
        ref : 'Category',
        default : 0  
    },
    featured_Categories : {
        type : String,
        enum : ['Yes', 'No'],
        default : 'No'
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
const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;