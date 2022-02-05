"use strict";

export default class Badges {

	static hiddenIngredientsFilter = document.querySelector("#hiddenIngredientsFilter");
	static hiddenAppareilFilter = document.querySelector("#hiddenAppareilFilter");
	static hiddenUstensilesFilter = document.querySelector("#hiddenUstensilesFilter");

	// Affiche le tag "elt" pour l'item selected[i] (=selectedIng/App/Ust)
	//
	static buildTags(elt, selected,i){
		//this.pushDownButtonsFilter();
		this.displayTag(elt); 
		this.fillTag(elt, selected[i]);
		return this;
	}

	// Affiche le tag vide
	//
	static displayTag(elt) {
		return (elt.style.display = "flex");
	}

	// Affiche l'intérieur du tag
	//
	static fillTag(elt, tag) {
		return (elt.innerHTML = tag + `<i class='far fa-times-circle'></i>`);
	}

	// Supprime le tag "elt"
	//
	static hideTag(elt) {
		this.pushUpButtonsFilter();
		return (elt.style.display = "none");
	}

	// Baisse les bouttons des filtres pour affichage des tags
	//
	static pushDownButtonsFilter() {
		this.hiddenIngredientsFilter.style.top = "20rem";
		this.hiddenAppareilFilter.style.top = "20rem";
		this.hiddenUstensilesFilter.style.top = "20rem";
	}

	// Monte les bouttons des filtres quand il n'y a pas de tag
	//
	static pushUpButtonsFilter() {
		this.hiddenIngredientsFilter.style.top = "16.2rem";
		this.hiddenAppareilFilter.style.top = "16.2rem";
		this.hiddenUstensilesFilter.style.top = "16.2rem";
	}
}