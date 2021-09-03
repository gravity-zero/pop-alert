class PopUp {
	constructor() {}

	node_fragment() {
		return document.createDocumentFragment();
	}

	div(name=null) {
		let div = document.createElement("div");
		div.id = name;
		return div;
	}

	title(param) {
		let title = document.createElement("h1");
		title.className = "pop_title";
		title.textContent = param;
		return title;
	}

	icone(img_link = false) {
		let img = document.createElement("img");
		img.className = "pop_icone";
		img.href = img_link ? img_link : "../assets/imgs/";
		return img;
	}

	text(text) {
		let message = document.createElement("p");
		message.className = "pop_message";
		message.textContent = text;
		return message;
	}

	bbcode() {}

	html() {}

	denyButton(button_value) {
		let denyButton = (document.createElement("button").className =
			"pop_deny_button");
		denyButton.setAttribute("button", button_value ? button_value : "Refused");
		denyButton.value = denyButton;
		return denyButton;
	}

	validationButton() {
		return (document.createElement("button").className =
			"pop_validation_button");
	}

	defaultButton() {
		let denyButton = document.createElement("button");
		denyButton.className = "pop_default";
		denyButton.setAttribute("button", false);
		return denyButton;
	}

	async clickEvent(master_div, div) {
		try{
			document.body.addEventListener("click", (evt) => {
				let targetElement = evt.target; 
	
				do {
					if (targetElement == div) {
						console.log("You clicked inside");
						return;
					}
					targetElement = targetElement.parentNode;
				} while (targetElement);
				this.removePop(master_div, div);
				return;
			});
		}catch(e){
			return;
		}
	}

	async params(params, text=false, icone=false, defaultButton=false) {
		try {
			let fragment = this.node_fragment();
			const master_div = this.div("pop_master_div");
			const pop_div = this.div("pop_container");
			master_div.appendChild(pop_div);

			if (params) {
				if (this.isObject(params)) {
					for (const PROP in params) {
						pop_div.appendChild(this[PROP](params[PROP]));
					}
				} else if (Array.isArray(params)) {
					console.log("Error: params can't be an array");
				} else {
					const title = params;
					title ? this.text(title) : null;
					icone ? this.icone(icone) : null;
					text ? this.text(text) : null;
					defaultButton ? this.defaultButton(defaultButton) : null;
				}
			}
			pop_div.appendChild(this.defaultButton(params.defaultButton));
			this.createPop(fragment, master_div);
		
			await this.wait(300);
			await this.clickEvent(master_div, pop_div);
			return;
		} catch (err) {
			console.log("Error: " + err);
		}
	}

	isObject(obj){
		return Object.prototype.toString.call(obj) === "[object Object]";
	};

	async wait(ms) {
		return new Promise((res, rej) => {
			try {
				setTimeout(() => {
					res(true);
				}, ms);
			} catch (err) {
				rej(err);
			}
		});
	}

	removePop(master_div) {
		let master_div_exist = document.getElementById("pop_master_div")
		if (master_div === master_div_exist) {
			document.body.removeChild(master_div);
		}
		return;
	}

	createPop(fragment, master_div) {
		let master_div_exist = document.getElementById("pop_master_div");
		if (!master_div_exist) {
			const fragment_div = fragment.appendChild(master_div);
			document.body.appendChild(fragment_div);
		}
	}
}
