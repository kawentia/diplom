fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Назва сайту
    document.getElementById('site-name').textContent = data.name;

    const navMenu = document.getElementById('nav-menu');
    data.nav.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.textContent = item;
      li.appendChild(a);
      navMenu.appendChild(li);
    });



    // Головний блок
    document.getElementById('main-title').textContent = data.mainTitle;
    document.getElementById('main-text').textContent = data.mainText;
    document.getElementById('img-main').src = data.images.main;

    // Назва блоку "Навчання"
    document.getElementById('training-title').textContent = data.sectionTitles.training;

    // Зображення навчання
    const trainContainer = document.getElementById('training-images');
    data.images.training.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Навчання";
      img.style.maxWidth = "320px";
      img.style.margin = "10px";
      trainContainer.appendChild(img);
    });

    // Про себе
    document.getElementById('about-1').textContent = data.about[0];
    document.getElementById('img-block4').src = data.images.block4;
    document.getElementById('about-2').textContent = data.about[1];
    document.getElementById('about-3').textContent = data.about[2];

    // FAQ заголовок
    document.getElementById('faq-title').textContent = data.sectionTitles.faq;

    // Footer
    document.getElementById('footer-text').textContent = data.footer;
  })
  .catch(err => console.error('❌ Помилка завантаження JSON:', err));
