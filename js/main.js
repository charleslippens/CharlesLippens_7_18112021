"use strict";
import Builder from "./page/Builder.js";
import Search from "./search/Search.js";
import Utils from "./utilities/Utils.js";
import Messages from "./page/Msg.js";
import Ingredients from "./filters/Ingredients.js";
import Appliances from "./filters/Appliances.js";
import Ustensils from "./filters/Ustensils.js";

// tableau commun utilisé par les filtres 
export const result = {
	recipesMatched: [],	// recettes trouvées
	ingredients: [],	// liste actualisée des ingrédients
	appliances:[],		// liste actualisée des appareils
	ustensils: [],		// liste actualisées des ustensiles
	selectedIng: [],	// liste des ingrédients sélectionnés / tags affichés 
	selectedApp: [],	// liste des appareils sélectionnés / tags affichés
	selectedUst: [],	// liste des ustensiles sélectionnés / tags affichés
};

// Affichage initiale du site 
Builder.init();

// Activation de la recherche générale"
document.getElementById("searchBarInput").addEventListener("keyup", (key) => {
	let valueSearch = key.target.value;
	
	// Effacement des tags pour nouvelle recherche générale 
	const tagBadges = document.getElementById('tagBadges');
	tagBadges.innerHTML = ``;
	tagBadges.innerHTML='<div id="tagBadges"><span id="tagIngList"></span><span id="tagAppList"></span>	<span id="tagUstList"></span></div>'
	
	// Recherche générale possible si plus de 3 caractères
	if (Utils.Valid(valueSearch)) {
		Search.searchMainInput(valueSearch);
		// MAZ des listes filtres et affichage d'un message si aucune recette trouvée						
		if (result.recipesMatched.length === 0) {
			Utils.clearRecipes();
			let ingredientsExample = document.getElementById("ingredientsExample");
			Utils.clearFilters(ingredientsExample);
			let ustensilsExample = document.getElementById("ustensilesExample");
			Utils.clearFilters(ustensilsExample);
			let appliancesExample = document.getElementById("appareilExample");
			Utils.clearFilters(appliancesExample);
			return Messages.buildResultMessageWithNoResult();
		}
		// Affichage des recettes trouvées
		Utils.clearRecipes();
		Builder.initSearch();
		return;
	} else {
	// Affichage des 50 recettes et maj des listes filtres si recherche générale après filtres
	Utils.clearRecipes();
	Builder.init();
	result.selectedIng=[];
	Ingredients.filterTags();
	result.selectedApp=[];
	Appliances.filterTags();
	result.selectedUst=[];
	Ustensils.filterTags();}
});

// Activation des filtres sans recherche générale 
Ingredients.filterTags();
Appliances.filterTags();
Ustensils.filterTags();
