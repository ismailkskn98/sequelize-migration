'use strict';
const slugField = require('../helpers/slugfield');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('blogs', [
      {
        title: 'Komple Uygulamalı Web Geliştirme Eğitimi',
        url: slugField('Komple Uygulamalı Web Geliştirme Eğitimi'),
        subTitle:
          "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        description:
          'Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz. ',
        image: '4.jpeg',
        isActive: true,
        isHome: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'Python ile Sıfırdan İleri Seviye Python Programlama',
        url: slugField('Python ile Sıfırdan İleri Seviye Python Programlama'),
        subTitle: 'Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)',
        description:
          "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır. sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: '2.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+',
        url: slugField('Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+'),
        subTitle: 'Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.',
        description:
          "Javascript Neden Çok Popüler? Son zamanlarda popüler hale gelen javascript frontend kütüphanelerinden Angular, React ve VueJs gibi kütüphanelerin kullanılmasındaki artış Javascript' i çok popüler hale getirmiştir. Çünkü Angular, React ve VueJs kütüphanelerini kullanabilmek için güçlü bir Javascript bilgisine ihtiyacımız var. Ayrıca Nodejs sayesinde artık Javascript programlama dilini sadece frontend değil backend programlama dili olarak da kullanabiliyoruz ve baştan sonra nodejs ile dinamik bir web uygulamasını geliştirmek mümkün oluyor ve düşünün ki; kullandığımız dil tamamen Javascript. atta Javascript ile Android ve IOS uygulamaları bile geliştirebiliyoruz. Sizce tüm bu nedenlerden dolayı yazılım dünyası için Javascript olmazsa olmaz diyebilir miyiz ? Kesinlikle, evet!",
        image: '4.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
      {
        title: 'Node.js ile Sıfırdan İleri Seviye Web Geliştirme',
        url: slugField('Node.js ile Sıfırdan İleri Seviye Web Geliştirme'),
        subTitle: 'Node.js ile sıfırdan ileri seviye dinamik web uygulaması geliştirmeyi öğren.',
        description:
          "En popüler programlama dili olan Javascript programlama dilini artık Node.js sayesinde server tabanlı bir dil olarak kullanabilirsin. Kurs sonunda sadece Javascript programlama dilini kullanarak Fullstack bir web geliştirici olmak istiyorsan hemen kursa katılmalısın! Üstelik 30 gün iade garantisiyle! Kursumuz piyasadaki en popüler ve en güncel Node.js kursudur. Javascript tartışmasız günümüzdeki en popüler programlama dilidir çünkü her web uygulaması mutlaka Javascript içerir. Eğer temel düzeyde Javascript biliyorsan artık mevcut Javascript programlama bilginle Node.js öğrenip kolaylıkla dinamik web uygulaması geliştirmeye başlayabilirsin.),",
        image: '3.jpeg',
        isActive: true,
        isHome: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('blogs', null, {});
  }
};
