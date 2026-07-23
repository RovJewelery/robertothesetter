const header = document.querySelector("[data-header]");
const navLinks = document.querySelectorAll(".site-nav a");
const revealElements = document.querySelectorAll(".reveal");
const sections = [...navLinks]
  .map((link) => {
    const href = link.getAttribute("href");
    return href.startsWith("#") ? document.querySelector(href) : null;
  })
  .filter(Boolean);
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const setHeaderState = () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
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

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent = "Thank you. Your inquiry is ready. Connect Roberto's preferred email or form service before publishing.";
    contactForm.reset();
  });
}

document.querySelectorAll(".design-media video").forEach((video) => {
  video.muted = true;
  video.playsInline = true;

  const playVideo = () => {
    const attempt = video.play();

    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  };

  if (video.readyState >= 2) {
    playVideo();
  } else {
    video.addEventListener("loadeddata", playVideo, { once: true });
  }
});

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
