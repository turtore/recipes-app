import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import RecipesCards from '../components/RecipesCards';
import Footer from '../components/Footer';
import SearchBar from '../components/Searchbar';

const MealRecipePage = () => {
  const { searchOrHeader, setMealOrDrink } = useContext(RecipesContext);
  const { recipes, categorys, listRecipes } = useContext(RecipesContext);
  const getContext = useContext(RecipesContext);
  const sizeListRecipes = 12;
  const sizeListCategorys = 5;

  /** Função que envia a categoria pro provider */
  const handleFilterCategory = (strCategory) => {
    getContext.filterRecipes(strCategory);
  };

  /** Função que mostra todas as receitas */
  const handleCliclFilterAll = () => {
    listRecipes();
  };

  // quando carrega a pagina de comidas, coloca o estado no provider como meal
  useEffect(() => {
    setMealOrDrink('meal');
    console.log('to funcionando');
  });
  return (
    <>
      <div>
        {!searchOrHeader ? <Header pageTitle="Explorar" showSearch={ false } />
          : <SearchBar /> }
        {/** É necessario passar props pageTitle com o valor
     * de: "Comidas" para o header */}
        {/* <Header pageTitle="Comidas" /> */}
      </div>
      <div>
        {/** É necessario passar props pageTitle com o valor
         * de: "Comidas" para o header */}
        <Header pageTitle="Comidas" />
      </div>

      {/** Mostra 5 botões com as primeiras cateforias da requisição */}
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleCliclFilterAll }
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
