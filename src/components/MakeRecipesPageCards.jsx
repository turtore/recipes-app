import React from 'react';
import './styles/cards.css';
import PropTypes, { string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

/** Recebe Valores via Props de Bebidas e Comidas */
const MakeRecipesCards = ({ imgValue,
  categoryValue,
  nameValue,
  dateValue,
  tagValue,
  indexValue,
}) => (
  <div className="container-cards">
    <div className="img-card">
      <img
        data-testid={ `${indexValue}-horizontal-image` }
        src={ imgValue }
        alt={ nameValue }
      />
    </div>
    <div className="info-card">
      <span
        data-testid={ `${indexValue}-horizontal-top-text` }
        className="category-card"
      >
        { categoryValue }
      </span>
      <span
        data-testid={ `${indexValue}-horizontal-name` }
        className="name-card"
      >
        { nameValue }
      </span>
      <span
        data-testid={ `${indexValue}-horizontal-done-date` }
        className="date-card"
      >
        { `Feita em: ${dateValue}` }
      </span>
      {
        tagValue && tagValue
          .map((tag, index) => (
            <button
              key={ index }
              data-testid={ `${indexValue}-${tag}-horizontal-tag` }
              type="button"
              className="tag-card"
            >
              { tag }
            </button>
          ))
      }
    </div>
    <img
      data-testid={ `${indexValue}-horizontal-share-btn` }
      src={ shareIcon }
      alt="Imagem de Compartilhamento"
    />
  </div>
);

MakeRecipesCards.propTypes = {
  imgValue: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  tagValue: PropTypes.arrayOf(string).isRequired,
  indexValue: PropTypes.number.isRequired,
};

export default MakeRecipesCards;
