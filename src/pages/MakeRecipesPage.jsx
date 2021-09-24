import React, { useContext } from 'react';
import Header from '../components/Header';
import MakeRecipesCards from '../components/MakeRecipesPageCards';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const MakeRecipesPage = () => {
  const { searchOrHeader } = useContext(RecipesContext);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header pageTitle="Receitas Feitas" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <hr />
      <div style={ { textAlign: 'center' } }>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Driks
        </button>
      </div>
      <hr />
      {
        doneRecipes ? doneRecipes
          .map((doneRecipe, index) => (
            <MakeRecipesCards
              key={ index }
              imgValue={ doneRecipe.image }
              categoryValue={ doneRecipe.category }
              nameValue={ doneRecipe.name }
              dateValue={ doneRecipe.doneDate }
              tagValue={ doneRecipe.tags }
              indexValue={ index }
            />
          )) : 'Nenhuma receita finalizada.'
      }
    </div>
  );
};
export default MakeRecipesPage;
