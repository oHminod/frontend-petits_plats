import { setAttributes } from "../utils/DOMActions.js";
import { searchObject } from "../utils/searchObject.js";
import { displayRecipesAndTagsLists } from "./cardsSection.js";
import { displayPopOver } from "./popoverCard.js";
import { displaySelectedTags } from "./tagsLists.js";

export function createTagItem(tag, type) {
    const tagLi = document.createElement("li");
    tagLi.className =
        "flex items-center justify-between text-iconBlack text-sm w-full py-[6px] px-5 pr-10 hover:cursor-pointer hover:bg-primary relative";
    tagLi.textContent = tag;

    const closeIcon = createCloseIcon();
    tagLi.appendChild(closeIcon);

    const typeMethods = {
        ingredient: {
            addMethod: "addIngredientTag",
            removeMethod: "removeIngredientTag",
            tagsMethod: "ingredientTags",
        },
        appliance: {
            addMethod: "addApplianceTag",
            removeMethod: "removeApplianceTag",
            tagsMethod: "applianceTags",
        },
        ustensil: {
            addMethod: "addUstensilsTag",
            removeMethod: "removeUstensilsTag",
            tagsMethod: "ustensilsTags",
        },
    };

    if (typeMethods[type]) {
        handleTagClick(tagLi, tag, typeMethods[type]);
        handleMouseEvents(tagLi, closeIcon, tag, typeMethods[type]);
    }

    return tagLi;
}

function createCloseIcon() {
    const closeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    setAttributes(closeIcon, {
        class: "absolute right-4 z-30 h-[17px] w-[17px] hidden",
        fill: "none",
        viewBox: "0 0 17 17",
        height: "17",
        width: "17",
    });

    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    setAttributes(circle, {
        cx: "8.5",
        cy: "8.5",
        r: "8.5",
        fill: "#000000",
    });

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    setAttributes(path, {
        stroke: "#FFD15B",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11",
    });

    closeIcon.appendChild(circle);
    closeIcon.appendChild(path);

    return closeIcon;
}

function listInputElement(addMethod) {
    const ingredientsInput = document.getElementById(
        "filter_ingredients_input"
    );
    const ingredientsInputClearBtn = document.getElementById(
        "clear_ingredient_tag_input"
    );
    const applianceInput = document.getElementById("filter_appliance_input");
    const applianceInputClearBtn = document.getElementById(
        "clear_appliance_tag_input"
    );
    const ustensilsInput = document.getElementById("filter_ustensils_input");
    const ustensilsInputClearBtn = document.getElementById(
        "clear_ustensils_tag_input"
    );

    if (addMethod === "addIngredientTag") {
        return [ingredientsInput, ingredientsInputClearBtn];
    }

    if (addMethod === "addApplianceTag") {
        return [applianceInput, applianceInputClearBtn];
    }

    if (addMethod === "addUstensilsTag") {
        return [ustensilsInput, ustensilsInputClearBtn];
    }
}

function handleTagClick(tagLi, tag, { addMethod, removeMethod, tagsMethod }) {
    tagLi.addEventListener("click", (e) => {
        if (!searchObject[tagsMethod].has(tag.toLowerCase())) {
            const needRender = searchObject.allRecipesContainTag(
                tag,
                removeMethod
            );

            if (!needRender) {
                displayPopOver(
                    tagLi,
                    "Ce tag est déjà présent dans toutes les recettes affichées",
                    2000
                );
            }

            if (needRender) {
                searchObject[addMethod](tag);
                displayRecipesAndTagsLists();
                displaySelectedTags();
                const [input, clearBtn] = listInputElement(addMethod);
                input.value = "";
                clearBtn.classList.add("hidden");
            }
        }
        e.stopPropagation();
    });
}

function handleMouseEvents(
    tagLi,
    closeIcon,
    tag,
    { removeMethod, tagsMethod }
) {
    if (searchObject[tagsMethod].has(tag.toLowerCase())) {
        tagLi.addEventListener("mouseenter", () => {
            closeIcon.classList.remove("hidden");
        });
        tagLi.addEventListener("mouseleave", () => {
            closeIcon.classList.add("hidden");
        });
        handleCloseIconClick(closeIcon, tag, removeMethod);
    }
}

function handleCloseIconClick(closeIcon, tag, removeMethod) {
    closeIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        searchObject[removeMethod](tag.toLowerCase());
        displayRecipesAndTagsLists();
        displaySelectedTags();
    });
}
