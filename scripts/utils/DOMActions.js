import { displayRecipesAndTagsLists } from "../components/cardsSection.js";
import { displaySelectedTags } from "../components/tagsLists.js";
import { searchObject } from "./searchObject.js";

export function setupSearchFieldListener() {
    const DOMSearchField = document.getElementById("search_field");

    let dedupInput = null;

    DOMSearchField.addEventListener("input", () => {
        clearTimeout(dedupInput);

        searchObject.setSearchField(DOMSearchField.value.toLowerCase());
        toggleSearchIcon(DOMSearchField.value.length >= 3);

        toggleSearfieldResetButton();

        dedupInput = setTimeout(() => {
            if (DOMSearchField.value.length >= 3) {
                displayRecipesAndTagsLists();

                return;
            }

            searchObject.setSearchField("");
            displayRecipesAndTagsLists();
        }, 500);
    });

    const resetSearchFieldButton = document.getElementById("reset_searchfield");

    resetSearchFieldButton.addEventListener("click", resetSearchField);
}

export function setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
}

function handleReset() {
    const searchButton = document.getElementById("search_button");
    const iconPart1 = document.getElementById("icon_part1");
    const iconPart2 = document.getElementById("icon_part2");

    const searchField = document.getElementById("search_field");
    const filterIngredientsInput = document.getElementById(
        "filter_ingredients_input"
    );
    const filterApplianceInput = document.getElementById(
        "filter_appliance_input"
    );
    const filterUstensilsInput = document.getElementById(
        "filter_ustensils_input"
    );
    const clearIngredientsInputButton = document.getElementById(
        "clear_ingredient_tag_input"
    );
    const clearApplianceInputButton = document.getElementById(
        "clear_appliance_tag_input"
    );
    const clearUstensilsInputButton = document.getElementById(
        "clear_ustensils_tag_input"
    );
    const ingredientList = document.getElementById("ingredients_list");
    const applianceList = document.getElementById("appliance_list");
    const ustensilsList = document.getElementById("ustensils_list");
    const clearSearchfieldBtn = document.getElementById("reset_searchfield");

    if (clearSearchfieldBtn.classList.contains("flex")) {
        clearSearchfieldBtn.classList.remove("flex");
        clearSearchfieldBtn.classList.add("hidden");
    }

    searchObject.reset();
    searchField.value = "";
    filterIngredientsInput.value = "";
    filterApplianceInput.value = "";
    filterUstensilsInput.value = "";
    clearIngredientsInputButton.classList.add("hidden");
    clearApplianceInputButton.classList.add("hidden");
    clearUstensilsInputButton.classList.add("hidden");
    ingredientList.classList.add("hidden");
    applianceList.classList.add("hidden");
    ustensilsList.classList.add("hidden");
    displayRecipesAndTagsLists();
    displaySelectedTags();
    searchButton.classList.remove("bg-primary");
    searchButton.classList.add("bg-iconBlack");
    iconPart1.setAttribute("stroke", "white");
    iconPart2.setAttribute("stroke", "white");
}

export function toggleSearchIcon(searching) {
    const searchButton = document.getElementById("search_button");
    const iconPart1 = document.getElementById("icon_part1");
    const iconPart2 = document.getElementById("icon_part2");

    if (searching) {
        searchButton.classList.remove("bg-iconBlack");
        searchButton.classList.add("bg-primary");
        iconPart1.setAttribute("stroke", "black");
        iconPart2.setAttribute("stroke", "black");
        searchButton.addEventListener("click", handleReset);
    } else if (
        searchObject.searchField.length <= 3 &&
        searchObject.selectedTabs.size === 0
    ) {
        searchButton.classList.remove("bg-primary");
        searchButton.classList.add("bg-iconBlack");
        iconPart1.setAttribute("stroke", "white");
        iconPart2.setAttribute("stroke", "white");
        searchButton.removeEventListener("click", handleReset);
    }
}

