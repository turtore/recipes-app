export default async function recipeAPI(caseInput, inputValue, mealOrDrink) {
  const checkApiUrl = (checkUrl) => {
    if (checkUrl === 'meal') {
      return 'https://www.themealdb.com/api/json/v1/1/';
    }
    if (checkUrl === 'drink') {
      return 'https://www.thecocktaildb.com/api/json/v1/1/';
    }
  };

  const apiUrl = checkApiUrl(mealOrDrink);

  switch (caseInput) {
  case 'ingredients': {
    const requestIngredients = await fetch(`${apiUrl}filter.php?i=${inputValue}`);
    const ingredients = await requestIngredients.json();
    return ingredients;
  }
  case 'name': {
    const requestName = await fetch(`${apiUrl}search.php?s=${inputValue}`);

    const nameFind = await requestName.json();
    return nameFind;
  }
  case 'first-letter': {
    const requestFirstLetter = await fetch(`${apiUrl}search.php?f=${inputValue}`);
    const firstLetter = await requestFirstLetter.json();
    return firstLetter;
  }
  /** Pesquisa receita por categoria */
  case 'category': {
    const requestCategorys = await fetch(`${apiUrl}filter.php?c=${inputValue}`);
    const responseCategorys = await requestCategorys.json();
    return responseCategorys;
  }
  /** Pesquisa as categorias */
  case 'listCategorys': {
    const requestCategorys = await fetch(`${apiUrl}list.php?c=list`);
    const responseCategorys = await requestCategorys.json();
    return responseCategorys;
  }
  default:
    return 'parametro, invalido';
  }
}
