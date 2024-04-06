
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
        await User.create({ username, email, password: cryptPassword });
        res.redirect('/account/login?action=success');
    } catch (error) {
        console.log(error);
    }
}

// login
exports.getLogin = async (req, res) => {
    const action = req.query.action;
    try {
        res.render('auth/login', {
            title: 'Kullanıcı Girişi',
            action: action ?? '',
        })
    } catch (error) {
        console.log(error);
    }
}
exports.postLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await User.findOne({where: {username}, raw: true}); // böyle bir username var mı?
        if(!user) {
            // böyle bir username yok ise
            return res.redirect('/account/login?action=error');
        }

        // var ise artık parola kontrolü yapabiliriz
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            // login
            // cookie en ilkeli ve güvenlik sorunu var fakat başka amaçlar için kullanıyoruz.
            res.cookie('isAuth', true);
            // session bilgisi
            // session - db tutma
            // token-based auth kavramı - api bölümü
            return res.redirect('/');
        }
        // error
        res.redirect('/account/login?action=error');
    } catch (error) {
        console.log(error);
    }
}
exports.getLogout = async (req, res) => {
    try {
        res.clearCookie('isAuth');
        res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }
}