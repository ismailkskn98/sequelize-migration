module.exports = (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.username = req.session.username;
  res.locals.isAdmin = req.session.roles ? req.session.roles.includes('admin') : false;
  res.locals.isModerator = req.session.roles ? req.session.roles.includes('moderator') : false;
  next();
}