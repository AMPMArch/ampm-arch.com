(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Active nav highlighting
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const key = path.startsWith("work") ? "work"
           : path.startsWith("contact") ? "contact"
           : path.startsWith("project-") ? "work"
           : "home";

  document.querySelectorAll(".menu-panel a").forEach(a => {
    if (a.dataset.nav === key) a.classList.add("active");
  });

  // Collapsible menu (works for click + outside click + ESC)
  const menu = document.getElementById("menu");
  const btn  = document.getElementById("menuBtn");

  if (menu && btn) {
    const closeMenu = () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Lightbox (project pages)
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");

  const openLb = (src, alt) => {
    if (!lb || !lbImg || !src) return;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLb = () => {
    if (!lb || !lbImg) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  };

  if (lb) {
    // Close on backdrop click OR close button click
    lb.addEventListener("click", (e) => {
      const t = e.target;
      if (t === lb) closeLb();
      if (t && t.dataset && t.dataset.close === "true") closeLb();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLb();
    });

    // Delegate: any element with data-full or any img in .gallery/.grid opens
    document.addEventListener("click", (e) => {
      const el = e.target;

      // If they clicked an <img> inside a gallery/grid
      if (el && el.tagName === "IMG" && (el.closest(".gallery") || el.closest(".grid") || el.closest(".photo-grid"))) {
        const src = el.getAttribute("data-full") || el.getAttribute("data-src") || el.currentSrc || el.src;
        openLb(src, el.alt);
        return;
      }

      // If they clicked a wrapper with data-full
      const wrap = el && el.closest ? el.closest("[data-full]") : null;
      if (wrap) {
        openLb(wrap.getAttribute("data-full"), "");
      }
    });
  }

  // Contact form: basic UX (works with Formspree)
  const form = document.querySelector("form[data-formspree]");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", async (e) => {
      // Let browser handle required fields
      if (!form.checkValidity()) return;

      e.preventDefault();
      const action = form.getAttribute("action");
      const data = new FormData(form);

      try {
        const res = await fetch(action, {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        });

        if (res.ok) {
          if (status) status.textContent = "Thanks — we’ll be in touch shortly.";
          form.reset();
        } else {
          if (status) status.textContent = "Something went wrong. Please email info@ampm-arch.com.";
        }
      } catch {
        if (status) status.textContent = "Network issue. Please email info@ampm-arch.com.";
      }
    });
  }
})();