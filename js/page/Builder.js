"use strict";

import Display from "./Display.js";
import Messages from "./Msg.js";
import Ingredients from "../filters/Ingredients.js";
import Data from "../utilities/Data.js";
import Ustensils from "../filters/Ustensils.js";
import Appliances from "../filters/Appliances.js";
import { result } from "../main.js";

export default class Builder {

	// Initialisation générale des recherches à partir de toutes les recettes (recipes)
	//
	static init() {
		// Initialisation de result
		result.recipesMatched = recipes;
		result.ingredients= Data.getAllIngredients(recipes);
		result.appliances= Data.getAllAppliances(recipes);
		result.ustensils= Data.getAllUstensils(recipes);
		// Affichage des recettes
		Display.buildResult(result.recipesMatched);
		Messages.hideMessage();
		// Initialisation des recherches par tags
		Ingredients.init();
		Appliances.init();
		Ustensils.init();
	}

	// Initialisation des recherches intermédiaires à partir des recettes déjà sélectionnées (result.recipesMatched) 
	//
	static initSearch() {
		// Affichage des recettes sélectionnées
		Display.buildResult(result.recipesMatched);
		Messages.buildResultMessageWithResult(result.recipesMatched);
		//console.log("Display initSearch: ",result.recipesMatched);
		// Initialisation recherche suivante  
		Ingredients.init();
		Appliances.init();
		Ustensils.init();
	}

}
