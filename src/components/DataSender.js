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
      sendData(userUrl, userTitle);
    }
  };

  useImperativeHandle(ref, () => ({
    openPopup,
    generateQRCode
  }));

  const generateQRCode = (url, title) => {
    axios.post('http://127.0.0.1:5000/api/generate_qr', { url, title }, { responseType: 'blob' })
      .then(response => {
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
