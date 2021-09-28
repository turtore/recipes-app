import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesCards from '../components/RecipesCards';
import SearchBar from '../components/Searchbar';
import RecipesContext from '../context/RecipesContext';
import recipeAPI from '../services/recipeAPI';

const ExploreRecipesAreaPage = () => {
  const {
    searchOrHeader,
    recipes,
    categorys,
    setRecipes,
    setCategorys,
  } = useContext(RecipesContext);
  const sizeListRecipes = 12;

  /** Seta no estado o valor vindo do filtro */
  const handleFilterArea = async (event) => {
    const { target: { value } } = event;
    const dataFilterMeal = await recipeAPI('category', value, 'meal', 'a');
    console.log(dataFilterMeal, value);
    setRecipes(dataFilterMeal.meals);
  };

  /** Faz as requisições para mostrar as categorias por area e as receitas */
  useEffect(() => {
    const requestAPI = async () => {
      const dataMeal = await recipeAPI('name', '', 'meal');
      const dataArea = await recipeAPI('listCategorys', '', 'meal', 'a');
      setCategorys(dataArea.meals);
      setRecipes(dataMeal.meals);
    };
    requestAPI();
  }, [setRecipes, setCategorys]);

  return (
    <div>
      <Header pageTitle="Explorar Origem" />
      {searchOrHeader ? <SearchBar /> : '' }

      {/** Filtrar por Origem */}
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (event) => handleFilterArea(event) }
      >
        <option
          data-testid="All-option"
          value=""
        >
          All
        </option>
        {
          categorys
            .sort()
            .map((category, index) => (
              <option
                data-testid={ `${category.strArea}-option` }
                key={ index }
                value={ category.strArea }
              >
                { category.strArea }
              </option>
            ))
        }
      </select>

      {/** Renderiza os Cards com as Comidas */}
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {
          recipes
            .slice(0, sizeListRecipes)
            .map((recipe, index) => (
              <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                <RecipesCards
                  nameValue={ recipe.strMeal }
                  indexValue={ index }
                  thumbValue={ recipe.strMealThumb }
                />
              </Link>
            ))
        }
      </div>
    </div>
  );
};

export default ExploreRecipesAreaPage;
