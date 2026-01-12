(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Active menu item
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const key = path.includes("work") ? "work" : path.includes("contact") ? "contact" : "home";
  document.querySelectorAll(".menu-panel a").forEach(a => {
    if (a.dataset.nav === key) a.classList.add("active");
  });

  // Click-to-toggle menu for mobile + keyboard
  const menu = document.getElementById("menu");
  const btn = document.getElementById("menuBtn");
  const panel = document.getElementById("menuPanel");
  if (menu && btn && panel) {
    const close = () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // Contact form
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) status.textContent = "";

    const name = form.querySelector("#name")?.value?.trim();
    const email = form.querySelector("#email")?.value?.trim();
    const message = form.querySelector("#message")?.value?.trim();

    if (!name || !email || !message) {
      if (status) status.textContent = "Please fill out your name, email, and project details.";
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" },
      });

      if (res.ok) {
        form.reset();
        if (status) status.textContent = "Thanks — message sent. We’ll get back to you shortly.";
      } else {
        if (status) status.textContent = "Message failed to send. Please email austin@ampm-arch.com.";
      }
    } catch {
      if (status) status.textContent = "Network error. Please email austin@ampm-arch.com.";
    }
  });
})();
