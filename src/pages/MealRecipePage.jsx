import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const MealRecipePage = () => {
  const { searchOrHeader, setMealOrDrink } = useContext(RecipesContext);

  // quando carrega a pagina de comidas, coloca o estado no provider como meal
  useEffect(() => {
    setMealOrDrink('meal');
    console.log('to funcionando');
  });
  return (
    <div>
      {!searchOrHeader ? <Header pageTitle="Explorar" showSearch={ false } />
        : <SearchBar /> }
      {/** É necessario passar props pageTitle com o valor
     * de: "Comidas" para o header */}
      {/* <Header pageTitle="Comidas" /> */}
    </div>
  );
};

export default MealRecipePage;
