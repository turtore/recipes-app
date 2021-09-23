export const getMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const responseJson = await response.json();
  return responseJson;
};

export const getCategoryMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson;
};
