"use strict";
import Builder from "../page/Builder.js";
import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Messages from "../page/Msg.js";
import Search from "../search/Search.js";
import Tag from "../page/Tag.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import Appliances from "./Appliances.js";
import Ingredients from "./Ingredients.js";
import { result } from "../main.js";

export default class Ustensils {
	static ustensilsExample = document.getElementById("ustensilesExample");

// appelé par builder pour afficher ttes les recettes (init) ou le résultat d'une recherche générale (initSearch)
	static init() {
		Utils.clearFilters(this.ustensilsExample);
		Button.launchButtons(
			document.querySelector("#ustensiles > button"),
			document.querySelector("#openUstensilesFilter"),
			document.querySelector("#closeUstensilesFilter"),
			document.querySelector("#hiddenUstensilesFilter")
		);
		let ustensilsSorted = Utils.sortByTitle(result.ustensils);
		this.fillUstensils(ustensilsSorted);  
		this.searchInput();  
		//this.filterTags(result.recipesMatched);
	}

	// affiche la liste des ustensils sélectionnés dans le tag ustensil 
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

	// autorise la recherche pour les ustensils dans l'input du tag ustensils
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

	// Fonction filtre Ingrédients
	//
	static filterTags() {
		//let ustensileTag = document.getElementById("ustensileTag");
		//console.log("USTENSILS - FILTAGINIT / selectedUst :",result.selectedUst);

	//	Ecoute sur le bouton Ingrédients et ajout d'un tag ustensils
	//		
		document.querySelector("#ustensilesExample").addEventListener("click", (event) => {
			
			//?
			//let classValue = event.target.classList.value;
			let ustTag = event.target.getAttribute("data-filter");
			var myIndex = result.selectedUst.indexOf(ustTag);

			// teste si le tag a déjà été sélectionné (existe dans selectedApp?) et s'il existe
			if (myIndex === -1 && ustTag !== null ) {    			
				//console.log("USTENSILS - AJ / result:",result.recipesMatched);
				//console.log("USTENSILS - AJAV / selectedUst :",result.selectedUst);
				event.target.classList.add("result.selectedUst");
			
				// ajout de l'ustensil dans selectedUst
				result.selectedUst.push(ustTag);
				//console.log("USTENSILS - AJAP / selectedUst: ",result.selectedUst);
			
			// suppression du bouton Ingrédients
				Button.hideButtonsOnClick(
					document.querySelector("#ustensiles > button"),
					document.querySelector("#openUstensilesFilter"),
					document.querySelector("#hiddenUstensilesFilter")
				);
			
			// Affichage des tags sous la barre de recherche principale
			// 
				let tagList = document.getElementById("tagUstList");
				// suppression des tags de la recherche précédente
				tagList.innerHTML='';
				// Boucle sur les tags sélectionnés
				for (let i = 0 ; i<result.selectedUst.length ; i++) {
					if (result.selectedUst[i] !== "") {
						// Création du tag i pour html
						var eltTag = document.createElement("span");
						eltTag.setAttribute("id",result.selectedUst[i]);
						eltTag.setAttribute("class","eltTagUst");
						//Tag.buildTags(ustensileTag,result.selectedUst,i).pushDownButtonsFilter();
						eltTag.innerHTML = result.selectedUst[i] + ` <i class='far fa-times-circle'></i>`;
						//document.querySelector("#result.selectedUst[i]").addEventListener("click", console.log("add:",i));
						tagList.appendChild(eltTag);
						// pour test addEvent
						//document.getElementById(result.selectedUst[i]).addEventListener("click", function() {console.log("list",i)});
						//console.log("addevent:",i,result.selectedUst[i]);
						document.getElementById(result.selectedUst[i]).addEventListener("click", () => {this.removeTag(result.selectedUst[i])});
					}
				};

				// Recherche des recettes qui correspondent aux tags de selectedUst pour maj de result
				Search.searchByUstTags(result.selectedUst);
				//console.log("USTENSILS 0/ selectedUst:", result.selectedUst)
				//console.log("USTENSILS 1/ recpesMatched:", result.recipesMatched)


				// Effacement des recettes et affichages des recettes sélectionnées + message sur la page
				Utils.clearRecipes();
				Display.buildResult(result.recipesMatched);
				//console.log("USTENSILS 2/ recpesMatched:", result.recipesMatched)

				Messages.buildResultMessageWithResult(result.recipesMatched);
				//console.log("USTENSILS 3/ recpesMatched:", result.recipesMatched)


				// maj des listes des 3 filtres
				Utils.clearFilters(this.ustensilsExample);
				this.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
				Utils.clearFilters(Appliances.appliancesExample);
				Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
				Utils.clearFilters(Ingredients.ingredientsExample);
				Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
			} else {
				Button.hideButtonsOnClick(
					document.querySelector("#ustensiles > button"),
					document.querySelector("#openUstensilesFilter"),
					document.querySelector("#hiddenUstensilesFilter")
				);
			}
		});
	}

