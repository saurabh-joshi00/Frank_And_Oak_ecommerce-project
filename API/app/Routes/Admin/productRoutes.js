const express = require('express');
const { create, index, update, destroy, details, changeStatus } = require('../../Controllers/Admin/productController');

const router = express.Router();
const path = require('path');
const multer  = require('multer') 
const folder = multer({ dest: 'uploads/products' })

//function for uploading and saving image permanently in the folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

      var imagePath = path.extname(file.originalname);

      cb(null, file.fieldname + '-' + uniqueSuffix+imagePath)
    }
})

const none = multer({ storage: storage }).none();
const single = multer({ storage: storage }).single('image');
const multiple = multer({ storage: storage }).array('images');

//for uploading both single or multiple images
const upload = folder.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

module.exports = server =>  {

    router.post('/add', upload, create);

    router.post('/', none, index);
    
    router.post('/details/:id', none, details);

    router.put('/update/:id', upload, update);

    router.post('/delete', none, destroy);

    router.post('/change-status', none, changeStatus);

    server.use('/api/admin/products', router);
}