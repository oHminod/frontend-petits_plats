import { recipes } from "../../data/recipes.js";
import { toggleSearchIcon } from "./DOMActions.js";

export const searchObject = {
    filteredRecipes: [],
    selectedTabs: [],
    ingredientTagsList: [],
    applianceTagsList: [],
    ustensilsTagsList: [],
    ingredientTags: [],
    applianceTags: [],
    ustensilsTags: [],
    searchField: "",

    setSearchField(tag) {
        this.searchField = tag;
    },

    _addTag(tagType, tag) {
        if (!this[tagType].includes(tag.toLowerCase())) {
            if (this.selectedTabs.length === 0 && this.searchField.length < 3)
                toggleSearchIcon(true);
            this[tagType].push(tag.toLowerCase());
            this.selectedTabs.push(tag.toLowerCase());
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
        this[tagType] = this[tagType].filter(
            (item) => item !== tag.toLowerCase()
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag.toLowerCase()
        );
        if (this.selectedTabs.length === 0 && this.searchField.length < 3)
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
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag.toLowerCase()
        );
        if (this.ingredientTags.includes(tag.toLowerCase())) {
            this.removeIngredientTag(tag.toLowerCase());
        }
        if (this.applianceTags.includes(tag.toLowerCase())) {
            this.removeApplianceTag(tag.toLowerCase());
        }
        if (this.ustensilsTags.includes(tag.toLowerCase())) {
            this.removeUstensilsTag(tag.toLowerCase());
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
                if (!acc.includes(value)) {
                    acc.push(value);
                }
            });
            return acc;
        }, []);
    },
    setTagsLists() {
        const filteredRecipes = this.filteredRecipes;

        this._setTagsList("ingredientTagsList", "ingredients", filteredRecipes);
        this._setTagsList("applianceTagsList", "appliance", filteredRecipes);
        this._setTagsList("ustensilsTagsList", "ustensils", filteredRecipes);
    },

    reset() {
        this.ingredientTags = [];
        this.applianceTags = [];
        this.ustensilsTags = [];
        this.searchField = "";
        this.selectedTabs = [];
        this.setTagsLists();
    },

    _getLowerCaseItems(items, property = "") {
        return items.map((item) =>
            property ? item[property].toLowerCase() : item.toLowerCase()
        );
    },
    _checkTags(tags, items) {
        return tags.every((tag) => items.some((item) => item.includes(tag)));
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
                searchObject.ingredientTags,
                searchObject.applianceTags,
                searchObject.ustensilsTags,
                searchObject.searchField
            )
        );

        searchObject._setFilteredRecipes(result);

        return result;
    },
};
