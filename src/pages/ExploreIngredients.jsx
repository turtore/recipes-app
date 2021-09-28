import React, { useState, useEffect, useContext } from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import fetchIngredients from '../services/exploreIngredientsEndPointsCall';
import RecipesContext from '../context/RecipesContext';

const ExploreIngredients = () => {
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const isMeal = pathname.includes('comidas');
  const { setExploredIngredient } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    const getTwelveIngredients = async () => {
      const TWELVE = 12;
      const myIngredients = await fetchIngredients(isMeal);

      if (myIngredients !== undefined) {
        const [ingredientKey, typeUrl] = isMeal
          ? ['strIngredient', 'themealdb']
          : ['strIngredient1', 'thecocktaildb'];

        setIngredients(myIngredients.slice(0, TWELVE).map((ingredient) => ({
          ingredientName: ingredient[ingredientKey],
          ingredientImgSrc: `https://www.${typeUrl}.com/images/ingredients/${ingredient[ingredientKey]}-Small.png`,
        })));
      }
    };

    getTwelveIngredients();
  }, [isMeal]);

  const handleClickIngredient = (ingredient) => {
    setExploredIngredient(ingredient);
    history.push(isMeal ? '/comidas' : '/bebidas');
  };

  const cardStyle = {
    width: '9.7rem',
    textAlign: 'center',
  };

  if (ingredients.length === 0) return <Loading />;

  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" showSearch={ false } />
      <CardGroup className="d-flex flex-wrap justify-content-around mb-5 mt-4">
        {ingredients.map(({ ingredientName, ingredientImgSrc }, index) => (
          <Card
            bg="light"
            key={ ingredientName }
            className="card-block"
            style={ cardStyle }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClickIngredient(ingredientName) }
          >
            <Card.Img
              variant="top"
              src={ ingredientImgSrc }
              data-testid={ `${index}-card-img` }
            />
            <Card.Header
              className="d-flex align-items-center justify-content-center"
              style={ { height: '100%' } }
              data-testid={ `${index}-card-name` }
            >
              {ingredientName}
            </Card.Header>
          </Card>
        ))}
      </CardGroup>
      <Footer />
    </div>
  );
};

export default ExploreIngredients;
