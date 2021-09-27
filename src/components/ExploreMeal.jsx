import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const ExploreMeal = () => (
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
        href="/explorar/comidas/origem"
        data-testid="explore-by-area"
      >
        Por Origem
      </Button>
      <Button
        variant="secondary"
        href="/explorar/comidas/me-surpreenda"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
    </Stack>
    <Footer />
  </div>
);

export default ExploreMeal;
