import React, { useState } from 'react';
import NavBar from './components/NavBar';
import './App.css'

const App = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewQRCode = (qrCode) => {
    setQrCodes((prevQrCodes) => [...prevQrCodes, qrCode]);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteQRCode = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      setQrCodes((prevQrCodes) => prevQrCodes.filter((_, i) => i !== index));
    }
  };

  const filteredQrCodes = qrCodes.filter((qrCode) =>
    qrCode.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <NavBar onGenerate={handleNewQRCode} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </header>
      <main>
        {filteredQrCodes.map((qrCode, index) => (
          <div key={index} className='recipe-card'>
            <h3 className='recipe-name'>{qrCode.title}</h3>
            <img src={qrCode.imgSrc} alt="QR Code" />
            <button id='delete-button' onClick={() => handleDeleteQRCode(index)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
