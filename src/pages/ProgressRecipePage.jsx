import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Button,
  Image, ListGroup,
} from 'react-bootstrap';
// import RecipesContext from '../context/RecipesContext';
import copy from 'clipboard-copy';
import fetchDetailRecipe,
{ fetchRecommendedRecipes } from '../services/detailRecipeEndPointsCall';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './styles/DetailsRecipePage.css';
import Loading from '../components/Loading';
import setFavoriteRecipesToStorage from '../services/localStorageHandler';
import './styles/ProgressRecipePage.css';

const DetailsRecipePage = () => {
  // tambem poderia desestruturar o match das props para pegar o recipeID --> { match: { params: { recipeId } } }
  const history = useHistory();
  const { recipeId } = useParams(); // id que vem da URL
  const [isLoading, setIsLoading] = useState(true);
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // const { mealOrDrink } = useContext(RecipesContext);
  const [recipeDetails, setRecipeDetails] = useState({}); // estado que recebe os detalhes da receita da requisição a API
  // const [recommendedRecipes, setRecommendedRecipes] = useState([]); // estado que recebe as recomendações
  const [recipeType, setRecipeType] = useState(''); // estado que armazenará o tipo de receia (comida ou bebida)
  // const [videoURL, setVideoURL] = useState(''); // estado que guarda a URL do vídeo se for uma receita de comida
  // const isMeal = (mealOrDrink === 'meal');
  const { pathname } = useLocation();
  const isMeal = pathname.includes('comidas'); // se na URL tiver 'comidas' quer dizer que é a page de comidas e retorna true
  const [buttonDisable, setButtonDisable] = useState(true);
  // const [inProgressRecipe, setinProgressRecipe] = useState({
  //   cocktails: {
  //     [recipeId]: [],
  //   },
  //   meals: {
  //     [recipeId]: [],
  //   },
  // });

  useEffect(() => { // useEffect responsável principalmente por fazer a requisição da receita e guardar as informações no estado recipeDetails
    const getRecipeDetails = async () => {
      const myRecipeDetails = await fetchDetailRecipe(recipeId, isMeal);

      setRecipeDetails(myRecipeDetails);
      setRecipeType(isMeal ? 'Meal' : 'Drink'); // seta o estado do tipo de receita, será 'Meal' se o caminho da URL tiver comidas, se não 'Drink'. Isso é necessário para que essa página seja genérica.
      setIsLoading(false);
    };

    // const getRecommendedRecipes = async () => { // Essa função faz a requisição e pega o array de 6 bebidas ou comidas recomendadas, se for renderizada uma pagina de comida, as recomendações serão bebidas
    //   const myRecommendedRecipes = await fetchRecommendedRecipes(isMeal);

    // setRecommendedRecipes(myRecommendedRecipes);
    // };

    getRecipeDetails();
    // getRecommendedRecipes();
  }, [isMeal, recipeId]);

  const getIngredientsOrMeasures = (ingredientOrMeasure) => {
    const ingredientsOrMeasures = Object.entries(recipeDetails)
      .filter(([key, value]) => {
        const validations = [value !== null, value !== ''];
        const validationsOK = validations.every((validation) => validation);

        return key.includes(ingredientOrMeasure) && validationsOK;
      }).map(([, value]) => value);

    return ingredientsOrMeasures;
  };

  const handleShareIconClick = () => {
    const THREE_SECONDS = 3000;
    copy(window.location.href);
    setLinkIsCopied(true);

    setTimeout(() => {
      setLinkIsCopied(false);
    }, THREE_SECONDS);
  };

  const ingredients = getIngredientsOrMeasures('strIngredient'); // strIngredient são as chaves que o objeto recipeDetails também retorna ex: (strIngredient1, strIngredient2)
  const measures = getIngredientsOrMeasures('strMeasure'); // strMeasure são as chaves que o objeto recipeDetails também retorna ex: (strMeasure1, strMeasure2)
  const { strCategory, strInstructions, strAlcoholic } = recipeDetails;
  // const recommendedType = recipeType === 'Meal' ? 'Drink' : 'Meal'; // aqui é feito o tipo de recomendação. Página é de comida? Então recomendação é de bebida.

  const handleFavoriteIconClick = () => {
    setIsFavorite(!isFavorite);

    setFavoriteRecipesToStorage(isFavorite, recipeDetails, recipeType, isMeal);
  };

  // const handleButtonDisabled = () => {
  //   const ingredientsList = document.getElementsByClassName('list-group-item');
  //   ingredientsList.map((ingredient) => console.log(ingredient));
  // };

  // Função responsável por marcar e desmarcar o checkbox;
  const handleClickCheckBox = ({ target }) => {
    const checkedElement = document.getElementById(`${target.value}`);
    const classForCheckbox = 'checkbox-checked';
    // handleButtonDisabled();
    ingredients.forEach((item) => {
      if (item === target.name) {
        console.log(checkedElement);
        if (checkedElement.classList.contains(classForCheckbox)) {
          checkedElement.classList.remove(classForCheckbox);
          return !target.checked;
        }
        checkedElement.classList.add(classForCheckbox);
        return !target.checked;
      }
    });
  };

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
        <Col xs={ 2 } data-testid="share-btn" onClick={ handleShareIconClick }>
          {linkIsCopied ? <span>Link copiado!</span> : <img src={ shareIcon } alt="" /> }
        </Col>
        <Col xs={ 1 } onClick={ handleFavoriteIconClick }>
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt=""
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 data-testid="recipe-category">{isMeal ? strCategory : strAlcoholic}</h6>
        </Col>
      </Row>
      <Row style={ { marginTop: '1rem' } }>
        <Col>
          <h5>Ingredients</h5>
          <ListGroup>
            {ingredients.map((ingredient, index) => (
              <ListGroup.Item
                data-testid={ `${index}-ingredient-step` }
                id={ ingredient }
                key={ `${ingredient} - ${measures[index]}` }
                variant="light"
              >
                <input
                  type="checkbox"
                  name={ ingredient }
                  value={ ingredient }
                  className="form-check-input"
                  onClick={ handleClickCheckBox }
                />
                {` ${ingredient} - ${measures[index] === undefined
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
      <Row className="fixed-bottom">
        <Col>
          <div className="d-grid gap-2 btn-container">
            <Button
              style={ { width: '100%', borderRadius: '0' } }
              className="fixed-bottom"
              variant="success"
              disabled={ buttonDisable }
              type="button"
              size="lg"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/receitas-feitas') }
            >
              Finalizar Receita
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailsRecipePage;
