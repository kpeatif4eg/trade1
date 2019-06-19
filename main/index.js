
const global = (function(){
	//in tpml keep 
	let thisTmpl;
	let thisJson;
	let thisInnerWidth;

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



}());




(function(){
	const movingElememts = (elements, parent)=> {
	
		const {burger,lang} = elements;
		setTimeout(()=>{

			if (parent.contains(lang)
				|| parent.contains(burger)) return;

			const cloneLangItem = lang.cloneNode(true),
				  cloneBurgerButton = burger.cloneNode(true);

			Object.values(elements).forEach(item =>{
				parent.appendChild(item);
			},1000)
		})		
	}
	//в зависимости от ширины въюпорта 
	//переносим кнопки и меняем стили

	const lang = elem.getEl('.languages'),
		   burger =  elem.getEl('.burger');
	let parent = elem.getEl('.header');
	if(window.innerWidth < 800){
		movingElememts({burger, lang}, parent);
		global.setIsMobile(true);
	}
	else{
		parent = elem.getEl('.positioned-header-bar');
		movingElememts({burger, lang}, parent);
		global.setIsMobile(false);
	}

	window.addEventListener('resize', ()=>{

		if(window.innerWidth < 800){
			parent = elem.getEl('.header');
			global.setIsMobile(true);
			movingElememts({burger, lang}, parent);
		}
		else{

			parent = elem.getEl('.positioned-header-bar');
			global.setIsMobile(false);
			movingElememts({burger, lang}, parent);
			//разворачиваем aside  на всю высоту и убираем шторку у aside__content
			dropdownHandler.drop();
		}
	});
}());

const dropdownHandler = (function(){
	const aside = elem.getEl('.aside'),
			asideContent = elem.getEl('.aside__content');

	const up = ()=>{
		asideContent.className = 'aside__content aside__content_dropdown';
		aside.style.pointerEvents = 'none';	
	}
	const drop = ()=>{
		aside.style.pointerEvents = 'auto';
		asideContent.classList.remove('aside__content_dropdown');
	}
	const toggle = ()=>{
		if(asideContent.classList.contains('aside__content_dropdown')){
			drop();
		}
		else{
			up();
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