	// Fonction suppression d'un tag
	//
	static removeTag(tagSelected) {
		//console.log("USTENSILS - SUP: OK");
		//console.log("USTENSILS - SUP.AV / selectedUst:", result.selectedUst)
		//console.log("USTENSILS - SUP.AV / tagSelected:", tagSelected)

		// Suppresion de l'affichage du tag
		//Tag.hideTag(tagSelected); //old
		let tagRemoved = document.getElementById(tagSelected);
		//let aa = tagRemoved.className
		//console.log("SSSSSSS:",aa)
		tagRemoved.setAttribute("style","display:none")
		tagRemoved.innerHTML='';
		// maj de selectedUst après suppresion du tag
		var myIndex = result.selectedUst.indexOf(tagSelected);
		if (myIndex !== -1) {
    		result.selectedUst.splice(myIndex, 1,"");
		}
		//???? event.target.classList.remove("result.selectedUst"); //???
		//console.log("USTENSILS - SUP.AP / selectedUst:", result.selectedUst)
		let tabVide = true;
		if(result.selectedUst.length!==0){
			for (let i=0 ; i<result.selectedUst.length ; i++) {
				if(result.selectedUst[i] !== ""){
					tabVide = false
					//console.log("vide:",tabVide);
				}
			}
			if(tabVide){
				result.selectedUst.splice(0,result.selectedUst.length);
				//console.log("ress:",result.selectedUst);
			}
		}
		//console.log("USTENSILS - SUP.APVIDE / selectedUst:", result.selectedUst)

		// Relance de la recherche des recettes pour maj de result
		//
		// lecture de la valeur input de recherche générale
		let valueSearch = document.getElementById("searchBarInput").value;
		//console.log("USTENSILS - SUPRECHGEN  / valueSearch:", valueSearch)
		// recherche générale avec input pour maj de results, sinon recipes
		if (Utils.Valid(valueSearch)) {
			Search.searchMainInput(valueSearch);						
			//console.log("USTENSILS - SUPRECHGEN / recipesMatched",result);
			Builder.initSearch();
		} else {
			result.recipesMatched = recipes;
			result.ingredients= Data.getAllIngredients(recipes);
			result.appliances= Data.getAllAppliances(recipes);
			result.ustensils= Data.getAllUstensils(recipes);
		}

		// Recherche des recettes avec App/Ust (non modifiés)
		Search.searchByAppTags(result.selectedApp);
		Search.searchByIngTags(result.selectedIng);

		// recherche par tags ustensils dans selectedUst pour maj de result
		Search.searchByUstTags(result.selectedUst);
		//console.log("USTENSILS - SUPRECHTAG / result",result);
		// Effacement des recettes affichées
		Utils.clearRecipes();
		// Affichage des recettes sélectionnées
		Display.buildResult(result.recipesMatched);
		//console.log("USTENSILS - SUPRECHTAG / recettes filtrées:", result.recipesMatched)
		// Affichage du nbre de recettes
		Messages.buildResultMessageWithResult(result.recipesMatched);
		// maj des listes des tags
		Utils.clearFilters(this.ustensilsExample);
		this.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
		Utils.clearFilters(Appliances.appliancesExample);
		Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
		Utils.clearFilters(Ingredients.ingredientsExample);
		Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
	}

}
