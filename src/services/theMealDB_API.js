async function getMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const responseJson = await response.json();
  return responseJson;
}

export default getMeal;
