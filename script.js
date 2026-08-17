const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const estimateForm = document.querySelector('#estimate-form');
if (estimateForm) {
  estimateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(estimateForm);
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const email = data.get('email') || '';
    const service = data.get('service') || 'Tree service';
    const details = data.get('details') || '';

    const subject = `Estimate request - ${service}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Service: ${service}`,
      '',
      'Project details:',
      details
    ].join('\n');

    window.location.href = `mailto:divinetreecare@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
