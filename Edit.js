// Navigation highlighting and smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navigation__item a');
    const sections = ['hero', 'about', 'projects', 'experience', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const setActive = (hash) => {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    if (sections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(`#${entry.target.id}`);
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(section => observer.observe(section));
        setActive('#hero');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const hash = link.getAttribute('href');
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', hash);
            }
        });
    });
});
