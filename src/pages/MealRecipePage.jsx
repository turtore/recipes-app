import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';

const MealRecipePage = () => {
  const { recipes } = useContext(RecipesContext);
  /** Simulando Cards */
  const cardsRecipes = (strMeal, indexValue, strMealThumb) => (
    <Card
      data-testid={ `${indexValue}-recipe-card` }
      key={ indexValue }
      style={ { width: '18rem' } }
    >
      <Card.Body>
        <Card.Img
          data-testid={ `${indexValue}-card-img` }
          variant="top"
          src={ strMealThumb }
        />
        <Card.Title
          data-testid={ `${indexValue}-card-name` }
          style={ { marginTop: '10px' } }
        >
          { strMeal }
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
          cardsRecipes(recipe.strMeal, index, recipe.strMealThumb)
        ))
      }
    </div>
  );
};

export default MealRecipePage;
