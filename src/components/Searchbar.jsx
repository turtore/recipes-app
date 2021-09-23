// import { useHistory } from "react-router-dom";
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

// Criado os services api separados para comida e bebida
// os inputs do tipo radio possuem o mesmo name="name-search" para ser apenas um selecionado por vez.
// a searchbar tem um estado local que é utilizado para passar paramentros a chamada da API
// criado estado global no provider para definir se é bebida ou comida
// poode criar alert com undefined para verificar true ou false na response da api
const STARTER_OPTION = '';
const STARTER_INPUT = '';
// const MAX_LENGTH = 20;

function SearchBar() {
  const [inputValue, setInputValue] = useState(STARTER_INPUT);
  const [searchOption, setOption] = useState(STARTER_OPTION);
  // const [maxLength, setMaxLength] = useState(MAX_LENGTH);
  const { theCockTailDBAPI,
    theMealDBAPI,
    mealOrDrink,
    searchOrHeader,
    changeSearchOrHeader } = useContext(RecipesContext);

  const alertWindow = (msg) => alert(msg);

  async function onClickButton() {
    changeSearchOrHeader(!searchOrHeader);
    if (searchOption === 'first-letter' && inputValue.length > 1) {
      alertWindow('Sua busca deve conter somente 1 (um) caracter');
    }
    if (mealOrDrink === 'meal') {
      const mealResponse = await theMealDBAPI(searchOption, inputValue);
      console.log(mealResponse);
      if (mealResponse.meals === null) {
        alertWindow('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (mealResponse.meals.length === 1) {
        const { idMeal } = mealResponse;
        console.log('só tem um');
        // history.push(`/comidas/${idMeal}`);
        // mealResponse.meals.idMeal
      }
      // console.log(mealResponse);
    }

    if (mealOrDrink === 'drink') {
      const drinkResponse = await theCockTailDBAPI(searchOption, inputValue);
      // console.log(drinkResponse.drinks.length);
      console.log(drinkResponse);
      if (drinkResponse.drinks === null) {
        // setNoRecipe(true);
        alertWindow('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (drinkResponse.drinks.length === 1) {
        console.log('só tem 1');
      }
      // if (drinkResponse.drinks.length===0){
      //   window.alert('nada encontrado')
      // }
    }
  }
  // function checkIfFirstLetter(e) {
  //   setInputValue(STARTER_INPUT);
  //   console.log(searchOption);
  //   if (e.target.value === 'first-letter') {
  //     setMaxLength(1);
  //   } else {
  //     setMaxLength(MAX_LENGTH);
  //   }
  // }

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
