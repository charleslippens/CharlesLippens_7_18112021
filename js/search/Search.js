"use strict";

import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";

export default class Search {
	static searchMainInput(value) {
		let recipesMatched = [];

		recipes.filter((recipe) => {
			if (
				Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) ||
				Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) ||
				recipe.ingredients.some((elt) =>
					Utils.normalizeText(elt.ingredient).includes(value)
				)
			) {
				recipesMatched.push(recipe);
			}
		});
		return {
			recipesMatched: recipesMatched,
			ingredients: Data.getAllIngredients(recipesMatched),
		};
	}

	// chercher par input pour les ingrédients
	static searchInputFilters(collection, value) {
		let resultInput = [];
		collection.forEach((elt) => {
			if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
				resultInput.push(elt);
			}
		});

		return resultInput;
	}

	// chercher par tags pour les ingrédients
	static searchByIngTags(recipes, tagIng) {
		let resultIng = [];

		recipes.forEach((recipe) => {
			if (
				recipe.ingredients.some((elt) =>
					Utils.normalizeText(elt.ingredient).includes(tagIng)
				)
			) {
				resultIng.push(recipe);
			}
		});

		return resultIng;
	}
}
