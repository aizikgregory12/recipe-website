import React, { useRef } from 'react';
import '../styles/NavBar.css';
import DataSender from './DataSender';

const NavBar = ({ onGenerate, searchQuery, onSearchChange }) => {
  const dataSenderRef = useRef();

  const handleWebsiteRecipeClick = () => {
    if (dataSenderRef.current) {
      dataSenderRef.current.openPopup();
    }
  };

  const handleCustomRecipeClick = () => {
    const ingredients = prompt("Enter the ingredients (separated by commas):");
    const steps = prompt("Enter the steps to prepare the food:");

    if (ingredients && steps) {
      const recipeContent = `
        <html>
          <head>
            <title>Custom Recipe</title>
          </head>
          <body>
            <h1>Custom Recipe</h1>
            <h2>Ingredients</h2>
            <p>${ingredients}</p>
            <h2>Steps</h2>
            <p>${steps}</p>
          </body>
        </html>
      `;
      const blob = new Blob([recipeContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      dataSenderRef.current.generateQRCode(url, "Custom Recipe");
    }
  };

  return (
    <nav className='navigation-bar' id='top-nav-bar'>
      <div className='button-bar'>
        <button id='custom-button' onClick={handleCustomRecipeClick}>
          Custom Recipe
        </button>
        <button onClick={handleWebsiteRecipeClick}>
          Website Recipe
        </button>
      </div>
      <h1 id='title'>
        Recipe Gallery
      </h1>
      <div className='search-function'>
        <div className="searchbar">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            style={{ color: 'black' }}
          />
          <span className="searchbar-icon"><i className="fas fa-search"></i></span>
        </div>
      </div>
      <DataSender ref={dataSenderRef} onGenerate={onGenerate} />
    </nav>
  );
};

export default NavBar;
