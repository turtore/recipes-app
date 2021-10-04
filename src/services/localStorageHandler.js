const setFavoriteRecipesToStorage = (isFavorite, recipeDetails, recipeType, isMeal) => {
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  if (!isFavorite) {
    favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const newFavoriteRecipe = {
      id: recipeDetails[`id${recipeType}`],
      type: isMeal ? 'comida' : 'bebida',
      area: isMeal ? recipeDetails.strArea : '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: isMeal ? '' : recipeDetails.strAlcoholic,
      name: recipeDetails[`str${recipeType}`],
      image: recipeDetails[`str${recipeType}Thumb`],
    };

    const newFavoriteRecipes = [
      ...favoriteRecipes,
      newFavoriteRecipe,
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  } else {
    const idRecipe = recipeDetails[`id${recipeType}`];
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes.filter(({ id }) => id !== idRecipe),
    ));
  }
};

export const usedIngredients = (recipeId, ingredient, isMeal) => {
  let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }

  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipesType = isMeal ? 'meals' : 'cocktails';

  if (ingredient.checked) {
    const newInprogress = {
      ...inProgressRecipes,
      [recipesType]: {
        ...inProgressRecipes[recipesType],
        [recipeId]: inProgressRecipes[recipesType][recipeId] === undefined
          ? [ingredient.value]
          : [...inProgressRecipes[recipesType][recipeId], ingredient.value],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogress));
  } else {
    const newInprogress = {
      ...inProgressRecipes,
      [recipesType]: {
        ...inProgressRecipes[recipesType],
        [recipeId]: inProgressRecipes[recipesType][recipeId] === undefined
          ? [ingredient.value]
          : [...inProgressRecipes[recipesType][recipeId], ingredient.value]
            .filter((item) => item !== ingredient.value),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInprogress));
  }
};

export default setFavoriteRecipesToStorage;
