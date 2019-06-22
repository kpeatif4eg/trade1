 (function(){
  const template = `

    <div class="deposit-panel">

      <div class="deposit-buttons">
        <button class="button deposit-panel__button button__fill" value='0'>Filling</button>
        <button class="button deposit-panel__button button__withdraw" value='1'>Withdaw</button>
        <button class="button deposit-panel__button button__api" value='2'>API</button>
        <button class="button deposit-panel__button button__buy-bitt">Buy Bitt</button>
      </div>

      <div class="filing deposit-item" value='0'>
        <div class="slide-buttons">
          <button class="button slide-handle">BTC</button>
          <button class=" button slide-handle">BITT</button>
        </div>
            <div class="overflow-container-deposit">
              <div class="overflow-wraper-deposit">
                <div class="wallet wallet__btc">
                                  
                  <div class="wallet__display">
                    <span class="deposit-panel__title" loc='wallet-title-1'> BTC Tradeone Wallet</span>
                    <div class="wallet__content">
                      <span class="exchange-item">BTC</span>
                      <span id = "btc-balance" class="exchange-value">0.0</span>
                      <button class="wallet__button button">Update</button>
                    </div>
                  </div>

                  <div class="wallet__address">
                    <span class="deposit-panel__title" loc='wallet-title-2'>BTC deposit address</span>

                    <div class="address-container wallet__content">

                      <input class="address-display" placeholder="The address will be generated within 3-5 minutes">
                      <button class="button qr__button">QR</button>

                    </div>
                  </div>
                </div>


                <div class="wallet wallet__bitt">
                 
                  
                  <div class="wallet__display">
                    <span class="deposit-panel__title" loc='wallet-title-3'> BITT Tradeone Wallet</span>
                    <div class="wallet__content">
                      <span class="exchange-item">BITT</span>
                      <span id = "bitt-balance" class="exchange-value">0.0</span>
                      <button class="wallet__button button">Update</button>
                    </div>
                  </div>

                  <div class="wallet__address">
                    <span class="deposit-panel__title" loc='wallet-title-4'>BITT deposit address</span>
                    <div class="address-container wallet__content">

                      <input class="address-display" placeholder="The address will be generated within 3-5 minutes">
                      <button class="button qr__button">QR</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="withdraw deposit-item hidden" value='1'>
              <div class="withdraw__balance">
                <h2 class="balance__title withdraw-title">Баланс не в управлении </h2>
                <div class="balance__item">BTC</div>
                <div class="balance__value">0.0</div>
              </div>

              <div class="withdraw__sum-block">
                <h2 class="sum-block__title withdraw-title">Сумма на вывод</h2>
                <div class="sum-block-wraper">
                  <span class="withdraw-value">0</span>
                  <span class="withdraw-currency">Bitcoin</span>
                </div>
                <input type="range" name="">
              </div>
              <div class="withdraw__address">
                <h2 class="address__title">BTC Адрес вывода средств</h2>
                <input class="address__input">
                <button class="address__submit">Вывести</button>
              </div>
          </div>

          <div class="api deposit-item hidden" value='2'>
            <div class="api_section">
        <div class="api_section__head">
          <span class="head__title">BINANCE</span>
          <div class="head__total_balance">
            <span class="total_balance__title">Your total balance</span>

            <div class="money_wraper">
              <div class="total_balance__dollar-section">
                <span class="dollar_symbol">$</span>
                <span class="dollar_int">0.0</span>

              </div>
              <div class="total_balance__btc-section">
                <span class="btc_symbol">btc</span>
                <span class="btc_int">0.0</span>

              </div>
            </div>
          </div>
        </div>
        <div class="mid_section">
          <div class="mid_section__input_block">
            <div class="input_block__left_side">
              <span class="input_block__title">Api key</span>
              <input type="text" class="input_block__input">
            </div>
            <div class="input_block__right_side">
            </div>
          </div>

        </div>
        <div class="bottom__section">
          <button class="api_update"> Update api Key</button>
        </div>
      </div>
          </div>
      </div>
      `;

  //передаем путь к .css файлу
  render.styles('modules/Content/Charge');
  
    global.setTmpl(template);


  //запрос

  const D_setWalletBalanceBTC = ({ balance } = json)=>{
    elem.getEl('#btc-balance').textContent = balance;
  }
  dataRequest.request('db.json', D_setWalletBalanceBTC);

  const D_setWalletBalanceBITT = ({ bitt } = json)=>{
    elem.getEl('#bitt-balance').textContent = bitt;
  }
  dataRequest.request('db.json', D_setWalletBalanceBITT);

  //слайдер раздела пополнения
  function walletsSliderHandler(element, direction){
    const position = direction === "+" ? -50 : 0;
    element.style.transform = `translateX(${position}%)`;
 
    elemArr.removeStyle(elem.getElems(this.classList[1]), 'slider-button');

    elem.addCl(this, 'slider-button')
  };
  //
    function depositButtonPanelHandler(){
      const action = helper(this.value);  

      function helper(value){
        elem.getElems('deposit-item').forEach(item =>{
          elem.addCl(item, 'hidden');
          // debugger
          if(item.getAttribute('value') === value) {
            beautyShow.showScale(item);
            return
          }
          
        });

      }
    }



  //таймаут для загрузки dom 
  setTimeout(function(){
    const sliderContainer = elem.getEl('.overflow-wraper-deposit');
    const handleButtons = elem.getElems('slide-handle');
    const depositButtons = elem.getElems('deposit-panel__button');

     handleButtons.forEach((item, index)=>{
      let direction = index > 0 ? '+' : '-';
      item.addEventListener(
        'click', walletsSliderHandler
         .bind(item,
          sliderContainer,
          direction)
      );
    });
     //инициализация нажатой кнопки слайдера
    handleButtons[0].click();

    elemArr.addEvent(depositButtons,'click', depositButtonPanelHandler);

  });





}());
