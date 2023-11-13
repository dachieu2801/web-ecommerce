const Product = require('../models/product');
const storage = require('../conf/firebase')
const { ref, deleteObject, getDownloadURL, uploadBytesResumable } = require('firebase/storage')

module.exports = {
  allProducts: async (req, res, next) => {
    try {
      const products = await Product.find({})
      if (!products || products.length === 0) {
        throw new Error('No products found')
      }
      res.status(200).json({ products })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  productsPage: async (req, res, next) => {
    try {
      const { category, count, page, search } = req.query
      const filterProduct = (products) => {
        if (!products || products.length === 0) {
          throw new Error('No products found')
        }
        for (let i = count * page - count; i < count * page; i++) {
          if (products[i]) {
            productsOfPage.push(products[i])
          } else {
            break
          }
        }
      }
      let productsOfPage = []
      if (category === 'all') {
        const products = await Product.find({})
        filterProduct(products)
      } else {
        const products = await Product.find({ category })
        filterProduct(products)
      }
      if (productsOfPage.length > 0) {
        const keyArr = search.split(' ');
        productsOfPage = productsOfPage.filter((product) =>
          keyArr.every((key) =>
            product.name.toLowerCase().includes(key.toLowerCase().trim()) ||
            product.category.toLowerCase().includes(key.toLowerCase().trim())
          ))
      }

      res.status(200).json({ results: productsOfPage })

    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  detailProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id)
      if (!product || product.length === 0) {
        throw new Error('No products found')
      }
      res.status(200).json({ product })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  editProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.body.id)
      if (req.body.category) {
        product.category = req.body.category
      }
      if (req.body.long_desc) {
        product.long_desc = req.body.long_desc
      }
      if (req.body.short_desc) {
        product.short_desc = req.body.short_desc
      }
      if (req.body.name) {
        product.name = req.body.name
      }
      if (req.body.price) {
        product.price = req.body.price
      }
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          //xóa ảnh đầu
          const desertRef = await ref(storage, product.img1)
          console.log(desertRef);
          await deleteObject(desertRef)

          product.img1 = product.img2
          product.img2 = product.img3
          product.img3 = product.img4
          const metadata = {
            contentType: req.files[i].mimetype,
          };
          // thêm ảng cuối
          const fileRef = await ref(storage, `${Math.random()}`)
          const upload = await uploadBytesResumable(fileRef, req.files[i].buffer, metadata)
          const url = await getDownloadURL(upload.ref)
          product.img4 = url
        }
      }
      await product.save()
      res.status(200).json({ message: 'oke' })

    } catch (err) {
      console.log(err.message);

      res.status(400).json({ message: err.message })
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const { name, price, category, long_desc, short_desc, quantity } = req.body
      if (name && price && category && long_desc && short_desc && req.files.length === 4) {
        let imgsURL = []
        for (let i = 0; i < req.files.length; i++) {
          const metadata = {
            contentType: req.files[i].mimetype,
          };
          const fileRef = await ref(storage, `${Math.random()}`)
          const upload = await uploadBytesResumable(fileRef, req.files[i].buffer, metadata)
          const url = await getDownloadURL(upload.ref)
          imgsURL.push(url)
        }

        const product = new Product({
          name, price, category, long_desc, short_desc,
          img1: imgsURL[0],
          img2: imgsURL[1],
          img3: imgsURL[2],
          img4: imgsURL[3],
          quantity
        })
        await product.save()
        res.status(200).json({ message: 'oke' })
      } else {
        res.status(400).json({ message: 'Please enter all your fields' })
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message })
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.query
      const product = await Product.findById(id)

      //delete ảnh ở firebasse
      for (let i = 0; i < 4; i++) {
        const desertRef = await ref(storage, product[`img${i + 1}`])
        await deleteObject(desertRef)
      }

      await Product.findByIdAndDelete(id)
      return res.status(200).json({ message: 'oke' })

    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
}




