import { searchObject } from "../utils/searchObject.js";
import { getFilteredRecipes } from "../utils/sortAndFilter.js";
import { displayRecipes } from "./cardsSection.js";
import { diplayTagsListsDOM, displaySelectedTags } from "./tagsLists.js";

export function createTagItem(tag, type) {
    const tagLi = document.createElement("li");
    tagLi.className =
        "flex items-center justify-between text-iconBlack text-sm w-full py-[6px] px-5 pr-10 hover:cursor-pointer hover:bg-primary relative";
    tagLi.textContent = tag;
    const closeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    closeIcon.setAttribute("class", "absolute right-4 z-50 h-[17px] w-[17px]");
    closeIcon.classList.add("hidden");

    closeIcon.setAttribute("width", "17");
    closeIcon.setAttribute("height", "17");
    closeIcon.setAttribute("viewBox", "0 0 17 17");
    closeIcon.setAttribute("fill", "none");
    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );
    circle.setAttribute("cx", "8.5");
    circle.setAttribute("cy", "8.5");
    circle.setAttribute("r", "8.5");
    circle.setAttribute("fill", "#000000");
    closeIcon.appendChild(circle);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "#FFD15B");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute(
        "d",
        "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
    );

    closeIcon.appendChild(path);
    tagLi.appendChild(closeIcon);

    if (type === "ingredient") {
        tagLi.addEventListener("click", (e) => {
            if (!searchObject.ingredientTags.includes(tag.toLowerCase())) {
                searchObject.addIngredientTag(tag);
                const noNeedRender = !handlestaticEvents();
                if (noNeedRender) searchObject.removeIngredientTag(tag);
                if (!noNeedRender) displaySelectedTags();
            }
            e.stopPropagation();
        });
        if (searchObject.ingredientTags.includes(tag.toLowerCase())) {
            tagLi.addEventListener("mouseenter", () => {
                closeIcon.classList.remove("hidden");
            });
            tagLi.addEventListener("mouseleave", () => {
                closeIcon.classList.add("hidden");
            });
            closeIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                searchObject.removeIngredientTag(tag.toLowerCase());
                handlestaticEvents();
                displaySelectedTags();
            });
        }
    }

    if (type === "appliance") {
        tagLi.addEventListener("click", () => {
            if (!searchObject.applianceTags.includes(tag.toLowerCase())) {
                searchObject.addApplianceTag(tag);
                const noNeedRender = !handlestaticEvents();
                if (noNeedRender) searchObject.removeApplianceTag(tag);
                if (!noNeedRender) displaySelectedTags();
            }
        });
        if (searchObject.applianceTags.includes(tag.toLowerCase())) {
            tagLi.addEventListener("mouseenter", () => {
                closeIcon.classList.remove("hidden");
            });
            tagLi.addEventListener("mouseleave", () => {
                closeIcon.classList.add("hidden");
            });
            closeIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                searchObject.removeApplianceTag(tag.toLowerCase());
                handlestaticEvents();
                displaySelectedTags();
            });
        }
    }

    if (type === "ustensil") {
        tagLi.addEventListener("click", () => {
            if (!searchObject.ustensilsTags.includes(tag.toLowerCase())) {
                searchObject.addUstensilsTag(tag);
                const noNeedRender = !handlestaticEvents();
                if (noNeedRender) searchObject.removeUstensilsTag(tag);
                if (!noNeedRender) displaySelectedTags();
            }
        });
        if (searchObject.ustensilsTags.includes(tag.toLowerCase())) {
            tagLi.addEventListener("mouseenter", () => {
                closeIcon.classList.remove("hidden");
            });
            tagLi.addEventListener("mouseleave", () => {
                closeIcon.classList.add("hidden");
            });
            closeIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                searchObject.removeUstensilsTag(tag.toLowerCase());
                handlestaticEvents();
                displaySelectedTags();
            });
        }
    }

    return tagLi;
}

function handlestaticEvents() {
    searchObject.setTagsLists();
    const needToRender = diplayTagsListsDOM();
    const filteredRecipes = getFilteredRecipes();
    displayRecipes(filteredRecipes);

    return needToRender;
}
