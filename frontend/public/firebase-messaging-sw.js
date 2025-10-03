// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp( {
  apiKey: "AIzaSyC8_exzq1fhxTrZR-h1KvNwr_9oNoPpH6w",
  authDomain: "gph-bandobast.firebaseapp.com",
  projectId: "gph-bandobast",
  storageBucket: "gph-bandobast.firebasestorage.app",
  messagingSenderId: "787250843487",
  appId: "1:787250843487:web:26ea6b876ddde6e59770ea",
  measurementId: "G-SJSLR51KG8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});