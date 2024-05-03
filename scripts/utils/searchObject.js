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
        this.ingredientTags.push(tag);
        this.selectedTabs.push(tag);
    },
    addApplianceTag(tag) {
        this.applianceTags.push(tag);
        this.selectedTabs.push(tag);
    },
    addUstensilsTag(tag) {
        this.ustensilsTags.push(tag);
        this.selectedTabs.push(tag);
    },
    removeIngredientTag(tag) {
        this.ingredientTags = this.ingredientTags.filter(
            (ingredient) => ingredient !== tag
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag
        );
    },
    removeApplianceTag(tag) {
        this.applianceTags = this.applianceTags.filter(
            (appliance) => appliance !== tag
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag
        );
    },
    removeUstensilsTag(tag) {
        this.ustensilsTags = this.ustensilsTags.filter(
            (ustensil) => ustensil !== tag
        );
        this.selectedTabs = this.selectedTabs.filter(
            (selectedTab) => selectedTab !== tag
        );
    },
    setTagsLists() {
        console.log("setTagsLists");
        const filteredRecipes = getFilteredRecipes();
        console.log("filterRecipe", filteredRecipes);

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
};
