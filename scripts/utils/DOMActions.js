import { displayRecipes } from "../components/cardsSection.js";
import {
    diplayTagsListsDOM,
    displaySelectedTags,
} from "../components/tagsLists.js";
import { searchObject } from "./searchObject.js";
import { getFilteredRecipes } from "./sortAndFilter.js";

export function toggleSearchIcon(searching) {
    const searchButton = document.getElementById("search_button");
    const iconPart1 = document.getElementById("icon_part1");
    const iconPart2 = document.getElementById("icon_part2");
    const searchField = document.getElementById("search_field");

    function handleReset() {
        searchObject.reset();
        searchField.value = "";
        const recipes = getFilteredRecipes();
        diplayTagsListsDOM();
        displaySelectedTags();
        displayRecipes(recipes);
        searchButton.classList.remove("bg-primary");
        searchButton.classList.add("bg-iconBlack");
        iconPart1.setAttribute("stroke", "white");
        iconPart2.setAttribute("stroke", "white");
    }

    if (searching) {
        searchButton.classList.remove("bg-iconBlack");
        searchButton.classList.add("bg-primary");
        iconPart1.setAttribute("stroke", "black");
        iconPart2.setAttribute("stroke", "black");
        searchButton.addEventListener("click", handleReset);
    } else {
        searchButton.classList.remove("bg-primary");
        searchButton.classList.add("bg-iconBlack");
        iconPart1.setAttribute("stroke", "white");
        iconPart2.setAttribute("stroke", "white");
        searchButton.removeEventListener("click", handleReset);
    }
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

export function manageLists() {
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
