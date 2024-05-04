import { createRecipeCard } from "./cardFactory.js";

let oldRecipes = [];
export function displayRecipes(recipes) {
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
    const totalRecipesText = recipes.length > 1 ? " recettes" : " recette";
    const recipesNumber =
        recipes.length === 0
            ? "Aucune"
            : recipes.length < 10
            ? "0" + recipes.length
            : recipes.length;
    totalRecipesNumber.textContent = recipesNumber + totalRecipesText;
}
