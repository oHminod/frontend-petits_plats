export function displayPopOver(target, text, duration = null) {
    const popOver = document.createElement("div");
    popOver.className =
        "absolute w-fit max-w-[300px] bg-white text-iconBlack text-sm p-4 rounded-[10px] z-50 shadow-md transition-opacity duration-300 ease-out hover:cursor-pointer";
    popOver.textContent = text;

    const rect = target.getBoundingClientRect();
    popOver.style.top = `${rect.top + window.scrollY - 40}px`;
    popOver.style.left = `${rect.left + window.scrollX + 20}px`;

    document.body.appendChild(popOver);

    let isClicked = false;
    function closePopOver(event) {
        event.stopPropagation();

        popOver.classList.add("opacity-0");
        popOver.addEventListener("transitionend", () => {
            document.body.removeChild(popOver);
            document.removeEventListener("click", closePopOver);
        });
        isClicked = true;
    }

    document.addEventListener("click", closePopOver);

    if (duration === null && typeof duration !== "number") return;

    setTimeout(() => {
        if (!isClicked) {
            popOver.classList.add("opacity-0");
            popOver.addEventListener("transitionend", () => {
                document.body.removeChild(popOver);
                document.removeEventListener("click", closePopOver);
            });
        }
    }, duration);
}
