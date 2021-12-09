"use strict";

export default class Search {
	static searchMainInput(value) {
		let recipesMatched = [];

		for (let i = 0; i < recipes.length; i++) {
			const { name, ingredients, description } = recipes[i];
			const includesInName = name.includes(value);
			const includesInDescription = description.includes(value);
			let includesInIngredients = false;
			for (let y = 0; y < ingredients.length; y++) {
				if (ingredients[y].ingredient.includes(value)) {
					includesInIngredients = true;
				}
			}
			if (includesInName || includesInDescription || includesInIngredients) {
				recipesMatched.push(recipes[i]);
			}
		}
		return {
			recipesMatched,
		};
	}
}
