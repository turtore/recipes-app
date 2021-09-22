import React from 'react';
import Header from '../components/Header';

const FavoritesRecipesPage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
    de: "Receitas Favoritas" e showSearch = { false } para o header */}
    <Header pageTitle="Receitas Favoritas" showSearch={ false } />
  </div>
);

export default FavoritesRecipesPage;
