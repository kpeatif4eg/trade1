
const global = (function(){
	let tmpl;
	return function(str){
		return{
			setTmpl(str){
				tmpl = str;
			},
			getTmpl(){
				return tmpl;
			}
		}
	}
}())

;const commonContentHandler = (function(){
	return{
		nav: render.content('modules/Content/Navigation/index.js', '.content'),
		trader: render.content('modules/Content/Trader/index.js', '.content'),
		history: render.content('modules/Content/History/index.js', '.content'),
		charge: render.content('modules/Content/Charge/index.js', '.content'),
		exit: function(){
			// document.open(); 
			// document.write("<p>Hello world!</p>");
			// document.write("<p>I am a fish</p>");
			// document.write("<p>The number is 42</p>"); 
			// document.close();
		}
	}
	
}());


(function(){
	let jsonRes = {};
	function request(url, callback, responseName){
		let result;
		return () =>{
		 	fetch('https://jsonplaceholder.typicode.com/users')
			.then(response =>{
				return response.json();
			})
			.then(json =>{
				jsonRes.test = json;
			});

		}
		

	}
	window.request = request();

}());


