const slugify = require('slugify');

const options = {
  replacement: '-',  // boşlukları değiştirme karakteri ile değiştirin, varsayılan olarak `-`
  remove: undefined, // regex ile eşleşen karakterleri kaldır, varsayılan değer `undefined`
  lower: true,      // küçük harfe dönüştür, varsayılan değer `false`
  strict: true,     // değiştirme hariç özel karakterleri sil, varsayılan değer `false`
  locale: 'tr',      // kullanılacak yerel ayarın dil kodu
  trim: true         // baştaki ve sondaki değiştirme karakterlerini kırp, varsayılan değer `true`
}
module.exports = (str) => {
    return slugify(str, options);
}