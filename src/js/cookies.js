"use strict";

(function displayCookieBanner() {
  const showCookieAlert = () => {
    document.addEventListener("click", (e) => {
      if (e.target.id == "accept-cookies") {
        setCookie("cookies-accepted", "1", 365 * 5);
        document.getElementById("cookie-info").style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.id == "open-privacy-notice") {
        const privacyModal = document.querySelector("#privacy-modal");
        !privacyModal.classList.contains("is-active") &&
          privacyModal.classList.add("is-active");
      }
    });

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
  };

  const setCookie = (cname, cvalue, exdays) => {
    const date = new Date();
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = `${cname}=${cvalue};expires=${date.toUTCString()};path=/`;
  };

  const getCookie = (cname) => {
    const name = cname + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  };

  const checkCookie = () => {
    const cookiesAccepted = getCookie("cookies-accepted");
    if (cookiesAccepted == "") {
      setTimeout(showCookieAlert, 1000);
    }
  };

  window.addEventListener("load", (e) => {
    const cookie = document.getElementById("accept-cookies");
    if (cookie == null) return checkCookie();
  });
})();
