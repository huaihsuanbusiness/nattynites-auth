import { useState, useEffect } from 'react';
import { useDynamicContext, useIsLoggedIn, useUserWallets } from "@dynamic-labs/sdk-react-core";


import './Methods.css';

export default function DynamicMethods({ isDarkMode }) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');
  const metaDataFieldsToExtract = [
    "Passport",
    "Telegram",
    "Nationality",
    "Phone Number with Country Code"
  ];
  const userInfoFieldsToExtract = [
    "firstName",
    "lastName",
    "username",
    "email"
  ]
  const addressFieldsToExtract = [
    "address"
  ]

  const safeStringify = (obj) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    }, 2);
  };


  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) {
      setIsLoading(false)
    }
  }, [sdkHasLoaded, isLoggedIn, primaryWallet]);

  function clearResult() {
    setResult('');
  }

  function submitInfo() {
    setResult('');
  }


  function showUser() {
    setResult(safeStringify(Object.assign({}, extracObject(fetchUserInfo(), userInfoFieldsToExtract), extracObject(fetchUserWallet(), addressFieldsToExtract), extracObject(fetchUserMetadata(), metaDataFieldsToExtract))));
  }

  function showUserWallets() {
    setResult(safeStringify(userWallets));
  }


  function fetchUserMetadata() {
    return (
      <div className="user-details">
        {user?.metadata && <p>Username: {user.metadata} </p>}
      </div>
    );
  }

  function fetchUserInfo() {
    return (
      <div className="user-details">
        {user && <p>Info: {user} </p>}
      </div>
    );
  }


  function fetchUserWallet() {
    return (
      <div className="user-details">
        {userWallets && <p>Wallet: {userWallets} </p>}
      </div>
    );
  }

  function isUserNew() {
    if (user != null && user?.newUser != null && user?.newUser == true) return true
    else return false
  }

  function extracObject(metadata, fields) {

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




  return (
    <>
      {!isLoading && isLoggedIn && (
        <div className="dynamic-methods" data-theme={isDarkMode ? 'dark' : 'light'}>
          <div className="methods-container">
            <button className="btn btn-primary" onClick={showUser}>Fetch User</button>
            <button className="btn btn-primary" onClick={showUserWallets}>Fetch User Wallets</button>


          </div>
          {result && (
            <div className="results-container">
              <pre className="results-text">
                {result && (
                  typeof result === "string" && result.startsWith("{")
                    ? JSON.stringify(JSON.parse(result), null, 2)
                    : result
                )}
              </pre>
            </div>
          )}
          {result && (
            <div className="clear-container">
              <button className="btn btn-primary" onClick={clearResult}>Clear</button>
            </div>
          )}

          {/* {result && isUserNew && (
            <div className="submit-container">
              <button className="btn btn-primary" onClick={clearResult}>Submit to Nattynites</button>
            </div>
          )} */}
          <form name="contact" netlify>
            <p>
              <label>Name <input type="text" name="name" content= {user.firstName+" "+user.lastName}/></label>
            </p>
            <p>
              <label>Email <input type="email" name="email" content= {user.email}/></label>
            </p>
            <p>
            <div className="submit-container">
              <button className="btn btn-primary" type="submit" >Submit to Nattynites</button>
            </div>
            </p>
          </form>
        </div>
      )}
    </>
  );
}