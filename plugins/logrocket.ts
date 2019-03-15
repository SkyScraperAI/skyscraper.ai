import LogRocket from "logrocket";

LogRocket.init("oswcej/sibyl-landing");

LogRocket.getSessionURL((sessionURL) => {
  (window as any).analytics.track("LogRocket", {
    sessionURL,
  });
});
