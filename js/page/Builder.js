"use strict";

import Display from "./Display.js";
import Messages from "./Msg.js";
import Ingredients from "../filters/Ingredients.js";
import Data from "../utilities/Data.js";

export default class Builder {
	static init() {
		// Construit la section avant la recherche
		Display.buildResult(recipes);
		Messages.hideMessage();
		Ingredients.init(Data.getAllIngredients(recipes), recipes);
	}

	static initSearch(result) {
		// Construit la section après la recherche
		Display.buildResult(result.recipesMatched);
		Messages.buildResultMessageWithResult(result.recipesMatched);
		Ingredients.init(result.ingredients, result.recipesMatched);
	}
}
