import React, { useContext } from 'react';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const FavoriteRecipesPage = () => {
  const { searchOrHeader, favoriteRecipes } = useContext(RecipesContext);

  console.log(favoriteRecipes);

  return (
    <div>
      <Header pageTitle="Receitas Favoritas" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <hr />
      {favoriteRecipes ? favoriteRecipes
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
        )) : 'Nenhuma receita favorita.'}
    </div>
  );
};
export default FavoriteRecipesPage;
