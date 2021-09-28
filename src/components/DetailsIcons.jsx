import React, { useRef } from 'react';
import { Row, Col, Overlay, Tooltip, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const DetailsIcons = (props) => {
  const {
    handleShareIconClick, handleFavoriteIconClick,
    isFavorite, linkIsCopied,
  } = props;

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
};

export default DetailsIcons;
