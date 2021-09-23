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
   * e faz o setRecipes
   */
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

  /**
   * Verifica se esta na página de comida ou bebida
   * e faz o setCategory
   */
  useEffect(() => {
    async function listCategorys() {
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
    }
    listCategorys();
  }, [pathname]);

  /**
   * Requisição que faz o filtro
   * e faz o setRecipes
   */
  const filterRecipes = async (categorValue) => {
    switch (pathname) {
    case '/comidas': {
      const resultsFilterMeal = await getFilterMeal(categorValue);
      setRecipes(resultsFilterMeal.meals);
      break;
    }
    case '/bebidas': {
      const resultsFilterCockTail = await getFilterCockTail(categorValue);
      setRecipes(resultsFilterCockTail.drinks);
      break;
    }
    default:
      break;
    }
  };

  return (
    <RecipesContext.Provider value={ { recipes, categorys, filterRecipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
