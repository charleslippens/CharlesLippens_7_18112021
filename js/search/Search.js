"use strict";

import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import { result } from "../main.js";


export default class Search {

	// Recherche générale des recettes pour un input dans la barre principale
	//
	static searchMainInput(value) {
		let recipesMatched = [];
		
		// Méthode for: remplit "recipesMatched" en testant pour chaque recette de "recipes"  si input est dans nom/description/ingrédients
		for (let i = 0; i < recipes.length; i++) {
			const { name, ingredients, description, appliance } = recipes[i];
			const includesInName = Utils.normalizeText(name).includes(Utils.normalizeText(value));
			const includesInDescription = Utils.normalizeText(description).includes(Utils.normalizeText(value));
			let includesInIngredients = false;
			for (let j = 0; j < ingredients.length; j++) {
				if (Utils.normalizeText(ingredients[j].ingredient).includes(Utils.normalizeText(value))) {
					includesInIngredients = true;
				}
			}
			if (includesInName || includesInDescription || includesInIngredients) {
				recipesMatched.push(recipes[i]);
			}
		}

		// Maj de result
		result.recipesMatched = recipesMatched;
		result.ingredients= Data.getAllIngredients(recipesMatched);
		result.appliances= Data.getAllAppliances(recipesMatched);
		result.ustensils= Data.getAllUstensils(recipesMatched);
	}

	// Filtre des listes Ing/App/Ust (=collection) à partir d'un input (value) dans la barre de recherche des Ing/App/Ust
	//
	static searchInputFilters(collection, value) {
		let resultInput = [];
		collection.forEach((elt) => {
			if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
				resultInput.push(elt);
			}
		});
		return resultInput;
	}

	// Recherche les recettes pour les items du filtre Ingrédients qui sont dans le tableau tagIng (=result.selectedIng) et maj de result
	//
	static searchByIngTags(tagIng) {
		let resultIng = [];
		resultIng.splice(0);
		let resultIng2 = result.recipesMatched;
		let selectlen = tagIng.length;
		// Boucle sur les items de tagIng pour mettre les recettes sélectionnées dans resultIng2
		for (let i = 0; i<selectlen;i++) {
			// Sélectionne les recettes de resultIng2 qui contiennent l'ingrédient tagIng[i] pour les mettre dans resultIng
			resultIng2.forEach((recipe) => {
				if (recipe.ingredients.some((elt) => Utils.normalizeText(elt.ingredient).includes(Utils.normalizeText(tagIng[i])))) {
					resultIng.push(recipe);
				};
			});
			// Recettes sélectionnées à chaque itération dans resultIng2 et maz de resultIng
			resultIng2 = resultIng.slice();
			resultIng.splice(0);
		};
		// Maj de result
		result.recipesMatched = resultIng2;
		result.ingredients= Data.getAllIngredients(resultIng2);
		result.appliances= Data.getAllAppliances(resultIng2);
		result.ustensils= Data.getAllUstensils(resultIng2);
	}

	// Recherche les recettes pour les items du filtre Appareil qui sont dans le tableau tagApp (=result.selectedApp) et maj de result
	//
	static searchByAppTags(tagApp) {
		let resultApp = [];
		resultApp.splice(0);
		let resultApp2 = result.recipesMatched;
		let selectlen = tagApp.length;
		// Boucle sur les items de tagApp pour mettre les recettes sélectionnées dans resultApp2
		for (let i = 0; i<selectlen;i++) {
			// Sélectionne les recettes de resultApp2 qui contiennent l'appareil tagApp[i] pour les mettre dans resultApp
			resultApp2.forEach((recipe) => {
				if (Utils.normalizeText(recipe.appliance).includes(Utils.normalizeText(tagApp[i]))) {
				resultApp.push(recipe);
				};
			});
			// Recettes sélectionnées à chaque itération dans resultApp2 et maz de resultApp
			resultApp2 = resultApp.slice();
			resultApp.splice(0);
		};
		// Maj de result
		result.recipesMatched = resultApp2;
		result.ingredients= Data.getAllIngredients(resultApp2);
		result.appliances= Data.getAllAppliances(resultApp2);
		result.ustensils= Data.getAllUstensils(resultApp2);
	};

	// Recherche les recettes pour les items du filtre Ustensiles qui sont dans le tableau tagUst (=result.selectedUst) et maj de result
	//
	static searchByUstTags(tagUst) {
		let resultUst = [];
		resultUst.splice(0);
		let resultUst2 = result.recipesMatched;
		let selectlen = tagUst.length;
		// Boucle sur les items de tagUst pour mettre les recettes sélectionnées dans resultUst2
		for (let i = 0; i<selectlen;i++) {
			// Sélectionne les recettes de resultUst2 qui contiennent l'ustensile tagUst[i] pour les mettre dans resultUst
			resultUst2.forEach((recipe) => {
				if (recipe.ustensils.some((elt) => Utils.normalizeText(elt).includes(Utils.normalizeText(tagUst[i])))) {
					resultUst.push(recipe);
				};
			});
			// Recettes sélectionnées à chaque itération dans resultUst2 et maz de resultUst
			resultUst2 = resultUst.slice();
			resultUst.splice(0);
		};
		// Maj de result
		result.recipesMatched = resultUst2;
		result.ingredients= Data.getAllIngredients(resultUst2);
		result.appliances= Data.getAllAppliances(resultUst2);
		result.ustensils= Data.getAllUstensils(resultUst2);
	}
}