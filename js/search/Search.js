"use strict";

import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";

export default class Search {
	static searchMainInput(value) {
		let recipesMatched = [];

		for (let i = 0; i < recipes.length; i++) {
			const { name, ingredients, description } = recipes[i];
			const includesInName = Utils.normalizeText(name).includes(Utils.normalizeText(value));
			const includesInDescription = Utils.normalizeText(description).includes(
				Utils.normalizeText(value)
			);
			let includesInIngredients = false;
			for (let y = 0; y < ingredients.length; y++) {
				if (Utils.normalizeText(ingredients[y].ingredient).includes(value)) {
					includesInIngredients = true;
				}
			}
			if (includesInName || includesInDescription || includesInIngredients) {
				recipesMatched.push(recipes[i]);
			}
		}
		return {
			recipesMatched,
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
