 (function(){
  const template = `

    <div class="deposit-panel">

      <div class="deposit-buttons">
        <button class="button deposit-panel__button button__fill">Filling</button>
        <button class="button deposit-panel__button button__withdraw">Withdawal of funds</button>
        <button class="button deposit-panel__button button__api">API</button>
        <button class="button deposit-panel__button button__buy-bitt">Buy Bitt</button>
      </div>

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
 
    Array.from(elem.getElems(this.classList[1])).forEach(item=>{
      item.style = '';
    })
    this.style.boxShadow = 'rgba(0, 0, 0, 0.55) 0px -4.1px 10px -4px inset, black 0px 0px 2.2px -0.6px';

  }

  //таймаут для загрузки dom 
  setTimeout(function(){
    const sliderContainer = elem.getEl('.overflow-wraper-deposit');
    const handleButtons = elem.getElems('slide-handle');

    let i;
     Array.from(handleButtons).forEach((item, index)=>{
      let direction = index > 0 ? '+' : '-';
      item.addEventListener(
        'click',
         walletsSliderHandler
         .bind(item,
          sliderContainer,
          direction)
      );
    });
     //инициализация нажатой кнопки слайдера
    handleButtons[0].click();
  });





}());
