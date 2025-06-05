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

    const burger = document.getElementById('burger');
    burger.addEventListener('click', () => {
      navList.classList.toggle('open');
      burger.classList.toggle('open');
    }),


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

    // Автоматичне прокручування кожні 5 секунд
    setInterval(() => {
      if (faqList.scrollTop + faqList.clientHeight >= faqList.scrollHeight) {
        faqList.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        faqList.scrollBy({ top: faqList.clientHeight, behavior: 'smooth' });
      }
    }, 5000);

    // Footer
    document.getElementById('footer-text').textContent = data.footer;
  })
  .catch(err => console.error('❌ Помилка завантаження JSON:', err));
