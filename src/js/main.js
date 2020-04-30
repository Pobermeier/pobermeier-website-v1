"use strict";

// Global state
const _STATE_ = {
  isNavMenuOpen: false,
};

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navbar Logic
  const navbarBurger = document.getElementById("navbar-burger");
  const navMenu = document.getElementById(navbarBurger.dataset.target);

  document.body.addEventListener("click", (e) => {
    if (
      e.target.id !== "navbar-burger" &&
      e.target.id !== "navMenu" &&
      _STATE_.isNavMenuOpen === true
    )
      toogleNav();
  });

  navbarBurger.addEventListener("click", function () {
    toogleNav();
  });

  navMenu.querySelectorAll(".navbar-item").forEach((navItem) => {
    navItem.addEventListener("click", () => {
      toogleNav();
    });
  });

  function toogleNav() {
    navbarBurger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
    _STATE_.isNavMenuOpen = !_STATE_.isNavMenuOpen;
  }

  // Clean-up URL (remove hash) after "jumping" to a heading
  document.getElementById("scroll-to-about").onclick = () => {
    document.location.hash = "#about";
    dataLayer.push({ event: "about-arrow-clicked" });
    removeHash();
  };

  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => removeHash(), 0);
    });
  });

  function removeHash() {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }

  // Init Modals
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    const modalButtons = modal.querySelectorAll("button");
    const modalBackground = modal.getElementsByClassName("modal-background");
    const clickHandlers = [...modalButtons, ...modalBackground];
    clickHandlers.forEach((clickHandler) =>
      clickHandler.addEventListener("click", () => {
        modal.classList.toggle("is-active");
        dataLayer.push({ event: "modal-closed" });
      })
    );
  });

  const modalLinks = document.querySelectorAll(".modal-link");
  modalLinks.forEach((modalLink) => {
    modalLink.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById(e.target.dataset.target)
        .classList.toggle("is-active");
      dataLayer.push({ event: "modal-opened" });
    });
  });

  // Set current year in footer
  (function setCurrentYear(element) {
    const currentYear = new Date().getFullYear();
    element.innerHTML = currentYear;
  })(document.getElementById("current-year"));

  // Set email-address after DOM-content has loaded
  (function setEmailAddress(elements, email) {
    elements.forEach((element) => {
      element.innerHTML = `<a href="mailto:${email}" onclick="dataLayer.push({'event': 'mail-clicked'});">${email}</a>`;
    });
  })(
    document.querySelectorAll(".email-placeholder"),
    "patrick.obermeier@outlook.com"
  );

  document.querySelector(
    "#email-button-placeholder"
  ).innerHTML = `<a class="button is-rounded is-secondary" href="mailto:patrick.obermeier@outlook.com"
    referrerpolicy="no-referrer" rel="noreferrer noopener" target="_blank" onclick="dataLayer.push({'event': 'mail-clicked'});">
    <span class="icon">
      <i class="fa fa-envelope"></i>
    </span>
    <span>Email</span>
  </a>`;

  var link = document.createElement("a");
  link.classList.add("navbar-item", "is-hidden-touch");
  link.href = "mailto:patrick.obermeier@outlook.com";
  link.innerHTML = `<span class="icon">
                    <i class="fa fa-envelope"></i>
                    </span>`;
  link.onclick = () => dataLayer.push({ event: "mail-clicked" });
  document.querySelector("#email-icon-placeholder").replaceWith(link);
});

// Init datalayer if it doesn't exit yet
window.dataLayer = window.dataLayer || [];

// Fix for 100vh height of hero-section on Mobile
convertWindowHeightToViewPortHeight();

window.addEventListener("resize", () => {
  convertWindowHeightToViewPortHeight();
});

function convertWindowHeightToViewPortHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Cookie Popup

function getAlertTemplate() {
  var template =
    '<div id="cookie-info" style="background-color:#fff;padding:0.8em;font-size:0.9rem;text-align:center;margin: 0 auto;">' +
    "<div>This website uses cookies. If you continue to use the website, we assume your consent.</div>" +
    '<div style="display:flex; flex-wrap: wrap; justify-content: center"><button id="accept-cookies" class="button is-rounded is-outlined is-primary" style="margin: 0.5em 1em;">Continue</button><button id="open-privacy-notice" class="button is-rounded is-secondary" style="margin: 0.5em 1em;">Privacy Notice</button></div>' +
    "</div>";
  return template;
}

function showCookieAlert() {
  var wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.bottom = 0;
  wrapper.style.left = 0;
  wrapper.style.zIndex = 20;
  wrapper.style.width = "100vw";
  wrapper.style.textAlign = "center";
  wrapper.innerHTML = getAlertTemplate();
  document.body.appendChild(wrapper);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var cookiesAccepted = getCookie("cookies-accepted");
  if (cookiesAccepted == "") {
    setTimeout(showCookieAlert, 3000);
  }
}

document.addEventListener(
  "click",
  function (e) {
    if (e.target.id == "accept-cookies") {
      setCookie("cookies-accepted", "1", 365 * 5);
      document.getElementById("cookie-info").style.display = "none";
      dataLayer.push({ event: "cookies-accepted" });
    }
  },
  false
);

document.addEventListener(
  "click",
  function (e) {
    if (e.target.id == "open-privacy-notice") {
      const privacyModal = document.querySelector("#privacy-modal");
      if (!privacyModal.classList.contains("is-active")) {
        privacyModal.classList.add("is-active");
        dataLayer.push({ event: "privacy-notice-opened" });
      }
    }
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function (e) {
    var cookie = document.getElementById("accept-cookies");
    if (cookie == null) {
      return checkCookie();
    }
  },
  false
);
