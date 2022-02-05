"use strict";

export default class Data {

	// Met dans [ingredients] tous les ingrédients des recettes [ing] sans doublons
	//									> [recipe.[ingredients.(ingredientt.ingredient)]]
	static getAllIngredients(ing) {
		let allIngredients = [];
		ing.forEach((recipe) => {
			recipe.ingredients.forEach((ingredientt) => {
				if (!allIngredients.includes(ingredientt.ingredient.toLowerCase())) {
					allIngredients.push(ingredientt.ingredient.toLowerCase());
				}
			});
		});
		return allIngredients;
	}

	// Met dans [appliances] tous les appareils des recettes [app] sans doublons
	//									> [recipe.(appliance)]
	static getAllAppliances(app) {
		let allAppliances = [];
		app.forEach((recipe) => {
			if (!allAppliances.includes(recipe.appliance.toLowerCase())) {
				allAppliances.push(recipe.appliance.toLowerCase());
			}
		});
		return allAppliances;
	}

	// Met dans [ustensils] tous les ustensiles des recettes [ust]
	//									> [recipe.[ustensils.(ustensil)]]
	static getAllUstensils(ust) {
		let allUstensils = [];
		ust.forEach((recipe) => {
			recipe.ustensils.forEach((ustensil) => {
				if (!allUstensils.includes(ustensil.toLowerCase())) {
					allUstensils.push(ustensil.toLowerCase());
				}
			});
		});
		return allUstensils;
	}
}
