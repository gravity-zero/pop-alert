class PopUp {
	
	constructor() {
		this.div_id_master = "pop_master_div";
		this.div_id_pop = "pop_container";
		this.pop_valid_button = "pop_valid_button";
		this.pop_deny_button = "pop_deny_button";
		this.pop_default_button = "pop_default_button";
		this.icone_classname = "pop_icone";
		this.title_classname = "pop_title";
		this.default_icone = "../assets/imgs/";
	}

	getEId(ID){
		return document.getElementById(ID);
	}

	node_fragment() {
		return document.createDocumentFragment();
	}

	div(name=null, className=null) {
		let div = document.createElement("div");
		div.id = name;
		div.className = className? className : "";
		return div;
	}

	title(param) {
		let title = document.createElement("h1");
		title.className = this.title_classname;
		title.textContent = param;
		return title;
	}

	icone(img_link = false, img_width = false, img_height = false, alt=false) {
		let img = document.createElement("img");
		img.className = this.icone_classname;
		img.src = img_link ? img_link : this.default_icone;
		img.style.width = img_width ? img_width + "px" : '50px';
		img.style.height = img_height ? img_height + "px" : '50px';
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

	confirmButton() {
		return (document.createElement("button").className =
			"pop_validation_button");
	}

	questButton() {

	}

	image_height(){
		//getEId(ID)
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
			console.log(this.div_id_master)
			const master_div = this.div(this.div_id_master);
			const pop_div = this.div(this.div_id_pop, this.div_id_pop);
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
			//await this.wait(500);
			await this.animateCSS();
			await this.wait(300);
			await this.clickEvent(master_div, pop_div);

			return;
		} catch (err) {
			console.log("Error: " + err);
		}
	}


	animateCSS (prefix = 'animate__') {
		return new Promise((resolve, reject) => {
			const animationName = "zoomInDown";
			const node = this.getEId(this.div_id_pop);
			console.log("node", node, this.div_id_pop);
			node.classList.add(`${prefix}pop_up`, animationName);

			function handleAnimationEnd(event) {
				console.log("passed")
				event.stopPropagation();
				node.classList.remove(`${prefix}animated`, animationName);
				resolve('Animation ended');
			}

			node.addEventListener('animationend', handleAnimationEnd, {twiced: true});
		});
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
