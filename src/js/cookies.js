"use strict";

window.dataLayer = window.dataLayer || [];

function getAlertTemplate() {
  const template = `
    <div id="cookie-info" style="background-color:#fff;padding:0.8em;font-size:0.9rem;text-align:center;margin: 0 auto;">
      <div>This website uses cookies. If you continue to use the website, we assume your consent.</div>
      <div style="display:flex; flex-wrap: wrap; justify-content: center">
        <button id="accept-cookies" class="button is-rounded is-outlined is-primary" style="margin: 0.5em 1em;">Continue</button>
        <button id="open-privacy-notice" class="button is-rounded is-secondary" style="margin: 0.5em 1em;">Privacy Notice</button>
      </div>
    </div>`;
  return template;
}

function showCookieAlert() {
  const wrapper = document.createElement("div");
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
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
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
  const cookiesAccepted = getCookie("cookies-accepted");
  if (cookiesAccepted == "") {
    setTimeout(showCookieAlert, 1000);
  }
}

document.addEventListener(
  "click",
  function (e) {
    if (e.target.id == "accept-cookies") {
      setCookie("cookies-accepted", "1", 365 * 5);
      document.getElementById("cookie-info").style.display = "none";
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
      }
    }
  },
  false
);

window.addEventListener(
  "load",
  function (e) {
    const cookie = document.getElementById("accept-cookies");
    if (cookie == null) {
      return checkCookie();
    }
  },
  false
);
