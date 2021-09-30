import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Button,
  Image, ListGroup,
} from 'react-bootstrap';
import copy from 'clipboard-copy';
import fetchDetailRecipe from '../services/detailRecipeEndPointsCall';
import DetailsIcons from '../components/DetailsIcons';
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
  const [recipeDetails, setRecipeDetails] = useState({}); // estado que recebe os detalhes da receita da requisição a API
  const [recipeType, setRecipeType] = useState(''); // estado que armazenará o tipo de receia (comida ou bebida)
  const { pathname } = useLocation();
  const isMeal = pathname.includes('comidas'); // se na URL tiver 'comidas' quer dizer que é a page de comidas e retorna true
  const [buttonDisable, setButtonDisable] = useState({
    disabled: true,
    allChecked: 0,
  });
  // const [inProgressRecipes, setinProgressRecipes] = useState({
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

    getRecipeDetails();
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
    const mealOrDrink = isMeal ? 'comidas' : 'bebidas';
    copy(`${window.location.origin}/${mealOrDrink}/${recipeId}`);
    setLinkIsCopied(true);

    setTimeout(() => {
      setLinkIsCopied(false);
    }, THREE_SECONDS);
  };

  const ingredients = getIngredientsOrMeasures('strIngredient'); // strIngredient são as chaves que o objeto recipeDetails também retorna ex: (strIngredient1, strIngredient2)
  const measures = getIngredientsOrMeasures('strMeasure'); // strMeasure são as chaves que o objeto recipeDetails também retorna ex: (strMeasure1, strMeasure2)
  const { strCategory, strInstructions, strAlcoholic } = recipeDetails;

  const handleFavoriteIconClick = () => {
    setIsFavorite(!isFavorite);

    setFavoriteRecipesToStorage(isFavorite, recipeDetails, recipeType, isMeal);
  };

  const myHandleClickCheckBox = ({ target }) => {
    const classForCheckbox = 'checkbox-checked';
    if (target.parentElement.classList.contains(classForCheckbox)) {
      target.parentElement.classList.remove(classForCheckbox);
    } else {
      target.parentElement.classList.add(classForCheckbox);
    }
    setButtonDisable({
      ...buttonDisable,
      disabled: buttonDisable.allChecked + 1 !== ingredients.length,
      allChecked: buttonDisable.allChecked + 1,
    });
    // setIngredientsUsed(inProgressRecipes, setinProgressRecipes, recipeId, isMeal, target);
    // console.log(target.value);
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
        <Col>
          <DetailsIcons
            handleFavoriteIconClick={ handleFavoriteIconClick }
            handleShareIconClick={ handleShareIconClick }
            isFavorite={ isFavorite }
            linkIsCopied={ linkIsCopied }
            recipeId={ recipeId }
            setIsFavorite={ setIsFavorite }
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
                id={ ingredient }
                key={ `${ingredient} - ${measures[index]}` }
                variant="light"
              >
                <label
                  htmlFor={ `${index}-ingredient-step` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ `${index}-ingredient-step` }
                    name={ ingredient }
                    value={ `${ingredient} - ${measures[index]}` }
                    className="form-check-input"
                    onClick={ myHandleClickCheckBox }
                  />
                  {` ${ingredient} - ${measures[index] === undefined
                    ? 'to taste'
                    : measures[index]}`}
                </label>
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
              disabled={ buttonDisable.disabled }
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
