const locomotiveScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
})
function loadingAnimationMobile() {
  const loader = document.querySelector("#loading")
  const loaderText = document.querySelector("#loading h3")
  const loaderOverlay = document.querySelector("#loading #loading-overlay")
  const mainContent = document.querySelector("main")

  // Check the device width to determine the animation behavior
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    let tl = gsap.timeline()
    tl.to(loaderOverlay, {
      width: `100%`, // set width 100% on smaller devices
      duration: 0.01,
    })
    tl.to(loaderOverlay, {
      height: `0%`, // set height 0% on smaller devices
      duration: 0.01,
    })
  } else {
    let tl = gsap.timeline()
    tl.to(loaderOverlay, {
      width: `0%`, // set width 100% on smaller devices
      duration: 0.01,
    })
    tl.to(loaderOverlay, {
      height: `100%`, // set height 0% on smaller devices
      duration: 0.01,
    })
  }

  // Function to start and manage the loading animation
  function loaderCount() {
    let count = 0

    let countInc = setInterval(() => {
      count++
      loaderText.innerText = `${count}%`

      // Use different GSAP animations based on device width
      if (isMobile) {
        gsap.to(loaderOverlay, {
          height: `${count}%`, // Increase height on smaller devices
          ease: "power3.out",
          duration: 0.3,
        })
      } else {
        gsap.to(loaderOverlay, {
          width: `${count}%`, // Increase width on larger devices
          ease: "power3.out",
          duration: 0.3,
        })
      }

      if (count >= 100) {
        clearInterval(countInc)

        // Hide the loader and reveal the main content
        const timeline = gsap.timeline()

        timeline.to(loader, {
          y: "-100%", // Hide by moving up on larger devices
          duration: 0.5,
        })
        timeline.to(loader, {
          display: "none",
          duration: 0.01,
        })
        timeline.to(
          mainContent,
          {
            height: "auto",
          },
          "-=0.8" // Slight delay to align with the loader transition
        )

        function navAnimation() {
          timeline.from(
            "nav #logo",
            {
              y: -80,
              opacity: 0,
              duration: 0.8,
            },
            "nav"
          )
          timeline.from(
            "nav #lines",
            {
              y: -80,
              opacity: 0,
              duration: 0.8,
            },
            "nav"
          )
          timeline.from(
            "nav #nav-menu-icons",
            {
              opacity: 0,
              y: -80,
              duration: 0.8,
            },
            "nav"
          )
          timeline.from(
            "#landing-page #right-side h1,#landing-page #right-side p",
            {
              opacity: 0,
              x: 150,
              stagger: 0.2,
              duration: 0.8,
              ease: "[0.33, 1, 0.68, 1]",
            },
            "-=.3"
          )
          timeline.from(
            "#landing-page #left-side",
            {
              scale: 0.5,
              opacity: 0,
              duration: 0.8,
            },
            "-=1"
          )
        }
        navAnimation()
      }
    }, 30)
  }

  loaderCount()
}
function revealAnimation() {
  function aboutAnimation() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-me",
        start: "top 75%",
        end: "top 30%",
        scrub: 2,
      },
    })
    tl.from(
      "#about-me",
      {
        opacity: 0,
        duration: 0.8,
      },
      "info"
    )
    tl.from(
      "#about-me #left-info",
      {
        x: -200,
        opacity: 0,
        duration: 0.8,
      },
      "info"
    )
    tl.from(
      "#about-me #right-info",
      {
        x: 200,
        opacity: 0,
        duration: 0.8,
      },
      "info"
    )
  }
  function skillAnimation() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 90%",
        end: "top -60%",
        scrub: 2,
      },
    })
    tl.from(
      "#skills",
      {
        opacity: 0,
        duration: 0.8,
      },
      "skills"
    )
    tl.from(
      "#skills .skill-container",
      {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        stagger: 0.2,
      },
      "skills"
    )
  }
  function workAnimation() {
    gsap.from("#my-work", {
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: "#my-work",
        start: "top 90%",
        end: "top -50%",
        scrub: 2,
      },
    })
  }
  function educationAnimation() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#education",
        start: "top 80%",
        end: "top -50%",
        scrub: 2,
      },
    })
    tl.from(
      "#education",
      {
        opacity: 0,
        duration: 0.8,
      },
      "edu"
    )
    tl.from(
      "#education .edu-left",
      {
        x: -200,
        opacity: 0,
        duration: 0.8,
        stagger: 0.4,
      },
      "edu"
    )
    tl.from(
      "#education .edu-right",
      {
        x: 200,
        opacity: 0,
        duration: 0.8,
        stagger: 0.4,
      },
      "edu"
    )
  }
  function contactAnimation() {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact-me",
        start: "top 80%",
        end: "top 50%",
        scrub: 2,
      },
    })
    tl.from(
      "#contact-me",
      {
        opacity: 0.4,
        duration: 0.8,
      },
      "contact"
    )
    tl.from(
      "#contact-me #contact-details",
      {
        scale: 0,
        duration: 0.8,
      },
      "contact"
    )
  }
  aboutAnimation()
  skillAnimation()
  workAnimation()
  educationAnimation()
  contactAnimation()
}
function navMenuLines() {
  const lines = document.querySelectorAll("nav #lines .line")
  const menuIcon = document.querySelector("nav #lines")
  // All Navigation Icons
  const allIcons = document.querySelectorAll("nav #nav-menu-icons .nav-icon")
  const sections = document.querySelectorAll("section")

  let menuOpen = false
  let lineUp = null
  let lineDown = null
  lines.forEach((line, idx) => {
    if (idx === 0) {
      lineUp = line
    } else {
      lineDown = line
    }
  })

  menuIcon.addEventListener("click", () => {
    if (menuOpen) {
      menuOpen = false
      gsap.to(lineUp, {
        rotate: "0deg",
        width: "64px",
        top: "35%",
      })
      gsap.to(lineDown, {
        rotate: "0deg",
        width: "64px",
        top: "65%",
      })
      gsap.to(menuIcon, {
        width: "64px",
      })
      gsap.to(allIcons, {
        x: 0,
        duration: 0.1,
        stagger: 0.08,
      })
    } else {
      menuOpen = true
      gsap.to(lineUp, {
        rotate: "45deg",
        width: "30px",
        top: "50%",
      })
      gsap.to(lineDown, {
        rotate: "-45deg",
        width: "30px",
        top: "50%",
      })
      gsap.to(menuIcon, {
        width: "32px",
      })
      gsap.to(allIcons, {
        x: "-84px",
        duration: 0.1,
        stagger: 0.08,
      })
    }
  })

  // remove active class from nav icons
  function removeActivatedFromAll() {
    allIcons.forEach((icon) => {
      icon.classList.remove("activated")
    })
  }
  allIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault()
      removeActivatedFromAll()
      icon.classList.add("activated")
      const targetId = icon.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        locomotiveScroll.scrollTo(targetSection, {
          offset: -80,
          duration: 2,
        })
      }
    })
  })

  function sectionObserver() {
    // Observer to track which section is view
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = document.querySelector(
            `nav .nav-icon[href="#${entry.target.id}"]`
          )
          removeActivatedFromAll()
          activeLink.classList.add("activated")
        }
      })
    }, observerOptions)

    sections.forEach((sec) => {
      observer.observe(sec)
    })
  }
  sectionObserver()
}
function aboutMeCVDownloadBtn() {
  let cvBtn = document.querySelector("#cv-info")
  let cvBtnEffect = cvBtn.querySelector("#btn-overlay")
  let cvBtnText = cvBtn.querySelector("h4")
  let cvBtnIcon = cvBtnEffect.querySelector("span")
  cvBtn.addEventListener("mouseenter", () => {
    gsap.to(cvBtnEffect, {
      width: "100%",
      duration: 0.3,
    })
    gsap.to(cvBtnIcon, {
      background: "rgb(9 9 11)",
      color: "rgb(234 179 8)",
      duration: 0.3,
    })
    gsap.to(cvBtnText, {
      color: "rgb(9 9 11)",
      duration: 0.2,
    })
  })
  cvBtn.addEventListener("mouseleave", () => {
    gsap.to(cvBtnEffect, {
      width: "0%",
      duration: 0.3,
    })
    gsap.to(cvBtnIcon, {
      background: "rgb(234 179 8)",
      color: "rgb(9 9 11)",
      duration: 0.3,
    })
    gsap.to(cvBtnText, {
      color: "rgb(228 228 231)",
      duration: 0.2,
    })
  })
}
function skillsAnimation() {
  let skillContainer = document.querySelectorAll(
    "#skills #all-skills .skill-container"
  )

  skillContainer.forEach((container) => {
    let skillName = container.querySelector("h4")
    let skillImg = container.querySelector("img")

    container.addEventListener("mouseenter", () => {
      gsap.from(container, {
        "--rotate-forward": 360,
        "--rotate-reverse": -360,
        duration: 2,
      })
      gsap.to(skillName, {
        scale: 1,
        opacity: 1,
        y: "100%",
      })
      gsap.to(skillImg, {
        y: "-20%",
      })
    })
    container.addEventListener("mouseleave", () => {
      gsap.to(skillName, {
        scale: 0,
        opacity: 0,
        y: 0,
      })
      gsap.to(skillImg, {
        y: 0,
      })
    })
  })
}
function workAnimation() {
  let projectBoxes = document.querySelectorAll("#all-work .work-projects")
  let boxText = document.querySelectorAll(".work-projects h3")

  function workHoverText() {
    boxText.forEach((text) => {
      text.innerHTML = text.innerText
        .split("")
        .map((word, idx) => {
          if (idx === 6) {
            return `<span class="inline-block pl-2 border-b-2 border-yellow-400 translate-y-[100%]">${word}</span>`
          } else
            return `<span class="inline-block border-b-2 border-yellow-400 translate-y-[100%]">${word}</span>`
        })
        .join("")
    })
    projectBoxes.forEach((box) => {
      let span = box.querySelectorAll("span")
      box.addEventListener("mouseenter", () => {
        gsap.to(span, {
          y: 0,
          duration: 0.2,
          stagger: 0.04,
        })
      })
      box.addEventListener("mouseleave", () => {
        gsap.to(span, {
          y: "100%",
          duration: 0.2,
          stagger: 0.04,
        })
      })
    })
  }
  workHoverText()
}
loadingAnimationMobile()
revealAnimation()
navMenuLines()
aboutMeCVDownloadBtn()
skillsAnimation()
workAnimation()
