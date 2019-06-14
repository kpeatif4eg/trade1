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

				elem.addCl(that.closest('li'), 'selected');
				that.setAttribute('disabled', '');

				try{
					elem.getEl('#tmpl').remove();
				} catch{};

				const response = elem.injectScript(srcPath);

				response.onload = function(){
					const getTempl = global().getTmpl;
					
						elem.append(getTempl(), target);						
					
				}
			}
		},
		styles: function(srcPath){				//add link rel in head for each page
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

