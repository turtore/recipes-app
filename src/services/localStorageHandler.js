const setFavoriteRecipesToStorage = (isFavorite, recipeDetails, recipeType, isMeal) => {
  if (!isFavorite) {
    const favoriteRecipes = [
      {
        id: recipeDetails[`id${recipeType}`],
        type: isMeal ? 'comida' : 'bebida',
        area: isMeal ? recipeDetails.strArea : '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: isMeal ? '' : recipeDetails.strAlcoholic,
        name: recipeDetails[`str${recipeType}`],
        image: recipeDetails[`str${recipeType}Thumb`],
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
};

export default setFavoriteRecipesToStorage;
