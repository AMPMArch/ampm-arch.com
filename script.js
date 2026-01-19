(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Menu
  const menu = document.getElementById("menu");
  const btn  = document.getElementById("menuBtn");
  if (menu && btn) {
    const closeMenu = () => { menu.classList.remove("open"); btn.setAttribute("aria-expanded","false"); };
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => { if (!menu.contains(e.target)) closeMenu(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");

  const openLb = (src, alt) => {
    if (!lb || !lbImg || !src) return;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  };

  const closeLb = () => {
    if (!lb || !lbImg) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden","true");
    lbImg.src = "";
    document.body.style.overflow = "";
  };

  if (lb) {
    lb.addEventListener("click", (e) => {
      const t = e.target;
      if (t === lb) closeLb();
      if (t && t.dataset && t.dataset.close === "true") closeLb();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

    document.addEventListener("click", (e) => {
      const img = e.target && e.target.tagName === "IMG" ? e.target : null;
      if (!img) return;
      if (!(img.closest(".gallery") || img.closest(".grid") || img.closest(".photo-grid"))) return;
      const src = img.getAttribute("data-full") || img.currentSrc || img.src;
      openLb(src, img.alt || "");
    });
  }

  // Contact form (Formspree)
  const form = document.querySelector("form[data-formspree]");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", async (e) => {
      if (!form.checkValidity()) return;
      e.preventDefault();
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { "Accept":"application/json" }});
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