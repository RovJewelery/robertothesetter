const header = document.querySelector("[data-header]");
const navLinks = document.querySelectorAll(".site-nav a");
const revealElements = document.querySelectorAll(".reveal");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px"
  }
);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    threshold: 0.45
  }
);

revealElements.forEach((element) => revealObserver.observe(element));
sections.forEach((section) => activeObserver.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");
  });
});

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
