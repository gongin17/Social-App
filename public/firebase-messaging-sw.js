// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
 

  apiKey: "AIzaSyABCj3WlcolVmWfnE1inaev4xlhnW4vhs4",
  authDomain: "web-app-aa382.firebaseapp.com",
  databaseURL: "https://web-app-aanpm382.firebaseio.com",
  projectId: "web-app-aa382",
  storageBucket: "web-app-aa382.appspot.com",
  messagingSenderId: "804157920991",
  appId: "1:804157920991:web:744552c94c5e4efdf93b6a",
  measurementId: "G-RBZ46J575E",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
