const express = require('express');
const app = express();
const port = 8080;

// modules
const path = require('path');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// custom models
// const {sequelize} = require('./models');

// view engine
app.set('view engine', 'ejs');

// middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
//Form verilerine erişmek için body-parser middleware'ini kullanılıyoruz.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/account', authRoutes);
app.use('/admin', adminRoutes); // bu şekilde öneki koyabiliriz.
app.use(userRoutes);


app.listen(port, () => {
  console.log(`Serverın ${port} port'u altında çalışıyor...`);
});
