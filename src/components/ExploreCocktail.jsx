import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const ExploreCocktail = () => (
  <div>
    <Header pageTitle="Explorar bebidas" showSearch={ false } />
    <Stack gap={ 2 } className="col-md-5 mx-auto mt-4">
      <Button
        variant="secondary"
        href="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Button>
      <Button
        variant="secondary"
        href="/explorar/bebidas/me-surpreenda"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Button>
    </Stack>
    <Footer />
  </div>
);

export default ExploreCocktail;
