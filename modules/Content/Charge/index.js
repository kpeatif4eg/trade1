 (function(){
  const template = `

    <div class="deposit-panel">

      <ul class="deposit-buttons">
          <li class="deposit-buttons__item">
            <button class="button deposit-panel__button button__fill" value='0'>Filling</button>
          </li>
          <li class="deposit-buttons__item active-button">
            <button class="button deposit-panel__button button__withdraw" value='1'>Withdaw</button>
          </li>
          <li class="deposit-buttons__item">
            <button class="button deposit-panel__button button__api" value='2'>API</button>
          </li>
          <li class="deposit-buttons__item">
            <button class="button deposit-panel__button button__buy-bitt">Buy Bitt</button>
          </li>

      </ul>

      <div class="filing deposit-item" data-id='0'>
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

          <div class="withdraw deposit-item hidden" data-id='1'>
              <div class="withdraw__balance">
                <h2 class="balance__title withdraw-title">Баланс не в управлении </h2>
                <span class="exchange-item">BTC</span>
                <span class="balance__value">0.0</span>
              </div>

              <div class="withdraw__sum-block">
                <h2 class="sum-block__title withdraw-title">Сумма на вывод</h2>
                <div class="sum-block-wraper">
                  <span class="withdraw-value">0</span>
                  <span class="withdraw-currency">Bitcoin</span>
                </div>
                <input class='withdraw__range' type="range" min='0'step='1' max='90' name="">
              </div>
              <div class="withdraw__address">
                <h2 class="address__title withdraw-title">BTC Адрес вывода средств</h2>
                <input class="address__input">
                <button class="button address__submit">Вывести</button>
              </div>
          </div>

          <div class="api deposit-item hidden" data-id='2'>
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
    
    global.setTmpl(template, actionTemplate);


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


  //обработчик кнопок навигации модуля
    function depositButtonPanelHandler(){
      const addingClass = 'deposit-panel-buttons_active';
      elemArr.removeStyle(elem.getElems('deposit-panel__button'), addingClass);
      const action = helper(this.value);  
      elem.addCl(this, addingClass);

      function helper(value){
        elem.getElems('deposit-item').forEach(item =>{
          elem.addCl(item, 'hidden');
          if(item.dataset.id === value) {
            beautyShow.showSwipe(item, -100,0);
            return
          }
        });
      }
    }
function rangeHandler(e){

  let targ;
  if(e.__proto__.constructor.name === 'MouseEvent'){
    targ = e.target.className === 'withdraw__range'
              ? e.target
              :null;
  }
  else{
    targ = e;
  }
  
  const elementForChange = elem.getEl('.withdraw.deposit-item');

  elementForChange.style.backgroundColor = `rgb(0, ${(targ.value / targ.max * 100 + 50).toFixed(0)} ,0)`
}
  
//весим обработчики событий
function actionTemplate(){
    const sliderContainer = elem.getEl('.overflow-wraper-deposit');
    const handleButtons = elem.getElems('slide-handle');
    const depositButtons = elem.getElems('deposit-panel__button');
    const range = elem.getEl('.withdraw__range');
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
     console.log(depositButtons)
    handleButtons[0].click();

    elem.addCl(depositButtons[0], 'deposit-panel-buttons_active');

    beautyShow.showDrop(elem.getEl('.deposit-buttons'), -360 ,0, 900);

    elemArr.addEvent(depositButtons,'click', depositButtonPanelHandler);

    range.addEventListener('change', rangeHandler);
    range.addEventListener('mousemove', rangeHandler);

    rangeHandler(range);

}





}());
