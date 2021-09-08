class PopUp {
	
	constructor() {
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
		this.css_file = "../assets/css/pop-up2021.css";
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

	getEId(ID){
		return document.getElementById(ID);
	}

	getClassName(className){
		return document.getElementsByClassName(className)[0];
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
		let message = document.createElement("p");
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

	async buttonEvnt(name, objectName){
		try {
			let button = this.getClassName(name)[0];
		button.addEventListener("click", (e) => {
			e.preventDefault();
			response= new Response();
			response.name = true;
			console.log(response);
			return response;
		})
		} catch (error) {
			
		}
	}



	async clickEvent(master_div, div) {
		try{
			document.body.addEventListener("click", async (evt) => {
				let targetElement = evt.target; 
				do {
					if (targetElement == div) {
						console.log("You clicked inside");
						if(this.getClassName(this.pop_buttons))return this.buttonEvnt();
						return 
					}
					targetElement = targetElement.parentNode;
				} while (targetElement);
				await this.removePop(master_div, div);
				return;
			});
		}catch(e){
			return;
		}
	}

	async params(params, icone=false, text=false, defaultButton=false) {
		try {
			//console.log(this.image_classname)
			if (params) {
				this.injectCss();
				this.wait(200);
				let fragment = this.node_fragment();
				const master_div = this.div(this.div_id_master);
				const pop_div = this.div(this.div_id_pop, this.open_anim_pop);
				const buttons_div = this.div(this.pop_buttons, null, 200, 100);
				master_div.appendChild(pop_div);

				if (this.isObject(params)) {
					for (const PROP in params) {
						if(PROP !== "img_weight" && PROP !== "img_height" && PROP !== "img_alt"){
							if(PROP === "showConfirmButton" || PROP === "showDenyButton"){
								buttons_div.appendChild(this[PROP](params[PROP]));
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
					let title_text = title ? this.text(title) : null;
					let title_name = icone ? icone : this.icon('validation');
					text ? this.text(text) : null;
					defaultButton ? this.defaultButton(defaultButton) : this.showConfirmButton(true);
				}
				if(pop_div) pop_div.appendChild(buttons_div);
	
				this.createPop(fragment, master_div);
				await this.wait(300);
				await this.clickEvent(master_div, pop_div);

				return;
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

