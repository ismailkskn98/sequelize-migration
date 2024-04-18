module.exports = (req, res, next) => {
    // console.log(req.url); // blogs
    // console.log(req.originalUrl); // admin/blogs
    const isAdmin = req.session.roles ? req.session.roles.includes('admin') : false;
    if(!isAdmin) {
        // admin değil ise
        return res.redirect(`/account/login?returnUrl=${req.originalUrl}`);
    }
    next();
} 