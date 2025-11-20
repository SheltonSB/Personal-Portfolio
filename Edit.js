// Canvas animations (adapted from Ben Scott's open-source portfolio)
const canvasDots = function () {
  const canvas = document.querySelector('.connecting-dots');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colorDot = [
    'rgb(81, 162, 233)',
    'rgb(81, 162, 233)',
    'rgb(81, 162, 233)',
    'rgb(81, 162, 233)',
    'rgb(255, 77, 90)',
  ];
  const color = 'rgb(81, 162, 233)';

  canvas.width = document.body.scrollWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  ctx.lineWidth = 0.3;
  ctx.strokeStyle = color;

  let mousePosition = {
    x: (30 * canvas.width) / 100,
    y: (30 * canvas.height) / 100,
  };

  const windowSize = window.innerWidth;
  let dots;

  if (windowSize > 1600) {
    dots = { nb: 600, distance: 70, d_radius: 300, array: [] };
  } else if (windowSize > 1300) {
    dots = { nb: 575, distance: 60, d_radius: 280, array: [] };
  } else if (windowSize > 1100) {
    dots = { nb: 500, distance: 55, d_radius: 250, array: [] };
  } else if (windowSize > 800) {
    dots = { nb: 300, distance: 0, d_radius: 0, array: [] };
  } else if (windowSize > 600) {
    dots = { nb: 200, distance: 0, d_radius: 0, array: [] };
  } else {
    dots = { nb: 100, distance: 0, d_radius: 0, array: [] };
  }

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();
    this.radius = Math.random() * 1.5;
    this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
  }

  Dot.prototype = {
    create: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      const dotDistance = ((this.x - mousePosition.x) ** 2 + (this.y - mousePosition.y) ** 2) ** 0.5;
      const distanceRatio = dotDistance / (windowSize / 1.7);
      ctx.fillStyle = this.colour.slice(0, -1) + `,${1 - distanceRatio})`;
      ctx.fill();
    },
    animate: function () {
      for (let i = 1; i < dots.nb; i++) {
        const dot = dots.array[i];
        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = -dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },
    line: function () {
      for (let i = 0; i < dots.nb; i++) {
        for (let j = 0; j < dots.nb; j++) {
          const i_dot = dots.array[i];
          const j_dot = dots.array[j];
          if (
            i_dot.x - j_dot.x < dots.distance &&
            i_dot.y - j_dot.y < dots.distance &&
            i_dot.x - j_dot.x > -dots.distance &&
            i_dot.y - j_dot.y > -dots.distance
          ) {
            if (
              i_dot.x - mousePosition.x < dots.d_radius &&
              i_dot.y - mousePosition.y < dots.d_radius &&
              i_dot.x - mousePosition.x > -dots.d_radius &&
              i_dot.y - mousePosition.y > -dots.d_radius
            ) {
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              const dotDistance =
                ((i_dot.x - mousePosition.x) ** 2 + (i_dot.y - mousePosition.y) ** 2) ** 0.5;
              let distanceRatio = dotDistance / dots.d_radius;
              distanceRatio -= 0.3;
              if (distanceRatio < 0) distanceRatio = 0;
              ctx.strokeStyle = `rgb(81, 162, 233, ${1 - distanceRatio})`;
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    },
  };

  function createDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
      const dot = dots.array[i];
      dot.create();
    }
    dots.array[0].radius = 1.5;
    dots.array[0].colour = '#51a2e9';
    dot.line();
    dot.animate();
  }

  window.onmousemove = function (parameter) {
    mousePosition.x = parameter.pageX;
    mousePosition.y = parameter.pageY;
    try {
      dots.array[0].x = parameter.pageX;
      dots.array[0].y = parameter.pageY;
    } catch {
      // ignore
    }
  };

  mousePosition.x = window.innerWidth / 2;
  mousePosition.y = window.innerHeight / 2;

  const draw = setInterval(createDots, 1000 / 30);

  window.onresize = function () {
    clearInterval(draw);
    canvasDots();
  };
};

const canvasDotsBg = function () {
  const canvas = document.querySelector('.canvas-2');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colorDot = [
    'rgb(81, 162, 233)',
    'rgb(81, 162, 233)',
    'rgb(81, 162, 233)',
    'rgb(255, 77, 90)',
  ];
  const color = 'rgb(81, 162, 233)';

  canvas.width = document.body.scrollWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  ctx.lineWidth = 0.3;
  ctx.strokeStyle = color;

  let mousePosition = {
    x: (30 * canvas.width) / 100,
    y: (30 * canvas.height) / 100,
  };

  const windowSize = window.innerWidth;
  let dots;

  if (windowSize > 1600) {
    dots = { nb: 100, distance: 0, d_radius: 0, array: [] };
  } else if (windowSize > 1300) {
    dots = { nb: 75, distance: 0, d_radius: 0, array: [] };
  } else if (windowSize > 1100) {
    dots = { nb: 50, distance: 0, d_radius: 0, array: [] };
  } else {
    dots = { nb: 1, distance: 0, d_radius: 0, array: [] };
    ctx.globalAlpha = 0;
  }

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();
    this.radius = Math.random() * 1.5;
    this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
  }

  Dot.prototype = {
    create: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      const doc = document.documentElement;
      const top =
        (window.pageYOffset || doc.scrollTop || 0) - (doc.clientTop || 0);
      const dotDistance = ((this.x - mousePosition.x) ** 2 + (this.y - mousePosition.y + top) ** 2) ** 0.5;
      const distanceRatio = dotDistance / (windowSize / 2);
      ctx.fillStyle = this.colour.slice(0, -1) + `,${1 - distanceRatio})`;
      ctx.fill();
    },
    animate: function () {
      for (let i = 1; i < dots.nb; i++) {
        const dot = dots.array[i];
        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = -dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },
  };

  function createDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
      const dot = dots.array[i];
      dot.create();
    }
    dots.array[0].radius = 1.5;
    dots.array[0].colour = '#51a2e9';
    dot.animate();
  }

  window.onscroll = function () {
    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;
    const doc = document.documentElement;
    const top =
      (window.pageYOffset || doc.scrollTop || 0) - (doc.clientTop || 0);
    mousePosition.y += top;
  };

  const draw = setInterval(createDots, 1000 / 30);

  window.onresize = function () {
    clearInterval(draw);
    canvasDotsBg();
  };
};

