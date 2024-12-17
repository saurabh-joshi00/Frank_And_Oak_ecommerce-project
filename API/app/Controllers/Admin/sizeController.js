const sizeModel = require("../../Models/Size.js");

// Insert/Add API
exports.create = async (request, response) => {

    const data = new sizeModel({
        name : request.body.name,
    })
 
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


   await sizeModel
    .find({ deleted_At : null })  
    .select('name status')
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

    await sizeModel 
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
    
    await sizeModel.updateOne(
        {
            _id : request.params.id
        },
        {
            $set : {
                name : request.body.name,
            }
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

// Soft-Delete API through updateOne()
exports.destroy = async (request, response) => {

    await sizeModel.updateMany(
        {
            _id : request.body.id
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

    await sizeModel.updateMany(
        {
            _id : {
                $in : request.body.id
            }
        },
        { 
            $set: {
                status: { 
                    $switch: {
                        branches: [
                            { case: { $eq: [ "$status", 0 ] }, then: 1 },
                            { case: { $eq: [ "$status", 1 ] }, then: 0 },
                        ],
                        default: 1
                    } 
                } 
            } 
        }
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