import React from 'react';
import { useLocation } from 'react-router';
import ExploreCocktail from '../components/ExploreCocktail';
import ExploreMeal from '../components/ExploreMeal';

const ExploreRecipesPage = () => {
  const { pathname } = useLocation();
  return (
    <div>
      {
        /** Renderiza Página de Explororar Comidas ou Explorar Bebidas */
        pathname === '/explorar/comidas' ? <ExploreMeal /> : <ExploreCocktail />
      }
    </div>
  );
};

export default ExploreRecipesPage;
