"use strict";
import Builder from "../page/Builder.js";
import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Messages from "../page/Msg.js";
import Search from "../search/Search.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import Appliances from "./Appliances.js";
import Ustensils from "./Ustensils.js";
import { result } from "../main.js";

export default class Ingredients {
	static ingredientsExample = document.getElementById("ingredientsExample");

	// Initialisation (builder.init) ou maj (builder.iniSearch) de la liste des ingrédients dans filtre
	//
	static init() {
		Utils.clearFilters(this.ingredientsExample);
		Button.launchButtons(
			document.querySelector("#ingredients > button"),
			document.querySelector("#openIngredientsFilter"),
			document.querySelector("#closeIngredientsFilter"),
			document.querySelector("#hiddenIngredientsFilter")
		);
		// Tri des ingrédients par ordre alpha. et association html pour liste du filtre
		let ingredientsSorted = Utils.sortByTitle(result.ingredients);
		this.fillIngredients(ingredientsSorted);
		// Maj de la liste du filtre selon input dans sa barre de recherche  
		this.searchInput();  
	}

	// HTML de la liste des ingrédients du filtre
	//
	static fillIngredients(ingredientsSorted) {
		let ul = document.createElement("ul");
		ul.classList.add("listUlIng");
		this.ingredientsExample.appendChild(ul);
		ingredientsSorted.forEach((ingredient) => {
			let listIngredients = document.createElement("li");
			ul.appendChild(listIngredients);
			listIngredients.innerHTML = `${Utils.upperText(ingredient)}`;
			listIngredients.classList.add("list-ingredients");
			listIngredients.setAttribute("data-filter", `${ingredient}`);
		});
	}

	// Recherche de input dans la liste des ingrédents du filtre et maj de la liste
	//
	static searchInput() {
		document.getElementById("inputIngredients").addEventListener("keyup", (key) => {
			let valueSearch = key.target.value;
			Utils.clearFilters(this.ingredientsExample);
			this.fillIngredients(
				Utils.Valid(valueSearch)
					? Search.searchInputFilters(result.ingredients, valueSearch)
					: Utils.sortByTitle(result.ingredients)
			);
		});
	}

	// Filtre les recettes en fonction des ingrédients sélectionnés: 
	//		> sélection d'un item dans la liste des ingrédients, affichage des tags et des recettes
	static filterTags() {

		//	Ecoute sur le bouton Ingrédients 
		document.querySelector("#ingredientsExample").addEventListener("click", (event) => {
			let ingTag = event.target.getAttribute("data-filter");
			var myIndex = result.selectedIng.indexOf(ingTag);

			// Teste si l'item n'est pas sélectionné (existe dans selectedIng?) et s'il existe (pb hors liste)
			if (myIndex === -1 && ingTag !== null ) {   			   			
				event.target.classList.add("result.selectedIng");
				// Ajout de l'item dans selectedIng
				result.selectedIng.push(ingTag);
				// Fermeture affichage liste après sélection de l'item
				Button.hideButtonsOnClick(
					document.querySelector("#ingredients > button"),
					document.querySelector("#openIngredientsFilter"),
					document.querySelector("#hiddenIngredientsFilter")
				);
				// Pour affichage des tags sous la barre de recherche principale
				let tagList = document.getElementById("tagIngList");
				// Suppression des tags de la recherche précédente
				tagList.innerHTML='';
				// Affichage des tags pour les items sélectionnés
				for (let i = 0 ; i<result.selectedIng.length ; i++) {
					if (result.selectedIng[i] !== "") {
						// Création du tag i pour html
						var eltTag = document.createElement("span");
						eltTag.setAttribute("id",result.selectedIng[i]);
						eltTag.setAttribute("class","eltTagIng");
						eltTag.innerHTML = result.selectedIng[i] + "&nbsp&nbsp&nbsp" + "<i class='far fa-times-circle'></i>";
						tagList.appendChild(eltTag);
						document.getElementById(result.selectedIng[i]).addEventListener("click", () => {this.removeTag(result.selectedIng[i])});
					}
				};
				// Recherche des recettes qui correspondent aux items dans selectedIng et MAJ de result
				Search.searchByIngTags(result.selectedIng);
				// Effacement des anciennes recettes et affichages des recettes sélectionnées + message nbre de recettes
				Utils.clearRecipes();
				Display.buildResult(result.recipesMatched);
				Messages.buildResultMessageWithResult(result.recipesMatched);
				// Maj des listes des 3 filtres
				Utils.clearFilters(this.ingredientsExample);
				this.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
				Utils.clearFilters(Appliances.appliancesExample);
				Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
				Utils.clearFilters(Ustensils.ustensilsExample);
				Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
			} else {
				// Si item déjà sélectionné ou n'existe pas on ferme la liste
				Button.hideButtonsOnClick(
					document.querySelector("#ingredients > button"),
					document.querySelector("#openIngredientsFilter"),
					document.querySelector("#hiddenIngredientsFilter")
				);
			}
		});
	}

	// Supprime un item ingrédient par suppression de son tag (tagSelected) et refait une recherche 
	//
	static removeTag(tagSelected) {

		// Supprime le tag affiché
		let tagRemoved = document.getElementById(tagSelected);
		tagRemoved.setAttribute("style","display:none")
		tagRemoved.innerHTML='';
		// Maj de selectedIng après suppresion du tag: item > ""
		var myIndex = result.selectedIng.indexOf(tagSelected);
		if (myIndex !== -1) {
    		result.selectedIng.splice(myIndex, 1,"");
		}
		// Si selectIng ne contient que des "" alors on le vide
		let tabVide = true;
		if(result.selectedIng.length!==0) {
			for (let i=0 ; i<result.selectedIng.length ; i++) {
				if(result.selectedIng[i] !== "") {
					tabVide = false;
				}
			}
			if(tabVide) {
				result.selectedIng.splice(0,result.selectedIng.length);
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

		// Sélection des recettes avec les tags de App/Ust (items non modifiés)
		Search.searchByAppTags(result.selectedApp);
		Search.searchByUstTags(result.selectedUst);
		// Sélection des recettes avec les tags ingrédients restants et maj de result
		Search.searchByIngTags(result.selectedIng);
		// Effacement des anciennes recettes, affichage des recettes sélectionnées et de leur nbre 
		Utils.clearRecipes();
		Display.buildResult(result.recipesMatched);
		Messages.buildResultMessageWithResult(result.recipesMatched);
		// Maj des listes des filtres
		Utils.clearFilters(this.ingredientsExample);
		this.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
		Utils.clearFilters(Appliances.appliancesExample);
		Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
		Utils.clearFilters(Ustensils.ustensilsExample);
		Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
	}
}
