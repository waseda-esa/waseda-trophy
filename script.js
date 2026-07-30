document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const revealElements = document.querySelectorAll(".fade-in");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const closeMenu = () => {
    mobileMenu?.classList.remove("open");
    navToggle?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "メニューを開く");
  };

  navToggle?.addEventListener("click", () => {
    const willOpen = !mobileMenu?.classList.contains("open");
    mobileMenu?.classList.toggle("open", willOpen);
    navToggle.classList.toggle("open", willOpen);
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navToggle.setAttribute("aria-label", willOpen ? "メニューを閉じる" : "メニューを開く");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      const offset = navbar?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const updatePageState = () => {
    const scrollY = window.scrollY;
    navbar?.classList.toggle("scrolled", scrollY > 32);

    const position = scrollY + window.innerHeight * 0.42;
    let activeId = "";

    sections.forEach((section) => {
      if (position >= section.offsetTop) activeId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  updatePageState();
  window.addEventListener("scroll", updatePageState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
    updatePageState();
  });
});
