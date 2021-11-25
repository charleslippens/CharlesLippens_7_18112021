"use strict";

import Display from "./page/Display.js";

class Builder {
	static launch() {
		// Construit la section avec toutes les recettes
		Display.buildResult(recipes);
	}
}

// Construction par défault sans la recherche
Builder.launch();
