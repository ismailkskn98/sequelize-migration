const fs = require('fs');
const Blog = require('../models').Blog;
const Category = require('../models').Category;
const slugField = require('../helpers/slugfield');

//! admin blog
exports.getBlogList = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ['id', 'title', 'image'],
      include: [{
        model: Category,
        attributes: ['name'],
      }],
    });
    res.render('admin/blog/blog-list', {
      title: 'Blog List',
      blogs,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
};

// admin blog create
exports.getBlogCreate = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    if (categories.length > 0) {
      return res.render('admin/blog/blog-create', {
        title: 'Add Blog',
        categories,
      });
    }
  } catch (error) {
    // hata var ise
    console.log(error);
  }
};
exports.postBlogCreate = async (req, res) => {
  const title = req.body.title;
  const url = slugField(title);
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  // const image = req.body.image;
  const image = req.file.filename;
  const isHome = req.body.isHome == 'on' ? 1 : 0;
  const isActive = req.body.isActive == 'on' ? 1 : 0;
  const categoryIds = req.body.categories; // undefined or array
  console.log(categoryIds);
  try {
    const newBlog = await Blog.create({ title, url, subTitle, description, image, isActive, isHome });
    if (categoryIds !== undefined && categoryIds.length > 0) {
      console.log(newBlog);
      await newBlog.addCategories(categoryIds);
    }
    res.redirect('/admin/blogs?action=create');
  } catch (error) {
    console.log(error);
  }
};

// admin blog edit
exports.getBlogEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Category.findAll({ raw: true });
    const {dataValues} = await Blog.findOne({
      where: {
        id: id
      },
      include: [{
        model: Category,
        attributes: ['id'],
      }],
    });
    console.log(dataValues);
    if (dataValues) {
      return res.render('admin/blog/blog-edit', {
        title: 'Blog Edit',
        categories,
        blog: dataValues,
      });
    }
    res.redirect('/admin/blogs');
  } catch (error) {
    console.log(error);
  }
};
exports.postBlogEdit = async (req, res) => {
  // const id = req.params.id;
  const id = req.body.id;
  const title = req.body.title;
  const url = slugField(title);
  const subTitle = req.body.subTitle;
  const description = req.body.description;
  let image = req.body.image;
  if (req.file) {
    image = req.file.filename;
    // bir önceki resmi silme
    fs.unlink('./public/images/' + req.body.image, (err) => {
      console.log(err);
    });
  }
  const isHome = req.body.isHome == 'on' ? 1 : 0;
  const isActive = req.body.isActive == 'on' ? 1 : 0;
  const categoryIds = req.body.categories; // undefined or array
  try {
    const blog = await Blog.findOne({
      where: {
        id: id
      },
      include: {
        model: Category,
        attributes: ['id'],
      },
    });
    if (blog) {
      blog.title = title;
      blog.url = url;
      blog.subTitle = subTitle;
      blog.description = description;
      blog.image = image;
      blog.isHome = isHome;
      blog.isActive = isActive;
      if(categoryIds == undefined) {
        await blog.removeCategories(blog.categories);
      } else {
        await blog.setCategories(categoryIds);
      }
      await blog.save();
      res.redirect('/admin/blogs?action=edit');
    }
    res.redirect('/admin/blogs');
  } catch (error) {
    console.log(error);
  }
};

// admin blog Delete
exports.getBlogDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByPk(id, { raw: true });
    if (blog) {
      return res.render('admin/blog/blog-delete', {
        title: `Blog Delete - ${blog.id}`,
        blog,
      });
    }
    res.redirect('/admin/blogs');
  } catch (error) {
    console.log(error);
  }
};
exports.postBlogDelete = async (req, res) => {
  const id = req.body.id;
  try {
    const blog = await Blog.findByPk(id, {
      include: [{
        model: Category,
        attributes: ['id']
      }],
    });

    // Kategorilerin kimliklerini alıp diziye toplama
    const categoriesId = blog.Categories.map(category => category.id);
    // Kategorileri kaldırma ve blogu silme
    await blog.removeCategories(categoriesId);
    await Blog.destroy({ where: { id } });

    res.redirect('/admin/blogs?action=delete');
  } catch (error) {
    console.log(error);
  }
};

//! admin categories
exports.getCategoryList = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.render('admin/category/category-list', {
      title: 'Category List',
      categories,
      action: req.query.action,
    });
  } catch (error) {
    console.log(error);
  }
};

// category create
exports.getCategoryCreate = async (req, res) => {
  res.render('admin/category/category-create', {
    title: 'Add Category',
  });
};
exports.postCategoryCreate = async (req, res) => {
  const name = req.body.name;
  const url = slugField(name);
  try {
    if (name) {
      await Category.create({ name, url });
      res.redirect('/admin/categories?action=create');
    }
    res.redirect('/admin/categories');
  } catch (error) {
    console.log(error);
  }
};

// category edit
exports.getCategoryEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);
    const blogs = await category.getBlogs(); //todo getBlogs() adında bir method bizim için otomatik olarak oluşturuluyor. Neden çünkü category üzerinden ulaşabileceğimiz 1 den fazla blog var(çoğul) ve model ismimiz ne "Blog" çoğul olduğu için "s" takısını kendi ekliyor ve getBlogs() diyerek biz bu blog bilgilerini sayfaya direkt gönderebiliyoruz.
    /*
    blogs.forEach(({dataValues}) => {
      { blogId: 1, categoryId: 2 }
      { blogId: 3, categoryId: 2 }
      { blogId: 4, categoryId: 2 }
      console.log(dataValues.blogCategories.dataValues);
    })
    */
    if (category) {
      return res.render('admin/category/category-edit', {
        title: 'Category Edit',
        category: category.dataValues,
        blogs
      });
    }
    res.redirect('/admin/categories');
  } catch (error) {
    console.log(error);
  }
};
exports.postCategoryEdit = async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  try {
    const category = await Category.findByPk(id);
    console.log(category);
    if (category) {
      category.name = name;
      await category.save();
      res.redirect('/admin/categories?action=edit');
    }
    res.redirect('/admin/categories');
  } catch (error) {
    console.log(error);
  }
};

// category Delete
exports.getCategoryDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id, { raw: true });
    if (category) {
      return res.render('admin/category/category-delete', {
        title: `Category Delete - ${category.id}`,
        category,
      });
    }
    res.redirect('/admin/categories');
  } catch (error) {
    console.log(error);
  }
};
exports.postCategoryDelete = async (req, res) => {
  const id = req.body.id;
  try {
    await Category.destroy({
      where: {
        id,
      },
    });
    res.redirect('/admin/categories?action=delete');
  } catch (error) {
    if (error) {
      res.redirect('/admin/categories?action=error');
    }
  }
};

exports.getCategoryRemove = async (req, res) => {
  const blogid = req.body.blogid;
  const categoryid = req.body.categoryid;
  const blog = await Blog.findByPk(blogid);
  await blog.removeCategories(categoryid);
  res.redirect(`/admin/categories/${categoryid}`);
}