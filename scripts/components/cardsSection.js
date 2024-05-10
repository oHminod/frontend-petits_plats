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

    const searchField = searchObject.searchField;
    const selectedTags = searchObject.selectedTabs;
    const moreThanOneRecipeIsFound = recipes.length > 1;
    const oneRecipeFound = recipes.length === 1;
    const tagsAreSelected = selectedTags.size > 0;

    let stringOfTags = "";

    if (tagsAreSelected) {
        if (selectedTags.size > 1) {
            const selectedTagsArray = Array.from(selectedTags);
            const allButLast = selectedTagsArray.slice(
                0,
                selectedTagsArray.length - 1
            );
            const last = selectedTagsArray[selectedTagsArray.length - 1];
            stringOfTags = allButLast.join(", ") + " et " + last;
        } else {
            stringOfTags = selectedTags[0];
        }
    }

    const totalRecipesText = moreThanOneRecipeIsFound
        ? " recettes"
        : oneRecipeFound
        ? " recette"
        : tagsAreSelected
        ? ' recette ne contient "' +
          searchField +
          '" avec "' +
          stringOfTags +
          '"'
        : ' recette ne contient "' + searchField + '"';

    const recipesNumber =
        recipes.length === 0
            ? "Aucune"
            : recipes.length < 10
            ? "0" + recipes.length
            : recipes.length;

    totalRecipesNumber.textContent = recipesNumber + totalRecipesText;
}
