"use strict";

import Display from "./Display.js";
import Messages from "./Msg.js";

export default class Builder {
	static init() {
		// Construit la section avant la recherche
		Display.buildResult(recipes);
		Messages.hideMessage();
	}

	static initSearch(result) {
		// Construit la section après la recherche
		Display.buildResult(result.recipesMatched);
		Messages.buildResultMessageWithResult(result.recipesMatched);
	}
}
