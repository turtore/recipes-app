import React, { useContext, useEffect } from 'react';
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
  } = useContext(RecipesContext);
  const sizeListRecipes = 12;
  const sizeListCategorys = 5;

  /** Faz as requisições para mostrar as categorias e as receitas */
  const requestAPI = async () => {
    const dataCockTails = await recipeAPI('name', '', 'drink');
    const dataCategorys = await recipeAPI('listCategorys', 'c', 'drink');
    setRecipes(dataCockTails.drinks);
    setCategorys(dataCategorys.drinks);
  };

  /** Função que envia a categoria pro provider */
  const handleFilterCategory = async (strCategory) => {
    const dataFilterCockTails = await recipeAPI('category', strCategory, 'drink');
    setRecipes(dataFilterCockTails.drinks);
  };

  /** Função que mostra todas as receitas */
  const handleClickFilterAll = async () => {
    await requestAPI();
  };

  useEffect(() => {
    requestAPI();
    setMealOrDrink('drink');
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
