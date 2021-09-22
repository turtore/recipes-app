import React from 'react';
import Header from '../components/Header';

const CocktailRecipePage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
     * de: Bebidas para ser mostrado no header */}
    <Header pageTitle="Bebidas" />
  </div>
);

export default CocktailRecipePage;
