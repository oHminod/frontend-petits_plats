export const createRecipeCard = (recipe) => {
    const card = document.createElement("article");
    card.className = "bg-white h-[730px] w-96 rounded-3xl shadow-xl relative";
    card.id = "recipe-" + recipe.id;

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "h-full flex flex-col";
    const image = document.createElement("img");
    image.src = "assets/images/" + recipe.image;
    image.className = "rounded-t-3xl h-64 w-full object-cover flex";
    image.alt = "Image de " + recipe.name;
    contentWrapper.appendChild(image);

    const textContent = document.createElement("div");
    textContent.className = "p-6 pb-14 flex flex-col flex-1 justify-between";
    const title = document.createElement("h2");
    title.className = "font-anton font-normal text-lg text-black mb-6";
    title.textContent = recipe.name;
    textContent.appendChild(title);

    const recetteContent = document.createElement("div");
    recetteContent.className = "mb-6";
    const titreRecette = document.createElement("h3");
    titreRecette.className =
        "text-greytext font-bold text-xs tracking-[.08rem] mb-4";
    titreRecette.textContent = "RECETTE";
    const descriptionRecette = document.createElement("p");
    descriptionRecette.className =
        "text-sm font-normal text-black line-clamp-4";
    descriptionRecette.textContent = recipe.description;
    recetteContent.appendChild(titreRecette);
    recetteContent.appendChild(descriptionRecette);
    textContent.appendChild(recetteContent);

    const ingredientsContent = document.createElement("div");
    const titreIngredients = document.createElement("h3");
    titreIngredients.className =
        "text-greytext font-bold text-xs tracking-[.08rem] mb-4";
    titreIngredients.textContent = "INGRÉDIENTS";
    ingredientsContent.appendChild(titreIngredients);

    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.className =
        "flex flex-wrap gap-6 max-h-48 overflow-y-scroll";
    recipe.ingredients.forEach((ingredient) => {
        const ingredientItem = document.createElement("div");
        ingredientItem.className = "w-[calc(50%_-_48px)]";
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
    ingredientsContent.appendChild(ingredientsWrapper);
    textContent.appendChild(ingredientsContent);

    const durationFloat = document.createElement("div");
    durationFloat.className = "flex absolute top-6 right-6";
    const duration = document.createElement("p");
    duration.className = "bg-primary rounded-full px-6 py-2 text-iconBlack";
    duration.textContent = recipe.time + "mn";
    durationFloat.appendChild(duration);

    contentWrapper.appendChild(textContent);

    card.appendChild(contentWrapper);
    card.appendChild(durationFloat);

    return card;
};
