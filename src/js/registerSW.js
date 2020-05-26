function registerSW() {
  const sw = "service-worker.js";

  navigator.serviceWorker &&
    navigator.serviceWorker
      .register(sw)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                console.log(
                  "New content is available and will be used when all " +
                    "tabs for this page are closed."
                );
              } else {
                console.log("Content is cached for offline use.");
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
}

export default registerSW;
