const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const imageUpload = require('../helpers/image-upload');
const isAuth = require('../middlewares/auth');
const csrfToken = require('../middlewares/csrfToken');
const isAdmin = require('../middlewares/is-admin');

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
router.get('/categories', isAuth, isAdmin, adminController.getCategoryList);

// category create
router.get('/category/create', isAuth, isAdmin, csrfToken, adminController.getCategoryCreate);
router.post('/category/create', isAuth, isAdmin, adminController.postCategoryCreate);

router.post('/categories/remove', isAuth, isAdmin, csrfToken, adminController.getCategoryRemove);

// category edit
router.get('/categories/:id', isAuth, isAdmin, csrfToken, adminController.getCategoryEdit);
router.post('/categories/:id', isAuth, isAdmin, adminController.postCategoryEdit);
// category Delete
router.get('/category/delete/:id', isAuth, isAdmin, csrfToken, adminController.getCategoryDelete);
router.post('/category/delete/:id', isAuth, isAdmin, adminController.postCategoryDelete);

//! Admin Roles
router.get('/roles', isAuth, isAdmin, adminController.getRoleList);
router.get('/roles/:id', isAuth, isAdmin, csrfToken, adminController.getRoleEdit);
router.post('/roles/remove', isAuth, isAdmin, adminController.rolesRemove);
router.post('/roles/:id', isAuth, isAdmin, adminController.postRoleEdit);

//! Admin Users
router.get('/users', isAuth, isAdmin, adminController.getUserList);
router.get('/users/:id', isAuth, isAdmin, csrfToken, adminController.getUserEdit);
router.post('/users/:id', isAuth, isAdmin, adminController.postUserEdit);



module.exports = router;
