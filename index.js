import { displayRecipes } from "./scripts/components/cardsSection.js";
import { diplayTagsListsDOM } from "./scripts/components/tagsLists.js";
import {
    closeLists,
    manageLists,
    toggleSearchIcon,
} from "./scripts/utils/DOMActions.js";
import { searchObject } from "./scripts/utils/searchObject.js";

displayRecipes();
searchObject.setTagsLists();
diplayTagsListsDOM();
manageLists();

const DOMSearchField = document.getElementById("search_field");

let dedupInput = null;

DOMSearchField.addEventListener("input", () => {
    clearTimeout(dedupInput);

    dedupInput = setTimeout(() => {
        toggleSearchIcon(DOMSearchField.value.length >= 3);

        if (DOMSearchField.value.length >= 3) {
            searchObject.setSearchField(DOMSearchField.value.toLowerCase());
            displayRecipes();
            searchObject.setTagsLists();
            diplayTagsListsDOM();
            return;
        }

        searchObject.setSearchField("");
        displayRecipes();
        searchObject.setTagsLists();
        diplayTagsListsDOM();
    }, 500);
});
