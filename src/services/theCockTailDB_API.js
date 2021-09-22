async function getCockTail() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const responseJson = await response.json();
  return responseJson;
}

export default getCockTail;
