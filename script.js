const revealElements = document.querySelectorAll('.fade-in, .project-card');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85; 

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
