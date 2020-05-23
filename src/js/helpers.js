// Fix for 100vh height of hero-section on Mobile
export function convertWindowHeightToViewPortHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Helper function to lazy-load styles from URI
export function fetchStyle(url) {
  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  let headScript = document.querySelector("script");
  headScript.parentNode.insertBefore(link, headScript);
}

// Lazy-load BG-images
export function lazyLoadBackgroundImages() {
  const lazyBackgrounds = Array.from(
    document.querySelectorAll(".lazy-background")
  );

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("enhanced");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  } else {
    document.body.classList.add("non-lazy");
    lazyBackgrounds.forEach((element) => {
      element.classList.add("enhanced");
    });
  }
}

// Utility function that "cleans-up" the URL after clicking on an in-page link
export function removeHash() {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}
