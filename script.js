function initObserver() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Назва сайту
    document.getElementById('site-name').textContent = data.name;

    const navList = document.getElementById('nav-list');
    data.nav.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.textContent = item;
      li.appendChild(a);
      navList.appendChild(li);
    });

    const burger = document.querySelector(".burger");
    const menu = document.getElementById("nav-list");

    burger.addEventListener("click", () => {
      burger.classList.toggle("open"); // Анімація
      menu.classList.toggle("active"); // Показ списку
    });








    // document.addEventListener('DOMContentLoaded', () => {
    //   const burger = document.querySelector('.bm-burger');
    //   const navMenu = document.querySelector('#bm-nav-menu');

    //   // Підтягуємо меню з JSON
    //   fetch('data.json')
    //     .then(response => response.json())
    //     .then(data => {
    //       navMenu.innerHTML = ''; // очищаємо старе меню
    //       data.menu.forEach(item => {
    //         const li = document.createElement('li');
    //         li.className = 'bm-nav-item';

    //         const a = document.createElement('a');
    //         a.href = item.link;
    //         a.className = 'bm-nav-link';
    //         a.textContent = item.title;

    //         li.appendChild(a);
    //         navMenu.appendChild(li);
    //       });
    //     });

    //   // Відкриття/закриття меню
    //   burger.addEventListener('click', () => {
    //     const isActive = burger.classList.toggle('active');
    //     navMenu.classList.toggle('active');
    //     burger.setAttribute('aria-expanded', isActive);
    //   });

    //   // Закриття після кліку
    //   document.addEventListener('click', e => {
    //     if (e.target.classList.contains('bm-nav-link')) {
    //       burger.classList.remove('active');
    //       navMenu.classList.remove('active');
    //       burger.setAttribute('aria-expanded', 'false');
    //     }
    //   });
    // });


















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
    document.getElementById("img-block4").classList.add("fade-in");
    document.getElementById('about-2').textContent = data.about[1];
    document.getElementById('about-3').textContent = data.about[2];

    // FAQ заголовок
    document.getElementById('faq-title').textContent = data.sectionTitles.faq;




    //ывапроооооооооооооооооооооооооооооооооооо
    const reviewsList = document.getElementById('reviews-list');
    const reviewCards = [];

    // создаём карточки и сохраняем в массив
    data.reviews.forEach(item => {
      const card = document.createElement('div');
      card.className = 'review-card';

      const text = document.createElement('p');
      text.textContent = item.text;

      const author = document.createElement('div');
      author.className = 'review-author';
      author.textContent = item.author;

      card.appendChild(text);
      card.appendChild(author);
      reviewsList.appendChild(card);
      reviewCards.push(card); // сохраняем
    });

    // кнопки
    const prev = document.querySelector('.reviews-prev');
    const next = document.querySelector('.reviews-next');

    if (prev && next) {
      prev.addEventListener('click', () => {
        const scrollAmount = reviewCards[0].offsetWidth + 60;
        if (reviewsList.scrollLeft <= 0) {
          reviewsList.scrollLeft = reviewsList.scrollWidth;
        } else {
          reviewsList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      });

      next.addEventListener('click', () => {
        const scrollAmount = reviewCards[0].offsetWidth + 60;
        const maxScroll = reviewsList.scrollWidth - reviewsList.clientWidth;
        if (reviewsList.scrollLeft >= maxScroll - 5) {
          reviewsList.scrollLeft = 0;
        } else {
          reviewsList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      });
    }

    // автопрокрутка каждые 3 секунды
    setInterval(() => {
      const scrollAmount = reviewCards[0].offsetWidth + 60;
      const maxScroll = reviewsList.scrollWidth - reviewsList.clientWidth;
      if (reviewsList.scrollLeft >= maxScroll - 5) {
        reviewsList.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        reviewsList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);


    // FAQ items
    const faqList = document.getElementById('faq-list');
    data.faq.forEach(item => {
      const card = document.createElement('div');
      card.className = 'faq-card';

      const q = document.createElement('div');
      q.className = 'faq-question';
      q.textContent = item.question;

      const a = document.createElement('div');
      a.className = 'faq-answer';
      a.textContent = item.answer;

      card.appendChild(q);
      card.appendChild(a);
      faqList.appendChild(card);
    });





    const faqData = data.faq;  //данные с сервера ответы на
    const faqContainer = document.getElementById('faq-list');

    faqData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'faq-card';
      card.innerHTML = `
        <div class="faq-question">${item.question}</div>
        <div class="faq-answer">${item.answer}</div>
      `;
      faqContainer.appendChild(card);
    });

    // Обработка кликов
    faqContainer.addEventListener('click', function (e) {
      const card = e.target.closest('.faq-card');
      if (!card) return;
      card.classList.toggle('open');
    });




    //фото
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    document.querySelectorAll('.fade-in').forEach(img => {
      observer.observe(img);
    });

    // Footer
    document.getElementById('footer-text').textContent = data.footer;
  })
  .catch(err => console.error('❌ Помилка завантаження JSON:', err));
