"use strict";

import Display from "./Display.js";
import Msg from "./Msg.js";
import Utils from "../utilities/Utils.js";
import Ingredients from "../filters/Ingredients.js";
import Data from "../utilities/Data.js";

export default class Badges {
	static hiddenIngredientsFilter = document.querySelector("#hiddenIngredientsFilter");
	static hiddenAppareilFilter = document.querySelector("#hiddenAppareilFilter");
	static hiddenUstensilesFilter = document.querySelector("#hiddenUstensilesFilter");

	// afficher un badge contenant le tag des ingrédients que l'utilisateur a sélectionné
	static buildTags(elt, tag) {
		this.pushDownButtonsFilter();
		this.displayTag(elt);
		this.fillTag(elt, tag);
		return this;
	}

	static displayTag(elt) {
		return (elt.style.display = "flex");
	}

	// remplir dans le tag sélectionné
	static fillTag(elt, tag) {
		return (elt.innerHTML = tag + ` <i class='far fa-times-circle'></i>`);
	}

	// supprimer le tag et remplacer les boutons ingrédients
	static hideTag(elt) {
		this.pushUpButtonsFilter();
		return (elt.style.display = "none");
	}

	// descendre les boutons ingrédients
	static pushDownButtonsFilter() {
		this.hiddenIngredientsFilter.style.top = "20rem";
	}

	// monter les boutons ingrédients
	static pushUpButtonsFilter() {
		this.hiddenIngredientsFilter.style.top = "16.2rem";
	}

	static removeTagsOnClick(tag, event, eltBadge, recipes) {
		tag.addEventListener("click", () => {
			this.resetSection(event, eltBadge, recipes);
		});
	}

	static resetSection(event, eltBadge, recipes) {
		event.target.classList.remove("selected");
		this.hideTag(eltBadge);
		Msg.buildResultMessageWithResult(recipes);
		Utils.clearRecipes();
		Display.buildResult(recipes);
		Utils.clearFilters(document.getElementById("ingredientsExample"));
		Ingredients.fillIngredients(Data.getAllIngredients(recipes));
	}
}
