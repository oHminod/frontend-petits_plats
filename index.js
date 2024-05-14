import { displayRecipesAndTagsLists } from "./scripts/components/cardsSection.js";
import {
    setupListEventHandlers,
    setupSearchFieldListener,
} from "./scripts/utils/DOMActions.js";
import { searchObject } from "./scripts/utils/searchObject.js";

searchObject.getFilteredRecipes();

displayRecipesAndTagsLists();
setupListEventHandlers();
setupSearchFieldListener();
