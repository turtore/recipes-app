import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Recebe Valores via Props de Bebidas e Comidas */
const RecipesCards = ({ nameValue, indexValue, thumbValue }) => (
  <Card
    data-testid={ `${indexValue}-recipe-card` }
    style={ { width: '18rem' } }
  >
    <Card.Body>
      <Card.Img
        data-testid={ `${indexValue}-card-img` }
        variant="top"
        src={ thumbValue }
      />
      <Card.Title
        data-testid={ `${indexValue}-card-name` }
        style={ { marginTop: '10px' } }
      >
        { nameValue }
      </Card.Title>
    </Card.Body>
  </Card>
);

RecipesCards.propTypes = {
  nameValue: PropTypes.string.isRequired,
  indexValue: PropTypes.number.isRequired,
  thumbValue: PropTypes.string.isRequired,
};

export default RecipesCards;
