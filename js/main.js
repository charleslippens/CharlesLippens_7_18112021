"use strict";
import Builder from "./page/Builder.js";
import Search from "./search/Search.js";
import Utils from "./utilities/Utils.js";
import Messages from "./page/Msg.js";
import Ingredients from "./filters/Ingredients.js";
import Data from "./utilities/Data.js";
import Appliances from "./filters/Appliances.js";
import Ustensils from "./filters/Ustensils.js";
export const result = {
	recipesMatched: [],
	ingredients: [],
	appliances:[],
	ustensils: [],
	selectedIng: [],
	selectedApp: [],
	selectedUst: [],
};

// Affichage du site 
Builder.init();

// Activation recherche avec input général
document.getElementById("searchBarInput").addEventListener("keyup", (key) => {
	let valueSearch = key.target.value;
	// 
	const tagBadges = document.getElementById('tagBadges');
	tagBadges.innerHTML = ``;
	tagBadges.innerHTML='<div id="tagBadges"><span id="tagIngList"></span><span id="tagAppList"></span>	<span id="tagUstList"></span></div>'
	if (Utils.Valid(valueSearch)) {
		Search.searchMainInput(valueSearch);						
		if (result.recipesMatched.length === 0) {
			Utils.clearRecipes();
			return Messages.buildResultMessageWithNoResult();
		}
		Utils.clearRecipes();
		console.log("recipesMatched",result);
		Builder.initSearch();
		return;//
	}
	Utils.clearRecipes();
	Builder.init();
	result.selectedIng=[];
	Ingredients.filterTags();
	result.selectedApp=[];
	Appliances.filterTags();
	result.selectedUst=[];
	Ustensils.filterTags();
});

// Activation des recherches spécifiques sans recherche générale 
Ingredients.filterTags();
Appliances.filterTags();
Ustensils.filterTags();

//console.log("MAINrecipeMatch FIN:",result.recipesMatched);



