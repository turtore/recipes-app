import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './Searchbar';

// Recebe como props o titulo do header e se deve aparecer o botão de busca
// Deixo como padrão o valor de 'pageTitle' e showSearch caso não passem props
const Header = ({ pageTitle = 'Comidas', showSearch = true }) => {
  const [viewSearch, setViewSearch] = useState(false);

  return (
    <div className="text-center">
      <div className="btn-group">
        <Button
          className="btn btn-light"
          type="button"
          href="/perfil"
        >
          <img
            src={ profileIcon }
            alt="icone-perfil"
            data-testid="profile-top-btn"
          />
        </Button>

        <h2 data-testid="page-title">
          { pageTitle }
        </h2>

        {/* aqui verifico se devo mostra o botão de busca */}
        { showSearch
          ? (
            <Button
              type="button"
              onClick={ () => setViewSearch(!viewSearch) }
              className="btn btn-light"
              data-testid="search-input"
            >
              <img src={ searchIcon } alt="icone-busca" data-testid="search-top-btn" />
            </Button>
          ) : ''}
      </div>
      {viewSearch ? <SearchBar /> : ''}
    </div>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

export default Header;
