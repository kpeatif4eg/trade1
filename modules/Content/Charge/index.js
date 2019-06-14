 (function(){
  const template = `
    <div class="wallet-section">
        <div class="wallet-block wallet-block--info 1">
          <h3 class="wallet-block__title">BTC TradeOne кошелек</h3>
          <div class="wallet-block__card wallet-card">
            <div class="wallet-card__currency-block">
              <div class="wallet-card__currency-icon"></div>
              <div class="wallet-card__currency-title-block">
                <h4 class="wallet-card__currency-title">btc</h4>
                <h5 class="wallet-card__currency-subtitle">Bitcoin</h5>
              </div>
            </div>
            <div class="wallet-card__rate" >0.0</div>
            <div class="wallet-card__wrapper-update">
              <button class="button wallet-card__update">Обновить</button>
            </div>
          </div>
        </div>



        <div class="wallet-block wallet-block 1">
          <h3 class="wallet-block__title">BTC адрес пополнения</h3>
          <div class="wallet-block__card wallet-card--address" >
            <button class="button button_initial qrButton qrButtonBTC">QR</button>
            <input class="wallet-block__wallet-key" placeholder="Адрес сгенерируется в течении 3-5 минут" type="text" value="">
          </div>
        </div>


        <div class="wallet-block wallet-block--info 2">
          <h3 class="wallet-block__title">BITT TradeOne кошелек</h3>
          <div class=" wallet-block__title hashTitle">Для зачисления токенов введите хеш транзакции</div>
          <div class="wallet-block__card wallet-card">
            <div class="wallet-card__currency-block">
              <div class="wallet-card__currency-icon wallet-card__currency-icon_BITT"></div>
              <div class="wallet-card__currency-title-block">
                <h4 class="wallet-card__currency-title">bitt</h4>
                <h5 class="wallet-card__currency-subtitle">Token</h5>
              </div>
            </div>
            <div class="wallet-card__rate Bitt"> 0.0

            </div>
            <div class="wallet-card__wrapper-update">
              <button class="button wallet-card__update check">ХЭШ</button>
            </div>
          </div>
        </div>



        <div class="wallet-block wallet-block 2">
          <h3 class="wallet-block__title">BITT адрес пополнения</h3>

          <div class="wallet-block__card wallet-card--address" style="position: relative">
            <button class="button button_initial qrButton qrButtonBITT">QR</button>
            <input class="wallet-block__wallet-key bitt" placeholder="Адрес сгенерируется в течении 3-5 минут" type="text" value="">
          </div>
        </div>


      </div>
      `;
        const setTempl = global().setTmpl;
        setTempl(template);
}()) 