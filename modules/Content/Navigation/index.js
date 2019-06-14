(function(){
	const template = `
		<div class="nav-panel">
			<div class="card card_first-step">
				<span class="card__description">Пополните баланс для оплаты копитрейдинга</span>
				<button class="button button-card">Пополнить баланс</button>
			</div>
			<div class="card main-card hidden"></div>
			<div class="card card_second-step">
				<span class="card__description">Выберите своего трейдера и подключите свои биржи</span>
				<button class="button button-card">Выбрать трейдера</button>
			</div>
		</div>
	`;


	//write template data in globaj obj
	render.styles('modules/Content/Navigation')
	const setTempl = global().setTmpl;
	setTempl(template);
}());