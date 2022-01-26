"use strict";

export default class Data {

	// récupère les ingrédients des recettes du tableau "ing"
	static getAllIngredients(ing) {
		let ingredients = [];
		ing.forEach((recipe) => {
			recipe.ingredients.forEach((ing) => {
				if (!ingredients.includes(ing.ingredient.toLowerCase())) {
					ingredients.push(ing.ingredient.toLowerCase());}
			});
		});
		return ingredients;
	}

	// récupère les appareils des recettes du tableau "app"
	static getAllAppliances(app) {
		let appliances = [];
		app.forEach((recipe) => {
			if (!appliances.includes(recipe.appliance.toLowerCase()))
				appliances.push(recipe.appliance.toLowerCase());
		});
		return appliances;
	}

	// récupère les ustensiles des recettes du tableau "ust"
	static getAllUstensils(ust) {
		let ustensils = [];
		ust.forEach((recipe) => {
			recipe.ustensils.forEach((ustensil) => {
				if (!ustensils.includes(ustensil.toLowerCase()))
					ustensils.push(ustensil.toLowerCase());
			});
		});
		return ustensils;
	}
}
