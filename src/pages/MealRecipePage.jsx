import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesCards from '../components/RecipesCards';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

const MealRecipePage = () => {
  const { recipes, categorys, listRecipes, searchOrHeader } = useContext(RecipesContext);
  const getContext = useContext(RecipesContext);
  const sizeListRecipes = 12;
  const sizeListCategorys = 5;

  /** Função que envia a categoria pro provider */
  const handleFilterCategory = (strCategory) => {
    getContext.filterRecipes(strCategory);
  };

  /** Função que mostra todas as receitas */
  const handleClickFilterAll = () => {
    listRecipes();
  };

  return (
    <>
      <div>
        <Header pageTitle="Comidas" />
        {searchOrHeader ? <SearchBar /> : '' }
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
              <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                <RecipesCards
                  nameValue={ recipe.strMeal }
                  indexValue={ index }
                  thumbValue={ recipe.strMealThumb }
                />
              </Link>
            ))
        }
      </div>
      <Footer />
    </>
  );
};

export default MealRecipePage;
