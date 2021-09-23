import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const MealRecipePage = () => {
  const { searchOrHeader } = useContext(RecipesContext);
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
