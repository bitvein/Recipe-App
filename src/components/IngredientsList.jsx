export default function IngredientsList({
  ingredients,
  ingredientsListItems,
  getRecipe,
  ref
}) {
  //   const [ingredients, setIngredients] = React.useState([
  //     "all the main spices",
  //     "pasta",
  //     "ground beef",
  //     "tomato paste",
  //     // "Chicken",
  //     // "Oregano",
  //     // "Tomatoes",
  //   ]);
  return (
    <>
      {ingredients.length > 0 && (
        <section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsListItems}
          </ul>
          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div ref={ref}>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button
                // onClick={() =>
                //   setRecipeShown((prevRecipeShown) => !prevRecipeShown)
                // }
                onClick={getRecipe}
              >
                Get a recipe
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
