const User = require('../models').User;
const bcrypt = require('bcrypt');
const emailService = require('../helpers/send-mail');
const config = require('../config');
const crypto = require('crypto'); // node.js içerisinde olan bir module
const {Sequelize} = require('../models/index');

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
        emailService.sendMail({
            from: config.email.from, // mail kim tarafından gönderilmiş
            to: email, // mail kime gönderilecek
            subject: 'Hesabınız oluşturuldu.', // konu ne
            text: 'Hesabınız başarılı bir şekilde oluşturuldu.', // text body
        })
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
            message,
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

// reset
exports.getReset = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    try {
        res.render('auth/reset-password', {
            title: 'Reset Password',
            message
        });
    } catch (error) {
        console.log(error);
    }
}
exports.postReset = async (req, res) => {
    const email = req.body.email;
    try {
        const token = crypto.randomBytes(32).toString('hex'); // 32bitlik bir token bilgisi oluşturalım
        const user = await User.findOne({where: {email: email}}); // kullanıcının verdiği email adresini kontrol ediyoruz
        if(!user) {
            // böyle bir email yok ise
            req.session.message = 'error';
            return res.redirect('/account/reset-password');
        }
        // böyle bir email var ise
        user.resetToken = token; // token'i ilgili column'a ekliyoruz.
        user.resetTokenExpiration = Date.now() + (1000 * 60 * 60); // şuanki zaman dilimine 1 saat ekledik token'in geçerlilik süresi ekliyoruz.
        await user.save(); // veritabanına kaydediyoruz.
        // email gönderimi
        emailService.sendMail({
            from: config.email.from,
            to: email,
            subject: 'Şifre Yenileme',
            html: `
                <p>Parolanızı güncellemek için aşağıdaki link'e tıklayınız.</p>
                <p>
                    <a href="http://localhost:8080/account/new-password/${token}">Parola Sıfırla</a>
                </p>
            `,
        })
        req.session.message = 'success'; // başarılı mesaj
        res.redirect('/account/reset-password');
    } catch (error) {
        console.log(error);
    }
}

// new password
exports.getNewpassword = async (req, res) => {
    const token = req.params.token;
    try {
        const user = await User.findOne({where: {
            resetToken: token,
            resetTokenExpiration: {
                [Sequelize.Op.gt]: Date.now(), // veritabanındaki tarih şimdiki tarih den daha büyükse demek ki süresi geçmemiz
            }
        }})
        res.render('auth/new-password', {
            title: 'Şifre Yenileme',
            userId: user.id,
            token
        })
    } catch (error) {
        console.log(error);
    }

}
exports.postNewpassword = async (req, res) => {
    const userId = req.body.userId;
    const token = req.body.token;
    const password = req.body.password;
    try {
        const cryptPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({where: {
            resetToken: token,
            resetTokenExpiration: {
                [Sequelize.Op.gt]: Date.now(), // veritabanındaki tarih şimdiki tarih den daha büyükse demek ki süresi geçmemiz
            },
            id: userId
        }})

        user.password = await cryptPassword;
        user.resetToken = null,
        user.resetTokenExpiration = null,
        await user.save();
        req.session.message = 'success';
        return res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }

}

// logout
exports.getLogout = async (req, res) => {
    try {
        // res.clearCookie('isAuth');
        await req.session.destroy(); // tüm session'ları temizler
        res.redirect('/account/login');
    } catch (error) {
        console.log(error);
    }
}