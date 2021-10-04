import React from 'react';
import './styles/cards.css';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

/** Função para criar a URL e copiar ela */
const handleClickShare = (typeValue, idValue) => {
  const urlParts = window.location.href.split('/');
  const newUrl = `${urlParts[0]}//${urlParts[2]}/${typeValue}s/${idValue}`;
  copy(newUrl);
};

// const deleteItem = (item, idValue) => {
//   for (let i = 0; i < item.length; i += 1) {
//     if (item[i].id === idValue) {
//       delete item[i];
//     }
//   }
// };
const deleteItem = (item, idValue, aFunction) => {
  const tempLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  for (let i = 0; i < item.length; i += 1) {
    if (item[i].id === idValue) {
      tempLocalStorage.splice(i, 1);
      console.log(tempLocalStorage);
      localStorage.setItem('favoriteRecipes', JSON.stringify(tempLocalStorage));
      aFunction(tempLocalStorage);
    }
  }
};

/** Recebe Valores via Props de Bebidas e Comidas */
const FavoriteCard = ({ indexValue,
  idValue,
  typeValue,
  imgValue,
  areaValue,
  categoryValue,
  alcoholicOrNotValue,
  nameValue,
  setFavoriteRecipes,
}) => {
  const handleClickUnfavorite = (checkId) => {
    const tempLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(tempLocalStorage);
    if (tempLocalStorage.length !== 0) {
      deleteItem(tempLocalStorage, checkId, setFavoriteRecipes);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(tempLocalStorage));
      // setFavoriteRecipes(tempLocalStorage);
    }
  };

  return (
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
      </div>

      { /** Componente bootstrap para mostrar mensagem de Link copiado! */ }
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

        {/* botão de remover dos favoritos */}
      </OverlayTrigger>
      <button
        className="btn-unfavorite"
        type="button"
        onClick={ () => handleClickUnfavorite(idValue) }
      >
        <img
          data-testid={ `${indexValue}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="Imagem de Desfavoritar"
        />
      </button>
    </div>
  );
};

FavoriteCard.propTypes = {
  imgValue: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  indexValue: PropTypes.number.isRequired,
  areaValue: PropTypes.string.isRequired,
  alcoholicOrNotValue: PropTypes.string.isRequired,
  idValue: PropTypes.string.isRequired,
  typeValue: PropTypes.string.isRequired,
  setFavoriteRecipes: PropTypes.func.isRequired,
};

export default FavoriteCard;
