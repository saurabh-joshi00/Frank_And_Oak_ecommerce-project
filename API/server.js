const express = require('express');
const server = express(); //Executable Function
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//parse requests of content-type - application/json
server.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

//cors origin handles errors while integrating node js apis to the website
server.use(cors());

//default url for the server
server.get('/', (request, response) => {
    response.send('Server is started...'); 
});

//default static code for image uploading
server.use('/uploads/categories',express.static('uploads/categories'));

//Calling categoryRoutes.js File
require('./app/Routes/Admin/parentCategoryRoutes.js')(server);

//Calling colorRoutes.js File
require('./app/Routes/Admin/colorRoutes.js')(server);

//Calling sizeRoutes.js File
require('./app/Routes/Admin/sizeRoutes.js')(server);

//Calling subCategoryRoutes.js File
require('./app/Routes/Admin/subCategoryRoutes.js')(server);

//Calling productRoutes.js File
require('./app/Routes/Admin/productRoutes.js')(server);

//for connecting to the mongodb database using mongoose framework
mongoose.connect('mongodb://127.0.0.1:27017/FRANK_AND_OAK_DB')
.then(() => {
    server.listen('1500');  
    console.log('Connected!');
})
.catch(() => {
    console.log('Not Connected!');
});