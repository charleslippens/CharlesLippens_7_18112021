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
import Ustensils from "./Ustensils.js";
import { result } from "../main.js";

export default class Ingredients {
	static ingredientsExample = document.getElementById("ingredientsExample");

// appelé par builder pour afficher ttes les recettes (init) ou le résultat d'une recherche générale (initSearch)
	static init() {
		Utils.clearFilters(this.ingredientsExample);
		Button.launchButtons(
			document.querySelector("#ingredients > button"),
			document.querySelector("#openIngredientsFilter"),
			document.querySelector("#closeIngredientsFilter"),
			document.querySelector("#hiddenIngredientsFilter")
		);
		let ingredientsSorted = Utils.sortByTitle(result.ingredients);
		this.fillIngredients(ingredientsSorted);  
		this.searchInput();  
		//this.filterTags(result.recipesMatched);
	}

	// affiche la liste des ingrédients sélectionnés dans le tag ingrédient 
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

	// autorise la recherche pour les ingrédents dans l'input du tag ingrédients
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

	// Fonction filtre Ingrédients
	//
	static filterTags() {
		//let ingredientTag = document.getElementById("ingredientTag");
		//console.log("INGREDIENTS - FILTAGINIT / selectedIng :",result.selectedIng);

	//	Ecoute sur le bouton Ingrédients et ajout d'un tag ingrédient
	//		
		document.querySelector("#ingredientsExample").addEventListener("click", (event) => {
			
			//?
			//let classValue = event.target.classList.value;
			let ingTag = event.target.getAttribute("data-filter");
			var myIndex = result.selectedIng.indexOf(ingTag);

			// teste si le tag a déjà été sélectionné (existe dans selectedApp?) et s'il existe
			if (myIndex === -1 && ingTag !== null ) {   			
				//console.log("INGREDIENTS - AJ / result:",result.recipesMatched);
				//console.log("INGREDIENTS - AJAV / selectedIng :",result.selectedIng);
				event.target.classList.add("result.selectedIng");
			
				// ajout de l'ingrédient dans selectedIng
				result.selectedIng.push(ingTag);
				//console.log("INGREDIENTS - AJAP / selectedIng: ",result.selectedIng);
			
			// suppression du bouton Ingrédients
				Button.hideButtonsOnClick(
					document.querySelector("#ingredients > button"),
					document.querySelector("#openIngredientsFilter"),
					document.querySelector("#hiddenIngredientsFilter")
				);
			
			// Affichage des tags sous la barre de recherche principale
			// 
				let tagList = document.getElementById("tagIngList");
				// suppression des tags de la recherche précédente
				tagList.innerHTML='';
				// Boucle sur les tags sélectionnés
				for (let i = 0 ; i<result.selectedIng.length ; i++) {
					if (result.selectedIng[i] !== "") {
						// Création du tag i pour html
						var eltTag = document.createElement("span");
						eltTag.setAttribute("id",result.selectedIng[i]);
						eltTag.setAttribute("class","eltTagIng");
						//Tag.buildTags(ingredientTag,result.selectedIng,i).pushDownButtonsFilter();
						eltTag.innerHTML = result.selectedIng[i] + ` <i class='far fa-times-circle'></i>`;
						//document.querySelector("#result.selectedIng[i]").addEventListener("click", console.log("add:",i));
						tagList.appendChild(eltTag);
						// pour test addEvent
						//document.getElementById(result.selectedIng[i]).addEventListener("click", function() {console.log("list",i)});
						//console.log("addevent:",i,result.selectedIng[i]);
						document.getElementById(result.selectedIng[i]).addEventListener("click", () => {this.removeTag(result.selectedIng[i])});
					}
				};

				// Recherche des recettes qui correspondent aux tags de selectedIng pour maj de result
				Search.searchByIngTags(result.selectedIng);
			
				// Effacement des recettes et affichages des recettes sélectionnées + message sur la page
				Utils.clearRecipes();
				Display.buildResult(result.recipesMatched);
				Messages.buildResultMessageWithResult(result.recipesMatched);
			
				// maj des listes des 3 filtres
				Utils.clearFilters(this.ingredientsExample);
				this.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
				Utils.clearFilters(Appliances.appliancesExample);
				Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
				Utils.clearFilters(Ustensils.ustensilsExample);
				Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
			} else {
				Button.hideButtonsOnClick(
					document.querySelector("#ingredients > button"),
					document.querySelector("#openIngredientsFilter"),
					document.querySelector("#hiddenIngredientsFilter")
				);
			}
		});
	}

