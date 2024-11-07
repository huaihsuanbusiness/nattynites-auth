
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from 'react';
import DynamicMethods from './Methods.js';
import './Main.css';

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
        <img className="logo" src="/logo-dark.png" alt="dynamic" />
        <div className="header-buttons">
          <button className="docs-button" onClick={() => window.open('https://nattynites.gitbook.io/nattynites-litepaper', '_blank', 'noopener,noreferrer')}>Docs</button>
          <button className="get-started" onClick={() => window.open('https://nattynites.club', '_blank', 'noopener,noreferrer')}>Website</button>
        </div>
      </div>

      <div className="modal">

        <div style={{ padding: "20px", maxWidth: "600px", margin: "0px" }}>
          <h2>Welcome to the Nattynites Authentication (Beta)</h2>

          <ol>
            <li>
              <strong>Access Requirement:</strong> Only wallets holding Nattynites tokens are eligible to log in to the system.
            </li>
            <br /><br />
            <li>
              <strong>Blockchain Compatibility:</strong> Currently, Nattynites tokens are issued exclusively on the Arbitrum network. Please ensure your wallet is connected to Arbitrum.
            </li>
            <br /><br />
            <li>
              <strong>Beta Testing Phase:</strong> This is our Beta MVP testing version. We are actively working on developing a user-friendly, full-scale system.
            </li>
            <br /><br />
            <li>
              <strong>After Login:</strong> Once logged in, you will be prompted to provide your name and bind an email address.
              <br /><br />
              Please note that Nattynites has not yet implemented an on-chain NFT API listener. If you receive an NFT or purchase one on the secondary market, you will need to proactively notify Nattynites by emailing us at <a
                href="mailto:info@nattynites.com"
                style={{ color: "#1E90FF", textDecoration: "none" }}
              >
                info@nattynites.com
              </a>.
              <br /><br />
              After verifying your accommodation token, our team will send a form to your registered email. Please complete this form with your hotel check-in details, which will be used by the hotel for verification purposes.
              <br /><br />
            </li>
          </ol>
        </div>
        <DynamicWidget />
        <DynamicMethods isDarkMode={false} />
      </div>

      <div className="footer">
        <div className="footer-text">Code of Conduct © 2024 NATTYNITES PTE. LTD. All Rights Reserved</div>
{/* //        <img className="footer-image" src="/image-dark.png" alt="dynamic" /> */}
      </div>
    </div>
  );
}

export default Main;
