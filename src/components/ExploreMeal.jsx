import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useHistory } from 'react-router';
import recipeAPI from '../services/recipeAPI';
import Footer from './Footer';
import Header from './Header';

const ExploreMeal = () => {
  const history = useHistory();

  const handleClickRandomMeal = async () => {
    const dataMeal = await recipeAPI('randomRecipe', '', 'meal');
    history.push(`/comidas/${dataMeal.meals[0].idMeal}`);
  };

  return (
    <div>
      <Header pageTitle="Explorar comidas" showSearch={ false } />
      <Stack gap={ 2 } className="col-md-5 mx-auto mt-4">
        <Button
          variant="secondary"
          href="/explorar/comidas/ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
        <Button
          variant="secondary"
          href="/explorar/comidas/area"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Button>
        <Button
          variant="secondary"
          data-testid="explore-surprise"
          onClick={ handleClickRandomMeal }
        >
          Me Surpreenda!
        </Button>
      </Stack>
      <Footer />
    </div>
  );
};

export default ExploreMeal;
