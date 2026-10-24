
import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   HERO ANIMATIONS
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
   PINNED VIDEO SECTION
   ========================================================================== */

const videoSection = document.querySelector(".video-section");
const videoPlaceholder = document.querySelector(".video-placeholder");

if (videoSection && videoPlaceholder) {
  const videoTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: videoSection,
      start: "top top",

      // Responsive pin duration
      end: () => `+=${Math.round(window.innerHeight * 1.5)}`,

      scrub: 1,
      pin: true,
      anticipatePin: 1,
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
   BRAND INTRODUCTION REVEAL
   ========================================================================== */

const brandIntro = document.querySelector(".brand-intro");

if (brandIntro) {
  const introTitle = brandIntro.querySelector("h2");
  const introRight = brandIntro.querySelector(".brand-intro__right");
  const introLine = brandIntro.querySelector(".brand-intro__top");

  if (introLine) {
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
  }

  gsap.from([introTitle, introRight].filter(Boolean), {
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
   CLIENT LOGO MARQUEE
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
    {
      x: startsFromLeft ? 0 : () => -halfWidth(),
    },
    {
      x: startsFromLeft ? () => -halfWidth() : 0,
      duration: 50,
      ease: "none",
      repeat: -1,
    },
  );
});

/* ==========================================================================
   HORIZONTAL WORK SLIDER + IMAGE REVEAL
   ========================================================================== */

const workSection = document.querySelector(".work-section");
const workTrack = document.querySelector(".work-track");

if (workSection && workTrack) {
  // Use the actual section width instead of the browser width.
  const getScrollDistance = () =>
    Math.max(0, workTrack.scrollWidth - workSection.clientWidth);

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

  // Reveal project images from bottom to top.
  gsap.utils.toArray(".work-slide .work-image").forEach((image) => {
    const slide = image.closest(".work-slide");

    if (!slide) return;

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
          trigger: slide,
          containerAnimation: workTween,
          start: "left 85%",
          end: "left 35%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  // Refresh measurements when project images load.
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
}


/* ==========================================================================
   SERVICES SECTION ANIMATION
   ========================================================================== */

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

/* ==========================================================================
   SERVICE CARDS — PINNED SCROLL ANIMATION
   ========================================================================== */

const serviceCardSection = document.querySelector(
  ".service-cards-section",
);

const serviceCards = gsap.utils.toArray(".service-card");

if (serviceCardSection && serviceCards.length) {
  gsap.set(serviceCards, {
    y: 180,
    autoAlpha: 0,
  });

  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: serviceCardSection,
      start: "top top",

      // Pin duration adjusts to the current screen height.
      end: () => `+=${Math.round(window.innerHeight * 2.5)}`,

      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Cards enter with a stagger.
  servicesTl.to(serviceCards, {
    y: 0,
    autoAlpha: 1,
    duration: 2,
    stagger: 0.8,
    ease: "power3.out",
  });

  // Brief hold while all cards are visible.
  servicesTl.to(
    {},
    {
      duration: 0.2,
    },
  );

  // Cards exit upward using the latest viewport height.
  servicesTl.to(serviceCards, {
    y: () => -window.innerHeight,
    autoAlpha: 0,
    duration: 2,
    stagger: 0.8,
    ease: "power3.in",
  });
}



/* ==========================================================================
   EXPLORE COLLABORATIONS ANIMATION
   ========================================================================== */

const collaborationsSection = document.querySelector(
  ".collaborations-section",
);

if (collaborationsSection) {
  const collaborationsTl = gsap.timeline({
    scrollTrigger: {
      trigger: collaborationsSection,
      start: "top 70%",
      end: "top 15%",
      scrub: 1,
    },
  });

  // Heading words reveal one after another.
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

  // Featured brands appear next.
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

  // Learn More link reveals last.
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

/* ==========================================================================
   PEOPLE SECTION ANIMATION
   ========================================================================== */

const peopleSection = document.querySelector(".people-section");
const peopleList = document.querySelector(".people-list");
const peopleTrack = document.querySelector(".people-list-track");
const peopleImage = document.querySelector(".people-preview");
const peopleImageElement = document.querySelector(
  ".people-preview-image",
);

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
    const peopleState = {
      activeIndex: -1,
    };

    // Initial image state.
    gsap.set(peopleImage, {
      autoAlpha: 0,
      scale: 0.88,
      rotation: 12,
    });

    gsap.set(peopleImageElement, {
      scale: 1.12,
    });

    // Calculate name positions from the current layout.
    function getTrackPositions() {
      const firstItem = peopleItems[0];
      const lastItem = peopleItems[peopleItems.length - 1];

      const viewportHeight = peopleList.clientHeight;

      const firstCenter =
        firstItem.offsetTop + firstItem.offsetHeight / 2;

      const lastCenter =
        lastItem.offsetTop + lastItem.offsetHeight / 2;

      return {
        startY: viewportHeight - firstCenter + 25,
        endY: viewportHeight / 2 - lastCenter,
      };
    }

    // Keep only one name active at a time.
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

    updateActiveName(0);

    const peopleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: peopleSection,
        start: "top top",

        // Adjust pinned duration to the current viewport.
        end: () => `+=${Math.round(window.innerHeight * 3)}`,

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

    // Preview image fades in and settles into place.
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

    // Names move from bottom to top.
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
  }
}



/* ==========================================================================
   STAND OUT — INDIVIDUAL LETTER ANIMATION
   ========================================================================== */

const section = document.querySelector(".stand-out");
const track = document.querySelector(".stand-out-track");
const letters = gsap.utils.toArray(".stand-out .letter");

const letterSettings = [
  { x: -80, y: -150, rotation: -45, scale: 0.5, opacity: 0, start: 0, duration: 0.8 },
  { x: 80, y: 120, rotation: 45, scale: 0.6, opacity: 0, start: 0.1, duration: 0.8 },
  { x: 0, y: -100, rotation: 90, scale: 0.4, opacity: 0, start: 0.2, duration: 0.7 },
  { x: -100, y: 80, rotation: -60, scale: 0.5, opacity: 0, start: 0.3, duration: 0.8 },
  { x: 50, y: -120, rotation: 30, scale: 0.7, opacity: 0, start: 0.4, duration: 0.8 },
  { x: 0, y: 150, rotation: -35, scale: 0.6, opacity: 0, start: 0.5, duration: 0.8 },
  { x: -60, y: -100, rotation: 50, scale: 0.5, opacity: 0, start: 0.6, duration: 0.8 },
  { x: 100, y: 80, rotation: -45, scale: 0.6, opacity: 0, start: 0.7, duration: 0.8 },
  { x: -40, y: 140, rotation: 25, scale: 0.5, opacity: 0, start: 0.8, duration: 0.8 },
  { x: 80, y: -130, rotation: -50, scale: 0.6, opacity: 0, start: 0.9, duration: 0.8 },
  { x: -90, y: 100, rotation: 40, scale: 0.5, opacity: 0, start: 1.0, duration: 0.8 },
  { x: 60, y: -80, rotation: -30, scale: 0.7, opacity: 0, start: 1.1, duration: 0.8 },
  { x: -50, y: 120, rotation: 60, scale: 0.5, opacity: 0, start: 1.2, duration: 0.8 },
  { x: 90, y: -150, rotation: -40, scale: 0.6, opacity: 0, start: 1.3, duration: 0.8 },
  { x: -100, y: 80, rotation: 45, scale: 0.5, opacity: 0, start: 1.4, duration: 0.8 },
  { x: 60, y: -120, rotation: -60, scale: 0.6, opacity: 0, start: 1.5, duration: 0.8 },
  { x: -80, y: 140, rotation: 35, scale: 0.5, opacity: 0, start: 1.6, duration: 0.8 },
  { x: 100, y: -100, rotation: -45, scale: 0.6, opacity: 0, start: 1.7, duration: 0.8 },
  { x: -60, y: 100, rotation: 55, scale: 0.5, opacity: 0, start: 1.8, duration: 0.8 },
  { x: 80, y: -130, rotation: -30, scale: 0.6, opacity: 0, start: 1.9, duration: 0.8 },
  { x: -90, y: 120, rotation: 40, scale: 0.5, opacity: 0, start: 2.0, duration: 0.8 },
  { x: 50, y: -100, rotation: -50, scale: 0.6, opacity: 0, start: 2.1, duration: 0.8 },
  { x: -70, y: 150, rotation: 35, scale: 0.5, opacity: 0, start: 2.2, duration: 0.8 },
  { x: 100, y: -80, rotation: -40, scale: 0.6, opacity: 0, start: 2.3, duration: 0.8 },
  { x: 0, y: 150, rotation: 90, scale: 0.4, opacity: 0, start: 2.4, duration: 0.8 },
];

if (section && track && letters.length) {
  const standOutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * 3)}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  standOutTimeline.fromTo(
    track,
    {
      x: () => window.innerWidth,
    },
    {
      x: () => -track.scrollWidth,
      duration: 4,
      ease: "none",
    },
    0,
  );

  letters.forEach((letter, index) => {
    const settings = letterSettings[index];

    if (!settings) return;

    standOutTimeline.fromTo(
      letter,
      {
        x: settings.x,
        y: settings.y,
        rotation: settings.rotation,
        scale: settings.scale,
        opacity: settings.opacity,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: settings.duration,
        ease: "power3.out",
      },
      settings.start,
    );
  });
}



