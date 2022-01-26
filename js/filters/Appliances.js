"use strict";
import Builder from "../page/Builder.js";
import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Messages from "../page/Msg.js";
import Search from "../search/Search.js";
import Tag from "../page/Tag.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";
import Ingredients from "./Ingredients.js";
import Ustensils from "./Ustensils.js";
import { result } from "../main.js";

export default class Appliances {
	static appliancesExample = document.getElementById("appareilExample");

// appelé par builder pour afficher ttes les recettes (init) ou le résultat d'une recherche générale (initSearch)
	static init() {
		Utils.clearFilters(this.appliancesExample);
		Button.launchButtons(
			document.querySelector("#appareil > button"),
			document.querySelector("#openAppareilFilter"),
			document.querySelector("#closeAppareilFilter"),
			document.querySelector("#hiddenAppareilFilter")
		);
		let appliancesSorted = Utils.sortByTitle(result.appliances);
		this.fillAppliances(appliancesSorted);  
		this.searchInput();  
		//this.filterTags(result.recipesMatched);
	}

	// affiche la liste des appareils sélectionnés dans le tag appareils 
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

	// autorise la recherche pour les appareils dans l'input du tag appareil
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

	// Fonction filtre Appareils
	//
	static filterTags() {
		//let appareilTag = document.getElementById("appareilTag");
		//console.log("APPLIANCES - FILTAGINIT / selectedApp :",result.selectedApp);

	//	Ecoute sur le bouton Appareils et ajout d'un tag appareil
	//		
		document.querySelector("#appareilExample").addEventListener("click", (event) => {
			
			//?
			//let classValue = event.target.classList.value;
			let appTag = event.target.getAttribute("data-filter");
			var myIndex = result.selectedApp.indexOf(appTag);

			// teste si le tag a déjà été sélectionné (existe dans selectedApp?) et s'il existe
			if (myIndex === -1 && appTag !== null ) {  			
				//console.log("APPLIANCES - AJ / result:",result.recipesMatched);
				//console.log("APPLIANCES - AJAV / selectedApp :",result.selectedApp);
				event.target.classList.add("result.selectedApp");
			
				// ajout de l'appareil dans selectedApp
				result.selectedApp.push(appTag);
				//console.log("APPLIANCES - AJAP / selectedApp: ",result.selectedApp);
			
			// suppression du bouton Appareils
				Button.hideButtonsOnClick(
					document.querySelector("#appareil > button"),
					document.querySelector("#openAppareilFilter"),
					document.querySelector("#hiddenAppareilFilter")
				);
			
			// Affichage des tags sous la barre de recherche principale
			// 
				let tagList = document.getElementById("tagAppList");
				// suppression des tags de la recherche précédente
				tagList.innerHTML='';
				// Boucle sur les tags sélectionnés
				for (let i = 0 ; i<result.selectedApp.length ; i++) {
					if (result.selectedApp[i] !== "") {
						// Création du tag i pour html
						var eltTag = document.createElement("span");
						eltTag.setAttribute("id",result.selectedApp[i]);
						eltTag.setAttribute("class","eltTagApp");
						//Tag.buildTags(appareilTag,result.selectedApp,i).pushDownButtonsFilter();
						eltTag.innerHTML = result.selectedApp[i] + ` <i class='far fa-times-circle'></i>`;
						//document.querySelector("#result.selectedApp[i]").addEventListener("click", console.log("add:",i));
						tagList.appendChild(eltTag);
						// pour test addEvent
						//document.getElementById(result.selectedApp[i]).addEventListener("click", function() {console.log("list",i)});
						//console.log("addevent:",i,result.selectedApp[i]);
						document.getElementById(result.selectedApp[i]).addEventListener("click", () => {this.removeTag(result.selectedApp[i])});
					}
				};

				// Recherche des recettes qui correspondent aux tags de selectedApp pour maj de result
				Search.searchByAppTags(result.selectedApp);
			
				// Effacement des recettes et affichages des recettes sélectionnées + message sur la page
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
				Button.hideButtonsOnClick(
					document.querySelector("#appareil > button"),
					document.querySelector("#openAppareilFilter"),
					document.querySelector("#hiddenAppareilFilter")
				);
			}
		});
	}

	// Fonction suppression d'un tag
	//
	static removeTag(tagSelected) {
		//console.log("APPLIANCES - SUP: OK");
		//console.log("APPLIANCES - SUP.AV / selectedApp:", result.selectedApp)
		//console.log("APPLIANCES - SUP.AV / tagSelected:", tagSelected)

		// Suppresion de l'affichage du tag
		//Tag.hideTag(tagSelected); //old
		let tagRemoved = document.getElementById(tagSelected);
		//let aa = tagRemoved.className
		//console.log("SSSSSSS:",aa)
		tagRemoved.setAttribute("style","display:none")
		tagRemoved.innerHTML='';
		// maj de selectedApp après suppresion du tag
		var myIndex = result.selectedApp.indexOf(tagSelected);
		if (myIndex !== -1) {
    		result.selectedApp.splice(myIndex, 1,"");
		}
		//???? event.target.classList.remove("result.selectedApp"); //???
		//console.log("APPLIANCES - SUP.AP / selectedApp:", result.selectedApp)
		let tabVide = true;
		if(result.selectedApp.length!==0){
			for (let i=0 ; i<result.selectedApp.length ; i++) {
				if(result.selectedApp[i] !== ""){
					tabVide = false
					//console.log("vide:",tabVide);
				}
			}
			if(tabVide){
				result.selectedApp.splice(0,result.selectedApp.length);
				//console.log("ress:",result.selectedApp);
			}
		}
		//console.log("APPLIANCES - SUP.APVIDE / selectedApp:", result.selectedApp)

		// Relance de la recherche des recettes pour maj de result
		//
		// lecture de la valeur input de recherche générale
		let valueSearch = document.getElementById("searchBarInput").value;
		//console.log("APPLIANCES - SUPRECHGEN  / valueSearch:", valueSearch)
		// recherche générale avec input pour maj de results, sinon recipes
		if (Utils.Valid(valueSearch)) {
			Search.searchMainInput(valueSearch);						
			//console.log("APPLIANCES - SUPRECHGEN / recipesMatched",result);
			Builder.initSearch();
		} else {
			result.recipesMatched = recipes;
			result.ingredients= Data.getAllIngredients(recipes);
			result.appliances= Data.getAllAppliances(recipes);
			result.ustensils= Data.getAllUstensils(recipes);
		}

		// Recherche des recettes avec App/Ust (non modifiés)
		Search.searchByIngTags(result.selectedIng);
		Search.searchByUstTags(result.selectedUst);

		// recherche par tags appareils dans selectedApp pour maj de result
		Search.searchByAppTags(result.selectedApp);
		//console.log("APPLIANCES - SUPRECHTAG / result",result);
		// Effacement des recettes affichées
		Utils.clearRecipes();
		// Affichage des recettes sélectionnées
		Display.buildResult(result.recipesMatched);
		//console.log("APPLIANCES - SUPRECHTAG / recettes filtrées:", result.recipesMatched)
		// Affichage du nbre de recettes
		Messages.buildResultMessageWithResult(result.recipesMatched);
		// maj des listes des tags
		Utils.clearFilters(this.appliancesExample);
		this.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
		Utils.clearFilters(Ingredients.ingredientsExample);
		Ingredients.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
		Utils.clearFilters(Ustensils.ustensilsExample);
		Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
	}

}
