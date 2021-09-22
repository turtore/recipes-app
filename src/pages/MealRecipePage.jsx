import React from 'react';
import Header from '../components/Header';

const MealRecipePage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
     * de: "Comidas" para o header */}
    <Header pageTitle="Comidas" />
  </div>
);

export default MealRecipePage;
