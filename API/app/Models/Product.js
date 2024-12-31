const mongoose = require('mongoose');
const Category = require('./Category');
const Color = require('./Color');
const Size = require('./Size');

//Schema declaration with Validation Methods
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        match: /^[a-zA-Z0-9 '&-]{2,50}$/,
        required : [true, 'Name is required.'],
    },
    image : {
        type : String,
        default : '',
    },
    category_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        default : '',
    },
    sub_Category_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        default : '',
    },
    color_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Color',
        default : '',
    },
    size_Id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Size',
        default : '',
    },
    actual_Price : {
        type : Number,
        default : 0,
    },
    sale_Price : {
        type : Number,
        default : 0,
    },
    shipping_Charges : {
        type : Number,
        default : 0,
    },
    best_Sellings : {
        type : String,
        enum : ['Yes', 'No'],
        default : 'No'
    },
    short_Description : {
        type : String,
        default : ''
    },
    long_Description : {
        type : String,
        default : ''
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
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;