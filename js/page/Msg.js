"use strict";

export default class Messages {
	static resultMessage = document.getElementById("resultMessage");
	static resultSpan = document.querySelector("#resultMessage > span");

	// Affiche le message indiquant le nombre de recettes correspondant à la recherche
	//
	static buildResultMessageWithResult(recipesMatched) {
		this.displayMessage();
		this.resultMessage.style.backgroundColor = "#c4dcff";
		// test pour affichage singulier/pluriel
		if (recipesMatched.length === 1) {
			this.resultSpan.innerHTML =	recipesMatched.length + " recette correspond à votre recherche";	
		} else {
			this.resultSpan.innerHTML =	recipesMatched.length + " recettes correspondent à votre recherche";
		}
		this.hideMessageOnClick();
		return this;
	}

	// Affiche le message si aucune recette n'a été trouvée
	//
	static buildResultMessageWithNoResult() {
		this.displayMessage();
		this.resultMessage.style.backgroundColor = "#FFE9A5";
		this.resultSpan.innerHTML =
			'Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
		return this;
	}

	// Affiche le message
	//
	static displayMessage() {
		return (this.resultMessage.style.display = "flex");
	}

	// Supprime le message 
	//
	static hideMessage() {
		return (this.resultMessage.style.display = "none");
	}

	// Active suppression du message par "click"
	//
	static hideMessageOnClick() {
		document.querySelector("#resultMessage > i").addEventListener("click", () => {
			return this.hideMessage();
		});
	}
}
