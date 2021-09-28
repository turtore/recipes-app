import React, { useContext } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';

const ExplorePage = () => {
  const { searchOrHeader } = useContext(RecipesContext);
  const history = useHistory();
  return (
    <div>
      <Header pageTitle="Explorar" showSearch={ false } />
      {searchOrHeader ? <SearchBar /> : '' }
      <Stack gap={ 2 } className="col-md-5 mx-auto mt-4">
        <Button
          variant="secondary"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </Button>
        <Button
          variant="secondary"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>
      </Stack>
      <Footer />
    </div>
  );
};

export default ExplorePage;
