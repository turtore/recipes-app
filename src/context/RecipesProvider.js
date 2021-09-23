import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import recipeAPI from '../services/recipeAPI';

// import theMealDBAPI from '../services/theMealDBAPI';

function RecipesProvider({ children }) {
  const [mealOrDrink, setMealOrDrink] = useState('meal');
  const [searchOrHeader, changeSearchOrHeader] = useState(false);

  const history = useHistory();

  // esse component did update fica ouvindo o URL , caso seja /bebidas vai colocar drink, caso /comidas vai por meal como parametro no mealOrDrink
  useEffect(() => history.listen((location) => {
    if (location.pathname === '/comidas') {
      setMealOrDrink('meal');
    }
    if (location.pathname === '/bebidas') {
      setMealOrDrink('drink');
    }
  }), [history, mealOrDrink]);

  const context = {
    recipeAPI,
    mealOrDrink,
    setMealOrDrink,
    searchOrHeader,
    changeSearchOrHeader,
  };
  // o log abaixo é provisorio para futuro uso
  // console.log(setMealOrDrink);
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
