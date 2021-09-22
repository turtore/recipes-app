import React from 'react';
import Header from '../components/Header';

const MakeRecipesPage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
    de: "Receitas Feitas" e showSearch = { false } para o header */}
    <Header pageTitle="Receitas Feitas" showSearch={ false } />
  </div>
);

export default MakeRecipesPage;
