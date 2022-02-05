"use strict";
import Builder from "../page/Builder.js";
import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Messages from "../page/Msg.js";
import Search from "../search/Search.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import Ingredients from "./Ingredients.js";
import Ustensils from "./Ustensils.js";
import { result } from "../main.js";

export default class Appliances {
	static appliancesExample = document.getElementById("appareilExample");

	// Initialisation (builder.init) ou maj (builder.iniSearch) de la liste des appareils dans filtre
	//
	static init() {
		Utils.clearFilters(this.appliancesExample);
		Button.launchButtons(
			document.querySelector("#appareil > button"),
			document.querySelector("#openAppareilFilter"),
			document.querySelector("#closeAppareilFilter"),
			document.querySelector("#hiddenAppareilFilter")
		);
		// Tri des appareils par ordre alpha. et association html pour liste du filtre
		let appliancesSorted = Utils.sortByTitle(result.appliances);
		this.fillAppliances(appliancesSorted);
		// Maj de la liste du filtre selon input dans sa barre de recherche  
		this.searchInput();  
	}

	// HTML de la liste des appareils du filtre
	//
	static fillAppliances(appliancesSorted) {
		let ul = document.createElement("ul");
		ul.classList.add("listUlApp");
		this.appliancesExample.appendChild(ul);
		appliancesSorted.forEach((appliance) => {
			let listAppliances = document.createElement("li");
			ul.appendChild(listAppliances);
			listAppliances.innerHTML = `${Utils.upperText(appliance)}`;
			listAppliances.classList.add("list-appareil");
			listAppliances.setAttribute("data-filter", `${appliance}`);
		});
	}

	// Recherche de input dans la liste des appareils du filtre et maj de la liste
	//
	static searchInput() {
		document.getElementById("inputAppareil").addEventListener("keyup", (key) => {
			let valueSearch = key.target.value;
			Utils.clearFilters(this.appliancesExample);
			this.fillAppliances(
				Utils.Valid(valueSearch)
					? Search.searchInputFilters(result.appliances, valueSearch)
					: Utils.sortByTitle(result.appliances)
			);
		});
	}
	// Filtre les recettes en fonction des appareils sélectionnés: 
	//		> sélection d'un item dans la liste des appareils, affichage des tags et des recettes

	static filterTags() {

	//	Ecoute sur le bouton Appareils
		document.querySelector("#appareilExample").addEventListener("click", (event) => {
			let appTag = event.target.getAttribute("data-filter");
			var myIndex = result.selectedApp.indexOf(appTag);
			
			// Teste si l'item n'est pas sélectionné (existe dans selectedApp?) et s'il existe (pb hors liste)
			if (myIndex === -1 && appTag !== null ) {   			
				event.target.classList.add("result.selectedApp");
				// Ajout de l'item dans selectedApp
				result.selectedApp.push(appTag);
				// Fermeture affichage liste après sélection de l'item
				Button.hideButtonsOnClick(
					document.querySelector("#appareil > button"),
					document.querySelector("#openAppareilFilter"),
					document.querySelector("#hiddenAppareilFilter")
				);
				// Pour affichage des tags sous la barre de recherche principale
				let tagList = document.getElementById("tagAppList");
				// Suppression des tags de la recherche précédente
				tagList.innerHTML='';
				// Affichage des tags pour les items sélectionnés
				for (let i = 0 ; i<result.selectedApp.length ; i++) {
					if (result.selectedApp[i] !== "") {
						// Création du tag i pour html
						var eltTag = document.createElement("span");
						eltTag.setAttribute("id",result.selectedApp[i]);
						eltTag.setAttribute("class","eltTagApp");
						eltTag.innerHTML = result.selectedApp[i] + "&nbsp&nbsp&nbsp" + ` <i class='far fa-times-circle'></i>`;
						tagList.appendChild(eltTag);
						document.getElementById(result.selectedApp[i]).addEventListener("click", () => {this.removeTag(result.selectedApp[i])});
					}
				};
				// Recherche des recettes qui correspondent aux items dans selectedIng et MAJ de result
				Search.searchByAppTags(result.selectedApp);
							// Effacement des anciennes recettes et affichages des recettes sélectionnées + message nbre de recettes
				Utils.clearRecipes();
				Display.buildResult(result.recipesMatched);
				Messages.buildResultMessageWithResult(result.recipesMatched);
			
				// maj des listes des 3 filtres
				Utils.clearFilters(this.appliancesExample);
				this.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
				Utils.clearFilters(Ingredients.ingredientsExample);
				Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
				Utils.clearFilters(Ustensils.ustensilsExample);
				Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
			} else {
				// Si item déjà sélectionné ou n'existe pas on ferme la liste
				Button.hideButtonsOnClick(
					document.querySelector("#appareil > button"),
					document.querySelector("#openAppareilFilter"),
					document.querySelector("#hiddenAppareilFilter")
				);
			}
		});
	}

	// Supprime un item appareil par suppression de son tag (tagSelected) et refait une recherche 
	//
	static removeTag(tagSelected) {

		// Supprime le tag affiché
		let tagRemoved = document.getElementById(tagSelected);
		tagRemoved.setAttribute("style","display:none")
		tagRemoved.innerHTML='';
		// Maj de selectedApp après suppresion du tag: item > ""
		var myIndex = result.selectedApp.indexOf(tagSelected);
		if (myIndex !== -1) {
    		result.selectedApp.splice(myIndex, 1,"");
		}
		// Si selectApp ne contient que des "" alors on le vide
		let tabVide = true;
		if(result.selectedApp.length!==0) {
			for (let i=0 ; i<result.selectedApp.length ; i++) {
				if(result.selectedApp[i] !== "") {
					tabVide = false;
				}
			}
			if(tabVide){
				result.selectedApp.splice(0,result.selectedApp.length);
			}
		}

		// Relance de la recherche des recettes pour maj de result
		//
		// Lecture de la valeur input de la barre de recherche générale
		let valueSearch = document.getElementById("searchBarInput").value;
		// Recherche générale avec input de 3 caractères et maj de results
		if (Utils.Valid(valueSearch)) {
			Search.searchMainInput(valueSearch);						
			Builder.initSearch();
		} else {
			result.recipesMatched = recipes;
			result.ingredients= Data.getAllIngredients(recipes);
			result.appliances= Data.getAllAppliances(recipes);
			result.ustensils= Data.getAllUstensils(recipes);
		}

		// Sélection des recettes avec les tags de Ing/Ust (items non modifiés)
		Search.searchByIngTags(result.selectedIng);
		Search.searchByUstTags(result.selectedUst);
		// Sélection des recettes avec les tags appareils restants et maj de result
		Search.searchByAppTags(result.selectedApp);
		// Effacement des anciennes recettes, affichage des recettes sélectionnées et de leur nbre 
		Utils.clearRecipes();
		Display.buildResult(result.recipesMatched);
		Messages.buildResultMessageWithResult(result.recipesMatched);
		// maj des listes des filtres
		Utils.clearFilters(this.appliancesExample);
		this.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
		Utils.clearFilters(Ingredients.ingredientsExample);
		Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
		Utils.clearFilters(Ustensils.ustensilsExample);
		Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
	}
}