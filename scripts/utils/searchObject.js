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

    setSearchField(tag) {
        this.searchField = tag;
    },

    _addTag(tagType, tag) {
        tag = tag.toLowerCase();
        if (!this[tagType].has(tag)) {
            if (this.selectedTabs.size === 0 && this.searchField.length < 3)
                toggleSearchIcon(true);
            this[tagType].add(tag);
            this.selectedTabs.add(tag);
        }
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

    _removeTag(tagType, tag) {
        tag = tag.toLowerCase();
        this[tagType].delete(tag);
        this.selectedTabs.delete(tag);
        if (this.selectedTabs.size === 0 && this.searchField.length < 3)
            toggleSearchIcon(false);
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
    removeSelectedTag(tag) {
        tag = tag.toLowerCase();
        this.selectedTabs.delete(tag);
        if (this.ingredientTags.has(tag)) {
            this.removeIngredientTag(tag);
        }
        if (this.applianceTags.has(tag)) {
            this.removeApplianceTag(tag);
        }
        if (this.ustensilsTags.has(tag)) {
            this.removeUstensilsTag(tag);
        }
    },

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

    reset() {
        this.ingredientTags = new Set();
        this.applianceTags = new Set();
        this.ustensilsTags = new Set();
        this.searchField = "";
        this.selectedTabs = new Set();
        this.setTagsLists();
    },

    _getLowerCaseItems(items, property = "") {
        return items.map((item) =>
            property ? item[property].toLowerCase() : item.toLowerCase()
        );
    },
    _checkTags(tags, items) {
        return [...tags].every((tag) => items.includes(tag));
    },
    _checkSearchField(searchField, name, description, ingredients) {
        return (
            searchField.trim() === "" ||
            name.includes(searchField) ||
            description.includes(searchField) ||
            ingredients.some((ingredient) =>
                ingredient.includes(searchField)
            ) ||
            ingredients.some((ingredient) => ingredient.includes(searchField))
        );
    },
    _setFilteredRecipes(recipes) {
        this.filteredRecipes = recipes;
    },
    _filterRecipe(
        recipe,
        ingredientTags,
        applianceTags,
        ustensilsTags,
        searchField
    ) {
        const ingredients = this._getLowerCaseItems(
            recipe.ingredients,
            "ingredient"
        );
        const appliances = [recipe.appliance.toLowerCase()];
        const ustensils = this._getLowerCaseItems(recipe.ustensils);
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
            ingredients
        );

        return isTagFiltered && isSearchFiltered;
    },
    getFilteredRecipes() {
        const result = recipes.filter((recipe) =>
            searchObject._filterRecipe(
                recipe,
                [...searchObject.ingredientTags],
                [...searchObject.applianceTags],
                [...searchObject.ustensilsTags],
                searchObject.searchField
            )
        );

        searchObject._setFilteredRecipes(result);

        return result;
    },
};
