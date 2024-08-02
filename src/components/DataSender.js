import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const DataSender = forwardRef(({ onGenerate }, ref) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const openPopup = () => {
    const userUrl = prompt("Enter the URL:");
    const userTitle = prompt("Enter the Title:");
    setUrl(userUrl);
    setTitle(userTitle);
    if (userUrl && userTitle) {
      console.log("URL and Title received:", userUrl, userTitle);
      sendData(userUrl, userTitle);
    }
  };

  useImperativeHandle(ref, () => ({
    openPopup,
    generateQRCode
  }));

  const generateQRCode = (url, title) => {
    console.log("Sending request to generate QR code:", url, title);
    axios.post('https://flask-for-recipe.onrender.com/api/generate_qr', { url, title }, { responseType: 'blob' })
      .then(response => {
        console.log("Response received:", response);
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        reader.onloadend = function () {
          const base64data = reader.result;
          const qrCode = { title, imgSrc: base64data };
          if (onGenerate) {
            onGenerate(qrCode);
          }
        };
      })
      .catch(error => {
        console.error('There was an error generating the QR code!', error);
      });
  };

  const sendData = (url, title) => {
    generateQRCode(url, title);
  };

  return null;
});

export default DataSender;
