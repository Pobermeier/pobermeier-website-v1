"use strict";

(function checkCookiesAndDisplayCookieBanner() {
  const showCookieAlert = () => {
    const template = `
      <div id="cookie-info" style="background-color:#f5f5f5;padding:0.8em;font-size:0.9rem;text-align:center;margin: 0 auto;">
        <div>This website uses cookies. If you continue to use the website, we assume your consent.</div>
        <div style="display:flex; flex-wrap: wrap; justify-content: center">
          <button id="accept-cookies" class="button is-rounded is-outlined is-primary" style="margin: 0.5em 1em;">Continue</button>
          <button id="open-privacy-notice" class="button is-rounded is-secondary" style="margin: 0.5em 1em;">Privacy Notice</button>
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

  const getCookie = (cookieName) => {
    const allStoredCookies = document.cookie.split("; ");
    const foundCookie = allStoredCookies.filter((cookie) =>
      cookie.split("=").includes(cookieName)
    )[0];
    return foundCookie;
  };

  const checkCookie = () => {
    !getCookie("cookies-accepted") && setTimeout(showCookieAlert, 1000);
  };

  window.addEventListener("load", checkCookie);
})();
