import { displayRecipesAndTagsLists } from "./scripts/components/cardsSection.js";
import {
    setupListEventHandlers,
    toggleSearchIcon,
} from "./scripts/utils/DOMActions.js";
import { searchObject } from "./scripts/utils/searchObject.js";

displayRecipesAndTagsLists();
setupListEventHandlers();

const DOMSearchField = document.getElementById("search_field");

let dedupInput = null;

DOMSearchField.addEventListener("input", () => {
    clearTimeout(dedupInput);

    toggleSearchIcon(DOMSearchField.value.length >= 3);

    dedupInput = setTimeout(() => {
        if (DOMSearchField.value.length >= 3) {
            searchObject.setSearchField(DOMSearchField.value.toLowerCase());
            displayRecipesAndTagsLists();

            return;
        }

        searchObject.setSearchField("");
        displayRecipesAndTagsLists();
    }, 500);
});
