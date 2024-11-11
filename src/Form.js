import React, { useState, useEffect } from 'react';
import './Form.css';
import {safeStringify, extracObject} from './Utility.js';
import { firebaseApp, firebaseConfig, metaDataFieldsToExtract, userInfoFieldsToExtract } from './App';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useDynamicContext, useIsLoggedIn, useUserWallets } from "@dynamic-labs/sdk-react-core";
import emailjs from "@emailjs/browser";

function Form() {
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const [tokenId, setTokenId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passport, setPassport] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [message, setMessage] = useState('');
  const [isMeIsChecked, setIsMeIsChecked] = useState(false);
  const analytics = getAnalytics(firebaseApp);
  const db = getFirestore(firebaseApp);
  const isLoggedIn = useIsLoggedIn();
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) {
      setIsLoading(false)
    }
  }, [sdkHasLoaded, isLoggedIn, primaryWallet]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 檢查必填欄位
    if (!firstName || !lastName || !email || !passport || !nationality || !phone || !tokenId) {
      setMessage('Please fill in all Fields!');
      return;
    } else {
      setMessage('Submitting....Please wait for few seconds.');
    }
    try {
      const userAddressRef = doc(db, "User Address", primaryWallet.address);
      await setDoc(doc(userAddressRef, "Booking Token ID", tokenId), {

        firstName: firstName,
        lastName: lastName,
        email: email,
        passport: passport,
        nationality: nationality,
        phone: phone,
        telegram: telegram,
        timestamp: serverTimestamp()
      });

      var emailParams = {
        from_name: 'Nattynites EmailJS Service',
        to_name: 'Nattynites Team',
        tokenId: tokenId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        passport: passport,
        nationality: nationality,
        phone: phone,
        telegram: telegram,
        address: primaryWallet.address,
        selfBooking: isMeIsChecked
      };

      sendEmail("V07rogp7AO8E2S_y-","service_jbahh5p", "template_0r7mc9d", emailParams)

      setMessage('Thank you for your submission. Nattynites will review and send the document shortly.');
      clearAll()
      setIsMeIsChecked(false);

    } catch (error) {
      console.error('提交失敗:', error);
      setMessage('Submission failed. Please try again later, and if the issue persists, contact Nattynites for assistance.');
    }

  };

  const handleCheckboxChange = (event) => {
    setIsMeIsChecked(event.target.checked);

    if (event.target.checked) {
      const userInfo = Object.assign({},
        extracObject(user, userInfoFieldsToExtract),
        extracObject(user.metadata, metaDataFieldsToExtract))
      setFirstName(userInfo["firstName"]);
      setLastName(userInfo["lastName"]);
      setEmail(userInfo["email"]);
      setPassport(userInfo["Passport"]);
      setNationality(userInfo["Nationality"]);
      setPhone(userInfo["Phone Number with Country Code"]);
      setTelegram(userInfo["Telegram"]);
    } else {
      clearAll()
    }
  };

  function clearAll() {
    setTokenId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassport('');
    setNationality('');
    setPhone('');
    setTelegram('');
  }

  function sendEmail(_publicKey, _serviceID, _templateID, _emailParams) {
  
    emailjs.init({
      publicKey: _publicKey,
      // Do not allow headless browsers
      blockHeadless: true,
      limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
  
    emailjs
      .send(_serviceID, _templateID, _emailParams)
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Thank you for your submission. Nattynites will review and send the document shortly.");
        },
        (error) => {
          console.log("Error sending email:", error.text);
        }
      );
  }
  

  return (
    <>
      {!isLoading && isLoggedIn && (

        <div className="form-container">
          <h2>Claim your booking</h2>

          <div className='checkbox-container'>
            <span className="no-wrap">I am the passenger.</span>
            <input className='checkbox'
              type="checkbox"
              checked={isMeIsChecked}
              onChange={handleCheckboxChange}
            />

          </div>

          <form
            onSubmit={handleSubmit}
            className="form">
            <div className="form-group">
              <label htmlFor="token_id">Booking Token ID <span className="required">*</span></label>
              <input
                type="number"
                id="token_id"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="first_name">First Name <span className="required">*</span></label>
              <input
                type="text"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name <span className="required">*</span></label>
              <input
                type="text"
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passport">Passport No. <span className="required">*</span></label>
              <input
                type="text"
                id="passport"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality <span className="required">*</span></label>
              <input
                type="text"
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone No. with Country Code <span className="required">*</span></label>
              <input
                type='tel'
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telegram">Telegram</label>
              <input
                type='text'
                id="telegram"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
          {message && <p className="message">{message}</p>}

        </div>
      )}

    </>

  );

}

export default Form;