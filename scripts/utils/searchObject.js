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
        let found = false;
        for (let i = 0; i < this[tagType].length; i++) {
            if (this[tagType][i] === tag.toLowerCase()) {
                found = true;
                break;
            }
        }
        if (!found) {
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
        let newArray = [];
        for (let i = 0; i < this[tagType].length; i++) {
            if (this[tagType][i] !== tag.toLowerCase()) {
                newArray.push(this[tagType][i]);
            }
        }
        this[tagType] = newArray;

        newArray = [];
        for (let i = 0; i < this.selectedTabs.length; i++) {
            if (this.selectedTabs[i] !== tag.toLowerCase()) {
                newArray.push(this.selectedTabs[i]);
            }
        }
        this.selectedTabs = newArray;

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
        let newArray = [];
        for (let i = 0; i < this.selectedTabs.length; i++) {
            if (this.selectedTabs[i] !== tag.toLowerCase()) {
                newArray.push(this.selectedTabs[i]);
            }
        }
        this.selectedTabs = newArray;

        for (let i = 0; i < this.ingredientTags.length; i++) {
            if (this.ingredientTags[i] === tag.toLowerCase()) {
                this.removeIngredientTag(tag.toLowerCase());
                break;
            }
        }
        for (let i = 0; i < this.applianceTags.length; i++) {
            if (this.applianceTags[i] === tag.toLowerCase()) {
                this.removeApplianceTag(tag.toLowerCase());
                break;
            }
        }
        for (let i = 0; i < this.ustensilsTags.length; i++) {
            if (this.ustensilsTags[i] === tag.toLowerCase()) {
                this.removeUstensilsTag(tag.toLowerCase());
                break;
            }
        }
    },

    _setTagsList(tagType, property, recipes) {
        this[tagType] = [];
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const items = Array.isArray(recipe[property])
                ? recipe[property]
                : [recipe[property]];
            for (let j = 0; j < items.length; j++) {
                const item = items[j];
                const value =
                    typeof item === "object" && item !== null
                        ? item.ingredient
                        : item;
                let found = false;
                for (let k = 0; k < this[tagType].length; k++) {
                    if (this[tagType][k] === value) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this[tagType].push(value);
                }
            }
        }
    },
    setTagsLists() {
        const filteredRecipes = this.filteredRecipes;

        this._setTagsList("ingredientTagsList", "ingredients", filteredRecipes);
        this._setTagsList("applianceTagsList", "appliance", filteredRecipes);
        this._setTagsList("ustensilsTagsList", "ustensils", filteredRecipes);
    },

    reset() {
        this.filteredRecipes = [];
        this.ingredientTags = [];
        this.applianceTags = [];
        this.ustensilsTags = [];
        this.searchField = "";
        this.selectedTabs = [];
        this.setTagsLists();
    },

    _getLowerCaseItems(items, property = "") {
        let lowerCaseItems = [];
        for (let i = 0; i < items.length; i++) {
            if (property) {
                lowerCaseItems.push(items[i][property].toLowerCase());
            } else {
                lowerCaseItems.push(items[i].toLowerCase());
            }
        }
        return lowerCaseItems;
    },
    _checkTags(tags, items) {
        for (let i = 0; i < tags.length; i++) {
            let tagFound = false;
            for (let j = 0; j < items.length; j++) {
                if (items[j].toLowerCase() === tags[i].toLowerCase()) {
                    tagFound = true;
                    break;
                }
            }
            if (!tagFound) {
                return false;
            }
        }
        return true;
    },
    _includes(str, searchStr) {
        for (let i = 0; i <= str.length - searchStr.length; i++) {
            if (str.substring(i, i + searchStr.length) === searchStr) {
                return true;
            }
        }
        return false;
    },
    _checkSearchField(searchField, name, description, ingredients) {
        if (searchField.trim() === "") {
            return true;
        }
        if (
            this._includes(name, searchField) ||
            this._includes(description, searchField)
        ) {
            return true;
        }
        for (let i = 0; i < ingredients.length; i++) {
            if (this._includes(ingredients[i], searchField)) {
                return true;
            }
        }
        return false;
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
        const start = performance.now();
        console.log("recipesToFilter", recipes.length);

        const result = [];
        for (let i = 0; i < recipes.length; i++) {
            if (
                searchObject._filterRecipe(
                    recipes[i],
                    searchObject.ingredientTags,
                    searchObject.applianceTags,
                    searchObject.ustensilsTags,
                    searchObject.searchField
                )
            ) {
                result.push(recipes[i]);
            }
        }

        searchObject._setFilteredRecipes(result);

        const end = performance.now();
        console.log(
            "Execution time: ",
            ((end - start) * 1000).toFixed(1) + "μs"
        );
        return result;
    },
};
