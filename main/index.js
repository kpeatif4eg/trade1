
const global = (function(){
	//in tpml keep 
	let thisTmpl;
	let thisJsonCurrency;
	let thisInnerWidth;
	let thisCallback;

	return{
		setTmpl(str, callback){
			thisTmpl = str;
			thisCallback = callback;
		},
		getTmpl(){
			setTimeout(()=>{
				try{thisCallback();}
				catch(e){};
			},10)
			return thisTmpl;
		},
		setJson(json){
			thisJsonCurrency = json;
		},
		getJson(){
			return thisJsonCurrency;
		},
		setIsMobile(boolWidth){
			thisInnerWidth = boolWidth;
		},
		getIsMobile(){
			return thisInnerWidth;
		},
	}

}())



;const commonContentHandler = (function(){
	return function(that){
//в зависимости от того какое устройство (моб/ десктоп) меняем задержку перед переключением между рубриками меню
		let delay = global.getIsMobile() ? 60 : 400;
		return{
			nav: render.content('modules/Content/Navigation/index.js', '.content', that, delay),
			trader: render.content('modules/Content/Trader/index.js', '.content', that, delay),
			history: render.content('modules/Content/History/index.js', '.content', that, delay),
			charge: render.content('modules/Content/Charge/index.js', '.content', that, delay),
			exit: function(){}
		}
	}
}());



(function(){
	const D_setUserName = ({ firstname, lastname } = json)=>{
		elem.getEl('.first-name').textContent = firstname;
		elem.getEl('.second-name').textContent = lastname;
	}
	dataRequest.request('db.json', D_setUserName);

	const getEquivDollar = json =>{
		global.setJson(json.USD.last);
		writeAsideExchange.applyValue(global.getJson());

	}
	dataRequest.request('https://blockchain.info/ticker', getEquivDollar)

}());




(function(){

	//в зависимости от ширины въюпорта 
	//переносим кнопки и меняем стили

	const burger =  elem.getEl('.burger');
	let parent = elem.getEl('.header');
	if(window.innerWidth < 800){
		render.movingElememts({burger}, parent);
		global.setIsMobile(true);
	}
	else{
		parent = elem.getEl('.positioned-header-bar');
		render.movingElememts({burger}, parent);
		global.setIsMobile(false);
	}

	window.addEventListener('resize', ()=>{

		if(window.innerWidth < 800){
			parent = elem.getEl('.header');
			global.setIsMobile(true);
			render.movingElememts({burger}, parent);
		}
		else{

			parent = elem.getEl('.positioned-header-bar');
			global.setIsMobile(false);
			render.movingElememts({burger}, parent);
			//разворачиваем aside  на всю высоту и убираем шторку у aside__content
			dropdownHandler.drop();
		}
	});
}());

const dropdownHandler = (function(){
	const aside = elem.getEl('.aside'),
			asideContent = elem.getEl('.aside__content');

	const up = (that)=>{
		asideContent.className = 'aside__content aside__content_dropdown';
		aside.style.pointerEvents = 'none';	
	}
	const drop = (that)=>{
		aside.style.pointerEvents = 'auto';
		asideContent.classList.remove('aside__content_dropdown');
	}
	const toggle = (that)=>{
		if(asideContent.classList.contains('aside__content_dropdown')){
			drop(that);
		}
		else{
			up(that);
		}
	}

	return{
		up,
		drop,
		toggle,
	}
	
}());

if(!global.getIsMobile())
commonContentHandler(elem.getEl('.menu__button')).nav();

const writeAsideExchange = (function(){
	return{
		applyValue: function(value){
			elem.getEl('.exch-value').textContent = value;
		}
	}
}())