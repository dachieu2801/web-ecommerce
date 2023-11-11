const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth')
const ProductController = require('../controllers/product');

const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  }
})

router.get('/admin/pagination', isAuth.admin, ProductController.productsPage);
router.get('/admin/:id', isAuth.admin, ProductController.detailProduct);
router.post('/admin/create', isAuth.admin, upload.array('files', 5), ProductController.createProduct);
router.put('/admin/edit', isAuth.admin, upload.array('files', 5), ProductController.editProduct);
router.delete('/admin/delete', isAuth.admin, ProductController.deleteProduct);
router.get('/admin/', isAuth.admin, ProductController.allProducts);
router.get('/pagination', ProductController.productsPage);
router.get('/:id', ProductController.detailProduct);
router.get('/', ProductController.allProducts);



module.exports = router;
