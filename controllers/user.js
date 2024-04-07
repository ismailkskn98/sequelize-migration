const Blog = require('../models').Blog;
const Category = require('../models').Category;
const { Op } = require('sequelize');
const {size} = require('../config');


exports.blogDetails = async (req, res) => {
  // istek olarak gelen parametre
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({
      where: {
        url: slug,
      },
      raw: true
    });
    if (blog) {
      return res.render('users/blogDetail', {
        title: blog.title,
        blog,
      });
    }
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
  }
};

exports.blogList = async (req, res) => {
  const page = req.query.page ?? 0;
  const slug = req.params.slug;
  try {
    const {count, rows} = await Blog.findAndCountAll({
      where: {
        isActive: true,
      },
      include: slug ? {model: Category, where: { url:slug } } : null,
      raw: true,
      limit: size,
      offset: page * size // 0 * 5 => 0, 1 * 5 => 5, 2 * 5 => 10, ... öteleme
    });
    
    const categories = await Category.findAll({ raw: true });
    let category = {};
    if(slug) {
      category = categories.find((category) => category.url == slug);
    }

    res.render('users/blogs', {
      title: category.name ?? 'Tüm Kurslar',
      categories,
      blogs: rows,
      id: category.id ?? 0,
      currentPage: Number(page),
      totalItems: Number(count),
      totalPages: Math.ceil(count / size), // yukarı yuvarla
    });
  } catch (error) {
    console.log(error);
  }
};

exports.index = async (req, res) => {
  // const isAuth = req.cookies.isAuth;
  // const isAuth = req.session.isAuth;
  try {
    const blogs = await Blog.findAll({
      where: {
        [Op.and]: [{ isActive: true }, { isHome: true }],
      },
      raw: true,
    });
    const categories = await Category.findAll({ raw: true });
    res.render('users/index', {
      title: 'Popüler Kurslar',
      categories,
      blogs,
      id: 0,
      // isAuth: isAuth ?? false,
    });
  } catch (error) {
    console.log(error);
  }
};