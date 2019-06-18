 (function(){
  const template = `

    <div class="deposit-buttons">
      <button class="button button__fill">Filling</button>
      <button class="button button__withdraw">Withdawal of funds</button>
      <button class="button button__api">API</button>
      <button class="button button__buy-bitt">Buy Bitt</button>
    </div>
    
      <div class="deposit-panel">
      <div class="slide-buttons">
        <button class="button slide-handle">btc</button>
        <button class=" button slide-handle">bitt</button>
    </div>
          <div class="overflow-container-deposit">
            <div class="overflow-wraper-deposit">
              <div class="wallet wallet__btc">
                                
                <div class="wallet__display">
                  <span class="deposit-panel__title" loc='wallet-title-1'> BTC Tradeone Wallet</span>
                  <div class="wallet__content">
                    <span class="exchange-item">BTC</span>
                    <span class="exchange-value">0.0</span>
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
                    <span class="exchange-value">0.0</span>
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



  //слайдер
  function walletsSliderHandler(element, direction){
    const position = direction === "+" ? -50 : 0;
    element.style.transform = `translateX(${position}%)`;
 
    Array.from(elem.getElems(this.classList[1])).forEach(item=>{
      item.style = '';
    })
    this.style.backgroundColor = 'red';
  }
  
  setTimeout(function(){
    const sliderContainer = elem.getEl('.overflow-wraper-deposit');
    const handleButtons = elem.getElems('slide-handle');

    let i;
    for(i = 0; i<handleButtons.length; i++){
      let direction = i > 0 ? '+' : '-';
      handleButtons[i].addEventListener(
        'click',
         walletsSliderHandler
         .bind(handleButtons[i],
          sliderContainer,
          direction)
      );
    }
  });

    
    // debugger
    

}());
