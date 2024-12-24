const categoryModel = require("../../Models/Category.js");

// Insert/Add API
exports.create = async (request, response) => {

    var formData = {
        name : request.body.name,
        order : request.body.order ? request.body.order : 0,
        root_Id : request.body.parent_Id,
        featured_Categories : request.body.featured_Categories,
    };

    if(request.file.filename != undefined){
        formData.image = request.file.filename;
    }

    const data = new categoryModel(formData)

    await data.save()
    .then((result) => {
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

    if(request.body.limit == undefined){
         var limit = 20;
    } else{
        var limit = request.body.limit;
    }

    if(request.body.page == undefined || request.body.page < 1){
        var page = 1;
   } else{
       var page = request.body.page;
   }

   var skip = (page - 1) * limit;  
   
   var defaultCondition = {
    deleted_At : null, 
    root_Id : { $ne : 0 },
   }

   if(request.body.status == undefined){
    } else{
        defaultCondition.status = request.body.status;
    }

   await categoryModel
    .find(defaultCondition)  
    .select('name image root_Id featured_Categories status order')
    // .populate('root_Id')
    .populate({
        path : 'root_Id',
        select : 'name'
    })
    .limit(limit).skip(skip) 
    .sort({ _id : 'desc' })
    .then((result) => {

        if(result.length > 0){
            const resp = {
                status : true,
                base_Url : `${request.protocol}://${request.get('host')}/uploads/categories/`,
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

   await categoryModel
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

    var formData = {
        name : request.body.name,
        order : request.body.order,
        root_Id : request.body.parent_Id,
        featured_Categories : request.body.featured_Categories,
    }

    if(request.file != undefined){
        formData.image = request.file.filename;
    }
    
    await categoryModel.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : formData
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

    await categoryModel.updateMany(
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

// Change-Status API through updateMany() for multiple change
exports.changeStatus = async (request, response) => {

    await categoryModel.updateMany(
        {
            _id : {
                $in : request.body.id
            }
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