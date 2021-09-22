import React, { useContext, useState } from 'react';
// import { withRouter } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

// Criado os services api separados para comida e bebida
// os inputs do tipo radio possuem o mesmo name="name-search" para ser apenas um selecionado por vez.
// a searchbar tem um estado local que é utilizado para passar paramentros a chamada da API
// criado estado global no provider para definir se é bebida ou comida

const STARTER_OPTION = '';
const STARTER_INPUT = '';

function SearchBar() {
  const [inputValue, setInputValue] = useState(STARTER_INPUT);
  const [searchOption, setOption] = useState(STARTER_OPTION);
  const { theCockTailDBAPI, theMealDBAPI, mealOrDrink } = useContext(RecipesContext);

  async function onClickButton() {
    if (mealOrDrink === 'meal') {
      const mealResponse = await theMealDBAPI(searchOption, inputValue);
      console.log(mealResponse);
      // console.log(mealResponse);
    }

    if (mealOrDrink === 'drink') {
      const drinkResponse = await theCockTailDBAPI(searchOption, inputValue);
      // console.log(drinkResponse.drinks.length);
      console.log(drinkResponse);
      // if (drinkResponse.drinks.length===0){
      //   window.alert('nada encontrado')
      // }
    }
  }

  return (
    <div>
      <h1>sou o SearchBar</h1>
      <input
        type="text"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
      />
      <label htmlFor="ingredients-search">
        Ingredientes:
        <input
          data-testid="search-input"
          name="option-radio"
          className="ingredients-search"
          type="radio"
          value="ingredients"
          onChange={ () => setOption('ingredients') }
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
          onChange={ () => setOption('name') }
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
          onClick={ () => setOption('first-letter') }
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
