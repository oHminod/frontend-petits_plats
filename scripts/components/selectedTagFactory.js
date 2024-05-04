import { searchObject } from "../utils/searchObject.js";
import { displayRecipes } from "./cardsSection.js";
import { diplayTagsListsDOM, displaySelectedTags } from "./tagsLists.js";

export function createSelectedTagDOM(tag) {
    const tagDiv = document.createElement("div");
    tagDiv.className =
        "flex items-center gap-14 bg-primary text-black text-sm rounded-[10px] h-14 px-[18px] py-2";
    const tagSpan = document.createElement("span");
    const tagWithUpperFirstLetter = tag.charAt(0).toUpperCase() + tag.slice(1);
    tagSpan.textContent = tagWithUpperFirstLetter;
    tagDiv.appendChild(tagSpan);

    const closeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    closeIcon.setAttribute("class", "h-[14px] w-[14px] hover:cursor-pointer");
    closeIcon.setAttribute("fill", "none");
    closeIcon.setAttribute("viewBox", "0 0 14 13");
    closeIcon.setAttribute("height", "13");
    closeIcon.setAttribute("width", "14");
    closeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "#1B1B1B");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2.16667");
    path.setAttribute(
        "d",
        "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
    );
    closeIcon.appendChild(path);
    tagDiv.appendChild(closeIcon);

    closeIcon.addEventListener("click", () => {
        searchObject.removeSelectedTag(tag);
        searchObject.setTagsLists();
        diplayTagsListsDOM();
        displayRecipes();
        displaySelectedTags();
    });

    return tagDiv;
}
