import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard({ index, name, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{ name }</p>
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <Link to={ `/bebidas/${index}` } data-testid="product-detail-link">Detalhes</Link>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  index: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
