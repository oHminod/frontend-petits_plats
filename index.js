import { displayRecipes } from "./scripts/components/cardsSection.js";
import { diplayTagsListsDOM } from "./scripts/components/tagsLists.js";
import { manageLists, toggleSearchIcon } from "./scripts/utils/DOMActions.js";
import { searchObject } from "./scripts/utils/searchObject.js";
import { getFilteredRecipes } from "./scripts/utils/sortAndFilter.js";

searchObject.setTagsLists();
const recipes = getFilteredRecipes();
displayRecipes(recipes);
diplayTagsListsDOM();
manageLists();

const DOMSearchField = document.getElementById("search_field");

let dedupInput = null;

DOMSearchField.addEventListener("input", () => {
    clearTimeout(dedupInput);

    dedupInput = setTimeout(() => {
        toggleSearchIcon(DOMSearchField.value.length >= 3);

        if (DOMSearchField.value.length >= 3) {
            searchObject.setSearchField(DOMSearchField.value);
            searchObject.setTagsLists();
            diplayTagsListsDOM();
            const filteredRecipes = getFilteredRecipes();
            displayRecipes(filteredRecipes);
            return;
        }

        searchObject.setSearchField("");
        searchObject.setTagsLists();
        diplayTagsListsDOM();
        const filteredRecipes = getFilteredRecipes();
        displayRecipes(filteredRecipes);
    }, 500);
});
