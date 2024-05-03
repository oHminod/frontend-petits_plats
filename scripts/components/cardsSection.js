import { createRecipeCard } from "./cardFactory.js";

let oldRecipes = [];
export function displayRecipes(recipes) {
    console.log("displayRecipes");
    const recipeSection = document.getElementById("recipes_section");
    const stringifiedRecipes = JSON.stringify(recipes);
    const stringifiedOldRecipes = JSON.stringify(oldRecipes);
    const totalRecipesNumber = document.getElementById("total_recipes_number");

    if (stringifiedRecipes !== stringifiedOldRecipes) {
        recipeSection.innerHTML = "";
        recipes.forEach((recipe) => {
            const recipeCard = createRecipeCard(recipe);
            recipeSection.appendChild(recipeCard);
        });
        oldRecipes = recipes;
    }
    totalRecipesNumber.textContent = recipes.length + " recettes";
}
