import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import theCockTailDBAPI from '../services/theCockTailDBAPI';
import theMealDBAPI from '../services/theMealDBAPI';

function RecipesProvider({ children }) {
  const [mealOrDrink, setMealOrDrink] = useState('meal');
  const [searchOrHeader, changeSearchOrHeader] = useState(false);
  const context = {
    theCockTailDBAPI,
    theMealDBAPI,
    mealOrDrink,
    searchOrHeader,
    changeSearchOrHeader,
  };
  // o log abaixo é provisorio para futuro uso
  console.log(setMealOrDrink);
  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
