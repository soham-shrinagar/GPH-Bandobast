import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC8_exzq1fhxTrZR-h1KvNwr_9oNoPpH6w",
  authDomain: "gph-bandobast.firebaseapp.com",
  projectId: "gph-bandobast",
  storageBucket: "gph-bandobast.firebasestorage.app",
  messagingSenderId: "787250843487",
  appId: "1:787250843487:web:26ea6b876ddde6e59770ea",
  measurementId: "G-SJSLR51KG8"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async() => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
        const token = await getToken(messaging, {
        vapidKey: 
            "BD5-xIXt0KSDVhZIeofVY5E162sdAcnJVF2kG0JxDge4-hECUjz7SB5AvCv29qoL6H1EWBPqHwW1f6NedjwenM8"
        });
    console.log(token);
    }
}
