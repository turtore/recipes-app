/*
  Função que faz a requisição a API com base no id da Receita que virá da URL (primeiro parâmetro)
  O segundo parâmetro tem de ser um valor booleano:
    Se for true significa que é uma comida, caso contrário bebida.
*/
const fetchDetailRecipe = async (recipeId, isMeal) => {
  const [recipeTypeURL, recipeTypeKey] = isMeal
    ? ['themealdb', 'meals']
    : ['thecocktaildb', 'drinks'];

  const fetchRecipe = await fetch(`https://www.${recipeTypeURL}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
  const response = await fetchRecipe.json(); // retorno é um objeto que pode ter a chave 'meals' ou 'drinks' dependendo do tipo de comida
  const [data] = await response[recipeTypeKey]; // response[recipeTypeKey] retorna um array de objetos. Portanto é desestruturado o primeiro elemento do array (envolvendo data em colchetes [data])

  return data; // retorna o objeto com os detalhes da receita;
};

/*
  Função faz a requisição ao endpoint dependendo do que for passado no parametro. Se na página de detalhes tiver uma comida
  a requisição é feita para o endpoint de bebidas. Pois é necessário que as recomendações da pagina de comida sejam bebidas e vice-versa
*/
export const fetchRecommendedRecipes = async (isMeal) => {
  // const SORT_LOGICAL_NUMBER = 0.5;

  const [recipeTypeURL, recipeTypeKey] = !isMeal // se bebida retorna comida, e vice-versa
    ? ['themealdb', 'meals']
    : ['thecocktaildb', 'drinks'];

  const fetchRecipes = await fetch(`https://www.${recipeTypeURL}.com/api/json/v1/1/search.php?s=`);
  const response = await fetchRecipes.json();
  const data = await response[recipeTypeKey];

  // const [
  //   recipe1, recipe2,
  //   recipe3, recipe4,
  //   recipe5, recipe6,
  // ] = data.sort(() => Math.random() - SORT_LOGICAL_NUMBER); essa função traz 6 receitas aleatórias

  const [
    recipe1, recipe2,
    recipe3, recipe4,
    recipe5, recipe6,
  ] = data; // pega os 6 primeiros elementos do array

  return [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6]; // retorna o array com as receitas;
};

export default fetchDetailRecipe;
