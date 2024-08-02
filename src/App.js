import React, { useState } from 'react';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [customRecipes, setCustomRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewQRCode = (qrCode) => {
    setQrCodes((prevQrCodes) => [...prevQrCodes, qrCode]);
  };

  const handleAddCustomRecipe = (recipe) => {
    setCustomRecipes((prevRecipes) => [...prevRecipes, recipe]);
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

  const handleDeleteCustomRecipe = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      setCustomRecipes((prevRecipes) => prevRecipes.filter((_, i) => i !== index));
    }
  };

  const filteredQrCodes = qrCodes.filter((qrCode) =>
    qrCode.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomRecipes = customRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <NavBar onGenerate={handleNewQRCode} onAddCustomRecipe={handleAddCustomRecipe} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </header>
      <main>
        <div className="recipe-list">
          {filteredQrCodes.map((qrCode, index) => (
            <div key={index} className='recipe-card'>
              <h3 className='recipe-name'>{qrCode.title}</h3>
              <img src={qrCode.imgSrc} alt="QR Code" />
              <button id='delete-button' onClick={() => handleDeleteQRCode(index)}>Delete</button>
            </div>
          ))}
          {filteredCustomRecipes.map((recipe, index) => (
            <div key={index} className='recipe-card'>
              <h3 className='recipe-name'>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
              <button id='delete-button' onClick={() => handleDeleteCustomRecipe(index)}>Delete</button>
              <div className="recipe-details">
                <h4>Ingredients</h4>
                <p>{recipe.ingredients}</p>
                <h4>Steps</h4>
                <p>{recipe.steps}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
