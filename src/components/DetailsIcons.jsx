import React, { useRef } from 'react';
import { Row, Col, Overlay, Tooltip, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DetailsIcons = (props) => {
  const {
    handleShareIconClick, handleFavoriteIconClick,
    isFavorite, linkIsCopied, recipeId, setIsFavorite,
  } = props;

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const START_FAVORITES = JSON.parse(localStorage.getItem('favoriteRecipes'));
  START_FAVORITES.forEach((favorite) => {
    if (favorite.id === recipeId) {
      setIsFavorite(true);
    }
  });

  const target = useRef(null);
  return (
    <Row>
      <Col
        xs={ 5 }
        data-testid="share-btn"
      >
        <Image src={ shareIcon } alt="" ref={ target } onClick={ handleShareIconClick } />
        <Overlay target={ target.current } show={ linkIsCopied } placement="bottom">
          {(overlayProps) => (
            <Tooltip id="overlay-example" { ...overlayProps }>
              Link copiado!
            </Tooltip>
          )}
        </Overlay>
      </Col>
      <Col xs={ 5 } onClick={ handleFavoriteIconClick }>
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
      </Col>
    </Row>
  );
};

DetailsIcons.propTypes = {
  handleShareIconClick: PropTypes.func.isRequired,
  handleFavoriteIconClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  linkIsCopied: PropTypes.bool.isRequired,
  recipeId: PropTypes.number.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
};

export default DetailsIcons;
