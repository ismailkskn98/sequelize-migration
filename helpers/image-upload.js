const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // konumu belirtebiyoruz
    // request => yapılan talep
    // file => upload edilen file
    // cb => işlem bittikten sonra çağırılacak olan callback fonksiyonu
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    // random istediğiniz formatta isim oluşturabiliyoruz
    // konumu belirtebiyoruz
    // request => yapılan talep
    // file => upload edilen file
    cb(null, `${path.parse(file.originalname).name}-${Date.now()}${path.parse(file.originalname).ext}`);
  },
});

/*
{
  root: '/',
  dir: '/klasor',
  base: 'dosya.txt',
  ext: '.txt',
  name: 'dosya'
}
path.parse() fonksiyonu tarafından döndürülen nesnenin özellikleri şunlardır:
root: Dosya yolunun kök dizini. Örneğin, Unix sistemlerinde /, Windows sistemlerinde C:\ gibi.
dir: Dosya yolundaki dizin kısmı.
base: Dosya adı ve uzantısını içeren kısım.
ext: Dosya uzantısı (nokta dahil).
name: Dosya adı (uzantı hariç).
*/

const upload = multer({ storage });

module.exports = { upload };
