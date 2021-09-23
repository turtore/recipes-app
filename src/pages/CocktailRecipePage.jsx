import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import RecipesCards from '../components/RecipesCards';

const CocktailRecipePage = () => {
  const { searchOrHeader,
    setMealOrDrink,
    listRecipes,
    categorys,
    recipes,
  } = useContext(RecipesContext);
  const sizeListRecipes = 12;
  const sizeListCategorys = 5;
  const getContext = useContext(RecipesContext);

  // quando carrega a pagina de cocktail, coloca o estado no provider como drink
  useEffect(() => {
    setMealOrDrink('drink');
  });

  /** Evento de enviar a categoria pro provider */
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
        {!searchOrHeader ? <Header pageTitle="Comidas" showSearch={ false } />
          : <SearchBar /> }
        {/** É necessario passar props pageTitle com o valor
     * de: "Comidas" para o header */}
        {/* <Header pageTitle="Comidas" /> */}
      </div>
      <div>
        {/** É necessario passar props pageTitle com o valor
         * de: Bebidas para ser mostrado no header */}
        <Header pageTitle="Bebidas" />
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
