import { searchObject } from "../utils/searchObject.js";
import { createSelectedTagDOM } from "./selectedTagFactory.js";
import { createTagItem } from "./tagItemFactory.js";

let oldIngredientsTagsList = [];
let oldApplianceTagsList = [];
let oldUstensilsTagsList = [];

function createAndAppendTags(tags, DOMElement, type) {
    tags.forEach((tag) => {
        const tagItem = createTagItem(tag, type);
        DOMElement.appendChild(tagItem);
    });
}

function addInputEventListener(
    inputElement,
    tags,
    DOMElement,
    clearButton,
    type
) {
    inputElement.addEventListener("input", (event) => {
        const filteredTags = tags.filter((tag) =>
            tag.toLowerCase().includes(event.target.value.toLowerCase())
        );

        DOMElement.innerHTML = "";
        createAndAppendTags(filteredTags, DOMElement, type);

        if (event.target.value.length > 0)
            clearButton.classList.remove("hidden");
    });
}

function addClearButtonEventListener(
    clearButton,
    inputElement,
    tags,
    DOMElement,
    type
) {
    clearButton.addEventListener("click", () => {
        inputElement.value = "";
        DOMElement.innerHTML = "";
        createAndAppendTags(tags, DOMElement, type);
        clearButton.classList.add("hidden");
    });
}

export function diplayTagsListsDOM() {
    const ingredientsTags = Array.from(searchObject.ingredientTagsList);
    const applianceTags = Array.from(searchObject.applianceTagsList);
    const ustensilsTags = Array.from(searchObject.ustensilsTagsList);

    const DOMIngredientsTagsList = document.getElementById(
        "ingredients_tags_list"
    );
    const DOMApplianceTagsList = document.getElementById("appliance_tags_list");
    const DOMUstensilsTagsList = document.getElementById("ustensils_tags_list");

    const needToRender =
        JSON.stringify(ingredientsTags) !==
            JSON.stringify(oldIngredientsTagsList) ||
        JSON.stringify(applianceTags) !==
            JSON.stringify(oldApplianceTagsList) ||
        JSON.stringify(ustensilsTags) !== JSON.stringify(oldUstensilsTagsList);

    if (needToRender) {
        DOMIngredientsTagsList.innerHTML = "";
        DOMApplianceTagsList.innerHTML = "";
        DOMUstensilsTagsList.innerHTML = "";

        createAndAppendTags(
            ingredientsTags,
            DOMIngredientsTagsList,
            "ingredient"
        );
        createAndAppendTags(applianceTags, DOMApplianceTagsList, "appliance");
        createAndAppendTags(ustensilsTags, DOMUstensilsTagsList, "ustensil");
    }

    addInputEventListener(
        document.getElementById("filter_ingredients_input"),
        ingredientsTags,
        DOMIngredientsTagsList,
        document.getElementById("clear_ingredient_tag_input"),
        "ingredient"
    );

    addClearButtonEventListener(
        document.getElementById("clear_ingredient_tag_input"),
        document.getElementById("filter_ingredients_input"),
        ingredientsTags,
        DOMIngredientsTagsList,
        "ingredient"
    );

    addInputEventListener(
        document.getElementById("filter_appliance_input"),
        applianceTags,
        DOMApplianceTagsList,
        document.getElementById("clear_appliance_tag_input"),
        "appliance"
    );

    addClearButtonEventListener(
        document.getElementById("clear_appliance_tag_input"),
        document.getElementById("filter_appliance_input"),
        applianceTags,
        DOMApplianceTagsList,
        "appliance"
    );

    addInputEventListener(
        document.getElementById("filter_ustensils_input"),
        ustensilsTags,
        DOMUstensilsTagsList,
        document.getElementById("clear_ustensils_tag_input"),
        "ustensil"
    );

    addClearButtonEventListener(
        document.getElementById("clear_ustensils_tag_input"),
        document.getElementById("filter_ustensils_input"),
        ustensilsTags,
        DOMUstensilsTagsList
    );

    oldIngredientsTagsList = ingredientsTags;
    oldApplianceTagsList = applianceTags;
    oldUstensilsTagsList = ustensilsTags;
    return needToRender;
}

export function displaySelectedTags() {
    const tagsSection = document.getElementById("selected_tags_section");
    const tagSectionContainer = document.createElement("div");
    tagSectionContainer.className =
        "flex flex-wrap gap-6 items-center px-[102px] pt-[13px]";
    const selectedTags = Array.from(searchObject.selectedTabs);

    tagsSection.innerHTML = "";
    if (selectedTags.length === 0) return;

    selectedTags.forEach((tag) => {
        const tagItem = createSelectedTagDOM(tag);

        tagSectionContainer.appendChild(tagItem);
    });

    tagsSection.appendChild(tagSectionContainer);
}
