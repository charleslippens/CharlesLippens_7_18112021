"use strict";

export default class Data {
	// récupérer tous les ingrédient pour les faire apparaitre par défault avant la recherche
	static getAllIngredients(ing) {
		let ingredients = [];
		ing.forEach((recipe) => {
			recipe.ingredients.forEach((ing) => {
				if (!ingredients.includes(ing.ingredient.toLowerCase()))
					ingredients.push(ing.ingredient.toLowerCase());
			});
		});
		return ingredients;
	}
}