	// Fonction suppression d'un tag
	//
	static removeTag(tagSelected) {
		//console.log("INGREDIENTS - SUP: OK");
		//console.log("INGREDIENTS - SUP.AV / selectedIng:", result.selectedIng)
		//console.log("INGREDIENTS - SUP.AV / tagSelected:", tagSelected)

		// Suppresion de l'affichage du tag
		//Tag.hideTag(tagSelected); //old
		let tagRemoved = document.getElementById(tagSelected);
		//let aa = tagRemoved.className
		tagRemoved.setAttribute("style","display:none")
		tagRemoved.innerHTML='';
		// maj de selectedIng après suppresion du tag
		var myIndex = result.selectedIng.indexOf(tagSelected);
		if (myIndex !== -1) {
    		result.selectedIng.splice(myIndex, 1,"");
		}
		//???? event.target.classList.remove("result.selectedIng"); //???
		//console.log("INGREDIENTS - SUP.AP / selectedIng:", result.selectedIng)
		let tabVide = true;
		if(result.selectedIng.length!==0){
			for (let i=0 ; i<result.selectedIng.length ; i++) {
				if(result.selectedIng[i] !== ""){
					tabVide = false
					//console.log("vide:",tabVide);
				}
			}
			if(tabVide){
				result.selectedIng.splice(0,result.selectedIng.length);
				//console.log("ress:",result.selectedIng);
			}
		}
		//console.log("INGREDIENTS - SUP.APVIDE / selectedIng:", result.selectedIng)

		// Relance de la recherche des recettes pour maj de result
		//
		// lecture de la valeur input de recherche générale
		let valueSearch = document.getElementById("searchBarInput").value;
		//console.log("INGREDIENTS - SUPRECHGEN  / valueSearch:", valueSearch)
		// recherche générale avec input pour maj de results, sinon recipes
		if (Utils.Valid(valueSearch)) {
			Search.searchMainInput(valueSearch);						
			//console.log("INGREDIENTS - SUPRECHGEN / recipesMatched",result);
			Builder.initSearch();
		} else {
			result.recipesMatched = recipes;
			result.ingredients= Data.getAllIngredients(recipes);
			result.appliances= Data.getAllAppliances(recipes);
			result.ustensils= Data.getAllUstensils(recipes);
		}

		// Recherche des recettes avec App/Ust (non modifiés)
		Search.searchByAppTags(result.selectedApp);
		Search.searchByUstTags(result.selectedUst);

		// recherche par tags ingrédients dans selectedIng pour maj de result
		Search.searchByIngTags(result.selectedIng);
		//console.log("INGREDIENTS - SUPRECHTAG / result",result);
		// Effacement des recettes affichées
		Utils.clearRecipes();
		// Affichage des recettes sélectionnées
		Display.buildResult(result.recipesMatched);
		//console.log("INGREDIENTS - SUPRECHTAG / recettes filtrées:", result.recipesMatched)
		// Affichage du nbre de recettes
		Messages.buildResultMessageWithResult(result.recipesMatched);
		// maj des listes des tags
		Utils.clearFilters(this.ingredientsExample);
		this.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result.recipesMatched)));
		Utils.clearFilters(Appliances.appliancesExample);
		Appliances.fillAppliances(Utils.sortByTitle(Data.getAllAppliances(result.recipesMatched)));
		Utils.clearFilters(Ustensils.ustensilsExample);
		Ustensils.fillUstensils(Utils.sortByTitle(Data.getAllUstensils(result.recipesMatched)));
	}

}
