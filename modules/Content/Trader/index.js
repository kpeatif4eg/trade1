(function(){
	const template = `
		<div class="traders">
			
		</div>

	`;

	dataRequest.request('db.json', renderWorkingTraders);
	function renderWorkingTraders(json){
		const DECIMAL = 0.00000001;
		const {subscriptions} = json;
		

		subscriptions.forEach(item=>{
												console.log(item)
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

		const responseTemplate = `
		<div class="trader-card">
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
								<span class="profit__procent">${profit}%</span>
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
				                <span class="tmpl_btc-value">${0}</span>
				                <span class="tmpl_item">BTC</span>
			            	</div>

			            	<div class="tmpl_balance-container-bot">
				            	<span class="tmpl_doll-value">${0}</span>
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
								<span class="tmpl_result_copytrading-right-value">${subsrcProfit}%</span>
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
	console.log(coins,DECIMAL);
	elem.inject('div', 'followerTrader', '.traders').innerHTML = responseTemplate;
		})
		
	}
	
		render.styles('modules/Content/Trader');
  
    global.setTmpl(template);
}())