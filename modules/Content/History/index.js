(function(){
	const template = `
	<div class="history-block">
      <div class="history-block__content-wrapper">
        <h2 class="history-block__title">История торгов</h2>
        <table class="history-block__table">
          <tbody>
          	<tr class="history-block__table-row history-block__row--title">
            <td class="history-block__table-column-name">Имя</td>
            <td class="history-block__table-column-name">Дата</td>
            <td class="history-block__table-column-name">Пара</td>
            <td class="history-block__table-column-name">Цена</td>
            <td class="history-block__table-column-name">Биржа</td>
            <td class="history-block__table-column-name">Тип</td>

          </tr>
        </tbody>
       </table>
      </div>
    </div>
	`;


	render.styles('modules/Content/History');
  
    global.setTmpl(template);

    
	const response = dataRequest.request('db.json', historyHandler);

	function historyHandler(json){
		json.history.forEach(item =>{
			const {
				firstName,
				lastName,
				date,
				investors,
				pair,
				price,
				type
			} = item;

			const templateForRequest = 
      	`
          <td class="history-block__table-cell">
            <span class="history-block">${firstName + ' ' + lastName}</span>
         
          </td>
          <td class="history-block__table-cell">
            <span class="history-block">${date}</span>
          </td>
          <td class="history-block__table-cell">
            <span class="history-block">${pair}</span>
          </td>
          <td class="history-block__table-cell">
            <span class="history-block">${price}</span>
          </td>
            <td class="history-block__table-cell">
            <span class="history-block">${investors}</span>
          </td>
            <td class="history-block__table-cell">
            <span class="history-block">${type}</span>
          </td>
        `;
        	elem.inject('tr', 'hist','.history-block tbody').innerHTML = templateForRequest;
		})
		
	}
	

}())