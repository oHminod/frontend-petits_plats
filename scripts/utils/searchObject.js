import { toggleSearchIcon } from "./DOMActions.js";
import { getFilteredRecipes } from "./sortAndFilter.js";

export const searchObject = {
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
    addIngredientTag(tag) {
        if (!this.ingredientTags.includes(tag.toLowerCase())) {
            if (this.selectedTabs.length === 0 && this.searchField.length < 3)
                toggleSearchIcon(true);
            this.ingredientTags.push(tag.toLowerCase());
            this.selectedTabs.push(tag.toLowerCase());
        }
    },
    addApplianceTag(tag) {
        if (!this.applianceTags.includes(tag.toLowerCase())) {
            if (this.selectedTabs.length === 0 && this.searchField.length < 3)
                toggleSearchIcon(true);
            this.applianceTags.push(tag.toLowerCase());
            this.selectedTabs.push(tag.toLowerCase());
        }
    },
    addUstensilsTag(tag) {
        if (!this.ustensilsTags.includes(tag.toLowerCase())) {
            if (this.selectedTabs.length === 0 && this.searchField.length < 3)
                toggleSearchIcon(true);
            this.ustensilsTags.push(tag.toLowerCase());
            this.selectedTabs.push(tag.toLowerCase());
        }
    },
    removeIngredientTag(tag) {
        this.ingredientTags = this.ingredientTags.filter(
            (ingredient) => ingredient !== tag.toLowerCase()
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag.toLowerCase()
        );
        if (this.ingredientTags.length === 0 && this.searchField.length < 3)
            toggleSearchIcon(false);
    },
    removeApplianceTag(tag) {
        this.applianceTags = this.applianceTags.filter(
            (appliance) => appliance !== tag.toLowerCase()
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag.toLowerCase()
        );
        if (this.applianceTags.length === 0 && this.searchField.length < 3)
            toggleSearchIcon(false);
    },
    removeUstensilsTag(tag) {
        this.ustensilsTags = this.ustensilsTags.filter(
            (ustensil) => ustensil !== tag.toLowerCase()
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag.toLowerCase()
        );
        if (this.ustensilsTags.length === 0 && this.searchField.length < 3)
            toggleSearchIcon(false);
    },
    setTagsLists() {
        const filteredRecipes = getFilteredRecipes();

        this.ingredientTagsList = filteredRecipes.reduce((acc, recipe) => {
            recipe.ingredients.forEach((ingredient) => {
                if (!acc.includes(ingredient.ingredient)) {
                    acc.push(ingredient.ingredient);
                }
            });
            return acc;
        }, []);
        this.applianceTagsList = filteredRecipes.reduce((acc, recipe) => {
            if (!acc.includes(recipe.appliance)) {
                acc.push(recipe.appliance);
            }
            return acc;
        }, []);
        this.ustensilsTagsList = filteredRecipes.reduce((acc, recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (!acc.includes(ustensil)) {
                    acc.push(ustensil);
                }
            });
            return acc;
        }, []);
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
    reset() {
        this.ingredientTags = [];
        this.applianceTags = [];
        this.ustensilsTags = [];
        this.searchField = "";
        this.selectedTabs = [];
        this.setTagsLists();
    },
};
