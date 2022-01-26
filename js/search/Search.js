"use strict";

import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import { result } from "../main.js";


export default class Search {

	// Recherche des recettes pour un input dans la barre principale
	//
	static searchMainInput(value) {
		let recipesMatched = [];
		
		// Méthode for
		for (let i = 0; i < recipes.length; i++) {
			const { name, ingredients, description, appliance } = recipes[i];
			const includesInName = Utils.normalizeText(name).includes(Utils.normalizeText(value));
			//const includesInAppliance = Utils.normalizeText(appliance).includes(Utils.normalizeText(value));
			const includesInDescription = Utils.normalizeText(description).includes(Utils.normalizeText(value));
			let includesInIngredients = false;
			for (let j = 0; j < ingredients.length; j++) {
				if (Utils.normalizeText(ingredients[j].ingredient).includes(Utils.normalizeText(value))) {
					includesInIngredients = true;
				}
			}
			//if (includesInName || includesInDescription || includesInIngredients || includesInAppliance) {
			if (includesInName || includesInDescription || includesInIngredients) {
				recipesMatched.push(recipes[i]);
			}
			//result.recipesMatched = recipesMatched;
			//console.log("recipeMatched:",i,result.recipesMatched )
		}

		result.recipesMatched = recipesMatched;
		result.ingredients= Data.getAllIngredients(recipesMatched);
		result.appliances= Data.getAllAppliances(recipesMatched);
		result.ustensils= Data.getAllUstensils(recipesMatched);
		//console.log("SearchMainInput / result:",result)

	}

	// Filtre des listes Ing/App/Ust (collection) à partir d'un input (value) dans la barre de recherche des Ing/App/Ust
	//
	static searchInputFilters(collection, value) {
		let resultInput = [];
		collection.forEach((elt) => {
			if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
				resultInput.push(elt);
			}
		});
		//console.log("search.InputFilters1:", resultInput);
		return resultInput;
	}

	// Recherche des recettes pour un input dans la barre Ingrédients
	//
	static searchByIngTags(tagIng) {
		let resultIng = [];
		resultIng.splice(0);
		let resultIng2 = result.recipesMatched;
		let selectlen = tagIng.length;
		//console.log("recipes0:", resultIng);
		//console.log("recipes1:", resultIng2);
		//console.log("recipes2:", selectlen);
		//Boucle sur les tags sélectionnés tagIng[i] pour mettre les recettes dans resultIng2
		for (let i = 0; i<selectlen;i++) {
			resultIng2.forEach((recipe) => {
				if (recipe.ingredients.some((elt) => Utils.normalizeText(elt.ingredient).includes(Utils.normalizeText(tagIng[i])))) {
					resultIng.push(recipe);
				};
			});
			resultIng2 = resultIng.slice();
			resultIng.splice(0);
			//console.log("resultIng:",resultIng);
			//console.log("resultIng2:",resultIng2);
		};
		// maj de result
		result.recipesMatched = resultIng2;
		result.ingredients= Data.getAllIngredients(resultIng2);
		result.appliances= Data.getAllAppliances(resultIng2);
		result.ustensils= Data.getAllUstensils(resultIng2);
	}

	// Recherche des recettes pour un input dans la barre Appareil
	//
	static searchByAppTags(tagApp) {
		let resultApp = [];
		resultApp.splice(0);
		let resultApp2 = result.recipesMatched;
		let selectlen = tagApp.length;
		//console.log("recipes0:", resultApp);
		//console.log("recipes1:", resultApp2);
		//console.log("recipes2:", selectlen);
		//Boucle sur les tags sélectionnés tagIng[i] pour mettre les recettes dans resultIng2
		for (let i = 0; i<selectlen;i++) {
			resultApp2.forEach((recipe) => {
				if (Utils.normalizeText(recipe.appliance).includes(Utils.normalizeText(tagApp[i]))) {
				resultApp.push(recipe);
				};
			});
			resultApp2 = resultApp.slice();
			resultApp.splice(0);
			//console.log("resultApp:",resultApp);
			//console.log("resultApp2:",resultApp2);
		};
		// maj de result
		result.recipesMatched = resultApp2;
		result.ingredients= Data.getAllIngredients(resultApp2);
		result.appliances= Data.getAllAppliances(resultApp2);
		result.ustensils= Data.getAllUstensils(resultApp2);
	};

	// Recherche des recettes pour un input dans la barre Ustensiles
	//
	static searchByUstTags(tagUst) {
		let resultUst = [];
		resultUst.splice(0);
		let resultUst2 = result.recipesMatched;
		let selectlen = tagUst.length;
		//console.log("recipes0:", resultUst);
		//console.log("recipes1:", resultUst2);
		//console.log("recipes2:", selectlen);
		//Boucle sur les tags sélectionnés tagIng[i] pour mettre les recettes dans resultIng2
		for (let i = 0; i<selectlen;i++) {
			resultUst2.forEach((recipe) => {
				if (recipe.ustensils.some((elt) => Utils.normalizeText(elt).includes(Utils.normalizeText(tagUst[i])))) {
					resultUst.push(recipe);
				};
			});
			resultUst2 = resultUst.slice();
			resultUst.splice(0);
			//console.log("resultUst:",resultUst);
			//console.log("resultUst2:",resultUst2);
		};
		// maj de result
		result.recipesMatched = resultUst2;
		result.ingredients= Data.getAllIngredients(resultUst2);
		result.appliances= Data.getAllAppliances(resultUst2);
		result.ustensils= Data.getAllUstensils(resultUst2);
	}

}
