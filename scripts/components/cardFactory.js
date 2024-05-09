import { setAttributes } from "../utils/DOMActions.js";

function createImage(recipe) {
    const image = document.createElement("img");

    setAttributes(image, {
        src: "assets/images/" + recipe.image,
        class: "rounded-t-3xl h-64 w-full object-cover flex",
        alt: "Image de " + recipe.name,
    });

    return image;
}

function createTitle(recipe) {
    const title = document.createElement("h2");
    title.className = "font-anton font-normal text-lg text-black";
    title.textContent = recipe.name;

    return title;
}

function createRecipeContent(recipe) {
    const recetteContent = document.createElement("div");
    recetteContent.className = "pt-[29px]";
    const titreRecette = document.createElement("h3");
    titreRecette.className =
        "text-greytext font-bold text-xs tracking-[.064rem] mb-[15px]";
    titreRecette.textContent = "RECETTE";
    const descriptionRecette = document.createElement("p");
    descriptionRecette.className =
        "text-sm font-normal text-black line-clamp-4";
    descriptionRecette.textContent = recipe.description;

    recetteContent.appendChild(titreRecette);
    recetteContent.appendChild(descriptionRecette);

    return recetteContent;
}

function createIngredientsContent(recipe) {
    const ingredientsContent = document.createElement("div");
    ingredientsContent.className = "pt-[32px]";

    const titreIngredients = document.createElement("h3");
    titreIngredients.className =
        "text-greytext font-bold text-xs tracking-[.064rem] mb-[15px]";
    titreIngredients.textContent = "INGRÉDIENTS";

    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.className =
        "flex flex-wrap max-h-[164px] gap-y-[21px] overflow-y-scroll";

    recipe.ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement("div");
        ingredientItem.className = "w-1/2";
        const ingredientName = document.createElement("h4");
        ingredientName.className = "text-sm text-iconBlack font-medium";
        ingredientName.textContent = ingredient.ingredient;
        const ingredientQuantity = document.createElement("p");
        ingredientQuantity.className = "text-sm text-greytext font-normal";
        const isUnitMeasure = ingredient.unit
            ? ingredient.unit.length <= 2
            : false;
        const quantityTextContent = isUnitMeasure
            ? ingredient.quantity + ingredient.unit
            : ingredient.quantity + " " + ingredient.unit;
        ingredientQuantity.textContent = ingredient.unit
            ? quantityTextContent
            : ingredient.quantity;

        ingredientItem.appendChild(ingredientName);
        ingredientItem.appendChild(ingredientQuantity);
        ingredientsWrapper.appendChild(ingredientItem);
    });

    ingredientsContent.appendChild(titreIngredients);
    ingredientsContent.appendChild(ingredientsWrapper);

    return ingredientsContent;
}

function createDuration(recipe) {
    const durationFloat = document.createElement("div");
    durationFloat.className = "flex absolute top-[21px] right-[22px]";
    const duration = document.createElement("p");
    duration.className =
        "bg-primary rounded-[14px] flex items-center justify-center h-[26px] w-[63px] text-iconBlack text-xs";
    duration.textContent = recipe.time + "min";

    durationFloat.appendChild(duration);

    return durationFloat;
}

export const createRecipeCard = (recipe) => {
    const card = document.createElement("article");

    setAttributes(card, {
        class: "bg-white h-[730px] w-[380px] mb-16 rounded-3xl shadow-2xl relative",
        id: "recipe-" + recipe.id,
    });

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "h-full flex flex-col";

    const textualContent = document.createElement("div");
    textualContent.className = "px-[25px] py-[32px] flex flex-col flex-1";
    textualContent.appendChild(createTitle(recipe));
    textualContent.appendChild(createRecipeContent(recipe));
    textualContent.appendChild(createIngredientsContent(recipe));

    contentWrapper.appendChild(createImage(recipe));
    contentWrapper.appendChild(textualContent);

    card.appendChild(contentWrapper);
    card.appendChild(createDuration(recipe));

    return card;
};
