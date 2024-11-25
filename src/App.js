import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import Main from "./Main";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { initializeApp } from 'firebase/app';

import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

// import { getAuth } from "firebase/auth";

export const metaDataFieldsToExtract = [
  "Passport",
  "Telegram",
  "Nationality",
  "Phone Number with Country Code"
];
export const userInfoFieldsToExtract = [
  "firstName",
  "lastName",
  "username",
  "email"
]
const addressFieldsToExtract = [
  "address"
]

export const firebaseConfig = {
  apiKey: "AIzaSyBbdwjVOrULXlCcYM2Lr7Yj7eAovTTeegU",
  authDomain: "nattynites-db.firebaseapp.com",
  projectId: "nattynites-db",
  storageBucket: "nattynites-db.firebasestorage.app",
  messagingSenderId: "893936116643",
  appId: "1:893936116643:web:b64e6e14b34c3a3a91f016",
  measurementId: "G-9VF3R3BRMT"
};


export const firebaseApp = initializeApp(firebaseConfig);


const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

const App = () => (

  <DynamicContextProvider
    theme="auto"
    settings={{
      environmentId: "c0d00915-cd27-4451-a4a7-47eae20f24b3",
      walletConnectors: [EthereumWalletConnectors],
      events: {
        onAuthSuccess: (args) => {
          if (isUserNew(args.user)) {
            createUser(Object.assign({},
              extracObject(args.user, userInfoFieldsToExtract),
              extracObject(args.primaryWallet, addressFieldsToExtract),
              extracObject(args.user.metadata, metaDataFieldsToExtract)))
          }

        },
        onLogout: (args) => {
          console.log('onLogout was called', args);
        }
      }
    }}
  >
    <Main />
  </DynamicContextProvider>
);

async function createUser(userInfo) {

  try {
    await setDoc(doc(db, "User Address", userInfo["address"]), {

      firstName: userInfo["firstName"],
      lastName: userInfo["lastName"],
      userName: userInfo["username"],
      email: userInfo["email"],
      address: userInfo["address"],
      passport: userInfo["Passport"],
      telegram: userInfo["Telegram"],
      nationality: userInfo["Nationality"],
      phone: userInfo["Phone Number with Country Code"],
      subscription: false,
      timestamp: serverTimestamp()

    });

    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
    //add analysis
  }
}



export function extracObject(metadata, fields) {

  function findUserInfo(obj, fields) {
    if (typeof obj === 'object' && obj !== null) {

      let result = {};
      fields.forEach(field => {
        if (field in obj) {
          result[field] = obj[field];
        }
      });

      if (Object.keys(result).length > 0) {
        return result;
      }

      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          for (let item of obj[key]) {
            const nestedResult = findUserInfo(item, fields);
            if (nestedResult && Object.keys(nestedResult).length > 0) {
              return nestedResult;
            }
          }
        } else {
          const nestedResult = findUserInfo(obj[key], fields);
          if (nestedResult && Object.keys(nestedResult).length > 0) {
            return nestedResult;
          }
        }
      }
    }

    return null; // Return null if no fields are found
  }

  return findUserInfo(metadata, fields);
}

function isUserNew(user) {
  if (user != null && user?.newUser != null && user?.newUser == true) return true
  else return false
}

export default App;