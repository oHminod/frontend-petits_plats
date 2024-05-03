import { searchObject } from "../utils/searchObject.js";
import { createTagItem } from "./tagItemFactory.js";

let oldIngredientsTagsList = [];
let oldApplianceTagsList = [];
let oldUstensilsTagsList = [];
export function diplayTagsListsDOM() {
    const stringifiedOldIngredientsTagsList = JSON.stringify(
        oldIngredientsTagsList
    );
    const stringifiedOldApplianceTagsList =
        JSON.stringify(oldApplianceTagsList);
    const stringifiedOldUstensilsTagsList =
        JSON.stringify(oldUstensilsTagsList);
    const ingredientsTags = searchObject.ingredientTagsList;
    const strigifiedIngredientsTags = JSON.stringify(ingredientsTags);
    const applianceTags = searchObject.applianceTagsList;
    const stringifiedApplianceTags = JSON.stringify(applianceTags);
    const ustensilsTags = searchObject.ustensilsTagsList;
    const stringifiedUstensilsTags = JSON.stringify(ustensilsTags);

    const DOMIngredientsTagsList = document.getElementById(
        "ingredients_tags_list"
    );
    const DOMApplianceTagsList = document.getElementById("appliance_tags_list");
    const DOMUstensilsTagsList = document.getElementById("ustensils_tags_list");

    const needToRender =
        strigifiedIngredientsTags !== stringifiedOldIngredientsTagsList ||
        stringifiedApplianceTags !== stringifiedOldApplianceTagsList ||
        stringifiedUstensilsTags !== stringifiedOldUstensilsTagsList;

    if (needToRender) {
        DOMIngredientsTagsList.innerHTML = "";
        DOMApplianceTagsList.innerHTML = "";
        DOMUstensilsTagsList.innerHTML = "";

        ingredientsTags.forEach((ingredient) => {
            const ingredientTag = createTagItem(ingredient, "ingredient");

            DOMIngredientsTagsList.appendChild(ingredientTag);
        });

        applianceTags.forEach((appliance) => {
            const applianceTag = createTagItem(appliance, "appliance");

            DOMApplianceTagsList.appendChild(applianceTag);
        });

        ustensilsTags.forEach((ustensil) => {
            const ustensilTag = createTagItem(ustensil, "ustensil");

            DOMUstensilsTagsList.appendChild(ustensilTag);
        });
    }
    oldIngredientsTagsList = ingredientsTags;
    oldApplianceTagsList = applianceTags;
    oldUstensilsTagsList = ustensilsTags;
    return needToRender;
}

export function needToRender() {
    const ingredientsTags = searchObject.ingredientTagsList;
    const applianceTags = searchObject.applianceTagsList;
    const ustensilsTags = searchObject.ustensilsTagsList;
    const stringifiedOldIngredientsTagsList = JSON.stringify(
        oldIngredientsTagsList
    );
    const stringifiedOldApplianceTagsList =
        JSON.stringify(oldApplianceTagsList);
    const stringifiedOldUstensilsTagsList =
        JSON.stringify(oldUstensilsTagsList);
    const strigifiedIngredientsTags = JSON.stringify(ingredientsTags);
    const stringifiedApplianceTags = JSON.stringify(applianceTags);
    const stringifiedUstensilsTags = JSON.stringify(ustensilsTags);

    return (
        strigifiedIngredientsTags !== stringifiedOldIngredientsTagsList ||
        stringifiedApplianceTags !== stringifiedOldApplianceTagsList ||
        stringifiedUstensilsTags !== stringifiedOldUstensilsTagsList
    );
}
