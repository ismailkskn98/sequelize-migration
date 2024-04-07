module.exports = (req, res, next) => {
    // console.log(req.url); // blogs
    // console.log(req.originalUrl); // admin/blogs
    if(!req.session.isAuth) {
        return res.redirect(`/account/login?returnUrl=${req.originalUrl}`);
    }
    next();
} 