import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import RecipesCards from '../components/RecipesCards';
import recipeAPI from '../services/recipeAPI';

const CocktailRecipePage = () => {
  const {
    recipes,
    categorys,
    searchOrHeader,
    setRecipes,
    setCategorys,
    setMealOrDrink,
    exploredIngredient,
    setExploredIngredient,
  } = useContext(RecipesContext);
  const sizeListRecipes = 12;
  const sizeListCategorys = 5;
  const [categoriesButtonToggler, setCategoriesButtonToggler] = useState([]);

  /** Faz as requisições para mostrar as categorias e as receitas */
  const requestAPI = async () => {
    if (exploredIngredient !== '') {
      const apiResponse = await recipeAPI('ingredients', exploredIngredient, 'drink');
      setRecipes(apiResponse.drinks);
    } else {
      const dataCockTails = await recipeAPI('name', '', 'drink');
      setRecipes(dataCockTails.drinks);
    }
    const dataCategorys = await recipeAPI('listCategorys', '', 'drink');
    setCategorys(dataCategorys.drinks);
    setCategoriesButtonToggler(dataCategorys.drinks.map((category) => (
      {
        category: category.strCategory,
        active: true,
      }
    )));
  };

  /** Função que envia a categoria pro provider */
  const handleFilterCategory = async (strCategory) => {
    const toggle = categoriesButtonToggler
      .find(({ category }) => category === strCategory);
    if (toggle.active) {
      const dataFilterCockTails = await recipeAPI('category', strCategory, 'drink');
      setRecipes(dataFilterCockTails.drinks);
      setCategoriesButtonToggler([
        ...[...categoriesButtonToggler].filter(({ category }) => category !== strCategory)
          .map(({ category }) => ({ category, active: true })),
        { category: strCategory, active: false },
      ]);
    } else {
      await requestAPI();
      setCategoriesButtonToggler([
        ...[...categoriesButtonToggler].filter(({ category }) => category !== strCategory)
          .map(({ category }) => ({ category, active: true })),
        { category: strCategory, active: true },
      ]);
    }
  };

  /** Função que mostra todas as receitas */
  const handleClickFilterAll = async () => {
    await requestAPI();
  };

  useEffect(() => {
    requestAPI();
    setMealOrDrink('drink');

    return () => {
      setExploredIngredient('');
    };
  }, []);

  return (
    <>
      <div>
        <Header pageTitle="Bebidas" />
        {searchOrHeader ? <SearchBar /> : '' }
        {/** É necessario passar props pageTitle com o valor
     * de: "Comidas" para o header */}
        {/* <Header pageTitle="Comidas" /> */}
      </div>
      <div>
        {/** É necessario passar props pageTitle com o valor
         * de: Bebidas para ser mostrado no header */}
      </div>

      {/** Mostra 5 botões com as primeiras cateforias da requisição */}
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleClickFilterAll }
        >
          All
        </button>
        {
          categorys
            .slice(0, sizeListCategorys)
            .map((category, index) => (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                key={ index }
                type="button"
                onClick={ () => handleFilterCategory(category.strCategory) }
              >
                { category.strCategory }
              </button>
            ))
        }
      </div>
      <h2>
        {exploredIngredient !== '' && `Filtro de ingrediente: ${exploredIngredient}`}
      </h2>
      {/** Renderiza os Cards com as Comidas */}
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {
          recipes
            .slice(0, sizeListRecipes)
            .map((recipe, index) => (
              <Link key={ index } to={ `/bebidas/${recipe.idDrink}` }>
                <RecipesCards
                  nameValue={ recipe.strDrink }
                  indexValue={ index }
                  thumbValue={ recipe.strDrinkThumb }
                />
              </Link>
            ))
        }
      </div>
      <Footer />
    </>
  );
};

export default CocktailRecipePage;
