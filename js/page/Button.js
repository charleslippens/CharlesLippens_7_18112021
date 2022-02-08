"use strict";

export default class Buttons {

	// Actions sur le bouton "btn"
	static launchButtons(btn, open, close, hiddenPart) {
		// Action sur click down
		btn.addEventListener("click", () => {
			this.displayBtn(btn);
			this.hideArrow(open);
			this.displayHidden(hiddenPart);
		});
		// Action sur click up
		close.addEventListener("click", () => {
			this.hideButtonsOnClick(btn, open, hiddenPart);
		});
	}

	// Cache liste sur click up
	static hideButtonsOnClick(btn, open, hiddenPart) {
		this.hideBtn(btn);
		this.displayArrow(open);
		this.hideHidden(hiddenPart);
	}

	// Largeur liste filtre après click down
	static displayBtn(btn) {
		return (btn.style.width = "35rem");
	}

	// Largeur filtre après fermeture click up
	static hideBtn(btn) {
		return (btn.style.width = "11rem");
	}

	// Affiche flèche down après click up
	static displayArrow(open) {
		return (open.style.display = "block");
	}

	// Cache flèche down après click down
	static hideArrow(open) {
		return (open.style.display = "none");
	}

	// Affiche liste filtre après click down
	static displayHidden(hiddenPart) {
		return (hiddenPart.style.display = "block");
	}

	// Cache liste filtre après click up 
	static hideHidden(hiddenPart) {
		return (hiddenPart.style.display = "none");
	}
}
