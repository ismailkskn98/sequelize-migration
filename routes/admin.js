const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const imageUpload = require('../helpers/image-upload');
const isAuth = require('../middlewares/auth');
const csrfToken = require('../middlewares/csrfToken');

//! Admin Blogs
// blog
router.get('/blogs', isAuth, adminController.getBlogList);

// blog create
router.get('/blog/create', isAuth, csrfToken, adminController.getBlogCreate);
router.post('/blog/create', isAuth, imageUpload.upload.single('image'), adminController.postBlogCreate);

// blog edit
router.get('/blogs/:id', isAuth, csrfToken, adminController.getBlogEdit);
router.post('/blogs/:id', isAuth, imageUpload.upload.single('image'), adminController.postBlogEdit);

// blog Delete
router.get('/blog/delete/:id', isAuth, csrfToken, adminController.getBlogDelete);
router.post('/blog/delete/:id', isAuth, adminController.postBlogDelete);

//! Admin Categories
// category
router.get('/categories', isAuth, adminController.getCategoryList);

// category create
router.get('/category/create', isAuth, csrfToken, adminController.getCategoryCreate);
router.post('/category/create', isAuth, adminController.postCategoryCreate);

router.post('/categories/remove', isAuth, csrfToken, adminController.getCategoryRemove);

// category edit
router.get('/categories/:id', isAuth, csrfToken, adminController.getCategoryEdit);
router.post('/categories/:id', isAuth, adminController.postCategoryEdit);
// category Delete
router.get('/category/delete/:id', isAuth, csrfToken, adminController.getCategoryDelete);
router.post('/category/delete/:id', isAuth, adminController.postCategoryDelete);

module.exports = router;
