import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';
import Profile from '../components/Profile';

const ProfilePage = () => {
  const { searchOrHeader } = useContext(RecipesContext);

  return (
    <div>
      <Header pageTitle="Perfil" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <Profile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
