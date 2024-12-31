const productModel = require("../../Models/Product.js");
const productImageModel = require("../../Models/productImages.js");

// Insert/Add API
exports.create = async (request, response) => {

    var requestData = request.body;

    //for single image
    if(request.files[0]){
        if(request.files[0].filename){
            requestData.image = request.files[0].filename
        }
    }
    //for multiple images
    // if(request.files.images){
    //     var images = [];
    //     request.files.images.forEach(function(item){
    //         images.push(item.filename);
    //     });
    //     requestData.images = images;
    // }

    const data = new productModel(requestData)

    await data.save()
    .then((result) => {

        //Insert-query for saving the product images
        // if(request.files){
        //     request.files.forEach((item) => {
        //         const images = new productImageModel({
        //             product_Id : result._id,
        //             image : item.filename
        //         });
        //     })
        // }


        const resp = {
            status : true,
            message : 'Record Added Successfully',
            data : result
        }
        response.send(resp);
    })
    .catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })
}

// View API
exports.index = async (request, response) => {

    var page = (request.body.page == undefined || request.body.page < 1) ? 1 : request.body.page;

    var limit = (request.body.limit == undefined) ? 20 : request.body.limit;

    var skip = (page - 1) * limit;
 
   
   var defaultCondition = {
        deleted_At : null,
   };

   //letter-searching filter condition for name field
   if(request.body.name == undefined){
    } else{
        defaultCondition.name = new RegExp(request.body.name, 'i');
    }

    //filter condition by category-id
    if(request.body.category_Id == undefined){
    } else{
        defaultCondition.category_Id = request.body.category_Id;
    }

    //filter condition by sub-category-id
    if(request.body.sub_Category_Id == undefined){
    } else{
        defaultCondition.sub_Category_Id = request.body.sub_Category_Id;
    }

    //filter condition by color-id
    if(request.body.color_Id == undefined){
    } else{
        defaultCondition.color_Id = request.body.color_Id;
    }

    //filter condition by size-id
    if(request.body.size_Id == undefined){
    } else{
        defaultCondition.size_Id = request.body.size_Id;
    }

    //filter condition by status
    if(request.body.status == undefined){
    } else{
        defaultCondition.status = request.body.status;
    }

    //filter conditon by actual-price
    if(request.body.actual_Price == undefined){
    } else{
        defaultCondition.actual_Price = request.body.actual_Price;
    }

   await productModel
    .find(defaultCondition)  
    .select('name category_Id sub_Category_Id color_Id size_Id actual_Price sale_Price status order')
    .populate('category_Id', 'name')
    .populate('sub_Category_Id', 'name')
    .populate('color_Id', 'name')
    .populate('size_Id', 'name')
    .limit(limit).skip(skip)
    .sort({ _id : 'desc' }) 
    .then((result) => {

        if(result.length > 0){
            const resp = {
                status : true,
                message : 'Record Found Successfully',
                data : result,
            }
            response.send(resp);

        } else {
            const resp = {
                status : false,
                message : 'No Record Found',
                data : [],
            }
            response.send(resp);
        }
    })
    .catch((error) => {
        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : error
        }
        response.send(resp);
    })

}

// Details API
exports.details = async (request, response) => {

   await productModel
    .findOne({ deleted_At : null, _id : request.params.id })
    .then((result) => {

        if(result != undefined){
            const resp = {
                status : true,
                message : 'Record Found Successfully',
                data : result,
            }
            response.send(resp);

        } else {
            const resp = {
                status : false,
                message : 'No Record Found',
                data : [],
            }
            response.send(resp);
        }
    })
    .catch((error) => {
        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : error
        }
        response.send(resp);
    })

}

// Update API
exports.update = async (request, response) => {

    var requestData = request.body;

    if(request.files.image){
        requestData.image = request.files.image[0].filename;
    }
    
    await productModel.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : requestData
        }
    ).then((result) => {

        var resp = {
            status : true,
            message : 'Record Updated Successfully.',
            data : result
        }
        response.send(resp);

    }).catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            console.log(value);
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })

}

// Soft-Delete API through updateMany() for multiple delete
exports.destroy = async (request, response) => {

    await productModel.updateMany(
        {
            _id : {
                $in : request.body.id
            }
        },
        {
            $set : {
                deleted_At : Date.now(),
            }
        }
    ).then((result) => {

        var resp = {
            status : true,
            message : 'Record Deleted Successfully.',
            data : result
        }
        response.send(resp);

    }).catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })

}

// Change-Status API through updateMany() for multiple change
exports.changeStatus = async (request, response) => {

    await productModel.updateMany(
        {
            _id : {
                $in : request.body.id
            },
        },
        [
            { 
                $set: {
                    status: { 
                        $switch: {
                            branches: [
                                { case: { $eq: [ "$status", 0 ] }, then: 1 },
                                { case: { $eq: [ "$status", 1 ] }, then: 0 },
                            ],
                            default : 1
                        }, 
                    }, 
                }, 
            },
        ]
    ).then((result) => {

        var resp = {
            status : true,
            message : 'Status Updated Successfully.',
            data : result
        }
        response.send(resp);

    }).catch((error) => {
        //Index Array
        var errormessages = [];

        //for-in loop is used to get the number of the index
        for(var value in error.errors){
            errormessages.push(error.errors[value].message);
        }

        const resp = {
            status : false,
            message : 'Something went wrong !!',
            data : '',
            error : errormessages
        }
        response.send(resp);
    })

}