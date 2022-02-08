"use strict";

export default class Utils {
	
	// La recherche générale débute à partir de 3 caractères ou plus
	//
	static Valid(value) {
		return value.length > 2;
	}

	// Efface les recettes
	//
	static clearRecipes() {
		return (document.getElementById("mainContent").innerHTML = "");
	}

	// Efface la liste du filtre "elt"
	//
	static clearFilters(elt) {
		return (elt.innerHTML = "");
	}

	// Normalisation et passage en minuscule de la chaine "text"
	//
	static normalizeText(text) {
		return text
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
	}

	// Normalisation et majuscule 1er caractère de la chaine "text"
	//
	static upperText(text) {
		return (
			text
				.charAt(0)
				.toUpperCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "") +
			text
				.substring(1)
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
		);
	}

	// Tri alphabétique de "array" > "arraySort"
	//
	static sortByTitle(array) {
		let arrayNoSort = [...new Set(array)];
		let arraySort = arrayNoSort.sort((a, b) => {
			if (a.toLowerCase() < b.toLowerCase()) {
				return -1;
			} else if (a.toLowerCase() > b.toLowerCase()) {
				return 1;
			}
		});
		return arraySort;
	}
}
