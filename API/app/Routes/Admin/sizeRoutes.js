const express = require('express');
const { create, index, update, destroy, details, changeStatus } = require('../../Controllers/Admin/sizeController');

const router = express.Router();
const path = require('path');
const multer  = require('multer') 
const folder = multer({ dest: 'uploads/sizes' })

//function for uploading and saving image permanently in the folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/sizes')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file);

      var imagePath = path.extname(file.originalname);
      console.log(imagePath);

      cb(null, file.fieldname + '-' + uniqueSuffix+imagePath)
    }
})
  
const upload = multer({ storage: storage }).none();

module.exports = server =>  {

    router.post('/add', upload, create);

    router.post('/', upload, index);
    
    router.post('/details/:id', upload, details);

    router.put('/update/:id', upload, update);

    router.post('/delete', upload, destroy);

    router.post('/change-status', upload, changeStatus);

    server.use('/api/admin/sizes', router);
}