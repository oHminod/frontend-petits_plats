import { displayRecipesAndTagsLists } from "./scripts/components/cardsSection.js";
import {
    setupListEventHandlers,
    setupSearchFieldListener,
} from "./scripts/utils/DOMActions.js";

displayRecipesAndTagsLists();
setupListEventHandlers();
setupSearchFieldListener();