window.onload = function () {
  canvasDotsBg();
  canvasDots();
};

function aboutFadeIn(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && document.body.scrollWidth > 1300) {
      document.querySelector('.profile').classList.add('profile__fade-in');
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      sleep(1000).then(() => document.querySelector('.skills__item--html').classList.add('skills__item-fade-in'));
      sleep(1100).then(() => document.querySelector('.skills__item--webpack').classList.add('skills__item-fade-in'));
      sleep(1200).then(() => document.querySelector('.skills__item--js').classList.add('skills__item-fade-in'));
      sleep(1300).then(() => document.querySelector('.skills__item--git').classList.add('skills__item-fade-in'));
      sleep(1400).then(() => document.querySelector('.skills__item--sass').classList.add('skills__item-fade-in'));
      sleep(1500).then(() => document.querySelector('.skills__item--npm').classList.add('skills__item-fade-in'));
      sleep(1600).then(() => document.querySelector('.skills__item--python').classList.add('skills__item-fade-in'));
      sleep(1700).then(() => document.querySelector('.skills__item--react').classList.add('skills__item-fade-in'));
      sleep(1800).then(() => document.querySelector('.skills__item--r').classList.add('skills__item-fade-in'));
      sleep(1900).then(() => document.querySelector('.skills__item--css').classList.add('skills__item-fade-in'));
    }
  });
}

const options = { root: null, rootMargin: '0px', threshold: 0.5 };
const optionsProjects = { root: null, rootMargin: '0px', threshold: 0.2 };

const aboutSection = document.querySelector('.about__content');
if (aboutSection) {
  const observer = new IntersectionObserver(aboutFadeIn, options);
  observer.observe(aboutSection);
}

// Navigation highlighting
const navLinks = document.querySelectorAll('.navigation__item');
function setActiveNav(id) {
  navLinks.forEach((link) => link.classList.remove('navigation__item--active'));
  const active = document.querySelector(`#nav-${id}`);
  if (active) active.classList.add('navigation__item--active');
}

function navFadeIn(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActiveNav(entry.target.id);
    }
  });
}

const observerNav = new IntersectionObserver(navFadeIn, options);
['hero', 'about', 'experience', 'contact'].forEach((id) => {
  const el = document.querySelector(`#${id}`);
  if (el) observerNav.observe(el);
});

const observerNavProjects = new IntersectionObserver(navFadeIn, optionsProjects);
const projectsSection = document.querySelector('#projects');
if (projectsSection) observerNavProjects.observe(projectsSection);

// Contact form validation + async submit
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const submitBtn = document.getElementById('form-submit');
const contactForm = document.querySelector('.contact__form');

if (submitBtn && contactForm) {
  submitBtn.addEventListener('click', () => {
    const nameInput = document.querySelector('.contact__form-name');
    const emailInput = document.querySelector('.contact__form-email');
    const msgInput = document.querySelector('.contact__form-message');
    const nameError = document.querySelector('.form-error__name');
    const emailError = document.querySelector('.form-error__email');
    const msgError = document.querySelector('.form-error__msg');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = msgInput.value.trim();

    let valid = true;

    if (!name) {
      valid = false;
      nameInput.classList.add('input-error');
      nameError.style.display = 'block';
    } else {
      nameInput.classList.remove('input-error');
      nameError.style.display = 'none';
    }

    if (!emailRegex.test(email)) {
      valid = false;
      emailInput.classList.add('input-error');
      emailError.style.display = 'block';
    } else {
      emailInput.classList.remove('input-error');
      emailError.style.display = 'none';
    }

    if (!msg) {
      valid = false;
      msgInput.classList.add('input-error');
      msgError.style.display = 'block';
    } else {
      msgInput.classList.remove('input-error');
      msgError.style.display = 'none';
    }

    if (valid) {
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      const endpoint = contactForm.getAttribute('action');
      const formData = new FormData(contactForm);

      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            submitBtn.textContent = 'Message sent!';
            contactForm.reset();
          } else {
            throw new Error('Network error');
          }
        })
        .catch(() => {
          submitBtn.textContent = 'Try again via email';
          window.location.href = 'mailto:sbumhe2@huskers.unl.edu';
        })
        .finally(() => {
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2500);
        });
    }
  });
}
