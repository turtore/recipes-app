import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import getMeal from '../services/theMealDB_API';
import getCockTail from '../services/theCockTailDB_API';

function RecipesProvider({ children }) {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  // const context = {};

  useEffect(() => {
    async function listRecipes() {
      switch (pathname) {
      case '/comidas': {
        const resultsMeal = await getMeal();
        setRecipes(resultsMeal.meals);
        break;
      }
      case '/bebidas': {
        const resultsCockTail = await getCockTail();
        setRecipes(resultsCockTail.drinks);
        break;
      }
      default:
        break;
      }
    }
    listRecipes();
  }, [pathname]);

  return (
    <RecipesContext.Provider value={ { recipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
