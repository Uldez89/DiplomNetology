window.addEventListener('DOMContentLoaded', () => {
    const seancePayment = JSON.parse(localStorage.getItem('seanceHall'));
    const ticketTitle = document.querySelector('.ticket__title');
    ticketTitle.textContent = seancePayment.filmName; //seance.filmName;
    const ticketChairs = document.querySelector('.ticket__chairs');
    const placePositionArr = seancePayment.selectedChairs;
    const placeCode = seancePayment.hallCode;
    const acceptinButton = document.querySelector('.acceptin-button');
    let rowPlace = [];
    let price = 0;
    placePositionArr.forEach(element => {
        rowPlace.push(' ' + element.row + '/' + element.place);
        if (element.type === 'standart') {
            price += +seancePayment.priceStandart;
        } else {
            price += +seancePayment.priceVip;
        }
    });
    ticketChairs.textContent = rowPlace.slice(', ');
    const ticketHall = document.querySelector('.ticket__hall');
    ticketHall.textContent = seancePayment.hallName.slice(3);
    const ticketStart = document.querySelector('.ticket__start');
    ticketStart.textContent = seancePayment.seanceTime;
    const ticketCost = document.querySelector('.ticket__cost');
    ticketCost.textContent = price;
    const newHallConfig = seancePayment.hallCode.replace(/selected/g, `taken`);
    seancePayment.ticketChairs = ticketChairs.textContent;
    console.log(JSON.stringify(seancePayment));


    acceptinButton.addEventListener('click', () => {
        localStorage.setItem('seancePayment', JSON.stringify(seancePayment));
        getRequest('POST', 'https://jscp-diplom.netoserver.ru/', `event=sale_add&timestamp=${seancePayment.timeStamp}&hallId=${seancePayment.hallId}&seanceId=${seancePayment.seanceId}&hallConfiguration=${newHallConfig}`)
    })
})