(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  // Basic client-side validation + graceful fallback if the Formspree endpoint isn't set.
  const isPlaceholder = form.action.includes("REPLACE_ME");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";

    const name = form.querySelector("#name")?.value?.trim();
    const email = form.querySelector("#email")?.value?.trim();
    const message = form.querySelector("#message")?.value?.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill out your name, email, and project details.";
      return;
    }

    if (isPlaceholder) {
      const subject = encodeURIComponent(`New inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nLocation: ${form.querySelector("#location")?.value || ""}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:austin@ampm-arch.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email client...";
      return;
    }

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (res.ok) {
        form.reset();
        status.textContent = "Thanks — message sent. We’ll get back to you shortly.";
      } else {
        status.textContent = "Something went wrong sending the message. Please email austin@ampm-arch.com.";
      }
    } catch {
      status.textContent = "Network error. Please email austin@ampm-arch.com.";
    }
  });
})();
