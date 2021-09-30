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

// export const setIngredientsUsed = (
//   inProgressRecipes,
//   recipeId,
//   isMeal,
//   target,
// ) => {
//   inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
//   if (inProgressRecipes === null) {
//     localStorage.setItem('inProgressRecipes', JSON.stringify({}));
//   }

//   const foodOrDrink = isMeal ? 'meals' : 'cocktails';

//   const newProgressRecipe = {
//     switch (foodOrDrink) {
//       case 'meals':
//           [recipeId]: [target.value],
//         break;
//       case: 'cocktails':

//         break;
//       default:
//         break;
//     }
//   };

//   const newProgressRecipes = {
//     ...inProgressRecipes,
//     newProgressRecipe,
//   };

//   localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipes));
// };

export default setFavoriteRecipesToStorage;
