import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const ExplorePage = () => {
  const { searchOrHeader } = useContext(RecipesContext);
  return (
    <div>
      <Header pageTitle="Explorar" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <Footer />
    </div>
  );
};

export default ExplorePage;