function toggleSearfieldResetButton() {
    const searchField = document.getElementById("search_field");
    const searchFieldResetButton = document.getElementById("reset_searchfield");

    if (searchField.value.length > 0) {
        searchFieldResetButton.classList.remove("hidden");
        searchFieldResetButton.classList.add("flex");
        return;
    }

    searchFieldResetButton.classList.remove("flex");
    searchFieldResetButton.classList.add("hidden");
}

function resetSearchField() {
    const searchField = document.getElementById("search_field");
    searchField.value = "";
    searchObject.setSearchField("");
    displayRecipesAndTagsLists();

    const searchFieldResetButton = document.getElementById("reset_searchfield");
    searchFieldResetButton.classList.remove("flex");
    searchFieldResetButton.classList.add("hidden");

    toggleSearchIcon(false);
}

export function closeLists() {
    const ingredientsList = document.getElementById("ingredients_list");
    const applianceList = document.getElementById("appliance_list");
    const ustensilsList = document.getElementById("ustensils_list");

    ingredientsList.classList.add("hidden");
    applianceList.classList.add("hidden");
    ustensilsList.classList.add("hidden");
}

function toggleIngredientsList() {
    const ingredientsList = document.getElementById("ingredients_list");
    const ingredientsListIsHidden =
        ingredientsList.classList.contains("hidden");

    if (ingredientsListIsHidden) {
        ingredientsList.classList.remove("hidden");
        return;
    } else {
        ingredientsList.classList.add("hidden");
    }
}

function toggleAppliancesList() {
    const applianceList = document.getElementById("appliance_list");
    const appliancesListIsHidden = applianceList.classList.contains("hidden");

    if (appliancesListIsHidden) {
        applianceList.classList.remove("hidden");
        return;
    } else {
        applianceList.classList.add("hidden");
    }
}

function toggleUstensilsList() {
    const ustensilsList = document.getElementById("ustensils_list");
    const ustensilsListIsHidden = ustensilsList.classList.contains("hidden");

    if (ustensilsListIsHidden) {
        ustensilsList.classList.remove("hidden");
        return;
    } else {
        ustensilsList.classList.add("hidden");
    }
}

export function setupListEventHandlers() {
    const ingredientsListtrigger = document.getElementById(
        "trigger_ingredtients_list"
    );
    const applianceListtrigger = document.getElementById(
        "trigger_appliance_list"
    );
    const ustensilsListtrigger = document.getElementById(
        "trigger_ustensils_list"
    );
    const closeIngredientsListTrigger = document.getElementById(
        "close_ingredients_trigger"
    );
    const closeApplianceListTrigger = document.getElementById(
        "close_appliance_trigger"
    );
    const closeUstensilsListTrigger = document.getElementById(
        "close_ustensils_trigger"
    );

    const ingredientsList = document.getElementById("ingredients_list");
    const applianceList = document.getElementById("appliance_list");
    const ustensilsList = document.getElementById("ustensils_list");

    const triggers = [
        ingredientsListtrigger,
        applianceListtrigger,
        ustensilsListtrigger,
        closeIngredientsListTrigger,
        closeApplianceListTrigger,
        closeUstensilsListTrigger,
    ];
    const lists = [ingredientsList, applianceList, ustensilsList];

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    lists.forEach((list) => {
        list.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    document.addEventListener("click", closeLists);

    ingredientsListtrigger.addEventListener("click", toggleIngredientsList);
    applianceListtrigger.addEventListener("click", toggleAppliancesList);
    ustensilsListtrigger.addEventListener("click", toggleUstensilsList);
    closeIngredientsListTrigger.addEventListener(
        "click",
        toggleIngredientsList
    );
    closeApplianceListTrigger.addEventListener("click", toggleAppliancesList);
    closeUstensilsListTrigger.addEventListener("click", toggleUstensilsList);
}
