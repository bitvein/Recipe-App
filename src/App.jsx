import React from "react";
import Header from "./components/Header";
import Main from "./main.jsx";
import ClaudeRecipe from "./components/ClaudeRecipe.jsx";
import IngredientsList from "./components/IngredientsList.jsx";
import { getRecipeFromMistral } from "./ai.js";

function App() {
  // async function getRecipe() {
  //   // setRecipeShown((prevShown) => !prevShown); //this was when the func was toggleRecipeShown without async await
  //   const recipeMardown = await getRecipeFromMistral(ingredients);
  //   setRecipe(recipeMardown);

  const [ingredients, setIngredients] = React.useState([
    // "all the main spices",
    // "pasta",
    // "ground beef",
    // "tomato paste",
    // "Chicken",
    // "Oregano",
    // "Tomatoes",
  ]);
  // const [recipeShown, setRecipeShown] = React.useState(false);
  const [recipe, setRecipe] = React.useState(""); // try to understand why we put this here what is does and rewatch the video for explanation
  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  const recipeSection = React.useRef(null);
  console.log(recipeSection);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" }); //behavior smooth work on a local env but not on iframe
    }
  }, [recipe]);
  // function addIngredient(formData) {
  //   // event.preventDefault();
  //   // console.log("Form submitted!");
  //   // const formData = new FormData(event.currentTarget);
  //   const newIngredient = formData.get("ingredient");
  //   // ingredients.push(newIngredient);
  //   // console.log(ingredients);
  //   setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  // }

  function addIngredient(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    const formData = new FormData(event.target); // Get form data
    const newIngredient = formData.get("ingredient"); // Extract the ingredient value
    if (newIngredient) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      event.target.reset(); // Clear the input field after submission
    }
  }

  async function getRecipe() {
    // setRecipeShown((prevShown) => !prevShown); //this was when the func was toggleRecipeShown without async await
    const recipeMardown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMardown);
  }

  // DOMNode.scrollIntoView()

  return (
    <>
      <Header />
      <main>
        {/* <h1>Is state important to know?</h1>
      <button onClick={handleClick}>{isImportant}</button> */}

        <form onSubmit={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <button>Add ingredient</button>
        </form>
        {/* <ul>{ingredientsListItems}</ul> */}
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          ingredientsListItems={ingredientsListItems}
          getRecipe={getRecipe}
        />
        <ClaudeRecipe recipe={recipe} />
      </main>
      {/* <Main /> */}
    </>
  );
}

export default App;
