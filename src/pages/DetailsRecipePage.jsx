import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Ratio, Card, CardGroup } from 'react-bootstrap';
import fetchDetailRecipe from '../services/detailRecipeEndPoint';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './pages-css/DetailsRecipePage.css';

const DetailsRecipePage = () => {
  // tambem poderia desestruturar o match das props para pegar o recipeID --> { match: { params: { recipeId } } }
  const { recipeId } = useParams(); // id que vem da URL
  const { pathname } = useLocation(); // URL atual completa
  const [recipeDetails, setRecipeDetails] = useState({}); // estado que recebe os detalhes da receita da requisição a API
  const [recipeType, setRecipeType] = useState(''); // estado que armazenará o tipo de receia (comida ou bebida)
  const [videoURL, setVideoURL] = useState(''); // estado que guarda a URL do vídeo se for uma receita de comida
  const isMeal = pathname.includes('comidas'); // verifica se é comida ou bebida com base na URL

  useEffect(() => { // useEffect responsável por fazer a requisição da receita e guardar as informações no estado recipeDetails
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
      <Row>
        <Col>
          <h5>Recomendadas</h5>
        </Col>
      </Row>
      <Row className="recomendation-container">
        <CardGroup className="row flex-nowrap">
          <Col>
            <Card className="card-block" style={ { width: '9.7rem' } }>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="card-block" style={ { width: '9.7rem' } }>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="card-block" style={ { width: '9.7rem' } }>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="card-block" style={ { width: '9.7rem' } }>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        </CardGroup>
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
