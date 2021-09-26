import React from 'react';
import './styles/cards.css';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

/** Função para criar a URL e copiar ela */
const handleClickShare = (typeValue, idValue) => {
  const urlParts = window.location.href.split('/');
  const newUrl = `${urlParts[0]}//${urlParts[2]}/${typeValue}s/${idValue}`;
  copy(newUrl);
};

/** Recebe Valores via Props de Bebidas e Comidas */
const MakeRecipesCards = ({ imgValue,
  categoryValue,
  nameValue,
  dateValue,
  tagValue,
  indexValue,
  areaValue,
  alcoholicOrNotValue,
  idValue,
  typeValue,
}) => (
  <div className="container-cards">
    <div className="img-card">
      <Link to={ `/${typeValue}s/${idValue}` }>
        <img
          data-testid={ `${indexValue}-horizontal-image` }
          src={ imgValue }
          alt={ nameValue }
        />
      </Link>
    </div>
    <div className="info-card">
      <span
        data-testid={ `${indexValue}-horizontal-top-text` }
        className="category-card"
      >
        { `${areaValue || alcoholicOrNotValue} - ${categoryValue}` }
      </span>
      <span
        data-testid={ `${indexValue}-horizontal-name` }
        className="name-card"
      >
        <Link to={ `/${typeValue}s/${idValue}` }>
          { nameValue }
        </Link>
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

    { /** Components bootstrap para mostrar mensagem de Link copiado! */ }
    <OverlayTrigger
      trigger="click"
      overlay={
        <Popover id={ `popover-positioned-${idValue}` }>
          <Popover.Body>
            Link copiado!
          </Popover.Body>
        </Popover>
      }
    >
      <button
        className="btn-share"
        type="button"
        onClick={ () => handleClickShare(typeValue, idValue) }
      >
        <img
          data-testid={ `${indexValue}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Imagem de Compartilhamento"
        />
      </button>
    </OverlayTrigger>
  </div>
);

MakeRecipesCards.propTypes = {
  imgValue: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  tagValue: PropTypes.arrayOf(string).isRequired,
  indexValue: PropTypes.number.isRequired,
  areaValue: PropTypes.string.isRequired,
  alcoholicOrNotValue: PropTypes.string.isRequired,
  idValue: PropTypes.string.isRequired,
  typeValue: PropTypes.string.isRequired,
};

export default MakeRecipesCards;
