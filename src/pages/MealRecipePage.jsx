import React from 'react';
import { Link } from 'react-router-dom';

const MealRecipePage = () => {
  const idBebida = '11987';
  const idComida = '52805';

  return (
    <div>
      <Link to={ `/bebidas/${idBebida}` }>Teste de Id Bebida</Link>
      <Link to={ `/comidas/${idComida}` }>Teste de Id Comida</Link>
    </div>
  );
};

export default MealRecipePage;
