const express = require('express');
const app = express();
const port = 8080;

// modules
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// session store ile sequelize'ı initalize edin
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// custom models
const db = require('./models');

// template engine
app.set('view engine', 'ejs');

// middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
//Form verilerine erişmek için body-parser middleware'ini kullanılıyoruz.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    // session bilgisine ulaşırken bir key bilgisi gerekiyor. Random bir gui kullanılabilir.
    secret: "23763034-feba-4702-8449-215a516a7ae",
    resave: false,
    saveUninitialized: false, // true yaparsak login olsun veya olmasın her kullanıcı için id oluşturur. Gereksiz
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 saat
    },
    store: new SequelizeStore({
      db: db.sequelize,
    }),
  })
)
// router middlewares
app.use('/account', authRoutes);
app.use('/admin', adminRoutes); // bu şekilde öneki koyabiliriz.
app.use(userRoutes);


app.listen(port, () => {
  console.log(`Serverın ${port} port'u altında çalışıyor...`);
});
