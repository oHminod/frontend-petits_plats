import { recipes } from "../../data/recipes.js";
import { toggleSearchIcon } from "./DOMActions.js";

export const searchObject = {
    filteredRecipes: [],
    selectedTabs: new Set(),
    ingredientTagsList: new Set(),
    applianceTagsList: new Set(),
    ustensilsTagsList: new Set(),
    ingredientTags: new Set(),
    applianceTags: new Set(),
    ustensilsTags: new Set(),
    searchField: "",

    /**
     * Définit la valeur du champ de recherche et met à jour les recettes filtrées en conséquence.
     * @param {string} tag - La nouvelle valeur du champ de recherche.
     */
    setSearchField(tag) {
        const previousLength = this.searchField.length;
        this.searchField = tag;
        if (tag.length !== previousLength) {
            if (tag.length > previousLength) {
                this.getFilteredRecipes(this.filteredRecipes);
            } else {
                this.getFilteredRecipes(recipes);
            }
        }
    },

    /**
     * Ajoute un tag à l'ensemble de tags spécifié et met à jour les recettes filtrées.
     * @param {string} tagType - Le type de tag à ajouter (par exemple, "ingredientTags").
     * @param {string} tag - Le tag à ajouter.
     */
    _addTag(tagType, tag) {
        tag = tag.toLowerCase();
        // if (!this[tagType].has(tag)) {
        if (this.selectedTabs.size === 0 && this.searchField.length < 3)
            toggleSearchIcon(true);
        this[tagType].add(tag);
        this.selectedTabs.add(tagType + "--" + tag);
        this.getFilteredRecipes(this.filteredRecipes);
        // }
    },
    addIngredientTag(tag) {
        this._addTag("ingredientTags", tag);
    },
    addApplianceTag(tag) {
        this._addTag("applianceTags", tag);
    },
    addUstensilsTag(tag) {
        this._addTag("ustensilsTags", tag);
    },

    /**
     * Supprime un tag de l'ensemble de tags spécifié et met à jour les recettes filtrées.
     * @param {string} tagType - Le type de tag à supprimer (par exemple, "ingredientTags").
     * @param {string} tag - Le tag à supprimer.
     * @param {boolean} removeTagFromUI - Indique si le tag doit être supprimé de l'interface utilisateur.
     */
    _removeTag(tagType, tag) {
        tag = tag.toLowerCase();
        this[tagType].delete(tag);
        this.selectedTabs.delete(tagType + "--" + tag);
        if (this.selectedTabs.size === 0 && this.searchField.length < 3)
            toggleSearchIcon(false);
        // if (removeTagFromUI) {
        this.getFilteredRecipes(recipes);
        // } else {
        //     this.getFilteredRecipes(this.filteredRecipes);
        // }
    },
    removeIngredientTag(tag) {
        this._removeTag("ingredientTags", tag);
    },
    removeApplianceTag(tag) {
        this._removeTag("applianceTags", tag);
    },
    removeUstensilsTag(tag) {
        this._removeTag("ustensilsTags", tag);
    },
    removeSelectedTag(tag, tagType) {
        this._removeTag(tagType, tag);
        // if (this.ingredientTags.has(tag)) {
        //     this.removeIngredientTag(tag);
        // }
        // if (this.applianceTags.has(tag)) {
        //     this.removeApplianceTag(tag);
        // }
        // if (this.ustensilsTags.has(tag)) {
        //     this.removeUstensilsTag(tag);
        // }
    },

    /**
     * Définit la liste de tags pour le type de tag spécifié à partir des recettes fournies.
     * @param {string} tagType - Le type de tag pour lequel définir la liste (par exemple, "ingredientTagsList").
     * @param {string} property - La propriété de la recette à utiliser pour créer les tags.
     * @param {Array} recipes - Les recettes à utiliser pour créer les tags.
     */
    _setTagsList(tagType, property, recipes) {
        this[tagType] = recipes.reduce((acc, recipe) => {
            const items = Array.isArray(recipe[property])
                ? recipe[property]
                : [recipe[property]];
            items.forEach((item) => {
                const value =
                    typeof item === "object" && item !== null
                        ? item.ingredient
                        : item;
                acc.add(value);
            });
            return acc;
        }, new Set());
    },
    setTagsLists() {
        const filteredRecipes = this.filteredRecipes;

        this._setTagsList("ingredientTagsList", "ingredients", filteredRecipes);
        this._setTagsList("applianceTagsList", "appliance", filteredRecipes);
        this._setTagsList("ustensilsTagsList", "ustensils", filteredRecipes);
    },

    /**
     * Réinitialise l'objet de recherche à son état initial.
     */
    reset() {
        this.filteredRecipes = [];
        this.ingredientTags = new Set();
        this.applianceTags = new Set();
        this.ustensilsTags = new Set();
        this.searchField = "";
        this.selectedTabs = new Set();
        this.getFilteredRecipes();
        this.setTagsLists();
    },

    _getLowerCaseItems(items, property = "") {
        return items.map((item) =>
            property ? item[property].toLowerCase() : item.toLowerCase()
        );
    },

    /**
     * Vérifie si toutes les recettes contiennent le tag spécifié.
     * @param {string} tag - Le tag à vérifier.
     * @param {string} property - La propriété de la recette à vérifier.
     * @returns {boolean} - Retourne true si toutes les recettes contiennent le tag, false sinon.
     */
    allRecipesContainTag(tag, property) {
        tag = tag.toLowerCase();
        if (property === "removeIngredientTag") property = "ingredients";
        if (property === "removeApplianceTag") property = "appliance";
        if (property === "removeUstensilsTag") property = "ustensils";
        for (let recipe of this.filteredRecipes) {
            const items = Array.isArray(recipe[property])
                ? recipe[property]
                : [recipe[property]];
            const itemsLowerCase = this._getLowerCaseItems(
                items,
                typeof items[0] === "object" ? "ingredient" : ""
            );
            if (!itemsLowerCase.includes(tag)) {
                return true;
            }
        }
        return false;
    },
    /**
     * Vérifie si tous les tags sont présents dans les éléments fournis.
     * @param {Set} tags - Les tags à vérifier.
     * @param {Set} items - Les éléments dans lesquels vérifier les tags.
     * @returns {boolean} - Retourne true si tous les tags sont présents, false sinon.
     */
    _checkTags(tags, items) {
        return [...tags].every((tag) => items.has(tag));
    },

    /**
     * Vérifie si le champ de recherche est présent dans le nom, la description ou les ingrédients de la recette.
     * @param {string} searchField - Le champ de recherche à vérifier.
     * @param {string} name - Le nom de la recette.
     * @param {string} description - La description de la recette.
     * @param {Array} ingredients - Les ingrédients de la recette.
     * @returns {boolean} - Retourne true si le champ de recherche est présent, false sinon.
     */
    _checkSearchField(searchField, name, description, ingredients) {
        return (
            searchField.trim() === "" ||
            name.includes(searchField) ||
            description.includes(searchField) ||
            ingredients.some((ingredient) => ingredient.includes(searchField))
        );
    },

    /**
     * Définit les recettes filtrées.
     * @param {Array} recipes - Les recettes à définir comme filtrées.
     */
    _setFilteredRecipes(recipes) {
        this.filteredRecipes = recipes;
    },

    /**
     * Filtre une recette en fonction des tags et du champ de recherche.
     * @param {Object} recipe - La recette à filtrer.
     * @param {Set} ingredientTags - Les tags d'ingrédients à vérifier.
     * @param {Set} applianceTags - Les tags d'appareils à vérifier.
     * @param {Set} ustensilsTags - Les tags d'ustensiles à vérifier.
     * @param {string} searchField - Le champ de recherche à vérifier.
     * @returns {boolean} - Retourne true si la recette passe le filtre, false sinon.
     */
    _filterRecipe(
        recipe,
        ingredientTags,
        applianceTags,
        ustensilsTags,
        searchField
    ) {
        const ingredients = new Set(
            this._getLowerCaseItems(recipe.ingredients, "ingredient")
        );
        const appliances = new Set([recipe.appliance.toLowerCase()]);
        const ustensils = new Set(this._getLowerCaseItems(recipe.ustensils));
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();

        const isTagFiltered =
            this._checkTags(ingredientTags, ingredients) &&
            this._checkTags(applianceTags, appliances) &&
            this._checkTags(ustensilsTags, ustensils);

        const isSearchFiltered = this._checkSearchField(
            searchField,
            name,
            description,
            [...ingredients]
        );

        return isTagFiltered && isSearchFiltered;
    },

    /**
     * Obtient les recettes filtrées en fonction des tags et du champ de recherche.
     * @param {Array} recipesToFilter - Les recettes à filtrer (par défaut, toutes les recettes).
     * @returns {Array} - Les recettes filtrées.
     */
    getFilteredRecipes(recipesToFilter = recipes) {
        const start = performance.now();
        console.log("recipesToFilter", recipesToFilter.length);

        const result = recipesToFilter.filter((recipe) =>
            searchObject._filterRecipe(
                recipe,
                searchObject.ingredientTags,
                searchObject.applianceTags,
                searchObject.ustensilsTags,
                searchObject.searchField
            )
        );

        searchObject._setFilteredRecipes(result);

        const end = performance.now();
        console.log(
            "Execution time: ",
            Math.floor((end - start) * 10000) / 10 + "μs"
        );

        return result;
    },
};
