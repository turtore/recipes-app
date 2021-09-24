import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Container, Row, Col, Button,
  Image, Ratio, Card, CardGroup,
  ListGroup,
} from 'react-bootstrap';
// import RecipesContext from '../context/RecipesContext';
import fetchDetailRecipe,
{ fetchRecommendedRecipes } from '../services/detailRecipeEndPoint';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './styles/DetailsRecipePage.css';
import Loading from '../components/Loading';

const DetailsRecipePage = () => {
  // tambem poderia desestruturar o match das props para pegar o recipeID --> { match: { params: { recipeId } } }
  const { recipeId } = useParams(); // id que vem da URL
  const [isLoading, setIsLoading] = useState(true);
  // const { mealOrDrink } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState({}); // estado que recebe os detalhes da receita da requisição a API
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState(''); // estado que armazenará o tipo de receia (comida ou bebida)
  const [videoURL, setVideoURL] = useState(''); // estado que guarda a URL do vídeo se for uma receita de comida
  // const isMeal = (mealOrDrink === 'meal');
  const { pathname } = useLocation();
  const isMeal = pathname.includes('comidas');

  useEffect(() => { // useEffect responsável por fazer a requisição da receita e guardar as informações no estado recipeDetails
    const getRecipeDetails = async () => {
      const myRecipeDetails = await fetchDetailRecipe(recipeId, isMeal);

      setRecipeDetails(myRecipeDetails);
      setRecipeType(isMeal ? 'Meal' : 'Drink');
      setIsLoading(false);
    };

    const getRecommendedRecipes = async () => {
      const myRecommendedRecipes = await fetchRecommendedRecipes(isMeal);

      setRecommendedRecipes(myRecommendedRecipes);
    };

    getRecipeDetails();
    getRecommendedRecipes();
  }, [isMeal, recipeId]);

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
      .filter(([key, value]) => {
        const validations = [value !== null, value !== ''];
        const validationsOK = validations.every((validation) => validation);

        return key.includes(ingredientOrMeasure) && validationsOK;
      }).map(([, value]) => value);

    return ingredientsOrMeasures;
  };

  const ingredients = getIngredientsOrMeasures('strIngredient');
  const measures = getIngredientsOrMeasures('strMeasure');
  const { strCategory, strInstructions } = recipeDetails;
  const recommendedType = recipeType === 'Meal' ? 'Drink' : 'Meal';

  if (isLoading) return <Loading />;

  return (
    <Container fluid>
      <Row>
        <Col className="column-container">
          <Image
            src={ recipeDetails[`str${recipeType}Thumb`] }
            alt=""
            data-testid="recipe-photo"
            className="recipe-image"
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
      <Row style={ { marginTop: '1rem' } }>
        <Col>
          <h5>Ingredients</h5>
          <ListGroup>
            {ingredients.map((ingredient, index) => (
              <ListGroup.Item
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${ingredient} - ${measures[index]}` }
                variant="light"
              >
                {`${ingredient} - ${measures[index] === undefined
                  ? 'to taste'
                  : measures[index]}`}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row style={ { marginTop: '1rem' } }>
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
                <iframe title="youtube-video" src={ videoURL } data-testid="video" />
              </Ratio>
            </div>
          </Col>
        </Row>
      )}
      <Row style={ { marginTop: '1rem' } }>
        <Col>
          <h5>Recommended</h5>
        </Col>
      </Row>
      <Row className="recomendation-container">
        <CardGroup className="row flex-nowrap">
          {recommendedRecipes.map((recipe, index) => (
            <Col
              key={ recipe[`id${recommendedType}`] }
              data-testid={ `${index}-recomendation-card` }
            >
              <Card className="card-block" style={ { width: '9.7rem' } }>
                <Card.Img variant="top" src={ recipe[`str${recommendedType}Thumb`] } />
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    {recipe.strCategory}
                  </Card.Subtitle>
                  <Card.Title
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {recipe[`str${recommendedType}`]}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </CardGroup>
      </Row>
      <Row className="fixed-bottom">
        <Col>
          <div className="d-grid gap-2 btn-container">
            <Button
              style={ { width: '100%', borderRadius: '0' } }
              className="fixed-bottom"
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
