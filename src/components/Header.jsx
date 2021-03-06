import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

// Recebe como props o titulo do header e se deve aparecer o botão de busca
// Deixo como padrão o valor de 'pageTitle' e showSearch caso não passem props
const Header = ({ pageTitle = 'Comidas', showSearch = true }) => {
  const { searchOrHeader, changeSearchOrHeader } = useContext(RecipesContext);
  const history = useHistory();

  const style = {
    paddingTop: '4px',
  };

  const btnSearch = () => (
    <Button
      type="button"
      onClick={ () => changeSearchOrHeader(!searchOrHeader) }
      className="btn btn-light"
    >
      <img src={ searchIcon } alt="icone-busca" data-testid="search-top-btn" />
    </Button>
  );

  const goProfile = () => {
    history.push('/perfil');
  };

  return (
    <div className="text-center">
      <div className="btn-group">
        <Button
          className="btn btn-light"
          type="button"
          onClick={ goProfile }
        >
          <img
            src={ profileIcon }
            alt="icone-perfil"
            data-testid="profile-top-btn"
          />
        </Button>

        <h2 data-testid="page-title" style={ style }>
          { pageTitle }
        </h2>

        {/* aqui verifico se devo mostra o botão de busca */}
        { showSearch ? btnSearch() : ''}
      </div>
    </div>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default Header;
