import { useState, useEffect } from 'react';
import { useDynamicContext, useIsLoggedIn, useUserWallets } from "@dynamic-labs/sdk-react-core";
import './Methods.css';
import Form from './Form.js';

export default function DynamicMethods({ isDarkMode }) {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const userWallets = useUserWallets();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');
 


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
    // setResult(safeStringify(Object.assign({}, extracObject(fetchUserInfo(), userInfoFieldsToExtract), extracObject(fetchUserWallet(), addressFieldsToExtract), extracObject(fetchUserMetadata(), metaDataFieldsToExtract))));
  }

  function showUserWallets() {
    // setResult(safeStringify(userWallets));
  }



  return (
    <>
      {!isLoading && isLoggedIn && (
        <div className="dynamic-methods" data-theme={isDarkMode ? 'dark' : 'light'}>
          <div className="methods-container">
            {/* <button className="btn btn-primary" onClick={showUser}>Fetch User</button> */}
            {/* <button className="btn btn-primary" onClick={showUserWallets}>Fetch User Wallets</button> */}

           
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
          {/* <form name="contact" netlify>
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
          </form> */}
          
        </div>
      )}
    </>
  );
}