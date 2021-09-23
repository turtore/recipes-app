/** Requisição das Receitas */
export const getCockTail = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const responseJson = await response.json();
  return responseJson;
};

/** Requisição das Receitas por Filter */
export const getFilterCockTail = async (query) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`);
  const responseJson = await response.json();
  return responseJson;
};

/** Requisição das Categorias */
export const getCategoryCockTail = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson;
};
