import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const FavoriteRecipesPage = () => {
  const [filter, setFilter] = useState('');
  const { searchOrHeader } = useContext(RecipesContext);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  /** Seta o tipo de filtro no estado */
  const handleClickFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div>
      <Header pageTitle="Receitas Favoritas" showSearch={ false } />
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
        favoriteRecipes ? favoriteRecipes
          .filter((favoriteRecipe) => favoriteRecipe.type.includes(filter))
          .map((favoriteRecipe, index) => (
            <FavoriteCard
              key={ index }
              idValue={ favoriteRecipe.id }
              typeValue={ favoriteRecipe.type }
              areaValue={ favoriteRecipe.area }
              categoryValue={ favoriteRecipe.category }
              alcoholicOrNotValue={ favoriteRecipe.alcoholicOrNot }
              nameValue={ favoriteRecipe.name }
              imgValue={ favoriteRecipe.image }
              indexValue={ index }
            />
          )) : 'Nenhuma receita favorita.'
      }
    </div>
  );
};
export default FavoriteRecipesPage;
