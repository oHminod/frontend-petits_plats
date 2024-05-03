export function createTagItem(tag) {
    const tagLi = document.createElement("li");
    tagLi.className =
        "flex items-center justify-between text-iconBlack text-sm w-full py-[6px] px-5 pr-10 hover:cursor-pointer hover:bg-primary relative";
    tagLi.textContent = tag;
    const closeIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    closeIcon.setAttribute("class", "absolute right-4 z-50 h-[17px] w-[17px]");
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

    return tagLi;
}
