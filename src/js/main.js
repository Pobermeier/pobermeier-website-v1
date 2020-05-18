"use strict";

import initCookieBanner from "./cookies";
import {
  convertWindowHeightToViewPortHeight,
  fetchStyle,
  lazyLoadBackgroundImages,
  removeHash,
} from "./helpers";
import registerSW from "./registerSW";
import AOS from "aos";

(function App() {
  // Global state
  const _STATE_ = {
    isNavMenuOpen: false,
  };

  // Init GTM data layer if it hasn't been initialized yet
  window.dataLayer = window.dataLayer || [];

  // Init AOS library
  AOS.init({
    disable: "mobile",
  });

  // Init cookie banner
  initCookieBanner();

  // Register Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navbar Logic
    const navbarBurger = document.getElementById("navbar-burger");

    if (navbarBurger) {
      const navMenu = document.getElementById(navbarBurger.dataset.target);

      // If the user clicks anywhere except the navburger or the menu close the nav menu
      document.body.addEventListener("click", (e) => {
        e.target.id !== "navbar-burger" &&
          e.target.id !== "navMenu" &&
          _STATE_.isNavMenuOpen === true &&
          toogleNav();
      });

      // If the user clicks on the Navbar burger the navmenu opens / closes
      navbarBurger.addEventListener("click", function (e) {
        toogleNav();
      });

      // If the user clicks on any Navitem in the navmenu the nav menu closes automatically
      navMenu.querySelectorAll(".navbar-item").forEach((navItem) => {
        navItem.addEventListener("click", () => {
          _STATE_.isNavMenuOpen === true && toogleNav();
        });
      });

      function toogleNav() {
        navbarBurger.classList.toggle("is-active");
        navMenu.classList.toggle("is-active");
        _STATE_.isNavMenuOpen = !_STATE_.isNavMenuOpen;
      }
    }

    // Clean-up URL (remove hash) after "jumping" to a heading
    const scrollArrow = document.getElementById("scroll-to-about");

    if (scrollArrow) {
      scrollArrow.onclick = () => {
        document.location.hash = "#about";
        removeHash();
      };
    }

    const allLinks = document.querySelectorAll("a");

    allLinks &&
      allLinks.forEach((link) => {
        link.addEventListener("click", () => {
          setTimeout(() => removeHash(), 0);
        });
      });

    // Init Modals
    const modals = document.querySelectorAll(".modal");

    modals &&
      modals.forEach((modal) => {
        const modalButtons = modal.querySelectorAll("button");
        const modalBackground = modal.getElementsByClassName(
          "modal-background"
        );
        const clickHandlers = [...modalButtons, ...modalBackground];
        clickHandlers.forEach((clickHandler) =>
          clickHandler.addEventListener("click", () => {
            modal.classList.toggle("is-active");
          })
        );
      });

    const modalLinks = document.querySelectorAll(".modal-link");
    modalLinks &&
      modalLinks.forEach((modalLink) => {
        modalLink.addEventListener("click", (e) => {
          e.preventDefault();
          document
            .getElementById(e.target.dataset.target)
            .classList.toggle("is-active");
        });
      });

    // Set current year in footer
    (function setCurrentYear(element) {
      const currentYear = new Date().getFullYear();
      element.innerHTML = currentYear;
    })(document.getElementById("current-year"));

    // Set email-address after DOM-content has loaded
    (function setEmailAddress(elements, email) {
      elements &&
        elements.forEach((element, index) => {
          element.innerHTML = `<a href="mailto:${email}" class="email-link gtm-tracked-link" id="email-link-${index}">${email}</a>`;
        });
    })(
      document.querySelectorAll(".email-placeholder"),
      "patrick.obermeier@outlook.com"
    );

    const emailButton = document.querySelector("#email-button-placeholder");

    if (emailButton)
      emailButton.innerHTML = `<a class="button is-rounded is-secondary gtm-tracked-link" href="mailto:patrick.obermeier@outlook.com" id="mail-button">
                                <span class="icon is-small">
                                  <svg width="20" height="15" viewBox="0 0 32 25" fill="#4A4A4A" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M28.8 0H3.2C1.44 0 0.016 1.40625 0.016 3.125L0 21.875C0 23.5938 1.44 25 3.2 25H28.8C30.56 25 32 23.5938 32 21.875V3.125C32 1.40625 30.56 0 28.8 0ZM28.8 6.25L16 14.0625L3.2 6.25V3.125L16 10.9375L28.8 3.125V6.25Z"/>
                                  </svg>    
                                </span>
                                <span>Email</span>
                              </a>`;

    const emailIcon = document.createElement("a");
    emailIcon.classList.add(
      "navbar-item",
      "is-hidden-touch",
      "gtm-tracked-link"
    );
    emailIcon.id = "mail-icon";
    emailIcon.href = "mailto:patrick.obermeier@outlook.com";
    emailIcon.innerHTML = `<span class="icon is-small" title="Email">
                            <svg width="32" height="25" viewBox="0 0 32 25" fill="#4A4A4A" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.8 0H3.2C1.44 0 0.016 1.40625 0.016 3.125L0 21.875C0 23.5938 1.44 25 3.2 25H28.8C30.56 25 32 23.5938 32 21.875V3.125C32 1.40625 30.56 0 28.8 0ZM28.8 6.25L16 14.0625L3.2 6.25V3.125L16 10.9375L28.8 3.125V6.25Z"/>
                            </svg>
                            <span class="sr-only">Email</span>
                          </span>`;
    const emailIconPlaceholder = document.querySelector(
      "#email-icon-placeholder"
    );
    emailIconPlaceholder && emailIconPlaceholder.replaceWith(emailIcon);
    const emailIconFooterPlaceholder = document.querySelector(
      "#email-icon-placeholder-footer"
    );
    const emailIconFooter = emailIcon.cloneNode(true);
    emailIconFooter.id = "mail-icon-footer";
    emailIconFooter.classList.remove("navbar-item", "is-hidden-touch");
    emailIconFooter.innerHTML = `<span class="icon" title="Email">
                                  <svg width="32" height="25" viewBox="0 0 32 25" fill="#4A4A4A" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M28.8 0H3.2C1.44 0 0.016 1.40625 0.016 3.125L0 21.875C0 23.5938 1.44 25 3.2 25H28.8C30.56 25 32 23.5938 32 21.875V3.125C32 1.40625 30.56 0 28.8 0ZM28.8 6.25L16 14.0625L3.2 6.25V3.125L16 10.9375L28.8 3.125V6.25Z"/>
                                  </svg>
                                  <span class="sr-only">Email</span>
                                </span>`;
    emailIconFooterPlaceholder &&
      emailIconFooterPlaceholder.replaceWith(emailIconFooter);

    // Fix for 100vh height of hero-section on Mobile
    convertWindowHeightToViewPortHeight();
  });

  window.addEventListener("load", () => {
    fetchStyle(
      "https://fonts.googleapis.com/css?family=Montserrat:200,400&display=swap"
    );
    lazyLoadBackgroundImages();
    convertWindowHeightToViewPortHeight();
    // Register service worker
    registerSW();
    // Refresh AOS x Seconds after page load is complete to avoid problem with init() not working on first load
    setTimeout(() => {
      AOS.refresh();
    }, 1000);
  });

  window.addEventListener("resize", () => {
    convertWindowHeightToViewPortHeight();
  });
})();
