import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';

const CocktailRecipePage = () => {
  const { recipes } = useContext(RecipesContext);
  /** Simulando Cards */
  const cardsRecipes = (strDrink, indexValue, strDrinkThumb) => (
    <Card
      data-testid={ `${indexValue}-recipe-card` }
      key={ indexValue }
      style={ { width: '18rem' } }
    >
      <Card.Body>
        <Card.Img
          data-testid={ `${indexValue}-card-img` }
          variant="top"
          src={ strDrinkThumb }
        />
        <Card.Title
          data-testid={ `${indexValue}-card-name` }
          style={ { marginTop: '10px' } }
        >
          { strDrink }
        </Card.Title>
      </Card.Body>
    </Card>
  );

  return (
    <div style={ { display: 'flex', flexWrap: 'wrap' } }>
      {
        recipes
        .slice(0, 12)
        .map((recipe, index) => (
          cardsRecipes(recipe.strDrink, index, recipe.strDrinkThumb)
        ))
      }
    </div>
  );
};

export default CocktailRecipePage;
