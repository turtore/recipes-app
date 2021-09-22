export default async function theCockTailDBAPI(caseInput, inputValue) {
  switch (caseInput) {
  case 'ingredients': {
    const requestIngredients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
    const ingredients = await requestIngredients.json();
    return ingredients;
  }
  case 'name': {
    const requestName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
    const nameFind = await requestName.json();
    return nameFind;
  }
  case 'first-letter': {
    const requestFirstLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
    const firstLetter = await requestFirstLetter.json();
    return firstLetter;
  }
  default:
    return 'invalido';
  }
}
