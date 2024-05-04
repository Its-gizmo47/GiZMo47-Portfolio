const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
});

function navMenuLines() {
  const lines = document.querySelectorAll("nav #lines .line");
  const menuIcon = document.querySelector("nav #lines");
  const navMenuIcons = document.querySelector("nav #nav-menu-icons");
  // All Navigation Icons
  const allIcons = document.querySelectorAll("nav #nav-menu-icons .nav-icon");
  const sections = document.querySelectorAll("section");

  let menuOpen = false;
  let lineUp = null;
  let lineDown = null;
  lines.forEach((line, idx) => {
    if (idx === 0) {
      lineUp = line;
    } else {
      lineDown = line;
    }
  });

  menuIcon.addEventListener("click", () => {
    if (menuOpen) {
      menuOpen = false;
      gsap.to(lineUp, {
        rotate: "0deg",
        width: "64px",
        top: "35%",
      });
      gsap.to(lineDown, {
        rotate: "0deg",
        width: "64px",
        top: "65%",
      });
      gsap.to(menuIcon, {
        width: "64px",
      });
      gsap.to(allIcons, {
        x: 0,
        duration: 0.1,
        stagger: 0.08,
      });
    } else {
      menuOpen = true;
      gsap.to(lineUp, {
        rotate: "45deg",
        width: "30px",
        top: "50%",
      });
      gsap.to(lineDown, {
        rotate: "-45deg",
        width: "30px",
        top: "50%",
      });
      gsap.to(menuIcon, {
        width: "32px",
      });
      gsap.to(allIcons, {
        x: "-84px",
        duration: 0.1,
        stagger: 0.08,
      });
    }
  });

  // remove active class from nav icons
  function removeActivatedFromAll() {
    allIcons.forEach((icon) => {
      icon.classList.remove("activated");
    });
  }
  allIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      removeActivatedFromAll();
      icon.classList.add("activated");
      const targetId = icon.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        locomotiveScroll.scrollTo(targetSection, {
          offset: -80,
          duration: 2,
        });
      }
    });
  });

  function sectionObserver() {
    // Observer to track which section is view
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = document.querySelector(
            `nav .nav-icon[href="#${entry.target.id}"]`
          );
          removeActivatedFromAll();
          activeLink.classList.add("activated");
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      observer.observe(sec);
    });
  }
  sectionObserver();
}

function aboutMeCVDownloadBtn() {
  let cvBtn = document.querySelector("#cv-info");
  let cvBtnEffect = cvBtn.querySelector("#btn-overlay");
  let cvBtnText = cvBtn.querySelector("h4");
  let cvBtnIcon = cvBtnEffect.querySelector("span");
  cvBtn.addEventListener("mouseenter", () => {
    gsap.to(cvBtnEffect, {
      width: "100%",
      duration: 0.3,
    });
    gsap.to(cvBtnIcon, {
      background: "rgb(9 9 11)",
      color: "rgb(234 179 8)",
      duration: 0.3,
    });
    gsap.to(cvBtnText, {
      color: "rgb(9 9 11)",
      duration: 0.2,
    });
  });
  cvBtn.addEventListener("mouseleave", () => {
    gsap.to(cvBtnEffect, {
      width: "0%",
      duration: 0.3,
    });
    gsap.to(cvBtnIcon, {
      background: "rgb(234 179 8)",
      color: "rgb(9 9 11)",
      duration: 0.3,
    });
    gsap.to(cvBtnText, {
      color: "rgb(228 228 231)",
      duration: 0.2,
    });
  });
}

function skillsAnimation() {
  let skillContainer = document.querySelectorAll(
    "#skills #all-skills .skill-container"
  );

  skillContainer.forEach((container) => {
    let skillName = container.querySelector("h4");
    let skillImg = container.querySelector("img");

    container.addEventListener("mouseenter", () => {
      gsap.from(container, {
        "--rotate-forward": 360,
        "--rotate-reverse": -360,
        duration: 2,
      });
      gsap.to(skillName, {
        scale: 1,
        opacity: 1,
        y: "100%",
      });
      gsap.to(skillImg, {
        y: "-20%",
      });
    });
    container.addEventListener("mouseleave", () => {
      gsap.to(skillName, {
        scale: 0,
        opacity: 0,
        y: 0,
      });
      gsap.to(skillImg, {
        y: 0,
      });
    });
  });
}

function workAnimation() {
  let projectBoxes = document.querySelectorAll("#all-work .work-projects");
  let boxText = document.querySelectorAll(".work-projects h3");

  function workHoverText() {
    boxText.forEach((text) => {
      text.innerHTML = text.innerText
        .split("")
        .map((word, idx) => {
          if (idx === 6) {
            return `<span class="inline-block pl-2 border-b-2 border-yellow-400 translate-y-[100%]">${word}</span>`;
          } else
            return `<span class="inline-block border-b-2 border-yellow-400 translate-y-[100%]">${word}</span>`;
        })
        .join("");
    });
    projectBoxes.forEach((box) => {
      let span = box.querySelectorAll("span");
      box.addEventListener("mouseenter", () => {
        gsap.to(span, {
          y: 0,
          duration: 0.2,
          stagger: 0.04,
        });
      });
      box.addEventListener("mouseleave", () => {
        gsap.to(span, {
          y: "100%",
          duration: 0.2,
          stagger: 0.04,
        });
      });
    });
  }
  workHoverText();
}

navMenuLines();

aboutMeCVDownloadBtn();

skillsAnimation();

workAnimation();
