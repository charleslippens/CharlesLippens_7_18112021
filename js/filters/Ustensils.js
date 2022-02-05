"use strict";
import Builder from "../page/Builder.js";
import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Messages from "../page/Msg.js";
import Search from "../search/Search.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import Appliances from "./Appliances.js";
import Ingredients from "./Ingredients.js";
import { result } from "../main.js";

export default class Ustensils {
	static ustensilsExample = document.getElementById("ustensilesExample");

	// Initialisation (builder.init) ou maj (builder.iniSearch) de la liste des ustensiles dans filtre
	//	
	static init() {
		Utils.clearFilters(this.ustensilsExample);
		Button.launchButtons(
			document.querySelector("#ustensiles > button"),
			document.querySelector("#openUstensilesFilter"),
			document.querySelector("#closeUstensilesFilter"),
			document.querySelector("#hiddenUstensilesFilter")
		);
		// Tri des ustensiles par ordre alpha. et association html pour liste du filtre
		let ustensilsSorted = Utils.sortByTitle(result.ustensils);
		this.fillUstensils(ustensilsSorted);
		// Maj de la liste du filtre selon input dans sa barre de recherche  
 		this.searchInput();  
	}

	// HTML de la liste des ustensiles du filtre
	//	
	static fillUstensils(ustensilsSorted) {
		let ul = document.createElement("ul");
		ul.classList.add("listUlUst");
		this.ustensilsExample.appendChild(ul);
		ustensilsSorted.forEach((ustensile) => {
			let listUstensils = document.createElement("li");
			ul.appendChild(listUstensils);
			listUstensils.innerHTML = `${Utils.upperText(ustensile)}`;
			listUstensils.classList.add("list-ustensiles");
			listUstensils.setAttribute("data-filter", `${ustensile}`);
		});
	}

	// Recherche de input dans la liste des ustensiles du filtre et maj de la liste
	//
	static searchInput() {
		document.getElementById("inputUstensiles").addEventListener("keyup", (key) => {
			let valueSearch = key.target.value;
			Utils.clearFilters(this.ustensilsExample);
			this.fillUstensils(
				Utils.Valid(valueSearch)
					? Search.searchInputFilters(result.ustensils, valueSearch)
					: Utils.sortByTitle(result.ustensils)
			);
		});
	}

	// Filtre les recettes en fonction des ustensiles sélectionnés: 
	//		> sélection d'un item dans la liste des ustensiles, affichage des tags et des recettes
	static filterTags() {

		//	Ecoute sur le bouton Ustensiles
		document.querySelector("#ustensilesExample").addEventListener("click", (event) => {
			let ustTag = event.target.getAttribute("data-filter");
			var myIndex = result.selectedUst.indexOf(ustTag);

			// Teste si l'item n'est pas sélectionné (existe dans selectedApp?) et s'il existe (pb hors liste)
			if (myIndex === -1 && ustTag !== null ) {   				
				event.target.classList.add("result.selectedUst");
				// Ajout de l'item dans selectedIng
				result.selectedUst.push(ustTag);
				// Fermeture affichage liste après sélection de l'item
				Button.hideButtonsOnClick(
					document.querySelector("#ustensiles > button"),
					document.querySelector("#openUstensilesFilter"),
					document.querySelector("#hiddenUstensilesFilter")
				);
				// Pour affichage des tags sous la barre de recherche principale
				let tagList = document.getElementById("tagUstList");
				// Suppression des tags de la recherche précédente
				tagList.innerHTML='';
				// Boucle sur les tags sélectionnés
				for (let i = 0 ; i<result.selectedUst.length ; i++) {
					if (result.selectedUst[i] !== "") {
						// Création du tag i pour html
						var eltTag = document.createElement("span");
						eltTag.setAttribute("id",result.selectedUst[i]);
						eltTag.setAttribute("class","eltTagUst");
						eltTag.innerHTML = result.selectedUst[i] + "&nbsp&nbsp&nbsp" + ` <i class='far fa-times-circle'></i>`;
						tagList.appendChild(eltTag);
						document.getElementById(result.selectedUst[i]).addEventListener("click", () => {this.removeTag(result.selectedUst[i])});
					}
				};
				// Recherche des recettes qui correspondent aux tags de selectedUst pour maj de result
				Search.searchByUstTags(result.selectedUst);
				// Effacement des anciennes recettes et affichages des recettes sélectionnées + message nbre de recettes
				Utils.clearRecipes();
				Display.buildResult(result.recipesMatched);
				Messages.buildResultMessageWithResult(result.recipesMatched);
				// Maj des listes des 3 filtres
				Utils.clearFilters(this.ustensilsExample);
				this.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
				Utils.clearFilters(Appliances.appliancesExample);
				Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
				Utils.clearFilters(Ingredients.ingredientsExample);
				Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
			} else {
				// Si item déjà sélectionné ou n'existe pas on ferme la liste
				Button.hideButtonsOnClick(
					document.querySelector("#ustensiles > button"),
					document.querySelector("#openUstensilesFilter"),
					document.querySelector("#hiddenUstensilesFilter")
				);
			}
		});
	}

	// Supprime un item ustensile par suppression de son tag (tagSelected) et refait une recherche 
	//
	static removeTag(tagSelected) {

		// Supprime le tag affiché
		let tagRemoved = document.getElementById(tagSelected);
		tagRemoved.setAttribute("style","display:none")
		tagRemoved.innerHTML='';
		// Maj de selectedUst après suppresion du tag: item > ""
		var myIndex = result.selectedUst.indexOf(tagSelected);
		if (myIndex !== -1) {
    		result.selectedUst.splice(myIndex, 1,"");
		}
		// Si selectUst ne contient que des "" alors on le vide
		let tabVide = true;
		if(result.selectedUst.length!==0) {
			for (let i=0 ; i<result.selectedUst.length ; i++) {
				if(result.selectedUst[i] !== "") {
					tabVide = false;
				}
			}
			if(tabVide){
				result.selectedUst.splice(0,result.selectedUst.length);
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
			// sinon on met toutes les recettes dans result
			result.recipesMatched = recipes;
			result.ingredients= Data.getAllIngredients(recipes);
			result.appliances= Data.getAllAppliances(recipes);
			result.ustensils= Data.getAllUstensils(recipes);
		}

		// Sélection des recettes avec les tags de App/Ing (items non modifiés)
		Search.searchByAppTags(result.selectedApp);
		Search.searchByIngTags(result.selectedIng);
		// Sélection des recettes avec les tags ustensiles restants et maj de result
		Search.searchByUstTags(result.selectedUst);
		// Effacement des anciennes recettes, affichage des recettes sélectionnées et de leur nbre 
		Utils.clearRecipes();
		Display.buildResult(result.recipesMatched);
		Messages.buildResultMessageWithResult(result.recipesMatched);
		// Maj des listes des filtres
		Utils.clearFilters(this.ustensilsExample);
		this.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
		Utils.clearFilters(Appliances.appliancesExample);
		Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
		Utils.clearFilters(Ingredients.ingredientsExample);
		Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
	}
}
