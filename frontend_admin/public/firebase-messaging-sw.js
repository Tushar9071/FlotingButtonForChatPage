importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDgaRanqlim0vrJ3hQn9JWGptR6lCz8hlg",
  authDomain: "liliya-c0e31.firebaseapp.com",
  projectId: "liliya-c0e31",
  storageBucket: "liliya-c0e31.appspot.com",
  messagingSenderId: "1079820023526",
  appId: "1:1079820023526:web:8b6af396ff40c0c2286d27",
  measurementId: "G-Z37MRWHS9H",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/mini-logo-light.png",
    actions: [
      {
        action: "close",
        title: "Close",
      },
    ],
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "accept") {
    console.log("User accepted the notification.");
  } else if (event.action === "close") {
    console.log("User closed the notification.");
  } else {
    console.log("Notification clicked without action.");
  }
});
