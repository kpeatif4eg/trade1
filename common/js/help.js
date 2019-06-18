//helper 4 dom manipulations
;const elem = (function(){
	return {
		getEl: function(elemId){
			return document.querySelector(elemId);
		},
		getElems: function(elemId){
			return document.getElementsByClassName(elemId);
		},
		addCl: function(elem, className){
			if (typeof elem === 'string') {
				document.querySelector(elem).classList.add(className);
			}
			else{
				elem.classList.add(className);
			}
		},
		remCl: function(elem, className){
			if(typeof elem === 'string'){
				document.querySelector(elem).classList.remove(className);				
			}
			else{
				elem.classList.remove(className);	
			}
		},
		isHas: function(elem, className){
			return document.querySelector(elem).classList.contains(className);
		},
		inject: function(tagName, className, targetInsert){
			const target = this.getEl(targetInsert);
			const el = document.createElement(tagName);
			el.className = className;
			target.appendChild(el);
		},
		injectScript: function(src){
			const scr = document.createElement('script');
			scr.setAttribute('src', src);
			scr.id = 'tmpl';
			this.getEl('body').appendChild(scr);
			return scr;
		},
		append:function(elem, DOMelem){
			this.getEl(DOMelem).innerHTML = elem;
			return elem;
		}
	}
}());


const render = (function(){
	return {
		content: function (srcPath, target, that){
			
			return function(){
	//remove class 'selected' by all buttons before render
				[...elem.getElems('menu__button')].forEach(item =>{
					elem.remCl(item.closest('li'), 'selected');
					item.removeAttribute('disabled','');
				});
	//проверяем что приходит в that, если по клику меню то идем через объект, если событие из другого объекта то
	//от него передаем селектор стрингом
				if(typeof that === 'object'){
					elem.addCl(that.closest('li'), 'selected');
					that.setAttribute('disabled', '');
				}
				else{ //получаем селектор если он пришел строкой и обрабатываем
					const $elem = elem.getEl(that);
					elem.addCl($elem.closest('li'), 'selected');
					$elem.setAttribute('disabled', '');
				}
					

				try{
					elem.getEl('#tmpl').remove();
				} catch{};

				const response = elem.injectScript(srcPath);

				response.onload = function(){
						
					elem.append(global.getTmpl(), target);
					
					//по клику меню опускаем шторку меню если включена мобильная версия
					if(global.getIsMobile()){
						dropdownHandler.up();
					}

				}
			}
		},	//add link rel in head for each module
		styles: function(srcPath){				
			const head = elem.getEl('head'),
			link = document.createElement('link');
			head.lastChild.remove();
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('type','text/css');
			link.setAttribute('href', `${srcPath}/index.css`)
			head.appendChild(link);
		}
	}
}());


