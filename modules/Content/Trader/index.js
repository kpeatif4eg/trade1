(function(){
	const template = `
		<div class="trader-type-change">
			<button class="trader-type-button slide-handle button" value='0'>Traders Top</button>
			<button class="trader-type-button slide-handle button" value='1'>My traders</button>
		</div>

		<div class="subscribe-traders ">
			
		</div>
		
	`;

//кэшируем работающих трейдеров		
	dataRequest.request('db.json', function({subscriptions}=json){
		global.setWorkingTraders(subscriptions);
	});

//кэшируем неработающих трейдеров
	dataRequest.request('db.json', function({traders}=json){
		global.setNormalTraders(traders);
	});
		
	const COLOR_RED = '#ff0000',
		  COLOR_GREEN = '#66cc25',
		  COLOR_GRAY = '#b4b4b4';
	let handleButtons;
	setTimeout(()=>{
		handleButtons = elem.getElems('trader-type-button');
	})

	function renderWorkingTraders(e){
		elemArr.removeStyle(handleButtons, 'slider-button');
		e.target.classList.add('slider-button')
//чистим контейнер перед рендером
		elem.getEl('.subscribe-traders').innerHTML = null;

//берем из кэша данные
		json = global.getWorkingTraders();

		const DECIMAL = 0.00000001;

		json.forEach(item=>{
			const { trader,
					profit: subsrcProfit,
					endDate,
					coins,
					stopLoss,
				} = item;
			const {firstName,
					id,
					lastName,
					available,
					risks,
					minDays,
					profit,
					investorsQuantity,
				} = trader;


//коллбеком вызываем функцию рендеринга после получения курса валют
		const getDollarValue = 
			(function (){
				dataRequest.request('https://blockchain.info/ticker',function(json){
					let dollarValue = (coins * DECIMAL * json.USD.last).toFixed(2);
					waitningTamplate(dollarValue);
				});
			}());

			function waitningTamplate(argDollar){

			const btcValue = coins * DECIMAL;

			const colorProfit = profit > 0 ? COLOR_GREEN 
						  : profit == 0 ? COLOR_GRAY
						  : COLOR_RED;
			const colorSubscrProfit = subsrcProfit > 0 ? COLOR_GREEN 
						  : subsrcProfit == 0 ? COLOR_GRAY
						  : COLOR_RED;

				const templateSubscribeTrader = 
				`<div class="subscribed trader-card">
						<div class="trader-card__top-side">
							<div class="trader-data">
								<img src="https://слушать-музыку.рф/uploads/images/p/o/f/pofile.jpg" class="trader-data__avatar">
								<span class="trader-data__full-name">
									${firstName + ' ' + lastName}
								</span>
							</div>

							<div class="trader-info">

								<div class="trader-info__item profit">
									<div class="profit__wrapper">
										<span class="profit__procent" style = 'color:${colorProfit}'>${profit}%</span>
										<span class="profit__days">${minDays}d</span>
									</div>
									<span class="trader-info__descript">Profit</span>
								</div>
								<div class="trader-info__item top">
									<span class="top__value">${id}</span>
									<span class="trader-info__descript">Top</span>
								</div>
								<div class="trader-info__item followers">
									<span class="followers__value">${investorsQuantity}</span>
									<span class="trader-info__descript">Followers</span>
								</div>
							</div>
							
						</div>
						<div class="trader-card__mid-side">

							<div class="tmpl_container">
					            <div class="tmpl_balance">
					            	<span class="tmpl_title">Copy trading balance</span>

					            	<div class="tmpl_balance-container-top">
						                <span class="tmpl_btc-value">${btcValue}</span>
						                <span class="tmpl_item">BTC</span>
					            	</div>

					            	<div class="tmpl_balance-container-bot">
						            	<span class="tmpl_doll-value">${argDollar}</span>
						            	<span class="tmpl_item">USD</span>
					            	</div>
					            </div>

					            <div class="tmpl_stoploss">
					            	<span class="tmpl_stoploss-descr">Stop-loss</span>
					            	<span class="tmpl_stoploss-value">${stopLoss}%</span>
					            </div>

					            <div class="tmpl_result_copytrading">
									<div class="tmpl_result_copytrading-left">
										<span class="tmpl_result_copytrading-descr">Copytrading results</span>
										<div class="tmpl_result_copytrading-container">
											<span class="tmpl_result_copytrading-left-value">${coins * DECIMAL}</span>
											<span class="tmpl_result_copytrading-left-item">BTC</span>
										</div>
									</div>

									<div class="tmpl_result_copytrading-right">
										<span class="tmpl_result_copytrading-right-descr">Profit</span>
										<span class="tmpl_result_copytrading-right-value" style ='color: ${colorSubscrProfit}'>${subsrcProfit}%</span>
									</div>
					            </div>
			          		</div>
						</div>
						<div class="trader-card__bot-side">
							<div class="subscr-end">
								<span class="subscr-end__description">
									Subscription end:
								</span>
								<span class="subscr-end__date">
									${endDate}
								</span>
							</div>

							<button class="trader-card__unsubscribe unsubcsribe-button">Unsubscribe</button>
						</div>
					</div>
				`;
				elem.inject('div', 'followerTrader', '.subscribe-traders').innerHTML = templateSubscribeTrader;
			}

		})
		
	};

	function renderNormalTraders(e){
		elemArr.removeStyle(handleButtons, 'slider-button');
		e.target.classList.add('slider-button')
//чистим контейнер перед рендером
		elem.getEl('.subscribe-traders').innerHTML = null;
//берем из кэша данные
		json = global.getNormalTraders();
		json.forEach(item =>{
			const{
				available,
				firstname,
				id,
				investors,
				lastname,
				minDays,
				profit,
				risk
				} = item;
			const profitColor = profit > 0 ? COLOR_GREEN 
						  : profit == 0 ? COLOR_GRAY
						  : COLOR_RED;

			const progressBarWidth = (available*100)/50;

			const templateNoSubscribeTrader = 
			`<div class="no-subscribe-traders">
				<div class="trader-card card" data="LOW">
					<div class="card__avatar"></div>
					<div class="card__name">${firstname + ' ' + lastname}</div>
					<button class="card__more" dataid="1">Подробнее</button>
					<div class="card__income">
						<span class="card__income-text">Прибыль</span>
						<span class="card__income-rate" style="color: ${profitColor}">
						${profit}%						</span>
						<span class="card__income-term">
						${minDays}<span>Days</span>
						</span>
					</div>
					<div class="card__status">
						<div class="status__wrapper top">
							<span class="card__rating-text">ТОП</span>
							<span class="card__rating-number">${id}</span>
						</div>
						<div class="status__wrapper subscribe">
							<span class="card__followers-text">Подписчики</span>
							<span class="card__followers-number">${investors}</span>
						</div>
					</div>
					<div class="card__available-wrapper">
						<div class="card__available card__available--top">
							<span class="card__availabe-text">Доступно</span>
							<span class="card__available-number">btc ${available}</span>
						</div>
						<div class="card__bar-wrapper">
							<div class="card__bar">
								<div class="card__bar-progress" style="width:${progressBarWidth}%"></div>
							</div>
						</div>
						<div class="card__available card__available--bottom">
							<span class="card__availabe">0 btc</span>
							<span class="card__available-number">btc 50</span>
						</div>
					</div>
				</div>
			</div>`;
			elem.inject('div', 'normalTrader', '.subscribe-traders').innerHTML = templateNoSubscribeTrader;
		})
	}
	setTimeout(()=>{

		elem.getElems('trader-type-button').forEach(item=>{
			if(item.value == 0){
				item.addEventListener('click', renderNormalTraders);

			}
			else{
				item.addEventListener('click', renderWorkingTraders);
			}

		})

	})

	render.styles('modules/Content/Trader');
  
    global.setTmpl(template, function(){
    	setTimeout(()=>{
	    	elem.getElems('trader-type-button')[0].click();

    	}, 100)
    });
    global.getTmpl();

}())