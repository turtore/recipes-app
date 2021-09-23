import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Ratio } from 'react-bootstrap';
import fetchDetailRecipe from '../services/detailRecipeEndPoint';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './pages-css/DetailsRecipePage.css';

const DetailsRecipePage = () => {
  // tambem poderia desestruturar o match das props para pegar o recipeID --> { match: { params: { recipeId } } }
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const isMeal = pathname.includes('comidas');

  useEffect(() => {
    const getRecipeDetails = async () => {
      const myRecipeDetails = await fetchDetailRecipe(recipeId, isMeal);

      setRecipeDetails(myRecipeDetails);
      setRecipeType(isMeal ? 'Meal' : 'Drink');
    };

    getRecipeDetails();
  }, []);

  useEffect(() => {
    const getValidVideoURL = () => {
      const { strYoutube } = recipeDetails;
      if (strYoutube !== undefined) {
        const CORRECT_INITIAL_URL = 'https://www.youtube.com/embed/';
        const videoID = strYoutube.split('=')[1];

        setVideoURL(`${CORRECT_INITIAL_URL}${videoID}`);
      }
    };

    getValidVideoURL();
  }, [recipeDetails]);

  const getIngredientsOrMeasures = (ingredientOrMeasure) => {
    const ingredientsOrMeasures = Object.entries(recipeDetails)
      .filter(([key, value]) => key.includes(ingredientOrMeasure) && value !== null)
      .map(([, value]) => value);

    return ingredientsOrMeasures;
  };

  const ingredients = getIngredientsOrMeasures('strIngredient');
  const measures = getIngredientsOrMeasures('strMeasure');
  const { strCategory, strInstructions } = recipeDetails;
  return (
    <Container fluid>
      <Row>
        <Col className="column-container">
          <Image
            src={ recipeDetails[`str${recipeType}Thumb`] }
            alt=""
            data-testid="recipe-photo"
            fluid
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={ 8 }>
          <h4 data-testid="recipe-title">{recipeDetails[`str${recipeType}`]}</h4>
        </Col>
        <Col xs={ 2 }>
          <img data-testid="share-btn" src={ shareIcon } alt="" />
        </Col>
        <Col xs={ 1 }>
          <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 data-testid="recipe-category">{strCategory}</h6>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${ingredient} - ${measures[index]}` }
              >
                {`${ingredient} - ${measures[index]}`}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Instructions</h5>
          <p data-testid="instructions">{ strInstructions }</p>
        </Col>
      </Row>
      {isMeal && (
        <Row>
          <Col className="column-container">
            <h5>Vídeo</h5>
            <div style={ { width: 'auto', height: 'auto' } }>
              <Ratio aspectRatio="16x9">
                <iframe title="youtube-video" src={ videoURL } />
              </Ratio>
            </div>
          </Col>
        </Row>
      )}
      <Row className="recomendation-container">
        <Col>
          <h5>Recomendadas</h5>
          <Row>
            <Col data-testid="${index}-recomendation-card">
              item 1 (se for comida, mostra bebida)
            </Col>
            <Col data-testid="${index}-recomendation-card">
              Item 2 (se for comida, mostra bebida)
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="fixed-bottom">
        <Col className="column-container">
          <div className="d-grid gap-2 btn-container">
            <Button
              variant="success"
              type="button"
              size="lg"
              data-testid="start-recipe-btn"
            >
              Iniciar Receita
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsRecipePage;
