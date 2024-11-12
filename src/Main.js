
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from 'react';
import DynamicMethods from './Methods.js';
import './Main.css';
import Form from './Form.js';

const checkIsDarkSchemePreferred = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;

const Main = () => {
  const [isDarkMode, setIsDarkMode] = useState(checkIsDarkSchemePreferred);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(checkIsDarkSchemePreferred());

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`container ${isDarkMode ? 'dark' : 'dark'}`}>
      <div className="header">
        <img className="logo" src="/logo-dark.png" alt="dynamic" onClick={() => window.open('https://nattynites.club', '_blank', 'noopener,noreferrer')}/>
        <div className="header-buttons">
          <button className="docs-button" onClick={() => window.open('https://nattynites.gitbook.io/nattynites-litepaper', '_blank', 'noopener,noreferrer')}>Docs</button>
          <button className="get-started" onClick={() => window.open('https://nattynites.club', '_blank', 'noopener,noreferrer')}>Website</button>
        </div>
      </div>
      <div className="modal_container">
        <div className="modal_left">


          <h2>Welcome to the Nattynites Authentication (Beta)</h2>

          <ol>

            <li>
              <strong>Beta Testing Phase:</strong> This is our Beta MVP testing version. We are actively working on developing a user-friendly, full-scale system.
            </li>
            <br /><br />
            {/* <li>
              <strong>Access Requirement:</strong> Only wallets holding Nattynites tokens are eligible to log in to the system.
            </li>
            <br /><br /> */}
            <li>
              <strong>Blockchain Compatibility:</strong> Currently, Nattynites tokens are issued exclusively on the Arbitrum network. Please ensure your wallet is connected to Arbitrum.
            </li>
            <br /><br />
            <li>
              <strong>Claim Your Token:</strong> Fill out the form to claim your token, and Nattynites will verify your ownership and send you the document upon confirmation.
              <br /><br />
            </li>
            If you haven't received confirmation from Nattynites or are facing any issues, please get in touch with us. For bookings within 1 day, please contact us after submitting the form.  <a
              href="mailto:info@nattynites.com"
              style={{ color: "#1E90FF", textDecoration: "none" }}
            >
              info@nattynites.com
            </a>.
            <br /><br />

            <li>
              <strong>Privacy Policy:</strong> By using this platform, you consent to our
              <a href="https://nattynites.club/terms.html" 
              style={{ color: "#1E90FF", textDecoration: "none" }}
              target="_blank"> privacy policy, terms and conditions, and cookie policy</a>. 
              We are committed to protecting your data and ensuring its security.
              <br /><br />
            </li>


          </ol>


        </div>

        <div className="modal_right">


          <DynamicWidget />
          {/* <DynamicMethods isDarkMode={false} /> */}
          <Form />
        </div>
      </div>

      <div className="footer">
        <div className="footer-text">Code of Conduct © 2024 NATTYNITES PTE. LTD. All Rights Reserved</div>
        {/* <img className="footer-image" src="/image-dark.png" alt="dynamic" /> */}
      </div>
    </div>
  );
}

export default Main;
