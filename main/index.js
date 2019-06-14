
const global = (function(){
	//in tpml keep 
	let thisTmpl;
	let thisJson;
	return function(str){
		return{
			setTmpl(str){
				thisTmpl = str;
			},
			getTmpl(){
				return thisTmpl;
			},
			setJson(json){
				thisJson = json;
			},
			getJson(){
				return thisJson;
			}
		}
	}
}())

;const commonContentHandler = (function(){
	//remove class 'selected' by all buttons before render
	

	return function(that){
		[...elem.getElems('menu__button')].forEach(item =>{
		elem.remCl(item.closest('li'), 'selected');
		item.removeAttribute('disabled','');
	});
		return{
		nav: render.content('modules/Content/Navigation/index.js', '.content', that),
		trader: render.content('modules/Content/Trader/index.js', '.content', that),
		history: render.content('modules/Content/History/index.js', '.content', that),
		charge: render.content('modules/Content/Charge/index.js', '.content', that),
		exit: function(){
			// document.open(); 
			// document.write("<p>Hello world!</p>");
			// document.write("<p>I am a fish</p>");
			// document.write("<p>The number is 42</p>"); 
			// document.close();
		}
	}
	}
	
}());


const dataRequest = (function(){

	return function(){

		return {
			request(url, callback){
				let result;
				 	fetch(url)
					.then(response =>{
						return response.json();
					})
					.then(json =>{
						callback(json);
					});	
				},
				getRequest(){
					return jsonRes;
				}
		}
}

}());

const D_setUserName = (json)=>{
	// console.log(Json)
	// let Json = JSON.parse(json);
	elem.getEl('.first-name').textContent = json.firstname;
	elem.getEl('.second-name').textContent = json.lastname;


}

dataRequest().request('db.json', D_setUserName);