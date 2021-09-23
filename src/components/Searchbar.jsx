// import { useHistory } from "react-router-dom";
import React, { useContext, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from './RecipeCard';

// Criado os services api separados para comida e bebida
// os inputs do tipo radio possuem o mesmo name="name-search" para ser apenas um selecionado por vez.
// a searchbar tem um estado local que é utilizado para passar paramentros a chamada da API
// criado estado global no provider para definir se é bebida ou comida
const STARTER_OPTION = '';
const STARTER_INPUT = '';
// criado seletor para função de renderizar os cards
const CARD_SELECTOR = {
  meal: {
    index: 'idMeal',
    name: 'strMeal',
    img: 'strMealThumb,',
  },
  drink: {
    index: 'idDrink',
    name: 'strDrink',
    img: 'strDrinkThumb',
  },
};

function SearchBar() {
  const [inputValue, setInputValue] = useState(STARTER_INPUT);
  const [searchOption, setOption] = useState(STARTER_OPTION);
  const { recipeAPI,
    mealOrDrink,
    searchOrHeader,
    changeSearchOrHeader } = useContext(RecipesContext);

  // função de alert
  const alertWindow = (msg) => alert(msg);

  // serie de funções que serão utilizadas para as condições do resultado
  // feita funcao para verificar se é meal ou drink e utilizar os parametros corretos nas verificações
  const checkTypeOfRecipe = (actualType) => {
    if (actualType === 'meal') {
      return 'meals';
    }
    if (actualType === 'drink') {
      return 'drinks';
    }
  };
  // função para renderizar os cards
  const renderCards = (recipesFound) => {
    const { index } = CARD_SELECTOR[mealOrDrink];
    const { name } = CARD_SELECTOR[mealOrDrink];
    const { img } = CARD_SELECTOR[mealOrDrink];
    const recipes = recipesFound[`${mealOrDrink}s`];
    // console.log(recipes[0][img]);
    return (
      <div>
        { recipes.map((recipe) => (<RecipeCard
          key={ recipe[index] }
          name={ recipe[name] }
          img={ recipe[img] }
          index={ recipe[index] }
        />)) }
      </div>
    );
  };
  async function onClickButton() {
    // chamada a função acima e guardado resultado na variavel que será utilizada para verificar as condições de redirecionamento
    const typeOfRecipe = checkTypeOfRecipe(mealOrDrink);

    changeSearchOrHeader(!searchOrHeader);
    if (searchOption === 'first-letter' && inputValue.length > 1) {
      alertWindow('Sua busca deve conter somente 1 (um) caracter');
    }

    const apiResponse = await recipeAPI(searchOption, inputValue, mealOrDrink);
    // console.log(apiResponse);
    // verifica se nao encontrou nenhum resultado para mandar alert na cara do usuário || o else if verifica se tem apenas 1 resultado para redirecionar
    if (apiResponse[typeOfRecipe] === null) {
      alertWindow('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (apiResponse[typeOfRecipe].length === 1) {
      if (mealOrDrink === 'drink') {
        // <Redirect to={`${apiResponse}/bebidas/:${apiResponse[typeOfRecipe].idDrink}`} />
      } else {
        // <Redirect to={`${apiResponse}/bebidas/:${apiResponse[typeOfRecipe].idMeal}`} />

      }
      // const { idMeal } = mealResponse;
      // console.log('só tem um');
      // abaixo se tem mais de 1 receita vai renderizar os cards
    } else if (apiResponse[typeOfRecipe].length > 1) {
      // criei componente RecipeCard para renderizar
      renderCards(apiResponse);
    }
  }

  return (
    <div>
      <h1>sou o SearchBar</h1>
      <input
        type="text"
        data-testid="search-input"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
        // maxLength={ maxLength }
      />
      <label htmlFor="ingredients-search">
        Ingredientes:
        <input
          data-testid="ingredient-search-radio"
          name="option-radio"
          className="ingredients-search"
          type="radio"
          value="ingredients"
          onClick={ (e) => setOption(e.target.value) }
          // onChange={ checkIfFirstLetter }
        />
      </label>

      <label htmlFor="name-search">
        Nome:
        <input
          data-testid="name-search-radio"
          name="option-radio"
          className="name-search"
          type="radio"
          value="name"
          onClick={ (e) => setOption(e.target.value) }
          // onChange={ checkIfFirstLetter }
        />
      </label>

      <label htmlFor="first-letter-search">
        Primeira Letra:
        <input
          data-testid="first-letter-search-radio"
          name="option-radio"
          className="first-letter-search"
          type="radio"
          value="first-letter"
          onClick={ (e) => setOption(e.target.value) }
          // onChange={ checkIfFirstLetter }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onClickButton }
      >
        Botão de Busca

      </button>

    </div>

  );
}

export default SearchBar;
