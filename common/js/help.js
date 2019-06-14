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
			document.querySelector(elem).classList.add(className);
		},
		remCl: function(elem, className){
			document.querySelector(elem).classList.remove(className);
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
		content: function (srcPath, target){
			let returnedElem;
			const scriptArr = [];

			return function(){
				try{
					elem.getEl('#tmpl').remove();
				} catch{};

				// if (scriptArr.length) { return };
				console.log(scriptArr)
				const response = elem.injectScript(srcPath);

				response.onload = function(){
					const getTempl = global().getTmpl;
					returnedElem = elem.append(getTempl(), target);
					scriptArr.push(returnedElem);
				}
			}
		}
	}
}());


(function(){
	let jsonRes = {};

	function request(url, callback, responseName){
		let result;
		return () =>{
		 	fetch(url)
			.then(response =>{
				return response.json();
			})
			.then(json =>{
				callback(json);
			});
		}
	}
	window.request = request();

}());
