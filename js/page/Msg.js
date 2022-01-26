"use strict";

export default class Messages {
	static resultMessage = document.getElementById("resultMessage");
	static resultSpan = document.querySelector("#resultMessage > span");

	// affiche le message avec le nombre de recettes correspondant à la recherche
	static buildResultMessageWithResult(recipes) {
		this.displayMessage();
		this.resultMessage.style.backgroundColor = "#c4dcff";
		// test pour affichage singulier/pluriel
		if (recipes.length === 1) {
			this.resultSpan.innerHTML =
			recipes.length + " recette correspond à votre recherche";	
		} else {
		this.resultSpan.innerHTML =
			recipes.length + " recettes correspondent à votre recherche";
		}
		this.hideMessageOnClick();
		return this;
	}

	// affiche le message indicant à l'utilisateur qu'aucune recette n'a été trouvée
	static buildResultMessageWithNoResult() {
		this.displayMessage();
		this.resultMessage.style.backgroundColor = "#FFE9A5";
		this.resultSpan.innerHTML =
			'Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
		return this;
	}

	// affiche le message contenant le nombre de recettes
	static displayMessage() {
		return (this.resultMessage.style.display = "flex");
	}

	// fait disparaitre le message contenant le nombre de recettes
	static hideMessage() {
		return (this.resultMessage.style.display = "none");
	}
	static hideMessageOnClick() {
		document.querySelector("#resultMessage > i").addEventListener("click", () => {
			return this.hideMessage();
		});
	}
}
