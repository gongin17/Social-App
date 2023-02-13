import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

const appFirebase = initializeApp(firebaseConfig);

export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase);
const messaging = getMessaging(appFirebase);

export const requestPermission=()=> {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const messaging = getMessaging(appFirebase);

      getToken(messaging, {
        vapidKey:
          'BIgTWsWYt1am62JhZWBn-y2Ihl90N3Tp5LmZIqwKCZvsfPUWs_KXY2CXRUtufa0_9p0a0aHdMXUow6mT8IgY2bI',
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("current token for client: ", currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );

          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
         
        });
    } else {
      console.log("u");
    }
  });
}



export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
