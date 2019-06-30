(function(){
	//передаем селектор кнопки меню в функцию которая меняет состояние кнопок меню
	const chargeBalance = commonContentHandler('.menu__charge .menu__button').charge;
	const changeTrader = commonContentHandler('.menu__my-trader .menu__button').trader;
	//записываем функцию в переменную и потом в window что бы из doma достучаться до функции
	window.charge = chargeBalance;
	window.change = changeTrader;

	const template = `
		<div class="nav-panel">
			<div class="card card_first-step">
				<span class="card__description">Пополните баланс для оплаты копитрейдинга</span>
				<button class="button button-card" onClick='charge()'>Пополнить баланс</button>
			</div>
			<div class="card main-card hidden"></div>
			<div class="card card_second-step">
				<span class="card__description">Выберите своего трейдера и подключите свои биржи</span>
				<button class="button button-card" onClick='change()'>Выбрать трейдера</button>
			</div>
		</div>
	`;

	//передаем путь к .css файлу
	render.styles('modules/Content/Navigation');

	//записываем текущий темплейт в глобальный объект
	global.setTmpl(template);
}());
