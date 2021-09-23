import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { getMeal, getCategoryMeal, getFilterMeal } from '../services/theMealDB_API';
import { getCockTail,
  getCategoryCockTail,
  getFilterCockTail,
} from '../services/theCockTailDB_API';

function RecipesProvider({ children }) {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [categorys, setCategorys] = useState([]);
  // const context = {};

  /**
   * Verifica se esta na página de comida ou bebida
   * e seta as receitas no state
   */
  const listRecipes = async () => {
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
  };

  /**
   * Verifica se esta na página de comida ou bebida
   * e seta as categorias no state
   */
  const listCategorys = async () => {
    switch (pathname) {
    case '/comidas': {
      const resultsMeal = await getCategoryMeal();
      setCategorys(resultsMeal.meals);
      break;
    }
    case '/bebidas': {
      const resultsCockTail = await getCategoryCockTail();
      setCategorys(resultsCockTail.drinks);
      break;
    }
    default:
      break;
    }
  };

  /**
   * Faz uma requisição com o valor da categoria que foi filtrada
   */
  const filterRecipes = async (categoryValue) => {
    switch (pathname) {
    case '/comidas': {
      const resultsFilterMeal = await getFilterMeal(categoryValue);
      setRecipes(resultsFilterMeal.meals);
      break;
    }
    case '/bebidas': {
      const resultsFilterCockTail = await getFilterCockTail(categoryValue);
      setRecipes(resultsFilterCockTail.drinks);
      break;
    }
    default:
      break;
    }
  };

  useEffect(() => {
    listRecipes();
    listCategorys();
  }, []);

  return (
    <RecipesContext.Provider value={ { recipes, categorys, filterRecipes, listRecipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
