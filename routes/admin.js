const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const imageUpload = require('../helpers/image-upload');


//! Admin Blogs
// blog
router.get('/blogs', adminController.getBlogList);

// blog create
router.get('/blog/create', adminController.getBlogCreate);
router.post('/blog/create', imageUpload.upload.single('image'), adminController.postBlogCreate);

// blog edit
router.get('/blogs/:id', adminController.getBlogEdit);
router.post('/blogs/:id', imageUpload.upload.single('image'), adminController.postBlogEdit);

// blog Delete
router.get('/blog/delete/:id', adminController.getBlogDelete);
router.post('/blog/delete/:id', adminController.postBlogDelete);

//! Admin Categories
// category
router.get('/categories', adminController.getCategoryList);

// category create
router.get('/category/create', adminController.getCategoryCreate);
router.post('/category/create', adminController.postCategoryCreate);

router.post('/categories/remove', adminController.getCategoryRemove);

// category edit
router.get('/categories/:id', adminController.getCategoryEdit);
router.post('/categories/:id', adminController.postCategoryEdit);
// category Delete
router.get('/category/delete/:id', adminController.getCategoryDelete);
router.post('/category/delete/:id', adminController.postCategoryDelete);

module.exports = router;
