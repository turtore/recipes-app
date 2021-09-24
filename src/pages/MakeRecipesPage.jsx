import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const MakeRecipesPage = () => {
  const { searchOrHeader } = useContext(RecipesContext);
  return (
    <div>
      <Header pageTitle="Receitas Feitas" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
    </div>
  );
};
export default MakeRecipesPage;
