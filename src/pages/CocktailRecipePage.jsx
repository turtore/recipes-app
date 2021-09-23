import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const CocktailRecipePage = () => {
  const { searchOrHeader, setMealOrDrink } = useContext(RecipesContext);

  // quando carrega a pagina de cocktail, coloca o estado no provider como drink
  useEffect(() => {
    setMealOrDrink('drink');
  });

  return (
    <div>
      {!searchOrHeader ? <Header pageTitle="Comidas" showSearch={ false } />
        : <SearchBar /> }
      {/** É necessario passar props pageTitle com o valor
     * de: "Comidas" para o header */}
      {/* <Header pageTitle="Comidas" /> */}
    </div>
  );
};

export default CocktailRecipePage;
