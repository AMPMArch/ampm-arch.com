(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Highlight active nav item
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const key = path.includes("work") ? "work" : path.includes("contact") ? "contact" : "home";
  document.querySelectorAll(".nav a").forEach(a => {
    if (a.dataset.nav === key) a.classList.add("active");
  });

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
