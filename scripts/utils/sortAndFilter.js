import { recipes } from "../../data/recipes.js";
import { searchObject } from "./searchObject.js";

export function getFilteredRecipes() {
    const ingredientTags = searchObject.ingredientTags;
    const applianceTags = searchObject.applianceTags;
    const ustensilsTags = searchObject.ustensilsTags;
    const searchField = searchObject.searchField;
    console.log(ingredientTags);

    const result = recipes.filter((recipe) =>
        filterRecipe(
            recipe,
            ingredientTags,
            applianceTags,
            ustensilsTags,
            searchField
        )
    );

    return result;
}

function filterRecipe(
    recipe,
    ingredientTags,
    applianceTags,
    ustensilsTags,
    searchField
) {
    const ingredients = getLowerCaseItems(recipe.ingredients, "ingredient");
    const appliances = [recipe.appliance.toLowerCase()];
    const ustensils = getLowerCaseItems(recipe.ustensils);
    const name = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();

    const isTagFiltered =
        checkTags(ingredientTags, ingredients) &&
        checkTags(applianceTags, appliances) &&
        checkTags(ustensilsTags, ustensils);

    const isSearchFiltered = checkSearchField(
        searchField,
        name,
        description,
        ingredients
        // appliances,
        // ustensils
    );

    // if (!isSearchFiltered) return isTagFiltered;
    return isTagFiltered && isSearchFiltered;
}

function getLowerCaseItems(items, property = "") {
    return items.map((item) =>
        property ? item[property].toLowerCase() : item.toLowerCase()
    );
}

function checkTags(tags, items) {
    return tags.every((tag) => items.some((item) => item.includes(tag)));
}

function checkSearchField(
    searchField,
    name,
    description,
    ingredients
    // appliances,
    // ustensils
) {
    return (
        searchField.trim() === "" ||
        name.includes(searchField) ||
        description.includes(searchField) ||
        ingredients.some((ingredient) => ingredient.includes(searchField)) ||
        ingredients.some((ingredient) => ingredient.includes(searchField)) //||
        // appliances.some((appliance) => appliance.includes(searchField)) ||
        // ustensils.some((ustensil) => ustensil.includes(searchField))
    );
}
