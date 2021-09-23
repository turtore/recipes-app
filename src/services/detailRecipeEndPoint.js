/*
  Função que faz a requisição a API com base no id da Receita que virá da URL (primeiro parâmetro)
  O segundo parâmetro tem de ser um valor true or false:
    Se for true significa que é uma comida, caso contrário bebida.
*/

const fetchDetailRecipe = async (recipeId, isMeal) => {
  const [recipeTypeURL, recipeTypeKey] = isMeal
    ? ['themealdb', 'meals']
    : ['thecocktaildb', 'drinks'];

  const fetchRecipe = await fetch(`https://www.${recipeTypeURL}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
  const response = await fetchRecipe.json(); // retorno é um objeto que pode ter a chave meals ou drinks dependendo do tipo de comida
  const [data] = await response[recipeTypeKey]; // aqui é já é retornado o objeto com os detalhes da receita

  return data; // retorna o objeto;
};

export default fetchDetailRecipe;
