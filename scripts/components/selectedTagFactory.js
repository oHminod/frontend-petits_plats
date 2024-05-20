import { setAttributes } from "../utils/DOMActions.js";
import { searchObject } from "../utils/searchObject.js";
import { displayRecipesAndTagsLists } from "./cardsSection.js";
import { displaySelectedTags } from "./tagsLists.js";

export function createSelectedTagDOM(tag) {
    const tagType = tag.split("--")[0];
    tag = tag.split("--")[1];
    const tagDiv = document.createElement("div");
    tagDiv.className =
        "flex items-center gap-14 bg-primary text-black text-sm rounded-[10px] h-[53px] px-[18px] py-2";
    const tagSpan = document.createElement("span");
    const tagWithUpperFirstLetter = tag.charAt(0).toUpperCase() + tag.slice(1);
    tagSpan.textContent = tagWithUpperFirstLetter;
    tagDiv.appendChild(tagSpan);

    const closeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    setAttributes(closeIcon, {
        class: "h-[14px] w-[14px] hover:cursor-pointer",
        fill: "none",
        viewBox: "0 0 14 13",
        height: "13",
        width: "14",
        xmlns: "http://www.w3.org/2000/svg",
    });

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    setAttributes(path, {
        fill: "none",
        stroke: "#1B1B1B",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2.16667",
        d: "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5",
    });

    closeIcon.appendChild(path);
    tagDiv.appendChild(closeIcon);

    closeIcon.addEventListener("click", () => {
        searchObject.removeSelectedTag(tag, tagType);
        displayRecipesAndTagsLists();
        displaySelectedTags();
    });

    return tagDiv;
}
