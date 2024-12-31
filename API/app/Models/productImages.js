const mongoose = require('mongoose');

// New Collection & Schema Declaration for uploading single or multiple images in product-section
// Easiest way to upload/delete/update images by making particular "New Collection" & "Schema"
const productImageSchema = new mongoose.Schema({
    product_Id : {
        type : mongoose.Schema.Types.ObjectId,
        default : '',
    },
    image : {
        type : String,
        default : '',
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
const productImageModel = mongoose.model('ProductImage', productImageSchema);

module.exports = productImageModel;