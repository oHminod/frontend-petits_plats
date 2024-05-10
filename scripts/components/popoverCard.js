export function displayPopOver(target, text, duration = null) {
    const popOver = document.createElement("div");
    popOver.className =
        "absolute w-fit max-w-[70vw] bg-white text-iconBlack text-sm p-4 rounded-[10px] z-50 shadow-md transition-opacity duration-300 ease-out";
    popOver.textContent = text;

    // Get the position of the target element in relation to the viewport
    const rect = target.getBoundingClientRect();
    popOver.style.top = `${rect.top + window.scrollY - 40}px`;
    popOver.style.left = `${rect.left + window.scrollX + 20}px`;

    document.body.appendChild(popOver);

    // Close the pop-over when clicking outside of it
    let isClickedOutside = false;
    document.addEventListener("click", function closePopOver(event) {
        if (!popOver.contains(event.target)) {
            popOver.classList.add("opacity-0");
            popOver.addEventListener("transitionend", () => {
                document.body.removeChild(popOver);
                document.removeEventListener("click", closePopOver); // Remove the event listener
            });
            isClickedOutside = true;
        }
    });

    if (duration === null && typeof duration !== "number" && !isClickedOutside)
        return;
    console.log("duration", duration);
    setTimeout(() => {
        popOver.classList.add("opacity-0");
        popOver.addEventListener("transitionend", () => {
            document.body.removeChild(popOver);
        });
    }, duration);
}