/* ==========================================================================
   FOOTER — CONTENT + REVIVE LETTER ANIMATION
   ========================================================================== */

const footer = document.querySelector(".agency-footer");

if (footer) {
  const reviveContainer = footer.querySelector(".revive-container");

  const reviveLetters = reviveContainer
    ? Array.from(reviveContainer.querySelectorAll(".revive-letter"))
    : [];

  const yearElement = footer.querySelector("#footer-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const footerContent = footer.querySelectorAll(
    ".footer-left h2, " +
      ".footer-cta, " +
      ".footer-email, " +
      ".footer-nav a, " +
      ".footer-social a, " +
      ".footer-location, " +
      ".footer-bottom",
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
        toggleActions: "play none none reverse",
      },
    });
  }

  const reviveSettings = [
    { x: -180, y: -100, rotation: -35, scale: 0.65, delay: 0 },
    { x: 150, y: 120, rotation: 35, scale: 0.65, delay: 0.15 },
    { x: -100, y: 150, rotation: -25, scale: 0.65, delay: 0.3 },
    { x: 80, y: -140, rotation: 45, scale: 0.65, delay: 0.45 },
    { x: 150, y: 100, rotation: 30, scale: 0.65, delay: 0.6 },
    { x: 180, y: -100, rotation: -35, scale: 0.65, delay: 0.75 },
  ];

  if (reviveContainer && reviveLetters.length) {
    reviveLetters.forEach((letter, index) => {
      const setting = reviveSettings[index];

      if (!setting) return;

      gsap.set(letter, {
        x: setting.x,
        y: setting.y,
        rotation: setting.rotation,
        scale: setting.scale,
        autoAlpha: 0,
        transformOrigin: "center center",
      });
    });

    const reviveTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: reviveContainer,
        start: "top 90%",
        end: "bottom 100%",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
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
          overwrite: "auto",
        },
        setting.delay,
      );
    });
  }
}



/* ==========================================================================
   GLOBAL RESPONSIVE REFRESH
   ========================================================================== */

let refreshResizeTimer;

function refreshScrollTriggers() {
  clearTimeout(refreshResizeTimer);

  refreshResizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
}

// Wait until the page and its assets have loaded.
window.addEventListener(
  "load",
  () => {
    ScrollTrigger.refresh();
  },
  { once: true },
);

// Recalculate positions after browser resizing.
window.addEventListener("resize", refreshScrollTriggers);

// Handle mobile/tablet orientation changes.
window.addEventListener("orientationchange", refreshScrollTriggers);

// Recalculate after web fonts finish loading.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}
  