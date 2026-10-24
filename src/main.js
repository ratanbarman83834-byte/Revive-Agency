import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   Hero animations
   ========================================================================== */

gsap.fromTo(
  ".hero-title .letter",
  {
    y: (index) => (index % 2 === 0 ? "-120%" : "80%"),
    opacity: 0,
  },
  {
    y: "0%",
    opacity: 1,
    duration: 1.6,
    stagger: {
      each: 0.08,
      from: "start",
    },
    ease: "power4.out",
    delay: 0.2,
  },
);

const bottomTimeline = gsap.timeline({ delay: 0.8 });

bottomTimeline
  .to(".hero-tagline", {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
  })
  .to(
    ".hero-description",
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    },
    "-=0.65",
  )
  .to(
    ".hero-scroll",
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.6",
  );

/* ==========================================================================
   Pinned video section
   ========================================================================== */

const videoSection = document.querySelector(".video-section");
const videoPlaceholder = document.querySelector(".video-placeholder");

if (videoSection && videoPlaceholder) {
  const videoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: videoSection,
      start: "top top",
      end: "+=1200",
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });

  videoTimeline
    .to(
      videoPlaceholder,
      {
        scale: 0.48,
        duration: 1,
        ease: "none",
      },
      0,
    )
    .to(
      ".video-text .eyebrow",
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      },
      0.85,
    )
    .to(
      ".video-text h2",
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      1,
    )
    .to(
      ".video-text > p:last-child",
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      },
      1.25,
    );
}

/* ==========================================================================
   Brand introduction reveal
   ========================================================================== */

const brandIntro = document.querySelector(".brand-intro");

if (brandIntro) {
  const introTitle = brandIntro.querySelector("h2");
  const introRight = brandIntro.querySelector(".brand-intro__right");
  const introLine = brandIntro.querySelector(".brand-intro__top");

  gsap.from(introLine, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: brandIntro,
      start: "top 80%",
      once: true,
    },
  });

  gsap.from([introTitle, introRight], {
    y: 35,
    opacity: 0,
    duration: 0.9,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: brandIntro,
      start: "top 75%",
      once: true,
    },
  });
}

/* ==========================================================================
   Client logo marquee
   Duplicate each row's cards so the loop can wrap without a visible gap.
   ========================================================================== */

const logoTracks = gsap.utils.toArray(".logo-track");

logoTracks.forEach((track, index) => {
  if (track.dataset.loopReady !== "true") {
    [...track.children].forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    track.dataset.loopReady = "true";
  }

  const halfWidth = () => track.scrollWidth / 2;
  const startsFromLeft = index === 0;

  gsap.fromTo(
    track,
    { x: startsFromLeft ? 0 : () => -halfWidth() },
    {
      x: startsFromLeft ? () => -halfWidth() : 0,
      duration: 50,
      ease: "none",
      repeat: -1,
    },
  );
});

/* ========================================
   REVIVE — HORIZONTAL WORK + IMAGE REVEAL
======================================== */

const workSection = document.querySelector(".work-section");
const workTrack = document.querySelector(".work-track");

if (workSection && workTrack) {
  // Calculate total horizontal distance
  const getScrollDistance = () =>
    Math.max(0, workTrack.scrollWidth - window.innerWidth);

  // Horizontal movement.
  // Keep this as a separate linear tween because image
  // ScrollTriggers use it as their container animation.
  const workTween = gsap.to(workTrack, {
    x: () => -getScrollDistance(),
    ease: "none",

    scrollTrigger: {
      trigger: workSection,
      start: "top top",
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Reveal each project image from bottom to top

  gsap.utils.toArray(".work-slide .work-image").forEach((image) => {
    gsap.fromTo(
      image,
      {
        y: 100,
        rotation: 3,
        transformOrigin: "left bottom",
        opacity: 0,
      },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: image.closest(".work-slide"),
          containerAnimation: workTween,
          start: "left 85%",
          end: "left 35%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // Refresh measurements after images load
  workTrack.querySelectorAll("img").forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", () => ScrollTrigger.refresh(), {
        once: true,
      });

      img.addEventListener("error", () => ScrollTrigger.refresh(), {
        once: true,
      });
    }
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), {
    once: true,
  });
}

/* ========================================
   SERVICES SECTION ANIMATION
======================================== */

gsap.registerPlugin(ScrollTrigger);

const servicesSection = document.querySelector(".services-section");

if (servicesSection) {
  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: servicesSection,
      start: "top 75%",
      once: true,
    },
  });

  servicesTl.from(".services-heading span", {
    y: 70,
    opacity: 0,
    duration: 1,
    stagger: 0.18,
    ease: "power3.out",
  });

  servicesTl.from(
    ".services-summary",
    {
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.55",
  );

  servicesTl.from(
    ".services-link",
    {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    },
    "-=0.4",
  );
}

