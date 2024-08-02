import React, { useRef, useState } from 'react';
import '../styles/NavBar.css';
import DataSender from './DataSender';

const NavBar = ({ onGenerate, onAddCustomRecipe }) => {
  const dataSenderRef = useRef();
  const [showCustomRecipeForm, setShowCustomRecipeForm] = useState(false);

  const handleWebsiteRecipeClick = () => {
    if (dataSenderRef.current) {
      dataSenderRef.current.openPopup();
    }
  };

  const handleCustomRecipeClick = () => {
    setShowCustomRecipeForm(true);
  };

  const handleCustomRecipeSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const ingredients = e.target.ingredients.value;
    const steps = e.target.steps.value;
    const image = e.target.image.value;

    if (name && ingredients && steps && image) {
      const newRecipe = {
        title: name,
        ingredients,
        steps,
        image,
      };
      onAddCustomRecipe(newRecipe);
      setShowCustomRecipeForm(false);
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

      {showCustomRecipeForm && (
        <div className="custom-recipe-form">
          <form onSubmit={handleCustomRecipeSubmit}>
            <div>
              <label>Recipe Name:</label>
              <input type="text" name="name" required />
            </div>
            <div>
              <label>Ingredients (comma-separated):</label>
              <textarea name="ingredients" required />
            </div>
            <div>
              <label>Steps:</label>
              <textarea name="steps" required />
            </div>
            <div>
              <label>Image URL:</label>
              <input type="text" name="image" required />
            </div>
            <button type="submit">Add Recipe</button>
            <button type="button" onClick={() => setShowCustomRecipeForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
