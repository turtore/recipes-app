import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import recipeAPI from '../services/recipeAPI';
import { getMeal, getCategoryMeal, getFilterMeal } from '../services/theMealDB_API';
import { getCockTail,
  getCategoryCockTail,
  getFilterCockTail,
} from '../services/theCockTailDB_API';

// import theMealDBAPI from '../services/theMealDBAPI';

function RecipesProvider({ children }) {
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [categorys, setCategorys] = useState([]);
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
  }, [pathname]);

  const context = {
    recipeAPI,
    mealOrDrink,
    setMealOrDrink,
    searchOrHeader,
    changeSearchOrHeader,
    filterRecipes,
    recipes,
    categorys,
    listRecipes,
    setRecipes,
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
