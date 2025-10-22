document.addEventListener("DOMContentLoaded", () => {
  /* ===== FORM HANDLER ===== */
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page reload
      alert("✅ Thank you! Your message has been sent successfully.");
      form.reset();
    });
  }

  /* ===== MOBILE MENU TOGGLE ===== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link (for mobile UX)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});

// ===== Scroll Animation (Lightweight & Smooth) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => {
  observer.observe(el);
});
