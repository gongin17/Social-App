import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
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
          '',
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
