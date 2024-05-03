export function toggleSearchIcon(searching) {
    const searchButton = document.getElementById("search_button");
    const iconPart1 = document.getElementById("icon_part1");
    const iconPart2 = document.getElementById("icon_part2");

    if (searching) {
        searchButton.classList.remove("bg-iconBlack");
        searchButton.classList.add("bg-primary");
        iconPart1.setAttribute("stroke", "black");
        iconPart2.setAttribute("stroke", "black");
    } else {
        searchButton.classList.remove("bg-primary");
        searchButton.classList.add("bg-iconBlack");
        iconPart1.setAttribute("stroke", "white");
        iconPart2.setAttribute("stroke", "white");
    }
}
