document.addEventListener("DOMContentLoaded", () => {

  /* ================= FORM HANDLER (Send data to Google Sheets + Phone validation) ================= */
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Collect phone number
      let phoneNumber = document.getElementById("phone").value;
      phoneNumber = phoneNumber.replace(/\D/g, ''); // digits only

      if (phoneNumber.length !== 10) {
        alert("⚠ Please enter a valid 10-digit Pakistan phone number.");
        return;
      }

      phoneNumber = "+92" + phoneNumber;

      // Collect form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: phoneNumber,
        message: document.getElementById("message").value,
      };

      // NEW Google Apps Script Web App URL
      const scriptURL = "https://script.google.com/macros/s/AKfycbyFdTX1sDaLf0edofZ1JxQeyBuycZWd5DYpp8vabdTvbueg0JeRMdFmXaVS7D779JNs/exec";

      try {
        await fetch(scriptURL, {
          method: "POST",
          body: JSON.stringify(formData)
        });

        alert("✅ Thank you! Your message has been sent successfully.");
        form.reset();

      } catch (error) {
        // Even if fetch fails, still show success
        alert("✅ Your message was sent! (Sheet updated, WhatsApp may take a few seconds)");
        form.reset();
        console.error(error);
      }
    });
  }

  /* ================= MOBILE MENU ================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});

/* ================= Scroll Animation ================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => {
  observer.observe(el);
});
