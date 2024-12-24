const mongoose = require('mongoose');

//Schema declaration with Validation Methods
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        match: /^[a-z '&A-Z]{2,20}$/,
        required : [true, 'Name is required.'],
    },
    image : {
        type : String,
        default : '',
    },
    category_Id : {
        type : mongoose.ObjectId,
    },
    sub_Category_Id : {
        type : mongoose.ObjectId,
    },
    color_Id : {
        type : mongoose.ObjectId,
    },
    size_Id : {
        type : mongoose.ObjectId,
    },
    actual_Price : {
        type : Double,
        default : 0,
    },
    sale_Price : {
        type : Double,
        default : 0,
    },
    shipping_Charges : {
        type : Double,
        default : 0,
    },
    best_Sellings : {
        type : String,
        enum : ['Yes', 'No'],
        default : 'No'
    },
    short_Description : {
        type : Text,
        default : ''
    },
    long_Description : {
        type : Text,
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