import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import MakeRecipesCards from '../components/MakeRecipesPageCards';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const MakeRecipesPage = () => {
  const [filter, setFilter] = useState('');
  const { searchOrHeader } = useContext(RecipesContext);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  /** Seta o tipo de filtro no estado */
  const handleClickFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div>
      <Header pageTitle="Receitas Feitas" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <hr />
      <div style={ { textAlign: 'center' } }>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => handleClickFilter('') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => handleClickFilter('comida') }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => handleClickFilter('bebida') }
        >
          Driks
        </button>
      </div>
      <hr />
      {
        doneRecipes ? doneRecipes
          .filter((doneRecipe) => doneRecipe.type.includes(filter))
          .map((doneRecipe, index) => (
            <MakeRecipesCards
              key={ index }
              imgValue={ doneRecipe.image }
              categoryValue={ doneRecipe.category }
              nameValue={ doneRecipe.name }
              dateValue={ doneRecipe.doneDate }
              tagValue={ doneRecipe.tags }
              indexValue={ index }
              areaValue={ doneRecipe.area }
              alcoholicOrNotValue={ doneRecipe.alcoholicOrNot }
              idValue={ doneRecipe.id }
              typeValue={ doneRecipe.type }
            />
          )) : 'Nenhuma receita finalizada.'
      }
    </div>
  );
};
export default MakeRecipesPage;
