import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import getMeal from '../services/theMealDB_API';
import getCockTail from '../services/theCockTailDB_API';
import { useLocation } from 'react-router';

function RecipesProvider({ children }) {
  const getLocation = useLocation();
  const [recipes, setRecipes] = useState([]);
  // const context = {};

  useEffect(() => {
    async function listRecipes() {
      switch(getLocation.pathname) {
        case '/comidas':
          const resultsMeal = await getMeal();
          setRecipes(resultsMeal.meals);
          break;
        case '/bebidas':
          const resultsCockTail = await getCockTail();
          setRecipes(resultsCockTail.drinks);
          break;
      }
    }
    listRecipes();
  }, []);

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
