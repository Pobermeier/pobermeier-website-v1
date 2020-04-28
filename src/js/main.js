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
      clickHandler.addEventListener("click", () =>
        modal.classList.toggle("is-active")
      )
    );
  });

  const modalLinks = document.querySelectorAll(".modal-link");
  modalLinks.forEach((modalLink) => {
    modalLink.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById(e.target.dataset.target)
        .classList.toggle("is-active");
    });
  });
});

// Fix for 100vh height of hero-section on Mobile
convertWindowHeightToViewPortHeight();

window.addEventListener("resize", () => {
  convertWindowHeightToViewPortHeight();
});

function convertWindowHeightToViewPortHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