/* ========================================
   SERVICES — SEQUENTIAL SCROLL ANIMATION
======================================== */

gsap.registerPlugin(ScrollTrigger);

const serviceCardSection = document.querySelector(".service-cards-section");

const serviceCards = gsap.utils.toArray(".service-card");

if (serviceCardSection && serviceCards.length) {
  gsap.set(serviceCards, {
    y: 180,
    autoAlpha: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: serviceCardSection,
      start: "top top",
      end: () => `+=${window.innerHeight * 2.5}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Cards enter with a slight stagger
  tl.to(serviceCards, {
    y: 0,
    autoAlpha: 1,
    duration: 2,
    stagger: 0.8,
    ease: "power3.out",
  });

  // Hold all cards on screen
  tl.to(
    {},
    {
      duration: 0.2,
    },
  );

  // Cards exit upward with a slight stagger
  tl.to(serviceCards, {
    y: -window.innerHeight,
    autoAlpha: 0,
    duration: 2,
    stagger: 0.8,
    ease: "power3.in",
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), {
    once: true,
  });
}

/* ========================================
   EXPLORE COLLABORATIONS ANIMATION
======================================== */

gsap.registerPlugin(ScrollTrigger);

const collaborationsSection = document.querySelector(".collaborations-section");

if (collaborationsSection) {
  const collaborationsTl = gsap.timeline({
    scrollTrigger: {
      trigger: collaborationsSection,
      start: "top 70%",
      end: "top 15%",
      scrub: 1,
    },
  });

  // Heading: words reveal upward, one after another
  collaborationsTl.from(
    ".collaborations-heading span",
    {
      yPercent: 110,
      opacity: 0,
      stagger: 0.18,
      duration: 1,
      ease: "power3.out",
    },
    0,
  );

  // Featured brands appear slightly later
  collaborationsTl.from(
    ".collaborations-featured",
    {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    },
    0.3,
  );

  // Learn More link reveals last
  collaborationsTl.from(
    ".collaborations-link",
    {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    },
    0.55,
  );
}

/* ===== PEOPLE SECTION ANIMATION ===== */

const peopleSection = document.querySelector(".people-section");
const peopleList = document.querySelector(".people-list");
const peopleTrack = document.querySelector(".people-list-track");
const peopleImage = document.querySelector(".people-preview");
const peopleImageElement = document.querySelector(".people-preview-image");

if (
  peopleSection &&
  peopleList &&
  peopleTrack &&
  peopleImage &&
  peopleImageElement
) {
  const peopleItems = gsap.utils.toArray(
    peopleTrack.querySelectorAll(".person-item"),
  );

  if (peopleItems.length) {
    const peopleState = { activeIndex: -1 };

    // Image entrance starting state
    gsap.set(peopleImage, {
      autoAlpha: 0,
      scale: 0.88,
      rotation: 12,
    });

    gsap.set(peopleImageElement, {
      scale: 1.12,
    });

    // Names ki starting aur ending position calculate karo
    function getTrackPositions() {
      const firstItem = peopleItems[0];
      const lastItem = peopleItems[peopleItems.length - 1];

      const viewportHeight = peopleList.clientHeight;

      const firstCenter = firstItem.offsetTop + firstItem.offsetHeight / 2;

      const lastCenter = lastItem.offsetTop + lastItem.offsetHeight / 2;

      return {
        startY: viewportHeight - firstCenter + 25,
        endY: viewportHeight / 2 - lastCenter,
      };
    }

    // Ek waqt mein sirf ek naam active rahega
    function updateActiveName(progress) {
      const index = Math.min(
        peopleItems.length - 1,
        Math.floor(progress * peopleItems.length),
      );

      if (index === peopleState.activeIndex) return;

      peopleState.activeIndex = index;

      peopleItems.forEach((item, itemIndex) => {
        item.classList.toggle("active", itemIndex === index);
      });
    }

    // Initial selected name
    updateActiveName(0);

    const peopleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: peopleSection,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          updateActiveName(self.progress);
        },

        onRefresh: (self) => {
          updateActiveName(self.progress);
        },
      },
    });

    // Image smoothly fade-in + zoom-out into its final size
    peopleTimeline.to(
      peopleImage,
      {
        autoAlpha: 1,
        scale: 1,
        rotation: 6,
        duration: 0.25,
        ease: "power3.out",
      },
      0,
    );

    peopleTimeline.to(
      peopleImageElement,
      {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      },
      0,
    );

    // Names bottom se top ki taraf move karenge
    peopleTimeline.fromTo(
      peopleTrack,
      {
        y: () => getTrackPositions().startY,
      },
      {
        y: () => getTrackPositions().endY,
        duration: 1,
        ease: "none",
      },
      0,
    );

    // Refresh positions after viewport changes
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }
}

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".stand-out");
const track = document.querySelector(".stand-out-track");
const letters = gsap.utils.toArray(".stand-out .letter");

// =====================================
// 1. LETTER ANIMATION SETTINGS
// Sirf in values ko change karna hai.
// =====================================

const letterSettings = [
  // Letter 1: S
  {
    x: -80,
    y: -150,
    rotation: -45,
    scale: 0.5,
    opacity: 0,
    start: 0,
    duration: 0.8
  },

  // Letter 2: o
  {
    x: 80,
    y: 120,
    rotation: 45,
    scale: 0.6,
    opacity: 0,
    start: 0.1,
    duration: 0.8
  },

  // Letter 3: ,
  {
    x: 0,
    y: -100,
    rotation: 90,
    scale: 0.4,
    opacity: 0,
    start: 0.2,
    duration: 0.7
  },

  // Letter 4: a
  {
    x: -100,
    y: 80,
    rotation: -60,
    scale: 0.5,
    opacity: 0,
    start: 0.3,
    duration: 0.8
  },

  // Letter 5: r
  {
    x: 50,
    y: -120,
    rotation: 30,
    scale: 0.7,
    opacity: 0,
    start: 0.4,
    duration: 0.8
  },

  // Letter 6: e
  {
    x: 0,
    y: 150,
    rotation: -35,
    scale: 0.6,
    opacity: 0,
    start: 0.5,
    duration: 0.8
  },

  // Letter 7: y
  {
    x: -60,
    y: -100,
    rotation: 50,
    scale: 0.5,
    opacity: 0,
    start: 0.6,
    duration: 0.8
  },

  // Letter 8: o
  {
    x: 100,
    y: 80,
    rotation: -45,
    scale: 0.6,
    opacity: 0,
    start: 0.7,
    duration: 0.8
  },

  // Letter 9: u
  {
    x: -40,
    y: 140,
    rotation: 25,
    scale: 0.5,
    opacity: 0,
    start: 0.8,
    duration: 0.8
  },

  // Letter 10: r
  {
    x: 80,
    y: -130,
    rotation: -50,
    scale: 0.6,
    opacity: 0,
    start: 0.9,
    duration: 0.8
  },

  // Letter 11: e
  {
    x: -90,
    y: 100,
    rotation: 40,
    scale: 0.5,
    opacity: 0,
    start: 1.0,
    duration: 0.8
  },

  // Letter 12: a
  {
    x: 60,
    y: -80,
    rotation: -30,
    scale: 0.7,
    opacity: 0,
    start: 1.1,
    duration: 0.8
  },

  // Letter 13: d
  {
    x: -50,
    y: 120,
    rotation: 60,
    scale: 0.5,
    opacity: 0,
    start: 1.2,
    duration: 0.8
  },

  // Letter 14: y
  {
    x: 90,
    y: -150,
    rotation: -40,
    scale: 0.6,
    opacity: 0,
    start: 1.3,
    duration: 0.8
  },

  // Letter 15: t
  {
    x: -100,
    y: 80,
    rotation: 45,
    scale: 0.5,
    opacity: 0,
    start: 1.4,
    duration: 0.8
  },

  // Letter 16: o
  {
    x: 60,
    y: -120,
    rotation: -60,
    scale: 0.6,
    opacity: 0,
    start: 1.5,
    duration: 0.8
  },

  // Letter 17: s
  {
    x: -80,
    y: 140,
    rotation: 35,
    scale: 0.5,
    opacity: 0,
    start: 1.6,
    duration: 0.8
  },

  // Letter 18: t
  {
    x: 100,
    y: -100,
    rotation: -45,
    scale: 0.6,
    opacity: 0,
    start: 1.7,
    duration: 0.8
  },

  // Letter 19: a
  {
    x: -60,
    y: 100,
    rotation: 55,
    scale: 0.5,
    opacity: 0,
    start: 1.8,
    duration: 0.8
  },

  // Letter 20: n
  {
    x: 80,
    y: -130,
    rotation: -30,
    scale: 0.6,
    opacity: 0,
    start: 1.9,
    duration: 0.8
  },

  // Letter 21: d
  {
    x: -90,
    y: 120,
    rotation: 40,
    scale: 0.5,
    opacity: 0,
    start: 2.0,
    duration: 0.8
  },

  // Letter 22: o
  {
    x: 50,
    y: -100,
    rotation: -50,
    scale: 0.6,
    opacity: 0,
    start: 2.1,
    duration: 0.8
  },

  // Letter 23: u
  {
    x: -70,
    y: 150,
    rotation: 35,
    scale: 0.5,
    opacity: 0,
    start: 2.2,
    duration: 0.8
  },

  // Letter 24: t
  {
    x: 100,
    y: -80,
    rotation: -40,
    scale: 0.6,
    opacity: 0,
    start: 2.3,
    duration: 0.8
  },

  // Letter 25: ?
  {
    x: 0,
    y: 150,
    rotation: 90,
    scale: 0.4,
    opacity: 0,
    start: 2.4,
    duration: 0.8
  }
];

// =====================================
// 2. PINNED SCROLL TIMELINE
// =====================================

if (section && track && letters.length) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 3}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Text ko right se left move karna
  tl.fromTo(
    track,
    {
      x: () => window.innerWidth
    },
    {
      x: () => -track.scrollWidth,
      duration: 4,
      ease: "none"
    },
    0
  );

  // Har letter ki individual animation
  letters.forEach((letter, index) => {
    const settings = letterSettings[index];

    if (!settings) return;

    tl.fromTo(
      letter,
      {
        x: settings.x,
        y: settings.y,
        rotation: settings.rotation,
        scale: settings.scale,
        opacity: settings.opacity
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: settings.duration,
        ease: "power3.out"
      },
      settings.start
    );
  });
}



(() => {
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // 1. SELECT FOOTER ELEMENTS
  // ========================================

  const footer = document.querySelector(".agency-footer");

  if (!footer) return;

  const reviveContainer = footer.querySelector(".revive-container");
  const reviveLetters = reviveContainer
    ? Array.from(reviveContainer.querySelectorAll(".revive-letter"))
    : [];

  // Update copyright year
  const yearElement = footer.querySelector("#footer-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================
  // 2. CUSTOM SETTINGS — R E V I V E
  // Change these values to customize letters
  // ========================================

  const reviveSettings = [
    // R
    { x: -180, y: -100, rotation: -35, scale: 0.65, delay: 0 },
    // E
    { x: 150, y: 120, rotation: 35, scale: 0.65, delay: 0.15 },
    // V
    { x: -100, y: 150, rotation: -25, scale: 0.65, delay: 0.30 },
    // I
    { x: 80, y: -140, rotation: 45, scale: 0.65, delay: 0.45 },
    // V
    { x: 150, y: 100, rotation: 30, scale: 0.65, delay: 0.60 },
    // E
    { x: 180, y: -100, rotation: -35, scale: 0.65, delay: 0.75 }
  ];

  // ========================================
  // 3. FOOTER CONTENT REVEAL
  // ========================================

  const footerContent = footer.querySelectorAll(
    ".footer-left h2, " +
    ".footer-cta, " +
    ".footer-email, " +
    ".footer-nav a, " +
    ".footer-social a, " +
    ".footer-location, " +
    ".footer-bottom"
  );

  if (footerContent.length) {
    gsap.from(footerContent, {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  }

  // ========================================
  // 4. REVIVE LETTER ANIMATION
  // ========================================

  if (!reviveContainer || !reviveLetters.length) return;

  // Initial positions for each letter
  reviveLetters.forEach((letter, index) => {
    const setting = reviveSettings[index];

    if (!setting) return;

    gsap.set(letter, {
      x: setting.x,
      y: setting.y,
      rotation: setting.rotation,
      scale: setting.scale,
      autoAlpha: 0,
      transformOrigin: "center center"
    });
  });

  // Scroll controls the animation progress
  const reviveTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: reviveContainer,
      start: "top 90%",
      end: "bottom 100%",
      scrub: 0.5,
      invalidateOnRefresh: true
    }
  });

  reviveLetters.forEach((letter, index) => {
    const setting = reviveSettings[index];

    if (!setting) return;

    reviveTimeline.to(
      letter,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 2.5,
        ease: "power3.out",
        overwrite: "auto"
      },
      setting.delay
    );
  });

  // ========================================
  // 5. REFRESH SCROLLTRIGGER
  // ========================================

  window.addEventListener(
    "load",
    () => ScrollTrigger.refresh(),
    { once: true }
  );

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
})();
