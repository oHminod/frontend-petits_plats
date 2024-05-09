import { searchObject } from "../utils/searchObject.js";
import { createRecipeCard } from "./cardFactory.js";
import { diplayTagsListsDOM } from "./tagsLists.js";

let oldRecipes = [];

export function displayRecipesAndTagsLists() {
    displayRecipes();
    searchObject.setTagsLists();
    const needToRender = diplayTagsListsDOM();

    return needToRender;
}

export function displayRecipes() {
    const getFilteredRecipes = searchObject.getFilteredRecipes;
    const recipes = getFilteredRecipes();
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
