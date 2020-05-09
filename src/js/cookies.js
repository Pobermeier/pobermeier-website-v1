"use strict";

(function checkCookiesAndDisplayCookieBanner() {
  const showCookieAlert = () => {
    const template = `
      <div id="cookie-info" class="cookie-banner">
        <div class="cookie-banner__content">
          <div class="cookie-banner__text">This website uses cookies. If you continue to use the website, we assume your consent.</div>
          <div class="cookie-banner__buttons">
            <button id="accept-cookies" class="cookie-banner__accept-button">Continue</button>
            <button id="open-privacy-notice" class="cookie-banner__info-button">Privacy Notice</button>
          </div>
        </div>
      </div>`;

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.bottom = 0;
    wrapper.style.left = 0;
    wrapper.style.zIndex = 20;
    wrapper.style.width = "100vw";
    wrapper.style.textAlign = "center";
    wrapper.innerHTML = template;
    document.body.appendChild(wrapper);

    const setCookie = (cookieName, cookieValue, expirationDays) => {
      const date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      document.cookie = `${cookieName}=${cookieValue};expires=${date.toUTCString()};path=/`;
    };

    document.addEventListener("click", (e) => {
      if (e.target.id === "accept-cookies") {
        setCookie("cookies-accepted", "1", 365 * 5);
        document.querySelector("#cookie-info").style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.id === "open-privacy-notice") {
        const privacyModal = document.querySelector("#privacy-modal");
        !privacyModal.classList.contains("is-active") &&
          privacyModal.classList.add("is-active");
      }
    });
  };

  const checkCookie = () => {
    const getCookie = (cookieName) => {
      const allStoredCookies = document.cookie.split("; ");
      const foundCookie = allStoredCookies.filter((cookie) =>
        cookie.split("=").includes(cookieName)
      )[0];
      return foundCookie;
    };

    !getCookie("cookies-accepted") && setTimeout(showCookieAlert, 2000);
  };

  window.addEventListener("load", checkCookie);
})();
