
const User = require('../models').User;
const bcrypt = require('bcrypt');

// register
exports.getRegister = async (req, res) => {
    try {
        res.render('auth/register', {
            title: 'Kullanıcı Kaydı',
        })
    } catch (error) {
        console.log(error);
    }
}
exports.postRegister = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const cryptPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOne({where: { email:email }});
        if(user) {
            req.session.message = 'warning';
            return res.redirect('/account/login');
        }
        await User.create({ username, email, password: cryptPassword });
        req.session.message = 'success';
        res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }
}

// login
exports.getLogin = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render('auth/login', {
            title: 'Kullanıcı Girişi',
            message
        })
    } catch (error) {
        console.log(error);
    }
}
exports.postLogin = async (req, res) => {
    const returnUrl = req.query.returnUrl;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({where: {username}, raw: true}); // böyle bir username var mı?
        if(!user) {
            // böyle bir username yok ise
            req.session.message = 'error';
            return res.redirect('/account/login');
        }

        // var ise artık parola kontrolü yapabiliriz
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            // login
            // cookie en ilkeli ve güvenlik sorunu var fakat başka amaçlar için kullanıyoruz.
            //? res.cookie('isAuth', true);
            // session bilgisi => güvenlik sorunu var oluşturulan ID başka bir bilgisayarda kullanıldığında uygulama o ID'yi tanıdığı için o bilgisayara yine izin vericek bu da güvenlik açığı oluşturuyor. Buna cross attack deniyor
            req.session.isAuth = true;
            req.session.username = username;
            // session - db tutma => normal de session server ram'inde yani geçici belleğinde tutuluyor. çok fazla istek olduğunda performans kaybı veya sunucu yeniden başlatıldığında bu verilerin kaybolmasına neden olur. En sağlıklısı database'de bunları tutmak.
            // token-based auth kavramı - api bölümü
            const url = returnUrl ?? '/';
            return res.redirect(url);
        }
        // error
        req.session.message = 'error';
        res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }
}
exports.getLogout = async (req, res) => {
    try {
        // res.clearCookie('isAuth');
        await req.session.destroy(); // tüm session'ları temizler
        res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }
}