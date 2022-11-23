class PopUp {
	
	constructor() {
		

		this.css_file = this.cssFileTest("../assets/css/pop-up2021.css", "https://cdn.pop-up.gravity-zero.fr/assets/css/pop-up2021.css");
		//this.css_file = "https://cdn.pop-up.gravity-zero.fr/assets/css/pop-up2021.css";
		this.div_id_master = "pop_master_div";
		this.div_id_pop = "pop_container";
		this.open_anim_pop = "pop_container_open";
		this.close_anim_pop = "pop_container_close";
		this.pop_buttons = "pop_buttons";
		this.pop_confirm_button = "pop_valid_button";
		this.pop_deny_button = "pop_deny_button";
		this.icone_classname = "pop_icone";
		this.image_classname = "pop_image";
		this.title_classname = "pop_title";
		this.default_icone = "../assets/imgs/";
	}

	cssFileTest(file_to_test, default_file){
		find=false;
		fetch(file_to_test)
		.then(res => { if(res.status === 200)
							find=true
					})
		.catch(err => { const mute = err })
		
			if(find) return file;
		return default_file;
	}

	injectCss(){
		let file = this.css_file;
		let link = document.createElement("link");
		link.href = file.substr( 0, file.lastIndexOf( "." ) ) + ".css";
		link.type = "text/css";
		link.rel = "stylesheet";
		link.value="nosniff";
		link.media = "screen,print";

		document.getElementsByTagName( "head" )[0].appendChild( link );
	}

	CssInjectTest(){
		let links = document.getElementsByTagName( "link");
		let inject = true;

		if(links){
				for(let i = 0; i < links.length; i++){
					if(links[i].href === this.css_file) inject = false;
				}
		}
			inject ? this.injectCss() : false;
	}

	getEId(ID){
		return document.getElementById(ID);
	}

	getClassName(className){
		return document.getElementsByClassName(`${className}`)[0];
	}

	node_fragment() {
		return document.createDocumentFragment();
	}

	div(id=null, className=null, width=null, height=null) {
		let div = document.createElement("div");
		div.id = id;
		div.className = className? className : "";
		if(width) div.width = width + "px";
		if(height) div.height = height + "px";

		return div;
	}

	title(text) {
		let title = document.createElement("h1");
		title.className = this.title_classname;
		title.textContent = text;
		return title;
	}

	icon(icone_name){
		let icone = document.createElement("img");
		switch(icone_name){
			case 'validation':
					icone.className = "icone_validation";
					break;
			case 'error':
					icone.className = "icone_error";
					break;
			case 'warning':
					icone.className = "icone_warning";
					break;
			case 'info':
					icone.className = "icone_info";
					break;
			case 'question':
					icone.className = "icone_question";
					break;
			default: 
					icone.className = "icone_question";
					break;
		}
		return icone;
	}

	img_link(img_link) {
		let img = document.createElement("img");
		img.src = img_link;
		img.className = this.image_classname;
		return img;
	}

	height(height, pop_div){
		pop_div.style.height = height ? height + "px" : '320px';
	}

	width(width, pop_div){
		pop_div.style.width = width ? width + "px" : '520px';
	}

	img_weight(img_width, pop_div){
		let img = pop_div.getElementsByClassName(this.image_classname)[0];
		img.style.width = img_width ? img_width + "px" : '50px';
	}

	img_height(img_height, pop_div){
		let img = pop_div.getElementsByClassName(this.image_classname)[0];
		img.style.height = img_height ? img_height + "px" : '50px';
	}

	img_alt(img_alt, pop_div){
		let img = pop_div.getElementsByClassName(this.image_classname)[0];
		img.style.alt = img_alt ? img_alt : "pop-up image";
	}

	text(text) {
		let message = document.createElement("p");
		message.className = "pop_message";
		message.textContent = text;
		return message;
	}

	html(text) {
		let message = document.createElement("div");
		message.className = "pop_message";
		message.innerHTML = text;
		return message;
	}

	showDenyButton(needed) {
			if(needed){
				let button = document.createElement("button");
				button.className = this.pop_deny_button;
				button.textContent  = "Refuser";
				return button;
			}
	}

	showConfirmButton(needed) {
		if(needed){
			let button = document.createElement("button");
			button.className = this.pop_confirm_button;
			button.textContent  = "Accepter";
			return button;
		}
	}

	async buttonEvnt(master_div, pop_div){
		try{
			let confirmButton = this.getClassName(this.pop_confirm_button);
			let denyButton = this.getClassName(this.pop_deny_button);
			return new Promise((resolve, reject) => {
				if(confirmButton){
					confirmButton.addEventListener("click", (e) => {
						e.preventDefault();
						this.removePop(master_div, pop_div);
						let response = new Object();
						response.confirm = true;
						response.denied = false;
						resolve(response);
					}, {once: true});
				}
				if(denyButton){
					denyButton.addEventListener("click", (e) => {
						e.preventDefault();
						this.removePop(master_div, pop_div);
						let response = new Object();
						response.confirmation = false;
						response.denied = true;
						resolve(response);
					}, {once: true});
				}
			});	
		}catch(error){
			console.log(error);
		}
	}

	async clickEvent(master_div, pop_div) {
		try{
			document.body.addEventListener("click", async (evt) => {
				let targetElement = evt.target; 
				do {
					if (targetElement == pop_div) {
						return 
					}
					targetElement = targetElement.parentNode;
				} while (targetElement);

				if(!this.getClassName(this.pop_confirm_button) && !this.getClassName(this.pop_deny_button))
					await this.removePop(master_div, pop_div);
			});
		}catch(e){
			console.log("error: \n", e);
		}
	}

	async params(params, icone=false, text=false, defaultButton=false) {
		try {
			if (params) {
				let fragment = this.node_fragment();
				const master_div = this.div(this.div_id_master);
				const pop_div = this.div(this.div_id_pop, this.open_anim_pop);
				const buttons_div = this.div(this.pop_buttons, null, 200, 100);
				master_div.appendChild(pop_div);

				if (this.isObject(params)) {
					for (const PROP in params) {
						if(PROP !== "img_weight" && PROP !== "img_height" && PROP !== "img_alt" && PROP !== "height" && PROP !== "width"){
							if((PROP === "showConfirmButton") || (PROP === "showDenyButton")){
								if(params[PROP]){
									buttons_div.appendChild(this[PROP](params[PROP]));
								}
							}else{
								pop_div.appendChild(this[PROP](params[PROP]));
							}
						}else{
							this[PROP](params[PROP], pop_div)
						}
					}
				} else if (Array.isArray(params)) {
					console.log("Error: params can't be an array");
				} else {
					const title = params;
					if(title) this.text(title);
					if(!icone) this.icon('validation');
					text ? this.text(text) : null;
					defaultButton ? this.defaultButton(defaultButton) : this.showConfirmButton(true);
				}
				if(pop_div) pop_div.appendChild(buttons_div);
	
				this.createPop(fragment, master_div);
				await this.wait(300); // Delay before listening pop-up click (Loading time animation)
				await this.clickEvent(master_div, pop_div);
				return this.buttonEvnt(master_div, pop_div);
			}
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

	async removePop(master_div) {
		try{
			let master_div_exist = document.getElementById("pop_master_div")
			if (master_div === master_div_exist) {
				let pop_div = this.getEId(this.div_id_pop);
				pop_div.className = this.close_anim_pop;
				await this.wait(800);
				document.body.removeChild(master_div);
			}
		}catch(err){
			console.error(err);
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

const pop = new PopUp();
pop.CssInjectTest();