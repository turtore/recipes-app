const fetchIngredients = async (isMeal) => {
  const [ingredientTypeURL, ingredientTypeKey] = isMeal
    ? ['themealdb', 'meals']
    : ['thecocktaildb', 'drinks'];

  const fetchingIngredients = await fetch(`https://www.${ingredientTypeURL}.com/api/json/v1/1/list.php?i=list`);
  const response = await fetchingIngredients.json();
  const data = response[ingredientTypeKey];

  return data; // retorna o array de objetos com os ingredientes
};

export default fetchIngredients;
